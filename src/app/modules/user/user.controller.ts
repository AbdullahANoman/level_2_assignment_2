/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserService } from './user.service';
import UserValidationZod from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const parseZodData = UserValidationZod.parse(user);
    const result = await UserService.createUserDB(parseZodData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message || 'User not found',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserService.getSingleUserFromDB(userId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message || 'User not found',
      },
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const body = req.body;
    await UserService.updateSingleUserFromDB(userId, body);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: body,
    });
  } catch (error: any) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message || 'User not found',
      },
    });
  }
};

export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateSingleUser,
};
