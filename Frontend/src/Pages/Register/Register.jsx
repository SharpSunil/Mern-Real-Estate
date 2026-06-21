import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./register.scss";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    // Form States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("buyer");

    // UI States
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const result = await register({
                name,
                email,
                password,
                role,
            });

            if (result.success) {
                setSuccess(
                    result.message ||
                    "Registration successful! Redirecting to login..."
                );

                // Reset Form
                setName("");
                setEmail("");
                setPassword("");
                setRole("buyer");

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(
                "Something went wrong. Please try again."
            );
        }

        setLoading(false);
    };

    return (
        <>
            <div className="register-parent parent">
                <div className="register-cont cont">
                    <div className="form-box">

                        {/* Heading */}
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
                                        placeholder=". . . . ."
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

                            {/* Error Message */}
                            {error && (
                                <div className="error-message">
                                    {error}
                                </div>
                            )}

                            {/* Success Message */}
                            {success && (
                                <div className="success-message">
                                    {success}
                                </div>
                            )}

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
        </>
    );
};

export default Register;