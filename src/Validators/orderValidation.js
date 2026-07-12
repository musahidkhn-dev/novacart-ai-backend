import z from 'zod';

export const createOrderSchema = z.object({

    addressId: z.string().trim(),

    paymentMethod: z.enum(["COD", "ONLINE"]),
});

export const updateOrderSchema = z.object({
    orderStatus: z.enum([
        "confirmed",
        "processing",
        "shipped",
        "out_for_delivery",
        "delivered",
    ]),
})
