import z from 'zod';

export const createPaymentSchema = z.object({

    orderId: z.string().trim(),
});

export const verifyPaymentSchema = z.object({

    razorpay_order_id: z.string(),
    razorpay_payment_id: z.string(),
    razorpay_signature: z.string(),
});