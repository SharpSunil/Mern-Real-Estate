import express from 'express';
import {authorize, protect} from "../middleware/auth.middleware.js";
import {blockUser, deleteUser, getAllProperties, getAllUsers} from "../controllers/admin.controller.js";



const adminRouter = express.Router();

adminRouter.use(protect, authorize('admin'));
adminRouter.get("/users", getAllUsers);
adminRouter.put("/users/:id/block", blockUser);
adminRouter.delete("/users/:id", deleteUser);
adminRouter.get("/properties", getAllProperties);