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

const SellerDashboard = () => {

    const [activeTab, setActiveTab] = useState("dashboard");

    const [selectedChatId, setSelectedChatId] = useState(null);

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

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

                    <div className="last">

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

        </div>

    );

};

export default SellerDashboard;