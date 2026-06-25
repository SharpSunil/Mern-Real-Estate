import React, {
    useEffect,
    useState,
    useRef,
} from "react";
import axios from "axios";
import "./SellerChat.scss";
import API_URL from "../../../Config";
const SellerChat = () => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] =
        useState(false);
    const token = localStorage.getItem("token");
    const messagesEndRef = useRef(null);
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

            setChats(res.data || []);

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

            setLoading(true);

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

        } finally {

            setLoading(false);

        }

    };
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [selectedChat?.messages]);

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
    }, [selectedChat?._id]);

    return (

        <>
            <h2 className="chat-title">Seller Messages</h2>

            <div className="seller-chat-parent">

                {/* ===========================
          Sidebar
      ============================ */}

                <div className="chat-sidebar">

                    <div className="sidebar-header">
                        <h3>My Chats</h3>

                        <input
                            type="text"
                            placeholder="Search Buyer..."
                        />
                    </div>

                    <div className="chat-list">

                        {chats.map((chat) => (

                            <div
                                key={chat._id}
                                className={`chat-user ${selectedChat?._id === chat._id
                                    ? "active"
                                    : ""
                                    }`}
                                onClick={() =>
                                    loadChat(chat._id)
                                }
                            >

                                <div className="avatar">

                                    {chat.buyer?.name
                                        ?.charAt(0)
                                        ?.toUpperCase()}

                                </div>

                                <div className="user-details">

                                    <h4>
                                        {chat.buyer?.name}
                                    </h4>

                                    <p>
                                        {chat.property?.title}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                {/* ===========================
            Chat Window
      ============================ */}

                <div className="chat-window">

                    {selectedChat ? (

                        <>

                            {/* ===========================
                  Header
            ============================ */}

                            <div className="chat-header">

                                <div className="header-user">
                                    <div className="avatar large">
                                        {selectedChat?.buyer?.name?.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="user-info">
                                        <h3>{selectedChat?.buyer?.name}</h3>

                                        <p>
                                            Interested in{" "}
                                            <strong>{selectedChat?.property?.title}</strong>
                                        </p>
                                    </div>
                                </div>

                            </div>

                            <div className="chat-body">

                                {loading ? (

                                    <div className="loading-chat">
                                        Loading Messages...
                                    </div>

                                ) : (

                                    <>

                                        {selectedChat.messages?.length === 0 ? (

                                            <div className="empty-message">

                                                No Messages Yet

                                            </div>

                                        ) : (

                                            selectedChat.messages?.map((msg) => {

                                                const user = JSON.parse(localStorage.getItem("user"));

                                                const isMe =
                                                    (msg.sender?._id || msg.sender) === user._id;

                                                return (

                                                    <div
                                                        key={msg._id}
                                                        className={`message-row ${isMe ? "right" : "left"
                                                            }`}
                                                    >
                                                        <div
                                                            className={`message ${isMe ? "sender" : "receiver"
                                                                }`}
                                                        >
                                                            <p>{msg.text}</p>

                                                            <small>
                                                                {new Date(msg.createdAt).toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </small>
                                                        </div>
                                                    </div>

                                                );

                                            })

                                        )}

                                        <div ref={messagesEndRef}></div>

                                    </>

                                )}

                            </div>

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
                                    className="send-btn"
                                    onClick={sendMessage}
                                >
                                    Send
                                </button>

                            </div>

                        </>

                    ) : (

                        <div className="empty-chat">

                            <h2>
                                No Conversation Selected
                            </h2>

                            <p>
                                Please select a buyer from the left.
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </>
    );

};

export default SellerChat;