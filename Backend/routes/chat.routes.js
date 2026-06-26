import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import Chat from "../models/Chat.model.js";
import Inquiry from "../models/inquiry.model.js";
const chatRouter = express.Router();


chatRouter.use(protect);


// ==============================
// START CHAT
// ==============================
chatRouter.post("/start", async (req, res) => {
    try {
        const {
            propertyId,
            sellerId,
            buyerId: providedBuyerId,
        } = req.body;

        let buyerId;
        let finalSellerId;

        if (req.user.role === "seller") {
            buyerId = providedBuyerId;
            finalSellerId = req.user._id;
        } else {
            buyerId = req.user._id;
            finalSellerId = sellerId;
        }

        if (!buyerId || !finalSellerId || !propertyId) {
            return res.status(400).json({
                success: false,
                message: "Buyer, Seller and Property are required.",
            });
        }

        // One chat per Buyer + Seller + Property
        let chat = await Chat.findOne({
            buyer: buyerId,
            seller: finalSellerId,
            property: propertyId,
        });

        if (!chat) {
            chat = await Chat.create({
                property: propertyId,
                buyer: buyerId,
                seller: finalSellerId,

                lastMessage: "",
                unreadForBuyer: 0,
                unreadForSeller: 0,

                messages: [],
            });
        }

        chat = await Chat.findById(chat._id)
            .populate("buyer", "name email profilePic")
            .populate("seller", "name email profilePic")
            .populate("property", "title price images");

        res.status(200).json(chat);

    } catch (error) {

        console.error("Start Chat Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to start chat",
            error: error.message,
        });
    }
});



// ==========================
// SEND MESSAGE
// ==========================
chatRouter.post("/send", async (req, res) => {
    try {

        const { chatId, text, image } = req.body;

        if (!chatId) {
            return res.status(400).json({
                success: false,
                message: "Chat ID is required",
            });
        }

        if (!text && !image) {
            return res.status(400).json({
                success: false,
                message: "Message cannot be empty",
            });
        }

        const userId = req.user._id.toString();

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            });
        }

        // Verify user belongs to this chat
        if (
            chat.buyer.toString() !== userId &&
            chat.seller.toString() !== userId
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }

        const newMessage = {
            sender: req.user._id,
            text: text || "",
            image: image || "",
        };

        // Save Message
        chat.messages.push(newMessage);

        // Sidebar Preview
        chat.lastMessage = text
            ? text
            : "📷 Image";

        chat.lastMessageSender = req.user._id;

        // Unread Counter
        if (req.user.role === "buyer") {

            chat.unreadForSeller += 1;

        } else {

            chat.unreadForBuyer += 1;
        }

        // updatedAt automatically updates because timestamps:true

        // updatedAt automatically updates because timestamps:true

        await chat.save();

        // ======================================
        // Update Inquiry Status
        // ======================================

        if (req.user.role === "seller") {

            await Inquiry.findOneAndUpdate(

                {
                    property: chat.property,
                    buyer: chat.buyer,
                    seller: chat.seller,
                    status: "pending",
                },

                {
                    $set: {
                        status: "replied",
                        isRead: true,
                        chat: chat._id,
                    },
                }

            );

        }

        // Return populated chat
        const updatedChat = await Chat.findById(chat._id)
            .populate("buyer", "name email profilePic")
            .populate("seller", "name email profilePic")
            .populate("property", "title price images")
            .populate("messages.sender", "name profilePic")
            .populate("lastMessageSender", "name");

        res.status(200).json({
            success: true,
            message: "Message sent successfully",
            chat: updatedChat,
        });

    } catch (error) {

        console.error("Send Message Error:", error);

        res.status(500).json({
            success: false,
            message: "Error sending message",
            error: error.message,
        });
    }
});

// ==========================
// GET ALL CHATS OF LOGGED IN USER
// ==========================
chatRouter.get("/user", async (req, res) => {
    try {

        const userId = req.user._id;

        const chats = await Chat.find({
            $or: [
                { buyer: userId },
                { seller: userId }
            ]
        })

            .populate("buyer", "name email profilePic")

            .populate("seller", "name email profilePic")

            .populate("property", "title price images")

            .populate("lastMessageSender", "name")

            .sort({
                updatedAt: -1,
            });

        res.status(200).json({
            success: true,
            count: chats.length,
            chats,
        });

    } catch (error) {

        console.error("User Chats Error:", error);

        res.status(500).json({
            success: false,
            message: "Error fetching chats",
            error: error.message,
        });

    }
});

// ==========================
// GET SINGLE CHAT
// ==========================
chatRouter.get("/:chatId", async (req, res) => {
    try {

        const chat = await Chat.findById(req.params.chatId)

            .populate("buyer", "name email profilePic")

            .populate("seller", "name email profilePic")

            .populate("property", "title price images")

            .populate("messages.sender", "name email profilePic")

            .populate("lastMessageSender", "name");

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            });
        }

        const userId = req.user._id.toString();

        // User must belong to this chat
        if (
            chat.buyer._id.toString() !== userId &&
            chat.seller._id.toString() !== userId
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized.",
            });
        }

        // Reset unread count
        if (req.user.role === "seller") {

            chat.unreadForSeller = 0;

        } else {

            chat.unreadForBuyer = 0;

        }

        await chat.save();

        res.status(200).json({
            success: true,
            chat,
        });

    } catch (error) {

        console.error("Fetch Chat Error:", error);

        res.status(500).json({
            success: false,
            message: "Error fetching chat",
            error: error.message,
        });

    }
});

//to delete a entire chat (for admin or for user to delete their chat history)
// ==========================
// DELETE CHAT
// ==========================
chatRouter.delete("/:chatId", async (req, res) => {
    try {

        const chat = await Chat.findById(req.params.chatId);

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            });
        }

        const userId = req.user._id.toString();

        if (
            chat.buyer.toString() !== userId &&
            chat.seller.toString() !== userId
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }

        await Chat.findByIdAndDelete(chat._id);

        res.status(200).json({
            success: true,
            message: "Chat deleted successfully",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error deleting chat",
            error: error.message,
        });
    }
});

//to delete a specific message
// ==========================
// DELETE MESSAGE
// ==========================
chatRouter.delete("/:chatId/message/:messageId", async (req, res) => {

    try {

        const chat = await Chat.findById(req.params.chatId);

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            });
        }

        const message = chat.messages.id(req.params.messageId);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found",
            });
        }

        if (
            message.sender.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }

        // Soft Delete
        message.text = "This message was deleted.";

        message.image = "";

        message.isDeleted = true;

        await chat.save();

        res.status(200).json({
            success: true,
            message: "Message deleted successfully",
            chat,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error deleting message",
            error: error.message,
        });
    }

});

export default chatRouter;
