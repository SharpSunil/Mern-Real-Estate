import express from "express";

import {
    addProperty,
    deleteProperty,
    deletePropertyImage,
    getAllProperties,
    getBuyerDashboard,
    getMyProperties,
    getPropertyCounts,
    getPropertyDetails,
    getSellerDashboard,
    updateProperty,
    updatePropertyStatus,
} from "../controllers/property.controller.js";

import upload from "../middlewares/upload.middleware.js";

import {
    authorize,
    protect,
} from "../middlewares/auth.middleware.js";

const propertyRouter = express.Router();

// ==========================================
// Public Routes
// ==========================================

// Get all properties
propertyRouter.get("/", getAllProperties);

// Property Counts
propertyRouter.get("/counts", getPropertyCounts);

// ==========================================
// Seller Routes
// ==========================================

// Add Property
propertyRouter.post(
    "/",
    protect,
    authorize("seller"),
    upload.array("images", 10),
    addProperty
);

// My Properties
propertyRouter.get(
    "/my",
    protect,
    authorize("seller"),
    getMyProperties
);

// Seller Dashboard
propertyRouter.get(
    "/seller/dashboard",
    protect,
    authorize("seller"),
    getSellerDashboard
);

// Update Property
propertyRouter.put(
    "/:id",
    protect,
    authorize("seller"),
    upload.array("images", 10),
    updateProperty
);

// Delete Single Property Image
propertyRouter.delete(
    "/:propertyId/image/:imageId",
    protect,
    authorize("seller"),
    deletePropertyImage
);

// Delete Property
propertyRouter.delete(
    "/:id",
    protect,
    authorize("seller"),
    deleteProperty
);

// Update Property Status
propertyRouter.patch(
    "/:id/status",
    protect,
    authorize("seller"),
    updatePropertyStatus
);

// ==========================================
// KEEP THIS LAST
// ==========================================

// Get Property Details
propertyRouter.get("/:id", getPropertyDetails);

//buyer dashboard route
propertyRouter.get(
    "/buyer/dashboard",
    protect,
    authorize("buyer"),
    getBuyerDashboard
);

export default propertyRouter;