import z from 'zod';
import { ORDER_STATUS } from '../constants/orderStatus.js';
import { PAYMENT_METHOD } from '../constants/paymentMethod.js';

export const createOrderSchema = z.object({

    addressId: z.string().trim(),

    paymentMethod: z.enum([PAYMENT_METHOD]),
});

export const updateOrderSchema = z.object({
    orderStatus: z.enum([
       ORDER_STATUS
    ]),
})
