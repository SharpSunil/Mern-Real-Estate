import express from "express";
import { protect } from "../middleware/auth.middleware.js";





chatRouter.use(protect);

//to create a chat 
chatRouter.post("/start", async (req, res) => {
    try {
        const { propertyId, sellerId, buyerId: providedBuyerId } = req.body;
        let buyerId, finalSellerId;

        if (req.user.role === "seller") {

            buyerId = providedBuyerId;
            finalSellerId = req.user._id;
        } else {
            buyerId = req.user._id;
            finalSellerId = sellerId;
        }
        if (!buyerId || !finalSellerId) {
            return res.status(400).json({ success: false, message: "Missing Buyer or Seller ID  " });
        }

        //check for an existing chat between the buyer and seller
        let chat = await Chat.findOne({
            buyer: buyerId,
            seller: finalSellerId,
        });

        if (!chat) {
            // Create a new chat
            chat = await Chat.create({
                property: propertyId,  //initail property context
                buyer: buyerId,
                seller: finalSellerId,
                messages: [],
            });
        }
        chat = await Chat.findById(chat._id).populate("buyer", "name email profilePic").populate("seller", "name email profilePic").populate("property", "title price images");
        res.json(chat);

    } catch (error) {
        res.status(500).json({
            success: false, message:
                "Error Creating chat or getting previous one ",
            error: error.message
        });
    }
});


//to send message
chatRouter.post("/send", async (req, res) => {
    try {

        const { chatId, text, image } = req.body;
        const userId = req.user._id;

        const chat = await Chat.findById(chatId);
        if (!chat)
            return res.status(404).json({ success: false, message: "Chat not found" });

        //ensure the sender is part of the chat
        if (chat.buyer.toString() !== userId && chat.seller.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Not authorized to send message in this chat" });
        }

        const newMessage = {
            sender: userId,
            text,
            image,
            createdAt: new Date(),
        };
        chat.messages.push(newMessage);
        await chat.save();

        const savedMessage = chat.messages[chat.messages.length - 1];
        res.json({ chat, newMessage: savedMessage });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error sending message",
            error: error.message
        })
    }
})

// To get Chat for User
chatRouter.get("/user", async (req, res) => {
    try {
        const userId = req.user._id;
        const chats = await Chat.find({
            $or: [{ buyer: userId }, { seller: userId }]
        })

            .populate("buyer", "name email profilePic")
            .populate("seller", "name email profilePic")
            .populate("property", "title price images")
            .sort({ updatedAt: -1 }); //sort by most recent activity
        res.json(chats);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching user chats",
            error: error.message
        })
    }
})

//to get chat messages

chatRouter.get("/:chatId", async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId)
            .populate("message.sender", "name profilePic");


        if (!chat)
            return res.status(404).json({ message: "Chat not found" });
        //ensure the requester is part of the chat  
        const userId = req.user._id.toString();
        if (chat.buyer.toString() !== userId && chat.seller.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized " });
        }

        res.json(chat);
    } catch (error) {
        res.status(500).json({

            message: "Error fetching chat details",
            error: error.message
        })
    }
})

//to delete a entire chat (for admin or for user to delete their chat history)
chatRouter.delete("/:chatId", async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId);
        if (!chat)
            return res.status(404).json({ message: "Chat not found" });
        //now we ensure the user is part of the chat 
        if(chat.buyer.toString() !== req.user._id.toString() && chat.seller.toString() !== req.user._id.toString()){
            return res.status(403).json({ message: "Not authorized to delete this chat" });

        }
        await Chat.findByIdAndDelete(req.params.chatId);
        res.json({ message: "Chat deleted successfully" });
    
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting chat",
            error: error.message
        })
    }
})

export default chatRouter;