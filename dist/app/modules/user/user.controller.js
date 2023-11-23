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
exports.UserController = void 0;
const user_validation_1 = require("./user.validation");
const user_service_1 = require("./user.service");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        const validatedUser = user_validation_1.userValidationSchema.parse(user);
        const result = yield user_service_1.UserService.createUserIntoDB(validatedUser);
        res.status(500).send({
            success: true,
            message: "User created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Could Not Create User",
            error: error,
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.getAllUsersFromDB();
    res.status(200).send({
        success: true,
        message: "Users fetched successfully!",
        data: result,
    });
    try {
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Could Not Retrieve Users",
            error: error,
        });
    }
});
// Getting single user
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        //Checking user existence
        const isExist = yield user_service_1.UserService.isUserExistIntoDB(userId);
        if (!isExist) {
            return res.status(404).send({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        const result = yield user_service_1.UserService.getSingleUserFromDB(userId);
        res.status(200).send({
            success: true,
            message: "User fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(404).send({
            success: false,
            message: error.message || "User not found",
            error: error,
        });
    }
});
// Updating user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { updatedBody } = req.body;
        //Checking user existence
        const isExist = yield user_service_1.UserService.isUserExistIntoDB(userId);
        if (!isExist) {
            return res.status(404).send({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        // updating by validating the updated body;
        // const validatedUpdatedBody = userValidationSchema.parse(udpatedBody);
        const result = yield user_service_1.UserService.updateUserIntoDB(userId, updatedBody);
        res.status(200).send({
            success: true,
            message: "User updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Could not update User",
            error: error,
        });
    }
});
// Deleting user by id
const deleteSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // checking if exists
        const isExist = yield user_service_1.UserService.isUserExistIntoDB(userId);
        if (!isExist) {
            return res.status(404).send({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        const result = yield user_service_1.UserService.deleteSingleUserFromDB(userId);
        res.status(200).send({
            success: true,
            message: "User deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Could not delete User",
            error: error,
        });
    }
});
// adding order to user
const addOrderToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const order = req.body;
        const isExist = yield user_service_1.UserService.isUserExistIntoDB(userId);
        if (!isExist) {
            return res.status(404).send({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        // const validatedOrder = orderValidationSchema.parse(order);
        const result = yield user_service_1.UserService.addOrderToUserIntoDB(userId, order);
        res.status(200).send({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Could not add order",
            error: error,
        });
    }
});
exports.UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteSingleUser,
    addOrderToUser,
};
