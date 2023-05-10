import Razorpay from "razorpay";

// Razorpay instance
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_ID as string,
  key_secret: process.env.RAZORPAY_API_SECRET,
});
