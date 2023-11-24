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
const user_model_1 = require("./user.model");
// Creating Single user into the db
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(user);
    return result;
});
// Checking if the user exists or not by the user ID
const isUserExistIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId });
    if (!result) {
        return false;
    }
    return true;
});
// Getting a single user by id by the user ID
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId: userId }, { password: 0, _id: 0, __v: 0 });
    return result;
});
// Getting all the users from db
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.aggregate([
        {
            $project: {
                _id: 0,
                username: 1,
                fullName: 1,
                age: 1,
                email: 1,
                address: 1,
            },
        },
    ]);
    return result;
});
// Updating user information by following model
const updateUserIntoDB = (userId, updatedBody) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOneAndUpdate({ userId }, updatedBody, {
        new: true,
    });
    return result;
});
// Deleting an user with the id
const deleteSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.deleteOne({ userId });
    return result;
});
// update by adding ordes to user
const addOrderToUserIntoDB = (userId, order) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(order);
    const result = yield user_model_1.UserModel.findOneAndUpdate({ userId: userId }, {
        $addToSet: { orders: order },
    });
    return result;
});
// getting all the orders for a spcific user
const getAllOrdersForSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId: userId }, { orders: 1, _id: 0 });
    return result;
});
// calculatng total price for specific user orders
const totalPriceForSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.aggregate([
        { $match: { userId: Number(userId) } },
        {
            $project: {
                totalPrice: {
                    $sum: {
                        $map: {
                            input: "$orders",
                            as: "order",
                            in: {
                                $multiply: ["$$order.price", "$$order.quantity"],
                            },
                        },
                    },
                },
                _id: 0,
            },
        },
    ]);
    return result;
});
exports.UserService = {
    createUserIntoDB,
    isUserExistIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserIntoDB,
    deleteSingleUserFromDB,
    addOrderToUserIntoDB,
    getAllOrdersForSingleUserFromDB,
    totalPriceForSingleUserFromDB,
};
