import React, {
    useEffect,
    useState,
} from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import API_URL from "../../../Config";

import "./Inquiry.scss";

const Inquiry = ({
    setActiveTab,
    setSelectedChatId,
}) => {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [inquiries, setInquiries] =
        useState([]);

    const fetchInquiries = async () => {

        try {

            const res = await axios.get(
                `${API_URL}/api/inquiry/seller`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setInquiries(
                res.data.inquiries
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchInquiries();

    }, []);

    const filteredInquiry =
        inquiries.filter((item) => {

            return (

                item.buyer?.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                item.property?.title
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

            );

        });
    const handleReply = async (item) => {

        try {

            if (item.chat) {

                setSelectedChatId(item.chat);

                setActiveTab("chat");

                return;
            }

            const res = await axios.post(

                `${API_URL}/api/chat/start`,

                {
                    propertyId: item.property._id,
                    buyerId: item.buyer._id,
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            setSelectedChatId(res.data._id);

            setActiveTab("chat");

        } catch (error) {

            console.log(error);

        }

    };
    const deleteInquiry =
        async (id) => {

            if (
                !window.confirm(
                    "Delete Inquiry?"
                )
            ) {
                return;
            }

            try {

                await axios.delete(

                    `${API_URL}/api/inquiry/${id}`,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }

                );

                fetchInquiries();

            } catch (error) {

                console.log(error);

            }

        };
    return (
        <div className="inquiry-parent parent">

            <div className="inquiry-cont cont">

                <div className="page-header">

                    <h2>Property Inquiries</h2>

                    <input
                        type="text"
                        placeholder="Search Buyer / Property..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <div className="inquiry-list">

                    {filteredInquiry.length === 0 ? (

                        <div className="empty-inquiry">

                            <h3>No Inquiries Found</h3>

                            <p>
                                No buyers have sent inquiries yet.
                            </p>

                        </div>

                    ) : (

                        filteredInquiry.map((item) => (

                            <div
                                className="inquiry-card"
                                key={item._id}
                            >

                                <div className="top">

                                    <div className="buyer-info">

                                        {item.buyer?.profilePic ? (

                                            <img
                                                src={item.buyer.profilePic}
                                                alt={item.buyer.name}
                                            />

                                        ) : (

                                            <div className="buyer-avatar">

                                                {item.buyer?.name
                                                    ?.charAt(0)
                                                    .toUpperCase()}

                                            </div>

                                        )}

                                        <div>

                                            <h3>

                                                {item.buyer?.name || "Unknown Buyer"}

                                            </h3>

                                            <small>

                                                {item.buyer?.email}

                                            </small>

                                        </div>

                                    </div>

                                    <span
                                        className={`status ${item.status}`}
                                    >

                                        {item.status}

                                    </span>

                                </div>

                                <div className="property-box">

                                    <h4>

                                        🏠 {item.property?.title}

                                    </h4>

                                    <p>

                                        ₹
                                        {item.property?.price?.toLocaleString(
                                            "en-IN"
                                        )}

                                    </p>

                                </div>

                                <div className="message">

                                    {item.message}

                                </div>

                                <div className="bottom">

                                    <small>

                                        {new Date(
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
                                        )}

                                    </small>

                                    <div className="actions">

                                        <button
                                            className="view-btn"
                                            onClick={() =>
                                                navigate(`/property/${item.property._id}`)
                                            }
                                        >

                                            View Property

                                        </button>

                                        <button
                                            className="reply-btn"
                                            onClick={() =>
                                                handleReply(item)
                                            }
                                        >

                                            {item.chat
                                                ? "Open Chat"
                                                : "Reply"}

                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                deleteInquiry(
                                                    item._id
                                                )
                                            }
                                        >

                                            Delete

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div >
    );
}
export default Inquiry;