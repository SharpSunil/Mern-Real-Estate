import React, { useState } from "react";
import "./BuyerDashboard.scss";

import {
    MdOutlineDashboard,
} from "react-icons/md";

import { IoLogOutOutline } from "react-icons/io5";
import { IoMdChatboxes } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { SiInquirer } from "react-icons/si";
import { CgProfile } from "react-icons/cg";

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardContent from "../../Pages/DashboardContent/DashbaordContent";
import Wishlist from "../../Pages/Wishlist/Wishlist";
import Chat from "../../Pages/BuyerChat/Chat";
import Inquiry from "../../Pages/MyInquiries/Inquiry";
import Profile from "../../Pages/Profile/Profile";

// Components


const BuyerDashboard = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState(

        location.state?.activeTab || "dashboard"

    );

    const [selectedChatId, setSelectedChatId] = useState(
        location.state?.selectedChatId || null
    );

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    // ===========================
    // Logout
    // ===========================

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        toast.success("Logout Successfully");

        setTimeout(() => {

            navigate("/login", {
                replace: true,
            });

        }, 1000);

    };
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (

        <div className="buyer-parent parent">

            <div className="buyer-cont cont">

                {/* ================= Sidebar ================= */}

                <div className="sidebar">

                    <div className="first">

                        {user?.profilePic ? (

                            <img
                                src={user?.profilePic}
                                alt={user?.name}
                                onError={(e) => {
                                    e.target.style.display = "none";
                                }}
                            />

                        ) : (

                            <div className="avatar">

                                {user?.name?.charAt(0).toUpperCase()}

                            </div>

                        )}

                        <div className="user-info">

                            <h4>{user?.name}</h4>

                            <p>{user?.role}</p>

                        </div>

                    </div>

                    {/* ================= Menu ================= */}

                    <ul className="list">

                        <li

                            className={
                                activeTab === "dashboard"
                                    ? "active"
                                    : ""
                            }

                            onClick={() =>
                                setActiveTab("dashboard")
                            }

                        >

                            <MdOutlineDashboard />

                            <span>Dashboard</span>

                        </li>

                        <li

                            className={
                                activeTab === "wishlist"
                                    ? "active"
                                    : ""
                            }

                            onClick={() =>
                                setActiveTab("wishlist")
                            }

                        >

                            <FaHeart />

                            <span>Wishlist</span>

                        </li>

                        <li

                            className={
                                activeTab === "chat"
                                    ? "active"
                                    : ""
                            }

                            onClick={() =>
                                setActiveTab("chat")
                            }

                        >

                            <IoMdChatboxes />

                            <span>Chats</span>

                        </li>

                        <li

                            className={
                                activeTab === "inquiry"
                                    ? "active"
                                    : ""
                            }

                            onClick={() =>
                                setActiveTab("inquiry")
                            }

                        >

                            <SiInquirer />

                            <span>My Inquiries</span>

                        </li>

                        <li

                            className={
                                activeTab === "profile"
                                    ? "active"
                                    : ""
                            }

                            onClick={() =>
                                setActiveTab("profile")
                            }

                        >

                            <CgProfile />

                            <span>Profile</span>

                        </li>

                    </ul>

                    {/* ================= Logout ================= */}

                    <div
                        className="last"
                        onClick={handleLogout}
                    >

                        <IoLogOutOutline />

                        <span>Logout</span>

                    </div>

                </div>

                {/* ================= Right Side ================= */}

                <div className="right-side">

                    {activeTab === "dashboard" && (

                        <DashboardContent
                            setActiveTab={setActiveTab}
                        />

                    )}

                    {activeTab === "wishlist" && (

                        <Wishlist />

                    )}

                    {activeTab === "chat" && (

                        <Chat
                            selectedChatId={selectedChatId}
                        />

                    )}

                    {activeTab === "inquiry" && (
                        <Inquiry
                            setActiveTab={setActiveTab}
                            setSelectedChatId={setSelectedChatId}
                        />
                    )}
                    {activeTab === "profile" && (
                        <Profile
                            user={user}
                            setUser={setUser}
                        />
                    )}
                </div>

            </div>

        </div>

    );

};

export default BuyerDashboard;