import React, {
    useEffect,
    useState,
    useRef,
} from "react";

import axios from "axios";

import "./SellerChat.scss";

import API_URL from "../../../Config";

const SellerChat = ({ selectedChatId }) => {

    const token = localStorage.getItem("token");

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [loading, setLoading] = useState(false);

    const [chats, setChats] = useState([]);

    const [filteredChats, setFilteredChats] = useState([]);

    const [selectedChat, setSelectedChat] = useState(null);

    const [message, setMessage] = useState("");

    const [search, setSearch] = useState("");

    const messagesEndRef = useRef(null);
    const previousChatId = useRef(null);

    // ==========================
    // Fetch Chats
    // ==========================

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

            // Latest chat first

            const list = [...(res.data.chats || [])].sort(

                (a, b) =>

                    new Date(b.updatedAt) -

                    new Date(a.updatedAt)

            );

            setChats(list);

            setFilteredChats(list);

        }

        catch (error) {

            console.log(error);

        }

    };

    // ==========================
    // Load Selected Chat
    // ==========================

    const loadChat = async (chatId) => {

        if (!chatId) return;

        if (typeof chatId === "object") {

            chatId = chatId._id;

        }

        try {

            setLoading(true);

            const res = await axios.get(

                `${API_URL}/api/chat/${chatId}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            setSelectedChat(res.data.chat);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };


    // ==========================
    // Send Message
    // ==========================

    const sendMessage = async () => {

        if (!message.trim()) return;

        try {

            await axios.post(

                `${API_URL}/api/chat/send`,

                {
                    chatId: selectedChat._id,
                    text: message,
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            setMessage("");

            // Reload current chat

            await loadChat(selectedChat._id);

            // Refresh sidebar so latest chat comes first

            await fetchChats();

        }

        catch (error) {

            console.log(error);

        }

    };
    // ==========================
    // Initial Fetch
    // ==========================

    useEffect(() => {

        fetchChats();

    }, []);


    // ==========================
    // Auto Refresh Chat List
    // ==========================

    useEffect(() => {

        const interval = setInterval(() => {

            fetchChats();

        }, 3000);

        return () => clearInterval(interval);

    }, []);


    // ==========================
    // Open Chat From Inquiry
    // ==========================

    useEffect(() => {

        if (!selectedChatId) return;

        const chatId =
            typeof selectedChatId === "object"
                ? selectedChatId._id
                : selectedChatId;

        loadChat(chatId);

    }, [selectedChatId]);


    // ==========================
    // Refresh Current Chat
    // ==========================
    useEffect(() => {

        if (!selectedChat?._id) return;

        const interval = setInterval(async () => {

            try {

                const res = await axios.get(

                    `${API_URL}/api/chat/${selectedChat._id}`,

                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }

                );

                setSelectedChat((prev) => {

                    // Don't update state if nothing changed
                    if (
                        prev &&
                        JSON.stringify(prev.messages) ===
                        JSON.stringify(res.data.chat.messages)
                    ) {
                        return prev;
                    }

                    return res.data.chat;

                });

            } catch (err) {

                console.log(err);

            }

        }, 3000);

        return () => clearInterval(interval);

    }, [selectedChat?._id]);


    // ==========================
    // Search Chats
    // ==========================

    useEffect(() => {

        const filtered = chats.filter((chat) => {

            return (

                chat.buyer?.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

                ||

                chat.property?.title
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

            );

        });

        setFilteredChats(filtered);

    }, [search, chats]);


    // ==========================
    // Auto Scroll
    // ==========================
useEffect(() => {

    if (!selectedChat) return;

    if (previousChatId.current === selectedChat._id) return;

    previousChatId.current = selectedChat._id;

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            messagesEndRef.current?.scrollIntoView({

                behavior: "smooth",

                block: "end",

            });

        });

    });

}, [selectedChat]);

    // ==========================
    // Start JSX
    // ==========================

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
                                    chat.unreadForSeller || 0;

                                const isActive =
                                    selectedChat?._id === chat._id;

                                return (

                                    <div
                                        key={chat._id}
                                        className={`chat-user ${isActive ? "active" : ""}`}
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

                                                <div className="buyer-initial">

                                                    {chat.buyer?.name
                                                        ?.charAt(0)
                                                        .toUpperCase()}

                                                </div>

                                            )}

                                        </div>

                                        {/* Details */}

                                        <div className="details">

                                            <div className="topp">

                                                <h4>

                                                    {chat.buyer?.name}

                                                </h4>

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

                                            <small>

                                                🏠 {chat.property?.title}

                                            </small>

                                            <div className="bottom">

                                                <p>

                                                    {chat.lastMessage ||
                                                        "No messages"}

                                                </p>

                                                {unread > 0 && (

                                                    <div className="badge">

                                                        {unread}

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

                            <h2>

                                Select a conversation

                            </h2>

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
                                                alt={selectedChat.buyer?.name}
                                            />

                                        ) : (

                                            <span>

                                                {selectedChat.buyer?.name
                                                    ?.charAt(0)
                                                    .toUpperCase()}

                                            </span>

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

                                {loading ? (

                                    <div className="empty-message">

                                        Loading...

                                    </div>

                                ) : selectedChat.messages.length === 0 ? (

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
                                            senderId?.toString() ===
                                            user?._id?.toString();

                                        return (

                                            <div
                                                key={msg._id}
                                                className={`message-row ${isMe ? "me" : "other"}`}
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
                                                        ).toLocaleTimeString([], {

                                                            hour: "2-digit",

                                                            minute: "2-digit",

                                                        })}

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

};

export default SellerChat;