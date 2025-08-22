// src/middleware/notifyOrder.ts
import { sendEmail } from "./sendEmail.middleware";
import { customerOrderEmail, adminOrderEmail } from "./emailTemplate";
import dotenv from "dotenv";

dotenv.config();

export const notifyOrderEmails = async (order: any) => {
  try {
    // Send to customer
    await sendEmail({
      to: order.user.email,
      subject: `Order Confirmation - ${order._id}`,
      html: customerOrderEmail(order),
    });

    // Send to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL as string,
      subject: `New Order Received - ${order._id}`,
      html: adminOrderEmail(order),
    });

    console.log("Both emails sent successfully.");
  } catch (error) {
    console.error("Error sending order emails:", error);
  }
};
