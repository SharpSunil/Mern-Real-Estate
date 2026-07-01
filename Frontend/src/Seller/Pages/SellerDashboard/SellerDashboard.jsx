import React, { useState } from "react";
import "./Seller.scss";

import { MdAddchart, MdOutlineDashboard } from "react-icons/md";
import { LuTableProperties } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";
import { IoMdChatboxes } from "react-icons/io";
import { SiInquirer } from "react-icons/si";
import { CgProfile } from "react-icons/cg";

import DashboardContent from "../DashboardContent/Dashboardcontet";
import MyProperties from "../MyProperties/MyProperties";
import AddProperty from "../AddProperty/AddProperty";
import SellerChat from "../SellerChat/SellerChat";
import Inquiry from "../Inquiries/Inquiry";
import SellerProfile from "../Profile/SellerProfile";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SellerDashboard = () => {

    const [activeTab, setActiveTab] = useState("dashboard");

    const [selectedChatId, setSelectedChatId] = useState(null);

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );
    const navigate = useNavigate();
    // ---------------Logout----------------------//
    const handleLogout = () => {

        toast.warn(
            ({ closeToast }) => (
                <div>
                    <p>Are you sure you want to logout?</p>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "10px",
                        }}
                    >
                        <button
                            onClick={() => {
                                closeToast();
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            style={{
                                background: "crimson",
                                color: "#fff",
                                border: "none",
                                padding: "6px 12px",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("user");

                                closeToast();

                                toast.success("Logged out successfully!");

                                setTimeout(() => {
                                    navigate("/login", { replace: true });
                                }, 1000);
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ),
            {
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
                draggable: false,
            }
        );

    };
    return (

        <div className="seller-parent parent">

            <div className="seller-cont cont">

                {/* Sidebar */}

                <div className="sidebar">

                    <div className="first">

                        {user?.profilePic ? (

                            <img
                                src={user.profilePic}
                                alt={user.name}
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

                    <ul className="list">

                        <li
                            className={activeTab === "dashboard" ? "active" : ""}
                            onClick={() => setActiveTab("dashboard")}
                        >
                            <MdOutlineDashboard />
                            <span>Dashboard</span>
                        </li>

                        <li
                            className={activeTab === "properties" ? "active" : ""}
                            onClick={() => setActiveTab("properties")}
                        >
                            <LuTableProperties />
                            <span>My Properties</span>
                        </li>

                        <li
                            className={activeTab === "add" ? "active" : ""}
                            onClick={() => setActiveTab("add")}
                        >
                            <MdAddchart />
                            <span>Add Property</span>
                        </li>

                        <li
                            className={activeTab === "chat" ? "active" : ""}
                            onClick={() => setActiveTab("chat")}
                        >
                            <IoMdChatboxes />
                            <span>Chats</span>
                        </li>

                        <li
                            className={activeTab === "inquiry" ? "active" : ""}
                            onClick={() => setActiveTab("inquiry")}
                        >
                            <SiInquirer />
                            <span>Inquiries</span>
                        </li>

                        <li
                            className={activeTab === "profile" ? "active" : ""}
                            onClick={() => setActiveTab("profile")}
                        >
                            <CgProfile />
                            <span>Profile</span>
                        </li>

                    </ul>

                    <div className="last" onClick={() => handleLogout()}>

                        <IoLogOutOutline />

                        <span>Logout</span>

                    </div>

                </div>

                {/* Right Side */}

                <div className="right-side">

                    {activeTab === "dashboard" && (
                        <DashboardContent
                            setActiveTab={setActiveTab}
                        />
                    )}

                    {activeTab === "properties" && <MyProperties />}

                    {activeTab === "add" && <AddProperty />}

                    {activeTab === "chat" && (

                        <SellerChat
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

                        <SellerProfile
                            user={user}
                            setUser={setUser}
                        />

                    )}

                </div>

            </div>

        </div >

    );

};

export default SellerDashboard;