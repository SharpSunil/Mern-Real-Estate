import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import axios from "axios";
import "./BuyerChat.scss";

import API_URL from "../../../Config";

import {
    FaPaperPlane,
    FaImage,
} from "react-icons/fa";

const Chat = ({ selectedChatId }) => {

    const token = localStorage.getItem("token");

    const user = JSON.parse(
        localStorage.getItem("user")
    );

const [chat, setChat] = useState(null);

const [currentChatId, setCurrentChatId] = useState(
    selectedChatId || null
);

    const [message, setMessage] = useState("");

    const [image, setImage] = useState(null);

    const [preview, setPreview] = useState("");

    const [loading, setLoading] = useState(true);

    const messagesEndRef = useRef(null);

    const fileInputRef = useRef(null);

    // =============================
    // Fetch Chat
    // =============================

    const fetchChat = async () => {

        if (!selectedChatId) {

            setLoading(false);

            return;

        }

        try {

            const res = await axios.get(

                `${API_URL}/api/chat/${selectedChatId}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            setChat(res.data.chat);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchChat();

        if (!selectedChatId) return;

        const interval = setInterval(() => {

            fetchChat();

        }, 3000);

        return () => clearInterval(interval);

    }, [selectedChatId]);

 useEffect(() => {

    if (!chat) return;

    messagesEndRef.current?.scrollIntoView({

        behavior: "smooth",

    });

}, [chat?.messages?.length]);
    // =============================
    // Select Image
    // =============================

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setImage(file);

        setPreview(URL.createObjectURL(file));

    };

    // =============================
    // Send Message
    // =============================

    const sendMessage = async () => {

        if (!message.trim() && !image) return;

        try {

            const formData = new FormData();

            formData.append("chatId", selectedChatId);

            formData.append("text", message);

            if (image) {

                formData.append("image", image);

            }

            const res = await axios.post(

                `${API_URL}/api/chat/send`,

                formData,

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                        "Content-Type": "multipart/form-data",

                    },

                }

            );

            setChat(res.data.chat);

            setMessage("");

            setImage(null);

            setPreview("");

            if (fileInputRef.current) {

                fileInputRef.current.value = "";

            }

        }

        catch (error) {

            console.log(error);

        }

    };

    // =============================
    // Loading
    // =============================

    if (loading) {

        return (

            <div className="loading-chat">

                Loading Chat...

            </div>

        );

    }

    if (!selectedChatId) {

        return (

            <div className="no-chat-selected">

                <h2>Select a chat</h2>

                <p>

                    Choose any conversation from your inquiries.

                </p>

            </div>

        );

    }
    return (

        <div className="buyer-chat-parent">

            {/* ================= Chat Header ================= */}

            <div className="chat-header">

                <div className="left">

                    <div className="avatar">

                        {

                            chat?.seller?.name
                                ?.charAt(0)
                                ?.toUpperCase()

                        }

                    </div>

                    <div>

                        <h3>

                            {

                                chat?.seller?.name

                            }

                        </h3>

                        <p>

                            {

                                chat?.property?.title

                            }

                        </p>

                    </div>

                </div>

            </div>

            {/* ================= Messages ================= */}

            <div className="messages">

                {

                    chat?.messages?.length === 0 ?

                        (

                            <div className="empty-message">

                                No Messages Yet

                            </div>

                        )

                        :

                        (

                            chat.messages.map((msg) => {

                                const senderId =

                                    typeof msg.sender === "object"

                                        ?

                                        msg.sender._id

                                        :

                                        msg.sender;

                                const isMe =

                                    senderId?.toString()

                                    ===

                                    user?._id?.toString();

                                return (

                                    <div

                                        key={msg._id}

                                        className={`message-row ${isMe ? "me" : ""}`}

                                    >

                                        <div className="message-box">

                                            {

                                                msg.isDeleted ?

                                                    (

                                                        <i>

                                                            This message was deleted

                                                        </i>

                                                    )

                                                    :

                                                    (

                                                        <>

                                                            {

                                                                msg.image && (

                                                                    <img

                                                                        src={msg.image.url}

                                                                        alt=""

                                                                        className="chat-image"

                                                                    />

                                                                )

                                                            }

                                                            {

                                                                msg.text && (

                                                                    <p>

                                                                        {msg.text}

                                                                    </p>

                                                                )

                                                            }

                                                        </>

                                                    )

                                            }

                                            <span>

                                                {

                                                    new Date(

                                                        msg.createdAt

                                                    ).toLocaleTimeString(

                                                        "en-IN",

                                                        {

                                                            hour: "2-digit",

                                                            minute: "2-digit",

                                                        }

                                                    )

                                                }

                                            </span>

                                        </div>

                                    </div>

                                );

                            })

                        )

                }

                <div ref={messagesEndRef}></div>

            </div>

            {/* ================= Preview ================= */}

            {

                preview && (

                    <div className="preview-image">

                        <img

                            src={preview}

                            alt="preview"

                        />

                    </div>

                )

            }

            {/* ================= Footer ================= */}

            <div className="chat-footer">

                <input

                    type="file"

                    hidden

                    ref={fileInputRef}

                    accept="image/*"

                    onChange={handleImage}

                />

                <button

                    className="upload-btn"

                    onClick={() =>

                        fileInputRef.current.click()

                    }

                >

                    <FaImage />

                </button>

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

                    <FaPaperPlane />

                </button>

            </div>

        </div>

    );

};

export default Chat;