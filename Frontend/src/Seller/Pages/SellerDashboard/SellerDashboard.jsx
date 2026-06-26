import React, { useState } from "react";
import "./Seller.scss";

import { MdAddchart, MdOutlineDashboard } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
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
const SellerDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");

    const [selectedChatId, setSelectedChatId] = useState(null);

    return (
        <div className="seller-parent parent">
            <div className="seller-cont cont">
                {/* Sidebar */}

                <div className="sidebar">
                    <div className="first">
                        <img
                            src="https://randomuser.me/api/portraits/men/1.jpg"
                            alt="User"
                        />

                        <div className="user-info">
                            <h4>Vikram Shelke</h4>
                            <p>Seller</p>
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

                    <div className="last">
                        <IoLogOutOutline />
                        <span>Logout</span>
                    </div>
                </div>

                {/* Content */}
                <div className="right-side">
                    {activeTab === "dashboard" && <DashboardContent />}

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

                    {activeTab === "profile" && <SellerProfile />}
                </div>
            </div>
        </div>
    );
};

export default SellerDashboard;