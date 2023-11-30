import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUser);
router.get('/:userId', userController.getSingleUser);
router.put('/:userId', userController.updateSingleUser);
router.delete('/:userId', userController.deleteSingleUser);
router.put('/:userId/orders', userController.updateOrderInUser);
router.get('/:userId/orders', userController.getOrdersInSingleUser);
export const userRoutes = router;
