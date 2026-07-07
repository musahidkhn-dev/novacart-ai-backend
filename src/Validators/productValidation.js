import z from 'zod';

export const createProductSchema = z.object({

    name: z
        .string()
        .trim()
        .min(2, "Product name must be at least 2 character")
        .max(100, "Product name cannot exceed 100 character"),

    description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 character"),

    shortDescription: z     
        .string()
        .trim()
        .optional(),

    brand: z
        .string()
        .min(1, "Brand is required"),

    category: z
        .string()
        .min(1, "Category is required"),

    store: z
        .string()
        .min(1, "Store is required"),
    status: z
        .enum(["draft", "active", "inactive"])
        .optional(),

    isFeatured: z
        .boolean()
        .optional(),

    seoTitle: z
        .string()
        .trim()
        .optional(),

    seoDescription: z
        .string()
        .trim()
        .optional(),
});

export const updateProductSchema = createProductSchema.partial();