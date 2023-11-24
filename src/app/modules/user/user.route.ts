import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);
router.get("/:userId", UserController.getSingleUser);
router.put("/:userId", UserController.updateUser);
router.delete("/:userId", UserController.deleteSingleUser);
router.put("/:userId/orders", UserController.addOrderToUser);
router.get("/:userId/orders", UserController.getAllOrdersForSingleUser);

export const UserRouter = router;
