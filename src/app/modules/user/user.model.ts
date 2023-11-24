import { Schema, model } from "mongoose";
import { TAddress, TFullName, TOrder, TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const fullNameSchema = new Schema<TFullName>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const addressSchema = new Schema<TAddress>(
  {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new Schema<TOrder>(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: {
    type: [String],
  },
  address: {
    type: addressSchema,
    required: true,
  },
  orders: {
    type: [orderSchema],
    required: false,
    default: undefined,
  },
});

// Middleware
// Bcrypting password before storing it into db
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// removing password field while sending it back to response
userSchema.post("save", async function (user) {
  user.toJSON = function () {
    const userObject: { password?: string } = this.toObject();
    delete userObject?.password;
    return userObject;
  };
});

export const UserModel = model("user", userSchema);
