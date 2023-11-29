import { Schema, model } from 'mongoose';
import { StaticUserModel, TUser } from './user.interface';
import bcrypt from 'bcryptjs';
import config from '../../config';

const userSchema = new Schema<TUser, StaticUserModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'userId is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'userName is required'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, 'firstName is required'],
    },
    lastName: {
      type: String,
      required: [true, 'lastName is required'],
    },
  },
  age: { type: Number, required: [true, 'age is required'] },
  email: { type: String, required: [true, 'email is required'] },
  isActive: { type: Boolean, required: [true, 'isActive is required'] },
  hobbies: { type: [String], required: [true, 'hobbies is required'] },
  address: {
    street: { type: String, required: [true, 'street is required'] },
    city: { type: String, required: [true, 'city is required'] },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
  },
  orders: [
    {
      productName: {
        type: String,
        required: [true, 'productName is required'],
      },
      price: { type: Number, required: [true, 'price is required'] },
      quantity: { type: Number, required: [true, 'quantity is required'] },
    },
  ],
});

//password hashing
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password as string,
    Number(config.bcrypt_sal_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = undefined;
  next();
});

userSchema.post('findOne', function (doc, next) {
  doc.password = undefined;
  next();
});

// updateOne
userSchema.pre('updateOne', function () {
  console.log(this);
});

userSchema.static('isUserExist', async function isUserExist(id: number) {
  const existingUser = await ModelUser.findOne({ userId: id });
  return existingUser;
});

export const ModelUser = model<TUser, StaticUserModel>('User', userSchema);
