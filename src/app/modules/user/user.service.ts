import { TOrder, TUser } from "./user.interface";
import { UserModel } from "./user.model";

// Creating Single user into the db
const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

// Checking if the user exists or not by the user ID
const isUserExistIntoDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  if (!result) {
    return false;
  }
  return true;
};

// Getting a single user by id by the user ID
const getSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId: userId }, { password: 0 });
  return result;
};

// Getting all the users from db
const getAllUsersFromDB = async () => {
  const result = await UserModel.aggregate([
    {
      $project: {
        userName: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return result;
};

// Updating user information by following model
const updateUserIntoDB = async (userId: string, updatedBody: any) => {
  const result = await UserModel.updateOne({ userId }, updatedBody);
  return result;
};

// Deleting an user with the id
const deleteSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

// update by adding ordes to user
const addOrderToUserIntoDB = async (userId: string, order: TOrder) => {
  console.log(order);
  const result = await UserModel.findOneAndUpdate(
    { userId: userId },
    {
      $addToSet: { orders: order },
    }
  );
  return result;
};

// getting all the orders for a spcific user
const getAllOrdersForSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId: userId }, { orders: 1 });
  return result;
};

// calculatng total price for specific user orders
const totalPriceForSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.aggregate([
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
      },
    },
  ]);
  return result;
};

export const UserService = {
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
