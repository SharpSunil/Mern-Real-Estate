import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
//Register user 

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // Check if user already exists
        const userExists = await User.findOne({ email });


        if (userExists) {
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
            try {
                await sendEmail({
                    email,
                    subject: "Welcome to Real Estate Platform - Verify Your Email",
                    message: `
                <h1>Welcome to Real Estate Platform, ${name}!</h1>  
                <p>Thank you for registering on our platform. Please use the following verification code to verify your email address:</p>
                <h2>${verificationToken}</h2>
                <p>Please enter this code on the verification page to activate your account.</p>
            `
                })

            } catch (emailError) {
                console.error("OHH FAILED TO SEND VERIFICATION EMAIL:", emailError);

                // If email sending fails, we can choose to delete the created user or keep it with a flag indicating email not sent. Here, we'll delete the user to maintain data integrity.
                res.status(201).json({
                    success: true,
                    message: "User Registered. Please check your email for verification. However, we encountered an issue sending the verification email. Please contact support.",
                   user:{
                    email: user.email,
                    name: user.name,
                    role: user.role,
                   }
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Registration Was Not Successful",
            error: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {  
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });

        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Please verify your email or contact support to resolve this issue.",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        if(user.isBlocked){
            return res.status(403).json({
                success: false,
                message: "Your account has been blocked. Please contact support for more information.",
            });
        }
        //token genration 
        const token = jwt.sign({userId: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.json({
            message: "Login Successful ", 
            token, 
            user,
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Login Was Not Successful",
            error: error.message
        })
       
    }
    }


    //To Get User Profile 
    export const getMe = async (req, res) => {
        try {
           
        } catch (error) {
            console.error("Error fetching user profile: ", error);
            res.status(500).json({
                success: false,
                message: "Failed to fetch user profile",
                error: error.message
            });
        }

    }