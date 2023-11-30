"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { z } = require('zod');
const FullNameValidationZod = z.object({
    firstName: z.string(),
    lastName: z.string(),
});
const AddressValidationZod = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
});
const OrdersValidationZod = z.object({
    productName: z.string(),
    price: z.number().min(0, { message: 'price must be a positive number' }),
    quantity: z.number().min(1, { message: 'quantity must be at least 1' }),
});
const UserValidationZod = z.object({
    userId: z.number(),
    username: z.string(),
    password: z.string(),
    fullName: FullNameValidationZod,
    age: z.number().min(0, { message: 'age must be a positive number' }),
    email: z.string().email('Invalid email').nonempty('email is required'),
    isActive: z.boolean(),
    hobbies: z.array(z.string()).nonempty('hobbies is required'),
    address: AddressValidationZod,
    orders: z.array(OrdersValidationZod).optional(),
});
exports.default = UserValidationZod;
