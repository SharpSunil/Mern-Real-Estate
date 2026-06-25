import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import "./register.scss";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    // Form States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    // Loading State
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
        toast.error("Please select your role");
        return;
    }

    setLoading(true);

    try {
        const result = await register({
            name,
            email,
            password,
            role,
        });

        if (result.success) {
            // Store email for verification page
            localStorage.setItem("verifyEmail", email);

            toast.success(
                result.message ||
                "Registration successful! Please verify your email."
            );

            // Reset form
            setName("");
            setEmail("");
            setPassword("");
            setRole("");

            // Redirect to verify email page
            setTimeout(() => {
                navigate("/verifyemail");
            }, 1500);
        } else {
            toast.error(
                result.message ||
                "Registration failed. Please try again."
            );
        }
    } catch (err) {
        toast.error(
            err.response?.data?.message ||
            "Something went wrong. Please try again."
        );
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="register-parent parent">
            <div className="register-cont cont">
                <div className="form-box">

                    <div className="heading">
                        Create Account
                    </div>

                    <p>
                        Join our community to find or list properties
                    </p>

                    <form onSubmit={handleSubmit}>

                        {/* Full Name */}
                        <label>Full Name</label>

                        <input
                            type="text"
                            placeholder="Enter Your Full Name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />

                        {/* Email */}
                        <label>Email Address</label>

                        <input
                            type="email"
                            placeholder="enteryouremail@gmail.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                        {/* Password */}
                        <div className="second-box">
                            <label>Password</label>

                            <div className="password-box">
                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <span
                                    className="eye-icon"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowPassword(
                                            !showPassword
                                        );
                                    }}
                                >
                                    {showPassword ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="second-box">
                            <label>Select Role</label>

                            <div className="role-box">
                                <div
                                    className={`role-btn ${role === "buyer"
                                        ? "active"
                                        : ""
                                        }`}
                                    onClick={() =>
                                        setRole("buyer")
                                    }
                                >
                                    Buyer
                                </div>

                                <div
                                    className={`role-btn ${role === "seller"
                                        ? "active"
                                        : ""
                                        }`}
                                    onClick={() =>
                                        setRole("seller")
                                    }
                                >
                                    Seller
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="btn"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account"}
                        </button>

                        {/* Login Link */}
                        <p>
                            Already have an account?{" "}
                            <Link to="/login">
                                Sign In
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;