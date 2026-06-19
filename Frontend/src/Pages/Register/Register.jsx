import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './register.scss'

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("Buyer");
    return (
        <>
            <div className="register-parent parent">
                <div className="register-cont cont">
                    <div className="form-box">
                        <div className="heading">Create Account</div>
                        <p>Join our community to find or list properties</p>

                        <form>
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter Your Full Name"
                            />
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="enteryouremail@gmail.com"
                            />

                            <div className="second-box">
                                <label>Password</label>

                                <div className="password-box">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder=". . . . ."
                                    />

                                    <span
                                        className="eye-icon"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>


                            </div>
                            <div className="second-box">
                                <label>Select Role</label>

                                <div className="role-box">
                                    <div
                                        className={`role-btn ${role === "Buyer" ? "active" : ""}`}
                                        onClick={() => setRole("Buyer")}
                                    >
                                        Buyer
                                    </div>

                                    <div
                                        className={`role-btn ${role === "Seller" ? "active" : ""}`}
                                        onClick={() => setRole("Seller")}
                                    >
                                        Seller
                                    </div>
                                </div>
                            </div>

                            <button className="btn">Create Account</button>

                            <p>
                                Already have an account?{" "}
                                <Link to="/Login">
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