import z from 'zod';

export const addToCartSchema = z.object({

    variant: z  
        .string()
        .min(1, "Variant is required"),

    quantity: z.coerce
        .number()
        .int()
        .min(1, "Quantity must be at least 1"),
});

export const updateChartItemSchema = z.object({

    quantity: z.coerce
        .number()
        .int()
        .min(1),
});