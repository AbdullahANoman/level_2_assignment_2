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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_models_1 = require("./user.models");
const createUserDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_models_1.ModelUser.create(userData); // built in static methods
    return result;
});
const getUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_models_1.ModelUser.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_models_1.ModelUser.isUserExist(userId)) {
        const result = yield user_models_1.ModelUser.findOne({ userId });
        return result;
    }
    else {
        throw Error('User do not  exists');
    }
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateSingleUserFromDB = (userId, body) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_models_1.ModelUser.isUserExist(userId)) {
        const result = yield user_models_1.ModelUser.updateOne({ userId }, body);
        return result;
    }
    else {
        throw Error('User do not  exists');
    }
});
const deleteSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_models_1.ModelUser.isUserExist(userId)) {
        const result = yield user_models_1.ModelUser.deleteOne({ userId });
        return result;
    }
    else {
        throw Error('User do not  exists');
    }
});
const updateOrderInUserFromDB = (userId, body) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_models_1.ModelUser.isUserExist(userId)) {
        const result = yield user_models_1.ModelUser.updateOne({ userId: userId }, { $push: { orders: { $each: [body] } } });
        return result;
    }
    else {
        throw Error('User do not  exists');
    }
});
const getTheOrdersFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_models_1.ModelUser.isUserExist(userId)) {
        const result = yield user_models_1.ModelUser.find({ userId }, { orders: 1 });
        return result;
    }
    else {
        throw Error('User do not  exists');
    }
});
exports.UserService = {
    createUserDB,
    getUsersFromDB,
    getSingleUserFromDB,
    updateSingleUserFromDB,
    deleteSingleUserFromDB,
    updateOrderInUserFromDB,
    getTheOrdersFromDB,
};
