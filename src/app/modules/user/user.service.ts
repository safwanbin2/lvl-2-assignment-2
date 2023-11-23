import { TUser } from "./user.interface";
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

export const UserService = {
  createUserIntoDB,
  isUserExistIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteSingleUserFromDB,
};
