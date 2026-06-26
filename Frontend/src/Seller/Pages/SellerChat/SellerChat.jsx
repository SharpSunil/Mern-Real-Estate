import React, {
    useEffect,
    useState,
    useRef,
} from "react";
import {
    useParams,
} from "react-router-dom";

import axios from "axios";

import "./SellerChat.scss";

import API_URL from "../../../Config";

const SellerChat = () => {

    const token = localStorage.getItem("token");

    const user = JSON.parse(
        localStorage.getItem("user")
    );
    const { chatId } = useParams();

    const [loading, setLoading] =
        useState(false);

    const [chats, setChats] =
        useState([]);

    const [filteredChats, setFilteredChats] =
        useState([]);

    const [selectedChat, setSelectedChat] =
        useState(null);

    const [message, setMessage] =
        useState("");

    const [search, setSearch] =
        useState("");

    const messagesEndRef =
        useRef(null);

    const firstLoad =
        useRef(true);

    //============================
    // Fetch Chats
    //============================

    const fetchChats = async () => {

        try {

            const res = await axios.get(
                `${API_URL}/api/chat/user`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const list =
                res.data.chats || [];

            setChats(list);

            setFilteredChats(list);

            if (
                list.length > 0 &&
                !selectedChat && 
                !chatId
            ) {
                loadChat(list[0]._id);
            }

        } catch (error) {

            console.log(error);

        }

    };

    //============================
    // Load Chat
    //============================

    const loadChat = async (
        chatId
    ) => {

        try {

            firstLoad.current = true;

            setLoading(true);

            const res = await axios.get(
                `${API_URL}/api/chat/${chatId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setSelectedChat(
                res.data.chat
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    //============================
    // Search
    //============================

    useEffect(() => {

        const filtered =
            chats.filter((chat) => {

                return (

                    chat.buyer?.name
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )

                    ||

                    chat.property?.title
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )

                );

            });

        setFilteredChats(
            filtered
        );

    }, [search, chats]);

    //============================
    // Send Message
    //============================

    const sendMessage =
        async () => {

            if (!message.trim())
                return;

            try {

                await axios.post(

                    `${API_URL}/api/chat/send`,

                    {
                        chatId:
                            selectedChat._id,

                        text: message,
                    },

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }

                );

                setMessage("");

                loadChat(
                    selectedChat._id
                );

                fetchChats();

            } catch (error) {

                console.log(error);

            }

        };

    //============================
    // Auto Scroll
    //============================

    useEffect(() => {

        if (!selectedChat)
            return;

        if (
            firstLoad.current
        ) {

            firstLoad.current =
                false;

            return;

        }

        messagesEndRef.current
            ?.scrollIntoView({

                behavior:
                    "smooth",

                block: "end",

            });

    }, [
        selectedChat?.messages,
    ]);

    //============================
    // Initial Fetch
    //============================

   useEffect(() => {

    fetchChats();

    if (chatId) {

        loadChat(chatId);

    }

    const interval = setInterval(() => {

        fetchChats();

        if (chatId) {

            loadChat(chatId);

        } else if (selectedChat?._id) {

            loadChat(selectedChat._id);

        }

    }, 3000);

    return () => clearInterval(interval);

}, [chatId, selectedChat?._id]);
    return (
        <div className="seller-chat-parent parent">
            <h2>Buyer Chats</h2>
            <div className="seller-chat-cont cont">

                {/* ================= Sidebar ================= */}

                <div className="chat-sidebar">

                    <div className="sidebar-header">



                        <input
                            type="text"
                            placeholder="Search buyer or property..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                    <div className="chat-users">

                        {filteredChats.length === 0 ? (

                            <div className="empty-sidebar">

                                No Chats Found

                            </div>

                        ) : (

                            filteredChats.map((chat) => {

                                const unread =
                                    chat.unreadForSeller;

                                return (

                                    <div
                                        key={chat._id}
                                        className={`chat-user ${selectedChat?._id ===
                                            chat._id
                                            ? "active"
                                            : ""
                                            }`}
                                        onClick={() =>
                                            loadChat(chat._id)
                                        }
                                    >

                                        {/* Avatar */}

                                        <div className="avatar">

                                            {chat.buyer?.profilePic ? (

                                                <img
                                                    src={chat.buyer.profilePic}
                                                    alt={chat.buyer?.name}
                                                    className="buyer-profile"
                                                />

                                            ) : (

                                                <span className="buyer-initial">
                                                    {chat.buyer?.name
                                                        ?.charAt(0)
                                                        .toUpperCase()}
                                                </span>

                                            )}
                                            <h4>{
                                                chat.buyer
                                                    ?.name
                                            }</h4>




                                        </div>

                                        {/* Details */}

                                        <div className="details">

                                            <div className="topp">

                                                <small>

                                                    🏠{" "}
                                                    {
                                                        chat.property
                                                            ?.title
                                                    }

                                                </small>
                                                <span>

                                                    {new Date(
                                                        chat.updatedAt
                                                    ).toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
                                                        }
                                                    )}

                                                </span>

                                            </div>



                                            <div className="bottom">

                                                <p>

                                                    {chat.lastMessage ||
                                                        "No messages"}

                                                </p>

                                                {unread > 0 && (

                                                    <div className="badge">

                                                        {
                                                            unread
                                                        }

                                                    </div>

                                                )}

                                            </div>

                                        </div>

                                    </div>

                                );

                            })

                        )}

                    </div>

                </div>

                {/* ================= Chat Window ================= */}

                <div className="chat-window">

                    {!selectedChat ? (

                        <div className="no-chat-selected">

                            <h2>Select a conversation</h2>

                            <p>
                                Select any buyer from the left to start chatting.
                            </p>

                        </div>

                    ) : (

                        <>

                            {/* ================= Header ================= */}

                            <div className="chat-header">

                                <div className="left">

                                    <div className="avatar">

                                        {selectedChat.buyer?.profilePic ? (

                                            <img
                                                src={selectedChat.buyer.profilePic}
                                                alt=""
                                            />

                                        ) : (

                                            selectedChat.buyer?.name
                                                ?.charAt(0)
                                                .toUpperCase()

                                        )}

                                    </div>

                                    <div>

                                        <h3>

                                            {selectedChat.buyer?.name}

                                        </h3>

                                        <small>

                                            🏠 {selectedChat.property?.title}

                                        </small>

                                    </div>

                                </div>

                            </div>

                            {/* ================= Messages ================= */}

                            <div className="messages">

                                {selectedChat.messages.length === 0 ? (

                                    <div className="empty-message">

                                        Start your conversation.

                                    </div>

                                ) : (

                                    selectedChat.messages.map((msg) => {

                                        const senderId =
                                            typeof msg.sender === "object"
                                                ? msg.sender._id
                                                : msg.sender;

                                        const isMe =
                                            senderId.toString() ===
                                            user._id.toString();

                                        return (

                                            <div
                                                key={msg._id}
                                                className={`message-row ${isMe ? "me" : "other"
                                                    }`}
                                            >

                                                <div className="message-box">

                                                    {msg.isDeleted ? (

                                                        <i>

                                                            This message was deleted

                                                        </i>

                                                    ) : (

                                                        <>

                                                            {msg.image && (

                                                                <img
                                                                    src={msg.image}
                                                                    alt=""
                                                                />

                                                            )}

                                                            {msg.text && (

                                                                <p>

                                                                    {msg.text}

                                                                </p>

                                                            )}

                                                        </>

                                                    )}

                                                    <span>

                                                        {new Date(
                                                            msg.createdAt
                                                        ).toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            }
                                                        )}

                                                    </span>

                                                </div>

                                            </div>

                                        );

                                    })

                                )}

                                <div ref={messagesEndRef}></div>

                            </div>

                            {/* ================= Footer ================= */}

                            <div className="chat-footer">

                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(e.target.value)
                                    }
                                    onKeyDown={(e) => {

                                        if (e.key === "Enter") {

                                            sendMessage();

                                        }

                                    }}
                                />

                                <button
                                    onClick={sendMessage}
                                >

                                    Send

                                </button>

                            </div>

                        </>

                    )}

                </div>

            </div>

        </div>
    );
}

export default SellerChat
