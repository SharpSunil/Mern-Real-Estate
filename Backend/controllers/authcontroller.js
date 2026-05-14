import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
//Register user 

export const register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;
        // Check if user already exists
const userExists = await User.findOne({ email });


if(userExists){
    return res.status(400).json({
        success: false, 
        message: "User already exists",
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        isApproved: role === "seller" ? false : true,
        verificationToken
    });
}
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Registration Was Not Successful",
            error: error.message
        })
    }
}