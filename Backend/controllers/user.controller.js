import User from "../models/usermodel.js";


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
export const updateProfile = async (req, res) =>{
    try {
        const {name, phone, address, removeProfilePic} = req.body;

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        //image handeling
    } catch (error) {
        console.error("Update Profile Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}