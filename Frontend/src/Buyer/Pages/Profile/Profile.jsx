import React, {
    useEffect,
    useState,
} from "react";

import "./Profile.scss";

import {

    Form,

    Input,

    Button,

    Upload,

    Card,

    Row,

    Col,

} from "antd";

import {

    UploadOutlined,

} from "@ant-design/icons";

import axios from "axios";

import API_URL from "../../../Config";

import { toast } from "react-toastify";

const Profile = ({

    user,

    setUser,

}) => {

    const token = localStorage.getItem("token");

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState(null);

    useEffect(() => {

        if (user) {

            form.setFieldsValue({

                name: user.name,

                email: user.email,

                phone: user.phone,

            });

        }

    }, [user]);

    // ==========================
    // Upload Image
    // ==========================

    const beforeUpload = (file) => {

        setImage(file);

        return false;

    };

    // ==========================
    // Update Profile
    // ==========================

    const onFinish = async (values) => {

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("name", values.name);

            formData.append("phone", values.phone);

            if (image) {

                formData.append(

                    "profilePic",

                    image

                );

            }

            const res = await axios.put(

                `${API_URL}/api/user/profile`,

                formData,

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                        "Content-Type":

                            "multipart/form-data",

                    },

                }

            );

            localStorage.setItem(

                "user",

                JSON.stringify(res.data.user)

            );

            setUser(res.data.user);

            toast.success(

                "Profile Updated"

            );

        }

        catch (error) {

            console.log(error);

            toast.error(

                "Unable to update profile"

            );

        }

        finally {

            setLoading(false);

        }

    };
        return (

        <div className="buyer-profile-parent">

            <h2>

                My Profile

            </h2>

            <Card>

                <Form

                    form={form}

                    layout="vertical"

                    onFinish={onFinish}

                >

                    <Row gutter={20}>

                        <Col xs={24} md={8}>

                            <div className="profile-image">

                                {

                                    user?.profilePic ?

                                        (

                                            <img

                                                src={user.profilePic}

                                                alt={user.name}

                                            />

                                        )

                                        :

                                        (

                                            <div className="avatar">

                                                {

                                                    user?.name

                                                        ?.charAt(0)

                                                        ?.toUpperCase()

                                                }

                                            </div>

                                        )

                                }

                                <Upload

                                    beforeUpload={beforeUpload}

                                    showUploadList={false}

                                    maxCount={1}

                                >

                                    <Button

                                        icon={<UploadOutlined />}

                                    >

                                        Change Photo

                                    </Button>

                                </Upload>

                            </div>

                        </Col>

                        <Col xs={24} md={16}>

                            <Row gutter={16}>

                                <Col span={12}>

                                    <Form.Item

                                        label="Full Name"

                                        name="name"

                                        rules={[

                                            {

                                                required: true,

                                                message: "Please enter your name",

                                            },

                                        ]}

                                    >

                                        <Input />

                                    </Form.Item>

                                </Col>

                                <Col span={12}>

                                    <Form.Item

                                        label="Email"

                                        name="email"

                                    >

                                        <Input

                                            disabled

                                        />

                                    </Form.Item>

                                </Col>

                                <Col span={12}>

                                    <Form.Item

                                        label="Phone Number"

                                        name="phone"

                                        rules={[

                                            {

                                                required: true,

                                                message: "Please enter phone number",

                                            },

                                        ]}

                                    >

                                        <Input />

                                    </Form.Item>

                                </Col>

                            </Row>

                        </Col>

                    </Row>

                    <Button

                        type="primary"

                        htmlType="submit"

                        loading={loading}

                        style={{

                            marginTop: 20,

                            background: "var(--accent)",

                            borderColor: "var(--accent)",

                        }}

                    >

                        Update Profile

                    </Button>

                </Form>

            </Card>

        </div>

    );

};

export default Profile;