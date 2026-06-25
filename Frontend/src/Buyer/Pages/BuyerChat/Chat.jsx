import React, {
    useEffect,
    useState,
    useRef,
} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import API_URL from "../../../Config";

const Chat = () => {
    const { chatId } = useParams();

    const [chat, setChat] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const messagesEndRef = useRef(null);

    const firstLoad = useRef(true);
    const fetchChat = async () => {
        try {

            const res = await axios.get(
                `${API_URL}/api/chat/${chatId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setChat(res.data.chat);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        fetchChat();

        const interval = setInterval(() => {

            fetchChat();

        }, 3000);

        return () => clearInterval(interval);

    }, [chatId]);

    useEffect(() => {

        if (!chat) return;

        if (firstLoad.current) {

            firstLoad.current = false;

            return;

        }

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [chat?.messages]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        try {
            const res = await axios.post(
                `${API_URL}/api/chat/send`,
                {
                    chatId,
                    text: message,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setChat(res.data.chat);

            setMessage("");
        } catch (error) {
            console.log("Send Message Error:", error);
        }
    };

    if (loading) {
        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "100px",
                }}
            >
                <h2>Loading Chat...</h2>
            </div>
        );
    }

    return (
        <div
            style={{
                maxWidth: "1000px",
                margin: "50px auto",
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
                background: "#fff",
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: "20px",
                    background: "#0f172a",
                    color: "#fff",
                }}
            >
                <h2 style={{ marginBottom: "10px" }}>
                    {user?.role === "buyer"
                        ? `Seller : ${chat?.seller?.name || "Unknown"}`
                        : `Buyer : ${chat?.buyer?.name || "Unknown"}`}
                </h2>

                <p>
                    🏠 {chat?.property?.title}

                    <br />

                    ₹{chat?.property?.price?.toLocaleString("en-IN")}
                </p>
            </div>

            {/* Messages */}
            <div
                style={{
                    height: "500px",
                    overflowY: "auto",
                    padding: "20px",
                    background: "#f8fafc",
                }}
            >
               
                {chat?.messages?.length ? (
                    
                    chat.messages.map((msg) => {
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
                                style={{
                                    display: "flex",
                                    justifyContent: isMe
                                        ? "flex-end"
                                        : "flex-start",
                                    marginBottom: "15px",
                                }}
                            >
                                <div
                                    style={{
                                        background: isMe
                                            ? "#0d9488"
                                            : "#ffffff",
                                        color: isMe
                                            ? "#ffffff"
                                            : "#000000",
                                        padding: "12px 16px",
                                        borderRadius: "10px",
                                        maxWidth: "70%",
                                        boxShadow:
                                            "0 2px 10px rgba(0,0,0,0.08)",
                                    }}
                                >
                                    <div
                                        style={{
                                            marginBottom: "5px",
                                        }}
                                    >
                                        {msg.isDeleted ? (

                                            <i>This message was deleted</i>

                                        ) : (

                                            <>
                                                {msg.image && (
                                                    <img
                                                        src={msg.image}
                                                        alt=""
                                                        style={{
                                                            width: "220px",
                                                            borderRadius: "8px",
                                                            marginBottom: "10px",
                                                        }}
                                                    />
                                                )}

                                                {msg.text && (
                                                    <p
                                                        style={{
                                                            margin: 0,
                                                        }}
                                                    >
                                                        {msg.text}
                                                    </p>
                                                )}
                                            </>

                                        )}
                                    </div>

                                    <small
                                        style={{
                                            opacity: 0.7,
                                        }}
                                    >
                                        {msg.createdAt
                                            ? new Date(
                                                msg.createdAt
                                            ).toLocaleString()
                                            : ""}
                                    </small>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div
                        style={{
                            textAlign: "center",
                            marginTop: "100px",
                        }}
                    >
                        <h3>No messages yet.</h3>
                        <p>Start conversation.</p>
                    </div>
                )}

                 <div ref={messagesEndRef}></div>
            </div>

            {/* Input */}
            <div
                style={{
                    padding: "20px",
                    display: "flex",
                    gap: "10px",
                    borderTop: "1px solid #ddd",
                }}
            >
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                    style={{
                        flex: 1,
                        padding: "14px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                    }}
                />

                <button
                    onClick={sendMessage}
                    style={{
                        padding: "14px 25px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#0d9488",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: "600",
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;