import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";

import crypto from "crypto";
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
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isApproved: role === "seller" ? false : true,
      verificationToken,
    });

    // Send email
    await sendEmail({
      email,
      subject: "Welcome to Real Estate Platform - Verify Your Email",
      message: `
        <h1>Welcome to Real Estate Platform, ${name}!</h1>
        <p>Your verification code:</p>
        <h2>${verificationToken}</h2>
      `,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Registration Was Not Successful",
      error: error.message,
    });
  }
};

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
        if (user.isBlocked) {
            return res.status(403).json({
                success: false,
                message: "Your account has been blocked. Please contact support for more information.",
            });
        }
        //token genration 
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
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
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.json({
            success: true,
            user,
        })

    } catch (error) {
        console.error("Error fetching user profile: ", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user profile",
            error: error.message
        });
    }

}

//verify the email 
export const verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body;
        if (!email || !code) {
            return res.status(400).json({
                message: "Email and code are required",

            })

        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email is already verified",
            })
        }
        if (user.verificationToken !== code) {
            return res.status(400).json({ message: "Invalid verification code" });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();
        res.status(200).json({ message: " Email verified successfully", success: true })
    }
    catch (error) {
        console.error("Error verifying email: ", error);
        res.status(500).json({
            success: false,
            message: "Failed to verify email",
            error: error.message
        })
    }
}

//Forgot Password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                Message: "No User found with that email Address",
            });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordExpires = resetPasswordExpires;
        await user.save();

        const clientUrl = "http://localhost:5173"; // Replace with your frontend URL
        const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

        const message = `
<h2>Password Reset Request</h2>
<p>You have requested to reset your password. Please click the link below to reset your password:</p>
<a href="${resetUrl}" clicktracking="off">${resetUrl}</a>
<p>This link will expire in 1 hour. If you did not request a password reset, please ignore this email.</p>
`;

        try {
            await sendEmail({
                email: user.email,
                subject: "Password Reset Request - Real Estate Platform",
                message,
            });
            res.status(200).json({
                success: true,
                message: "Password reset email sent. Please check your inbox.",
            });
        }
        catch (error) {
            console.error("Error sending password reset email: ", error);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            res.status(500).json({
                success: false,
                message: "Failed to send password reset email. Please try again later.",
                error: error.message
            });
        }
    } catch (error) {
        console.error("Error in forgot password: ", error);
        res.status(500).json({
            success: false,
            message: "Failed to process forgot password request",
            error: error.message
        })
    }
}//for the reset password we require the email 

//now to reset the password
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired password reset token"
            });
        }
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(200).json({ Message: "Password reset successful", success: true })
    }
    catch (error) {
        console.log("Error in reset password: ", error);
        res.status(500).json({
            success: false,
            message: "Failed to reset password",
            error: error.message
        })
    }
}