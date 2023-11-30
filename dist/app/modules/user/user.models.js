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
exports.ModelUser = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
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
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcryptjs_1.default.hash(this.password, Number(config_1.default.bcrypt_sal_rounds));
        next();
    });
});
userSchema.post('save', function (doc, next) {
    doc.password = undefined;
    next();
});
userSchema.post('findOne', function (doc, next) {
    doc.password = undefined;
    next();
});
userSchema.static('isUserExist', function isUserExist(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.ModelUser.findOne({ userId: id });
        return existingUser;
    });
});
exports.ModelUser = (0, mongoose_1.model)('User', userSchema);
