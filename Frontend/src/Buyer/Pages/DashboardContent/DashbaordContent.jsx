import React, { useEffect, useState } from "react";
import "./DashboardContent.scss";

import { FaHeart } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { SiInquirer } from "react-icons/si";

import axios from "axios";
import API_URL from "../../../Config";

const DashboardContent = () => {

    const token = localStorage.getItem("token");

    const [dashboard, setDashboard] = useState({

        wishlistCount: 0,

        totalChats: 0,

        unreadChats: 0,

        inquiryCount: 0,

        recentActivity: [],

    });

    const [loading, setLoading] = useState(true);

    // ==========================
    // Fetch Dashboard
    // ==========================

    const fetchDashboard = async () => {

        try {

            const res = await axios.get(

                `${API_URL}/api/property/buyer/dashboard`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            setDashboard(res.data.stats);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchDashboard();

    }, []);

    if (loading) {

        return <h2>Loading Dashboard...</h2>;

    }

    return (

        <>

            <div className="top">

                <h2>Buyer Dashboard</h2>

                <p>Welcome Back 👋</p>

            </div>

            {/* Cards */}

            <div className="card-main">

                <div className="card">

                    <div className="icon">

                        <FaHeart />

                    </div>

                    <div className="number">

                        {dashboard.wishlistCount}

                    </div>

                    <div className="text">

                        Wishlist

                    </div>

                </div>

                <div className="card">

                    <div className="icon">

                        <IoIosChatbubbles />

                    </div>

                    <div className="number">

                        {dashboard.totalChats}

                    </div>

                    <div className="text">

                        Chats

                    </div>

                </div>

                <div className="card">

                    <div className="icon">

                        <SiInquirer />

                    </div>

                    <div className="number">

                        {dashboard.inquiryCount}

                    </div>

                    <div className="text">

                        Inquiries

                    </div>

                </div>

            </div>

            {/* Recent Activity */}

            <h2>

                Recent Activity

            </h2>

            <div className="activity-box">

                {

                    dashboard.recentActivity.length === 0 ?

                        (

                            <div className="activity-card">

                                No Recent Activity

                            </div>

                        )

                        :

                        (

                            dashboard.recentActivity.map(

                                (item) => (

                                    <div
                                        className="activity-card"
                                        key={item._id}
                                    >

                                        <strong>

                                            Inquiry:

                                        </strong>

                                        {" "}

                                        {item.property?.title}

                                        <br />

                                        <small>

                                            {

                                                new Date(

                                                    item.createdAt

                                                ).toLocaleString(

                                                    "en-IN",

                                                    {

                                                        day: "2-digit",

                                                        month: "short",

                                                        year: "numeric",

                                                        hour: "2-digit",

                                                        minute: "2-digit",

                                                    }

                                                )

                                            }

                                        </small>

                                    </div>

                                )

                            )

                        )

                }

            </div>

        </>

    );

};

export default DashboardContent;