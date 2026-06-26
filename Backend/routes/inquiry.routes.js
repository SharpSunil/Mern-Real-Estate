import express from "express";
import {
    protect,
    authorize,
} from "../middlewares/auth.middleware.js";

import {
    sendInquiry,
    getSellerInquiries,
    getBuyerInquiries,
    markAsRead,
    updateInquiryStatus,
    deleteInquiry,
} from "../controllers/inquiry.controller.js";

const inquiryRouter = express.Router();

/*
|--------------------------------------------------------------------------
| Buyer
|--------------------------------------------------------------------------
*/

// Send Inquiry
inquiryRouter.post(
    "/",
    protect,
    authorize("buyer"),
    sendInquiry
);

// Buyer Inquiry History
inquiryRouter.get(
    "/buyer",
    protect,
    authorize("buyer"),
    getBuyerInquiries
);

/*
|--------------------------------------------------------------------------
| Seller
|--------------------------------------------------------------------------
*/

// Seller Inquiry List
inquiryRouter.get(
    "/seller",
    protect,
    authorize("seller"),
    getSellerInquiries
);

// Mark Inquiry Read
inquiryRouter.patch(
    "/:id/read",
    protect,
    authorize("seller"),
    markAsRead
);

// Change Status
inquiryRouter.patch(
    "/:id/status",
    protect,
    authorize("seller"),
    updateInquiryStatus
);

// Delete Inquiry
inquiryRouter.delete(
    "/:id",
    protect,
    deleteInquiry
);

export default inquiryRouter;