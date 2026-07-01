import React, {
    useEffect,
    useState,
} from "react";

import "./Inquiry.scss";

import axios from "axios";

import API_URL from "../../../Config";

import {
    Table,
    Tag,
    Space,
    Button,
    Popconfirm,
    Image,
} from "antd";

import {
    MessageOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

import { toast } from "react-toastify";

const Inquiry = ({
    setActiveTab,
    setSelectedChatId,
}) => {

    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([]);

    // =========================================
    // Fetch Buyer Inquiries
    // =========================================

    const fetchInquiries = async () => {

        try {

            setLoading(true);

            const res = await axios.get(

                `${API_URL}/api/inquiry/buyer`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            setData(res.data.inquiries);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load inquiries.");

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchInquiries();

    }, []);

    // =========================================
    // Delete Inquiry
    // =========================================

    const deleteInquiry = async (id) => {

        try {

            await axios.delete(

                `${API_URL}/api/inquiry/${id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            toast.success("Inquiry deleted");

            fetchInquiries();

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to delete inquiry");

        }

    };

    // =========================================
    // Open Chat
    // =========================================

    const openChat = (record) => {

        if (!record.chat) {

            toast.info("Chat not created yet.");

            return;

        }

        setSelectedChatId(record.chat._id);

        setActiveTab("chat");

    };
    // =========================================
    // Table Columns
    // =========================================

    const columns = [

        {
            title: "Property",
            key: "property",
            width: 320,

            render: (_, record) => (

                <div className="property-info">

                    <Image
                        width={90}
                        height={70}
                        style={{
                            objectFit: "cover",
                            borderRadius: 8,
                        }}
                        src={
                            record.property?.images?.length
                                ? record.property.images[0].url
                                : "/no-image.png"
                        }
                        fallback="/no-image.png"
                        preview={false}
                    />

                    <div className="details">

                        <h4>

                            {record.property?.title}

                        </h4>

                        <p>

                            ₹{

                                Number(
                                    record.property?.price || 0
                                ).toLocaleString("en-IN")

                            }

                        </p>

                    </div>

                </div>

            ),

        },

        {
            title: "Seller",

            dataIndex: ["seller", "name"],

            key: "seller",

            width: 170,
        },

        {
            title: "Message",

            dataIndex: "message",

            key: "message",

            ellipsis: true,
        },

        {
            title: "Status",

            dataIndex: "status",

            key: "status",

            width: 130,

            render: (status) => {

                let color = "gold";

                if (status === "accepted")
                    color = "green";

                if (status === "rejected")
                    color = "red";

                if (status === "replied")
                    color = "blue";

                return (

                    <Tag color={color}>

                        {status.toUpperCase()}

                    </Tag>

                );

            },

        },

        {
            title: "Date",

            dataIndex: "createdAt",

            width: 140,

            render: (date) =>

                new Date(date).toLocaleDateString(
                    "en-IN"
                ),

        },

        {
            title: "Actions",

            width: 150,

            render: (_, record) => (

                <Space>

                    <Button

                        type="primary"

                        icon={<MessageOutlined />}

                        onClick={() =>
                            openChat(record)
                        }

                    />

                    <Popconfirm

                        title="Delete Inquiry?"

                        okText="Yes"

                        cancelText="No"

                        onConfirm={() =>
                            deleteInquiry(record._id)
                        }

                    >

                        <Button

                            danger

                            icon={<DeleteOutlined />}

                        />

                    </Popconfirm>

                </Space>

            ),

        },

    ];
    return (

        <div className="buyer-inquiry-parent">

            <div className="top">

                <div>

                    <h2>

                        My Inquiries

                    </h2>

                    <p>

                        View all inquiries you've sent to sellers.

                    </p>

                </div>

            </div>

            <Table

                rowKey="_id"

                columns={columns}

                dataSource={data}

                loading={loading}

                bordered

                pagination={{

                    pageSize: 10,

                    showSizeChanger: false,

                }}

                scroll={{

                    x: 1000,

                }}

                locale={{

                    emptyText: (

                        <div
                            style={{
                                padding: "40px",
                            }}
                        >

                            No inquiries found.

                        </div>

                    ),

                }}

            />

        </div>

    );

};

export default Inquiry;