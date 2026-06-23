import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.scss";
import { useAuth } from "../../../Context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const result = await login(email, password);

            if (result.success) {
                const user =
                    JSON.parse(localStorage.getItem("user")) ||
                    JSON.parse(sessionStorage.getItem("user"));

                // Redirect based on role
                if (user?.role === "admin") {
                    navigate("/admin");
                } else if (user?.role === "seller") {
                    navigate("/seller-dashboard");
                } else {
                    navigate("/");
                }
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="login-parent parent">
            <div className="login-cont cont">
                <div className="form-box">

                    {/* Heading */}
                    <div className="heading">
                        Welcome Back
                    </div>

                    <p>
                        Please enter your details to sign in
                    </p>

                    <form onSubmit={handleSubmit}>

                        {/* Email */}
                        <label>Email Address</label>

                        <input
                            type="email"
                            placeholder="enteryouremail@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {/* Password */}
                        <div className="second-box">
                            <label>Password</label>

                            <div className="password-box">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder=". . . . ."
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                                <span
                                    className="eye-icon"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowPassword(!showPassword);
                                    }}
                                >
                                    {showPassword ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )}
                                </span>
                            </div>

                            <Link to="/forgot-password">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            className="btn"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Signing In..."
                                : "Sign In"}
                        </button>

                        {/* Register Link */}
                        <p>
                            Don't have an account?{" "}
                            <Link to="/register">
                                Create an Account
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;