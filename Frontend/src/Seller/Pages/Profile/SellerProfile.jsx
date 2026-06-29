import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../../Config";
import "./SellerProfile.scss";

const SellerProfile = ({ user, setUser }) => {

    const token = localStorage.getItem("token");

    const [isEditing, setIsEditing] = useState(false);

    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        profilePic: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {

        try {

            const res = await axios.get(
                `${API_URL}/api/user/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser(res.data.user);

            setFormData({
                name: res.data.user.name,
                email: res.data.user.email,
                profilePic: res.data.user.profilePic,
            });

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleImage = (e) => {

        setImage(e.target.files[0]);

    };

    const updateProfile = async () => {

        try {

            const data = new FormData();

            data.append("name", formData.name);

            if (image) {

                data.append("profilePic", image);

            }

            const res = await axios.put(

                `${API_URL}/api/user/profile`,

                data,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }

            );

            setUser(res.data.user);

            setFormData({
                name: res.data.user.name,
                email: res.data.user.email,
                profilePic: res.data.user.profilePic,
            });

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            setImage(null);

            setIsEditing(false);

            alert("Profile Updated Successfully");

        } catch (error) {

            console.log(error);

        }

    };

    const cancelEdit = () => {

        setFormData({
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
        });

        setImage(null);

        setIsEditing(false);

    };

    return (

        <div className="profile-parent parent">

            <div className="profile-cont cont">

                <div className="profile-card">

                    <div className="profile-image">

                        {image ? (

                            <img
                                src={URL.createObjectURL(image)}
                                alt=""
                            />

                        ) : formData.profilePic ? (

                            <img
                                src={formData.profilePic}
                                alt={formData.name}
                            />

                        ) : (

                            <div className="avatar">

                                {formData.name?.charAt(0).toUpperCase()}

                            </div>

                        )}

                        {isEditing && (

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                            />

                        )}

                    </div>

                    <div className="profile-details">

                        <div className="profile-item">

                            <label>Name</label>

                            {isEditing ? (

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />

                            ) : (

                                <h3>{formData.name}</h3>

                            )}

                        </div>

                        <div className="profile-item">

                            <label>Email</label>

                            <input
                                type="email"
                                value={formData.email}
                                disabled
                            />

                        </div>

                        <div className="profile-buttons">

                            {!isEditing ? (

                                <button
                                    className="edit-btn"
                                    onClick={() => setIsEditing(true)}
                                >

                                    Edit Profile

                                </button>

                            ) : (

                                <>

                                    <button
                                        className="save-btn"
                                        onClick={updateProfile}
                                    >

                                        Save Changes

                                    </button>

                                    <button
                                        className="cancel-btn"
                                        onClick={cancelEdit}
                                    >

                                        Cancel

                                    </button>

                                </>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default SellerProfile;