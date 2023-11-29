const { z } = require('zod');

const FullNameValidationZod = z.object({
  firstName: z.string().nonempty('firstName is required'),
  lastName: z.string().nonempty('lastName is required'),
});

const AddressValidationZod = z.object({
  street: z.string().nonempty('street is required'),
  city: z.string().nonempty('city is required'),
  country: z.string().nonempty('country is required'),
});

const OrdersValidationZod = z.object({
  productName: z.string().nonempty('productName is required'),
  price: z.number().min(0, { message: 'price must be a positive number' }),
  quantity: z.number().min(1, { message: 'quantity must be at least 1' }),
});

const UserValidationZod = z.object({
  userId: z.number(),
  username: z.string().nonempty('username is required'),
  password: z.string().nonempty('password is required'),
  fullName: FullNameValidationZod,
  age: z.number().min(0, { message: 'age must be a positive number' }),
  email: z.string().email('Invalid email').nonempty('email is required'),
  isActive: z.boolean(),
  hobbies: z.array(z.string()).nonempty('hobbies is required'),
  address: AddressValidationZod,
  orders: z.array(OrdersValidationZod).optional(),
});

export default UserValidationZod;
