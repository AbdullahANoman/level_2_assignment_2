"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = __importDefault(require("./user.validation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const parseZodData = user_validation_1.default.parse(user);
        const result = yield user_service_1.UserService.createUserDB(parseZodData);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            error: {
                code: 404,
                description: error || 'User not found',
            },
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserService.getUsersFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'Users not found',
            error: {
                code: 404,
                description: 'Users not found',
            },
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.UserService.getSingleUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found',
            },
        });
    }
});
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        let body = req.body;
        const result = yield user_service_1.UserService.updateSingleUserFromDB(userId, body);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not Exists',
            error: {
                code: 404,
                description: 'User not found',
            },
        });
    }
});
const deleteSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        yield user_service_1.UserService.deleteSingleUserFromDB(userId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User do not exist',
            error: {
                code: 404,
                description: 'User not found',
            },
        });
    }
});
const updateOrderInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const body = req.body;
        yield user_service_1.UserService.updateOrderInUserFromDB(userId, body);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User do  not exist',
            error: {
                code: 404,
                description: error.message || 'User not found',
            },
        });
    }
});
const getOrdersInSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.UserService.getTheOrdersFromDB(userId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found',
            },
        });
    }
});
const getTotalPriceForSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.UserService.getTotalPriceForSingleUserInB(userId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found',
            },
        });
    }
});
exports.userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    updateOrderInUser,
    getOrdersInSingleUser,
    getTotalPriceForSingleUser,
};
