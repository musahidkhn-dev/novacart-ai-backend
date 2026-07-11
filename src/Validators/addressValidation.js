import z from 'zod';

export const createAddressSchema = z.object({

    fullName: z.string().trim().min(2),

    phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Invalid phone number"),

    addressLine1: z.string().trim().min(5),

    addressLine2: z.string().optional().default(""),

    landmark: z.string().min(2).default(""),
    city: z.string().trim().min(2),
    state: z.string().trim().min(2),
    country: z.string().trim().default("India"),

    postalCode: z
        .string()
        .regex(/^\d{6}$/, "Invalid postal code"),
        
    addressType: z
        .enum([
            "home",
            "office",
            "other",
        ])
        .default("home"),

    isDefault: z.boolean().optional(),
});

export const updateAddressSchema = createAddressSchema.partial();