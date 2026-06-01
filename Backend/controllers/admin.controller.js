import User from "../models/usermodel.js";
import Property from "../models/property.model.js";
import Inquiry from "../models/inquiry.model.js";


//view all Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json({
            success: true,
            count: users.length,
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Block a perticullar User
export const blockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.isBlocked = !user.isBlocked;
        await user.save();

        res.json({
            success: true,
            message: user.isBlocked ? "User Blocked" : "User Unblocked",
            isBlocked: user.isBlocked
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// to delete a perticullar user 

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: "User Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//view all the properties 
export const getAllProperties = async (req, res) => {
    try {
        const Properties = await Property.find().populate("seller", "name, email");
        res.json({
            success: true,
            count: Properties.length,
            Properties
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


//to delete a perticular property

export const deleteProperty = async (req, res) => {
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: "Property deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//To view all inquiries 

export const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().populate("buyer", "name email").populate("seller", "name email").populate("property", "title price").sort({ createdAt: -1 });
        res.json({
            success: true,
            count: inquiries.length,
            inquiries

        })
    } catch (error) {
        res.status(500).json({

            message: error.message
        })
    }
}

//Dashboard Analytics 
export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProperties = await Property.countDocuments();

        const activeListings = await Property.countDocuments({
            status: "sale"
        })
        const soldProperties = await Property.countDocuments({
            status: "sold"
        })
        res.json({
            success: true,
            stats: {
                totalUsers,
                totalProperties,
                activeListings,
                soldProperties

            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}

//Get the pending seller Account
export const getPendingSellers = async (req, res) => {
    try {
        const pendingSellers = await User.find({
            role: "seller",
            isVerified: false
        }).select("-password");
        res.json({
            success: true,
            count: pendingSellers.length,
            pendingSellers
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//Now To approve a perticullar seller
export const approveSeller = async (req, res) => {
    try {
        const seller = await User.findById(req.params.id);
        if (!seller || seller.role !== "seller") {
            return res.status(404).json({
                success: false,
                message: "Seller not found"
            })
        }
        seller.isVerified = true;
        await seller.save();
        res.json({
            success: true,
            message: "Seller approved successfully",
            seller
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}