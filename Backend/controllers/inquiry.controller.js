import Inquiry from "../models/inquiry.model.js";
import Property from "../models/property.model.js";

// ==========================================
// Buyer Send Inquiry
// ==========================================
export const sendInquiry = async (req, res) => {
    try {
        const { propertyId, message } = req.body;

        if (!propertyId || !message) {
            return res.status(400).json({
                success: false,
                message: "Property ID and message are required.",
            });
        }

        const property = await Property.findById(propertyId).populate("seller");

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found.",
            });
        }

        const inquiry = await Inquiry.create({
            property: property._id,
            buyer: req.user._id,
            seller: property.seller._id,
            message,
        });

        res.status(201).json({
            success: true,
            message: "Inquiry sent successfully.",
            inquiry,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Seller Inquiry List
// ==========================================
export const getSellerInquiries = async (req, res) => {
    try {

        const inquiries = await Inquiry.find({
            seller: req.user._id,
        })
            .populate("buyer", "name email phone profilePic")
            .populate("property", "title price images city")
            .populate("chat", "_id")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: inquiries.length,
            inquiries,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Buyer Inquiry History
// ==========================================
export const getBuyerInquiries = async (req, res) => {
    try {

        const inquiries = await Inquiry.find({
            buyer: req.user._id,
        })
            .populate("seller", "name email phone profilePic")
            .populate("property", "title price images city")
            .populate("chat", "_id")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: inquiries.length,
            inquiries,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Mark Inquiry Read
// ==========================================
export const markAsRead = async (req, res) => {
    try {

        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found.",
            });
        }

        inquiry.isRead = true;

        await inquiry.save();

        res.status(200).json({
            success: true,
            message: "Inquiry marked as read.",
            inquiry,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Update Inquiry Status
// ==========================================
export const updateInquiryStatus = async (req, res) => {
    try {

        const { status } = req.body;

        if (!["pending", "replied", "closed"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status.",
            });
        }

        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found.",
            });
        }

        inquiry.status = status;

        await inquiry.save();

        res.status(200).json({
            success: true,
            message: "Inquiry status updated.",
            inquiry,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Delete Inquiry
// ==========================================
export const deleteInquiry = async (req, res) => {
    try {

        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found.",
            });
        }

        // Only buyer or seller can delete
        if (
            inquiry.buyer.toString() !== req.user._id.toString() &&
            inquiry.seller.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized.",
            });
        }

        await Inquiry.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Inquiry deleted successfully.",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};