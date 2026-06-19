import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './login.scss'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
            <div className="login-parent parent">
                <div className="login-cont cont">
                    <div className="form-box">
                        <div className="heading">Welcome Back</div>
                        <p>Please enter your details to sign in</p>

                        <form>
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

                                <Link to="/login">Forgot Password?</Link>
                            </div>

                            <button className="btn">Sign In</button>

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
        </>
    );
};

export default Login;