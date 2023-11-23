"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/", user_controller_1.UserController.createUser);
router.get("/", user_controller_1.UserController.getAllUsers);
router.get("/:userId", user_controller_1.UserController.getSingleUser);
router.put("/:userId", user_controller_1.UserController.updateUser);
router.delete("/:userId", user_controller_1.UserController.deleteSingleUser);
exports.UserRouter = router;
