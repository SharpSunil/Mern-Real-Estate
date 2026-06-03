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
chatRouter.get("/", async (req, res) =>{
    try{

    }catch(error){
        
    }
})