import mongoose from "mongoose";


const inquirySchema = new mongoose.Schema({
    property:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true,
    }
})