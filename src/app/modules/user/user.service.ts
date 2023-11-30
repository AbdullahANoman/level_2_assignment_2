import { TUser } from './user.interface';
import { ModelUser } from './user.models';

const createUserDB = async (userData: TUser) => {
  const result = await ModelUser.create(userData); // built in static methods
  return result;
};

const getUsersFromDB = async () => {
  const result = await ModelUser.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return result;
};
const getSingleUserFromDB = async (userId: number) => {
  if (await ModelUser.isUserExist(userId)) {
    const result = await ModelUser.findOne({ userId });
    return result;
  } else {
    throw Error('User do not  exists');
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateSingleUserFromDB = async (userId: number, body: any) => {
  if (await ModelUser.isUserExist(userId)) {
    if (await ModelUser.updateOne({ userId }, body)) {
      delete body.password;
      return body;
    }
  } else {
    throw Error('User do not  exists');
  }
};

const deleteSingleUserFromDB = async (userId: number) => {
  if (await ModelUser.isUserExist(userId)) {
    const result = await ModelUser.deleteOne({ userId });
    return result;
  } else {
    throw Error('User do not  exists');
  }
};

const updateOrderInUserFromDB = async (userId: number, body: any) => {
  if (await ModelUser.isUserExist(userId)) {
    const result = await ModelUser.updateOne(
      { userId: userId },
      { $push: { orders: { $each: [body] } } },
    );
    return result;
  } else {
    throw Error('User do not  exists');
  }
};

const getTheOrdersFromDB = async (userId: number) => {
  if (await ModelUser.isUserExist(userId)) {
    const result = await ModelUser.find({ userId }, { orders: 1 });
    return result;
  } else {
    throw Error('User do not  exists');
  }
};

const getTotalPriceForSingleUserInB = async (userId: number) => {
  if (await ModelUser.isUserExist(userId)) {
    const result = await ModelUser.aggregate([
      {
        $match: { userId },
      },
      {
        $project: {
          orders: 1,
          orderTotalPrice: {
            $sum: {
              $map: {
                input: '$orders',
                as: 'order',
                in: { $multiply: ['$$order.price', '$$order.quantity'] },
              },
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: '$orderTotalPrice' },
        },
      },
    ]);
    return result;
  } else {
    throw Error('User do not  exists');
  }
};
export const UserService = {
  createUserDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,
  updateOrderInUserFromDB,
  getTheOrdersFromDB,
  getTotalPriceForSingleUserInB,
};
