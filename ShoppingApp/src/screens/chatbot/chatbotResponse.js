export const BOT_USER = { _id: 2, name: "Chatbot" };

export const getMainMenu = () => ({
  _id: Math.random(),
  text: "What do you need help with?",
  createdAt: new Date(),
  user: BOT_USER,
  quickReplies: {
    type: "radio",
    keepIt: true,
    values: [
      { title: "Delivery", value: "delivery" },
      { title: "Refund", value: "refund" },
      { title: "Order Status", value: "order" },
    ],
  },
});

export const getResponseForOption = (option) => {
  switch (option) {
    case "delivery":
      return {
        text: "Delivery usually takes 3-5 working days.",
      };

    case "refund":
      return {
        text: "Refund will be done within 10 days.",
      };

    case "order":
      return {
        text: "You can track your order in My Orders section.",
      };

    default:
      return {
        text: "Please choose an option from the menu.",
      };
  }
};