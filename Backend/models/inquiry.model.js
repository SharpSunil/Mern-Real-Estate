import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
    {
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true,
        },

        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        // Pending | Replied | Closed
        status: {
            type: String,
            enum: ["pending", "replied", "closed"],
            default: "pending",
        },

        // Seller has opened this inquiry?
        isRead: {
            type: Boolean,
            default: false,
        },

        // Link inquiry to chat
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;