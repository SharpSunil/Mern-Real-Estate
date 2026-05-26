import User from "../models/usermodel.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

// Get user profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json({ success: true, user });

    } catch (error) {
        console.error("Get Profile Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}


//to get public profile
export const getPublicProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("name profilePic role createdAt");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });

    } catch (error) {
        console.error("Get Public Profile Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

//update a perticular profile
export const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, removeProfilePic } = req.body;

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        //image handeling
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, "profiles");
            user.profilePic = result.secure_url;
        } else if (removeProfilePic === "true") {
            user.profilePic = null;
        }
        if (name !== undefined) user.name = name;
        if (phone !== undefined) user.phone = phone;
        if (address !== undefined) user.address = address;

        const updateUser = await user.save();
        res.status(200).json({ success: true, user: updateUser, Message: " Profile Updated Successfully" });
    } catch (error) {
        console.error("Update Profile Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}