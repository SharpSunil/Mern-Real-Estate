import express from "express";
import { addProperty, deleteProperty, getAllProperties, getMyProperties, updateProperty, updatePropertyStatus } from "../controllers/property.controller.js";
import upload, { protect, authorize } from "../middlewares/upload.middleware.js"


const propertyRouter = express.Router();


propertyRouter.get("/", getAllProperties);

//protected the routes that only seller 
propertyRouter.post("/", protect, authorize("seller"), upload.array("images", 10), addProperty);
propertyRouter.get("/my", protect, authorize("seller"), getMyProperties);
propertyRouter.put("/:id", protect, authorize("seller"), upload.array("images", 10), updateProperty);


propertyRouter.delete("/:id", protect, authorize("seller"), deleteProperty);
propertyRouter.patch("/:id/status", protect, authorize("seller"), updatePropertyStatus);