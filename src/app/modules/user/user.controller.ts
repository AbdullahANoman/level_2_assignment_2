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
    res.status(404).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error || 'User not found',
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Users not found',
      error: {
        code: 404,
        description: 'Users not found',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserService.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
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

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    let body = req.body;
    const result = await UserService.updateSingleUserFromDB(userId, body);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not Exists',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    await UserService.deleteSingleUserFromDB(userId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User do not exist',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

const updateOrderInUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const body = req.body;
    await UserService.updateOrderInUserFromDB(userId, body);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User do  not exist',
      error: {
        code: 404,
        description: error.message || 'User not found',
      },
    });
  }
};

const getOrdersInSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserService.getTheOrdersFromDB(userId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error: any) {
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

const getTotalPriceForSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserService.getTotalPriceForSingleUserInB(userId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error: any) {
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

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  updateOrderInUser,
  getOrdersInSingleUser,
  getTotalPriceForSingleUser,
};
