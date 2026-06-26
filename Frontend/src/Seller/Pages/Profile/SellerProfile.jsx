import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../../Config";
import "./SellerProfile.scss";

const SellerProfile = () => {

    const token = localStorage.getItem("token");

    const [user, setUser] = useState({});

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

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="profile-parent parent">

            <div className="profile-cont cont">

                <h2>My Profile</h2>

                <div className="profile-card">

                    <div className="profile-image">

                        {user.profilePic ? (

                            <img
                                src={user.profilePic}
                                alt={user.name}
                            />

                        ) : (

                            <div className="avatar">

                                {user.name?.charAt(0).toUpperCase()}

                            </div>

                        )}

                    </div>

                    <div className="profile-details">

                        <div className="profile-item">

                            <label>Name</label>

                            <h3>{user.name}</h3>

                        </div>

                        <div className="profile-item">

                            <label>Email Address</label>

                            <p>{user.email}</p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default SellerProfile;