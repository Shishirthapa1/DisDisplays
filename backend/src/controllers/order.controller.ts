// src/controllers/order.controller.ts
import { Request, Response } from "express";
import { Order } from "../models/order.model";
import { notifyOrderEmails } from "../middlewares/notifyOrder";
import { sendEmail } from "../middlewares/sendEmail.middleware";
import getStatusMessage from "../config/getStatusMessage";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { user, shippingAddress, products, totalAmount } = req.body;

    if (!user || !shippingAddress || !products || !totalAmount) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const order = new Order({
      user,
      shippingAddress,
      products,
      totalAmount,
    });

    const savedOrder = await order.save();

    const populatedOrder = await savedOrder.populate(
      "products.product",
      "name image"
    );

    await notifyOrderEmails(populatedOrder);

    res.status(201).json({
      success: true,
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Status is required" });
    }

    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("products.product", "name image");

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    await sendEmail({
      to: updatedOrder?.user?.email as string,
      subject: `Your Order #${updatedOrder?._id} Status Updated`,
      html: `
        <h2>Hi ${updatedOrder?.user?.fullname},</h2>
            <p>${getStatusMessage(
              updatedOrder?.status,
              updatedOrder?.user?.fullname as string
            )}</p>

        <p>Order ID: ${updatedOrder?._id}</p>
        <p>Thank you for shopping with us!</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate(
      "products.product",
      "name image"
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("products.product", "name image")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
