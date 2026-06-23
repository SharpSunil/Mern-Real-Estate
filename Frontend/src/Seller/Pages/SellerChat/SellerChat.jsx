import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SellerChat.scss";
import API_URL from "../../../Config";

const SellerChat = () => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

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

            setChats(res.data);

            if (
                res.data.length > 0 &&
                !selectedChat
            ) {
                loadChat(res.data[0]._id);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const loadChat = async (chatId) => {
        try {
            const res = await axios.get(
                `${API_URL}/api/chat/${chatId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSelectedChat(res.data);
        } catch (error) {
            console.log(error);
        }
    };

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

            loadChat(selectedChat._id);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchChats();

        const interval = setInterval(() => {
            fetchChats();

            if (selectedChat?._id) {
                loadChat(selectedChat._id);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="seller-chat-parent">
            {/* Sidebar */}
            <div className="chat-sidebar">
                <div className="heading">
                    My Chats
                </div>

                {chats.map((chat) => (
                    <div
                        key={chat._id}
                        className={`chat-user ${
                            selectedChat?._id ===
                            chat._id
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            loadChat(chat._id)
                        }
                    >
                        <h4>
                            {chat.buyer?.name}
                        </h4>

                        <p>
                            {
                                chat.property
                                    ?.title
                            }
                        </p>
                    </div>
                ))}
            </div>

            {/* Chat Window */}
            <div className="chat-window">
                {selectedChat ? (
                    <>
                        <div className="chat-header">
                            <h3>
                                {
                                    selectedChat
                                        .buyer
                                        ?.name
                                }
                            </h3>

                            <span>
                                {
                                    selectedChat
                                        .property
                                        ?.title
                                }
                            </span>
                        </div>

                        <div className="chat-body">
                            {selectedChat.messages?.map(
                                (msg) => (
                                    <div
                                        key={
                                            msg._id
                                        }
                                        className="message seller"
                                    >
                                        {
                                            msg.text
                                        }
                                    </div>
                                )
                            )}
                        </div>

                        <div className="chat-footer">
                            <input
                                type="text"
                                placeholder="Type message..."
                                value={
                                    message
                                }
                                onChange={(
                                    e
                                ) =>
                                    setMessage(
                                        e
                                            .target
                                            .value
                                    )
                                }
                                onKeyDown={(
                                    e
                                ) => {
                                    if (
                                        e.key ===
                                        "Enter"
                                    ) {
                                        sendMessage();
                                    }
                                }}
                            />

                            <button
                                onClick={
                                    sendMessage
                                }
                            >
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="empty-chat">
                        Select Chat
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellerChat;