import express from 'express';
import { blockUser, deleteUser, getAllProperties, getAllUsers, getDashboardStats, getPendingSellers, getAllInquiries, approveSeller } from "../controllers/admin.controller.js";
import { deleteProperty } from "../controllers/property.controller.js";
import { authorize, protect } from '../middlewares/auth.middleware.js';




const adminRouter = express.Router();

adminRouter.use(protect, authorize('admin'));
adminRouter.get("/users", getAllUsers);
adminRouter.put("/users/:id/block", blockUser);
adminRouter.delete("/users/:id", deleteUser);
adminRouter.get("/properties", getAllProperties);
adminRouter.delete("/properties/:id", deleteProperty);

adminRouter.get("/inquiries", getAllInquiries);

adminRouter.get("/stats", getDashboardStats);
adminRouter.get("/pending-sellers", getPendingSellers);
adminRouter.patch("/approve-seller/:id", approveSeller);

export default adminRouter;