import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_URL from "../../../Config";
import "./verifyemail.scss";

const VerifyEmail = () => {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const email = localStorage.getItem("verifyEmail");
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Email not found. Please register again.");
            navigate("/register");
            return;
        }

        if (code.length !== 6) {
            toast.error("Please enter a valid 6-digit code");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                `${API_URL}/api/auth/verify-email`,
                {
                    email,
                    code,
                }
            );

            toast.success(
                res.data.message || "Email verified successfully!"
            );

            // Remove stored email after successful verification
            localStorage.removeItem("verifyEmail");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                "Verification failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="verify-parent parent">
            <div className="verify-cont cont">
                <div className="main-box">

                    <h2>Verify Your Email</h2>

                    <p className="sub-text">
                        Enter the 6-digit code sent to your email
                    </p>

                    <form onSubmit={handleVerify}>
                        <div className="code-input-box">
                            <label>Verification Code</label>

                            <input
                                type="text"
                                placeholder="123456"
                                maxLength={6}
                                value={code}
                                onChange={(e) =>
                                    setCode(
                                        e.target.value.replace(/\D/g, "")
                                    )
                                }
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Verifying..."
                                : "Verify Email"}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;