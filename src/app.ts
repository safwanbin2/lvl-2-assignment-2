import express from "express";
import cors from "cors";
import { UserRouter } from "./app/modules/user/user.route";

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", UserRouter);

export default app;
