const getStatusMessage = (status: string, customerName: string) => {
  switch (status) {
    case "pending":
      return `Hi ${customerName}, your order is now pending and will be processed shortly.`;
    case "processing":
      return `Hi ${customerName}, your order is currently being processed.`;
    case "shipped":
      return `Good news ${customerName}! Your order has been shipped.`;
    case "delivered":
      return `Hi ${customerName}, your order has been delivered successfully.`;
    case "cancelled":
      return `Hi ${customerName}, unfortunately your order has been cancelled.`;
    default:
      return `Hi ${customerName}, your order status has been updated to: ${status}`;
  }
};
export default getStatusMessage;
