import z from 'zod';
import { COUPON_TYPE } from '../constants/couponType.js';

export const createCouponSchema = z.object({

    code: z.string()
            .trim()
            .min(3)
            .max(30),

    type: z.enum(
        Object.values(COUPON_TYPE)
    ),

    value: z.coerce.number().positive(),
    minimumOrderAmount: z.coerce.number().min(0).default(0),
    maximumDiscount: z.coerce.number().min(0).default(0),
    usageLimit: z.coerce.number().min(1).default(1),
    startsAt: z.coerce.date(),
    expiresAt: z.coerce.date(),
    isActive: z.boolean().optional().default(true)
});

export const updateCouponSchema = z.object({

    code: z.string()
        .trim()
        .min(3)
        .max(30)
        .optional(),

    type: z.enum(
        Object.values(COUPON_TYPE)).optional(),
    value: z.coerce.number().positive().optional(),
    minimumOrderAmount: z.coerce.number().min(0).optional(),
    maximumDiscount: z.coerce.number().min(0).optional(),
    usageLimit: z.coerce.number().min(1).optional(),
    startsAt: z.coerce.date().optional(),
    expiresAt: z.coerce.date().optional(),
    isActive: z.boolean().optional()

});

export const applyCouponSchema = z.object({
    code: z.string()
            .trim()
            .min(3)
            .max(30)

});