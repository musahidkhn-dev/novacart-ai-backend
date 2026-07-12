import z from 'zod';

export const createReviewSchema = z.object({
    productId: z.string().trim(),
    orderId: z.string().trim(),
    rating: z.coerce.number().min(1).max(5),
    comment: z.string().trim().max(1000).optional().default(""),
});

export const updateReviewSchema = z.object({
    rating: z.coerce.number().min(1).max(5),
    comment: z.string().trim().max(1000).optional(),
});