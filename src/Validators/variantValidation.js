import z from 'zod';

export const createVariantSchema = z.object({

    product: z
        .string()
        .min(1, "Product is required"),

    price: z.coerce
        .number()
        .min(0, "Price must be greater than or equal to 0"),

    stock: z.coerce
        .number()
        .min(0, "Stock cannot be negative"),

    weight: z.coerce
        .number()
        .min(0, "Weight cannot be negative")
        .optional(),

    barcode: z.coerce
        .string()
        .trim()
        .optional(),

    attributes: z
        .array(
            z.object({
                name: z.string().trim().min(1),
                value: z.string().trim().min(1),
            })
        )
        .min(1, "At least one attribute is required"),
});

export const updateVariantSchema = z.object({
    price: z.coerce
        .number()
        .min(0)
        .optional(),

    stock: z.coerce
        .number()
        .min(0)
        .optional(),

    weight: z.coerce
        .number()
        .min(0)
        .optional(),

    isActive: z
        .boolean()
        .optional(),
});