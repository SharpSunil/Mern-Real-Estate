import React from 'react'
import { Link } from 'react-router-dom'
import './forgotpassword.scss'
const ForgotPassword = () => {
    return (
        <>
            <div className="forgot-parent parent">
                <div className="forgot-cont cont">
                    <div className="form-box">
                        <div className="heading">Fogot Password</div>
                        <p>Enter your email address to receive a password reset link</p>

                        <form>
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="enteryouremail@gmail.com"
                            />



                            <button className="btn">Send Reset Link</button>

                            <p>
                                Remembered your password?{" "}
                                <Link to="/register">
                                    Back to login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
