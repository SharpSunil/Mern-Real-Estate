import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        text: {
            type: String,
            default: "",
        },

        image: {
            type: String,
            default: "",
        },

        isSeen: {
            type: Boolean,
            default: false,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const chatSchema = new mongoose.Schema(
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

        // Sidebar Preview
        lastMessage: {
            type: String,
            default: "",
        },

        lastMessageSender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        unreadForBuyer: {
            type: Number,
            default: 0,
        },

        unreadForSeller: {
            type: Number,
            default: 0,
        },

        messages: [messageSchema],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Chat", chatSchema);