import { Request, Response } from "express";
import {
  orderValidationSchema,
  userValidationSchema,
  userValidationUpdateSchema,
} from "./user.validation";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const validatedUser = userValidationSchema.parse(user);

    const result = await UserService.createUserIntoDB(validatedUser);

    res.status(500).send({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Could Not Create User",
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsersFromDB();

    res.status(200).send({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Could Not Retrieve Users",
      error: error,
    });
  }
};

// Getting single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    //Checking user existence
    const isExist = await UserService.isUserExistIntoDB(userId);
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

    const result = await UserService.getSingleUserFromDB(userId);
    res.status(200).send({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).send({
      success: false,
      message: error.message || "User not found",
      error: error,
    });
  }
};

// Updating user
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { updatedBody } = req.body;

    //Checking user existence
    const isExist = await UserService.isUserExistIntoDB(userId);
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
    const validatedUpdatedBody = userValidationUpdateSchema.parse(updatedBody);
    const result = await UserService.updateUserIntoDB(
      userId,
      validatedUpdatedBody
    );

    res.status(200).send({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Could not update User",
      error: error,
    });
  }
};

// Deleting user by id
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // checking if exists
    const isExist = await UserService.isUserExistIntoDB(userId);
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

    const result = await UserService.deleteSingleUserFromDB(userId);
    res.status(200).send({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Could not delete User",
      error: error,
    });
  }
};

// adding order to user
const addOrderToUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order = req.body;

    const isExist = await UserService.isUserExistIntoDB(userId);
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

    const validatedOrder = orderValidationSchema.parse(order);

    const result = await UserService.addOrderToUserIntoDB(
      userId,
      validatedOrder
    );
    res.status(200).send({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Could not add order",
      error: error,
    });
  }
};

// get all orders for single user
const getAllOrdersForSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const isExist = await UserService.isUserExistIntoDB(userId);
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

    const result = await UserService.getAllOrdersForSingleUserFromDB(userId);

    res.status(200).send({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Could not fetch order",
      error: error,
    });
  }
};

// calculating total price for a spcific user
const totalPriceForSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const isExist = await UserService.isUserExistIntoDB(userId);
    if (!isExist) {
      return res.status(200).send({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }

    const result = await UserService.totalPriceForSingleUserFromDB(userId);
    res.status(200).send({
      success: true,
      message: "Total price calculated successfully!",
      data: result[0],
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Could not find total price",
      error: error,
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteSingleUser,
  addOrderToUser,
  getAllOrdersForSingleUser,
  totalPriceForSingleUser,
};
