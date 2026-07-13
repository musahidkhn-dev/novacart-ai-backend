import Razorpay from "razorpay";
import Env from "./env.js";
const razorpay = new Razorpay({
    key_id: Env.RAZORPAY_KEY_ID,
    key_secret: Env.RAZORPAY_KEY_SECRET,
});

export default razorpay;