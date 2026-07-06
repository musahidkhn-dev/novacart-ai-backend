import z from "zod";

export const createBrandSchema = z.object({

    name: z
        .string()
        .trim()
        .min(2)
        .max(50),
    
    description: z
        .string()
        .max(500)
        .optional(),
    
    website: z
        .string()
        .url()
        .optional()
        .or(z.literal("")),
});