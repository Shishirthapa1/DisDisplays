export const customerOrderEmail = (order: any) => {
  return `
    <h1>Thank you for your order, ${order.user.fullname}!</h1>
    <p>Your order ID is <strong>${order._id}</strong>.</p>
    <p>Total Amount: $${order.totalAmount.toFixed(2)}</p>
    <p>Status: ${order.status}</p>
    <h3>Products:</h3>
    <ul>
      ${order.products
        .map((p: any) => `<li>${p.product.name} x ${p.quantity}</li>`)
        .join("")}
    </ul>
    <p>Shipping Address:</p>
    <p>
      ${order.shippingAddress.addressLine}, ${
    order.shippingAddress.street
  },<br />
      ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${
    order.shippingAddress.postalCode
  },<br />
      ${order.shippingAddress.country}
    </p>
  `;
};

export const adminOrderEmail = (order: any) => {
  return `
    <h1>New Order Received!</h1>
    <p>Order ID: <strong>${order._id}</strong></p>
    <p>Customer: ${order.user.fullname}</p>
    <p>Email: ${order.user.email}</p>
    <p>Phone: ${order.user.phoneNumber}</p>
    <p>Total Amount: $${order.totalAmount.toFixed(2)}</p>
    <p>Status: ${order.status}</p>
    <h3>Products:</h3>
    <ul>
      ${order.products
        .map((p: any) => `<li>${p.product.name} x ${p.quantity}</li>`)
        .join("")}
    </ul>
    <p>Shipping Address:</p>
    <p>
      ${order.shippingAddress.addressLine}, ${
    order.shippingAddress.street
  },<br />
      ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${
    order.shippingAddress.postalCode
  },<br />
      ${order.shippingAddress.country}
    </p>
  `;
};
