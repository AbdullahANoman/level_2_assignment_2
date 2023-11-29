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
const updateSingleUserFromDB = async (userId: string, body: any) => {
  const numberUserId = Number(userId);
  const result = await ModelUser.updateOne({ userId: numberUserId }, body);
  return result;
};
export const UserService = {
  createUserDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
};
