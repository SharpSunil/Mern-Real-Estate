import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs'
import "./property.scss"
import { FiMapPin } from "react-icons/fi"; import { FaCompress, FaRegHeart, FaHeart, FaUsers, } from "react-icons/fa6";
import image from "../../../assets/realestate.jpg";
import { PiSealCheckFill } from "react-icons/pi";
import { GiFlatPlatform } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate, useParams } from 'react-router-dom';
import API_URL from '../../../Config';
import axios from 'axios';
const Property = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [showInquiry, setShowInquiry] = useState(false);

    const [isWishlisted, setIsWishlisted] = useState(false);

    const [inquiryMessage, setInquiryMessage] = useState("");

    const [sendingInquiry, setSendingInquiry] = useState(false);

    const handleSendInquiry = async () => {

        if (!inquiryMessage.trim()) {
            alert("Please write your inquiry.");
            return;
        }

        try {

            setSendingInquiry(true);

            const token = localStorage.getItem("token");

            const res = await axios.post(

                `${API_URL}/api/inquiry`,

                {
                    propertyId: property._id,
                    message: inquiryMessage,
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            alert("Inquiry sent successfully.");

            setInquiryMessage("");

            setShowInquiry(false);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Unable to send inquiry."
            );

        } finally {

            setSendingInquiry(false);

        }

    };


    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await axios.get(
                    `${API_URL}/api/property/${id}`
                );

                setProperty(res.data.property);

                console.log(
                    "Property:",
                    res.data.property
                );
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);
    useEffect(() => {

        if (property) {

            checkWishlist();

        }

    }, [property]);

    if (loading) {
        return <h2>Loading Property...</h2>;
    }

    if (!property) {
        return <h2>Property Not Found</h2>;
    }
    const mainImage = property?.images?.[0]?.url || image;
    const secondImage = property?.images?.[1]?.url || mainImage;
    const thirdImage = property?.images?.[2]?.url || mainImage;


    const user = JSON.parse(localStorage.getItem("user"));
    console.log(property.seller, "fdslkjklsdflkjsdfkljsdjkfl klsdfjklsdjf sdflkjklsdjf");

    const handleStartChat = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const res = await axios.post(
                `${API_URL}/api/chat/start`,
                {
                    propertyId: property._id,
                    sellerId: property.seller._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Chat Created:", res.data);

            navigate("/buyer-dashboard", {
                state: {
                    activeTab: "chat",
                    selectedChatId: res.data._id,
                },
            });
        } catch (error) {
            console.error(
                "Error starting chat:",
                error.response?.data || error.message
            );
        }
    };

    const handleWishlist = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {

                navigate("/login");

                return;

            }

            if (isWishlisted) {

                await axios.delete(

                    `${API_URL}/api/wishlist/${property._id}`,

                    {

                        headers: {

                            Authorization: `Bearer ${token}`,

                        },

                    }

                );

                setIsWishlisted(false);

            }

            else {

                await axios.post(

                    `${API_URL}/api/wishlist/${property._id}`,

                    {},

                    {

                        headers: {

                            Authorization: `Bearer ${token}`,

                        },

                    }

                );

                setIsWishlisted(true);

            }

        }

        catch (error) {

            console.log(error);

        }

    };

    const checkWishlist = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token || !property) return;

            const res = await axios.get(

                `${API_URL}/api/wishlist`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            const wishlist = res.data.data;

            const exists = wishlist.some((item) => {

                const propertyId =
                    item.property?._id?.toString() ||
                    item.property?.toString();

                return propertyId === property._id.toString();

            });

            setIsWishlisted(exists);

        }

        catch (error) {

            console.log(error);

        }

    };



    return (
        <>
            <div className="property-parent parent">
                <div className="property-cont cont">
                    <Breadcrumbs
                        items={[
                            { label: "Home", path: "/" },
                            { label: "Properties", path: "/properties" },
                            { label: "Property Details" },
                        ]}
                    />

                    {/* //Page code start here  */}
                    <div className="image-grid">
                        <div
                            className="left-img"
                            style={{
                                backgroundImage: `url(${mainImage})`,
                            }}
                        />

                        <div className="right-img-box">
                            <div
                                className="right-img1"
                                style={{
                                    backgroundImage: `url(${secondImage})`,
                                }}
                            />

                            <div
                                className="right-img2"
                                style={{
                                    backgroundImage: `url(${thirdImage})`,
                                }}
                            />
                        </div>
                    </div>


                    <div className="first-new-box">
                        <div className="left-side-box">
                            <div className="sec-indicator">{property.status?.toUpperCase()}</div>
                            <div className="heading">{property.title} </div>
                            <div className="address"><FiMapPin /><span>{property.area}, {property.city}</span></div>
                            <div
                                className="like"
                                onClick={handleWishlist}
                            >

                                {

                                    isWishlisted ?

                                        (

                                            <FaHeart
                                                color="red"
                                            />

                                        )

                                        :

                                        (

                                            <FaRegHeart />

                                        )

                                }

                            </div>
                            <div className="main-card-box">
                                <div className="card"><div className="icon"><IoHomeOutline /></div>
                                    <div className="number">{property.bhk}</div>
                                    <div className="desc">BHK</div>
                                </div>
                                <div className="card"><div className="icon"><FaUsers /></div>
                                    <div className="number">{property.bathrooms}</div>
                                    <div className="desc">Bathrooms</div>
                                </div>
                                <div className="card"><div className="icon"><FaCompress /></div>
                                    <div className="number">{property.areaSize}</div>
                                    <div className="desc">SQ FT</div>
                                </div>
                                <div className="card"><div className="icon"><GiFlatPlatform /></div>
                                    <div className="number">{property.propertyType}</div>
                                    <div className="desc">TYPE</div>
                                </div>

                            </div>
                            <div className="new-desc-box">
                                <h4>Description</h4>
                                <p>{property.description}</p>
                            </div>
                            <div className="amenities-box">
                                <h4>Amenities</h4>
                                <div className="amenities-list">
                                    <ul>
                                        {Array.isArray(property.amenities) &&
                                            property.amenities.map((item, index) => (
                                                <li key={index}>
                                                    <div className="icon">
                                                        <PiSealCheckFill />
                                                    </div>
                                                    {item}
                                                </li>
                                            ))}
                                    </ul>

                                </div>


                            </div>
                        </div>
                        <div className="right-side-box">
                            <div className="first-box">
                                <h5>LISTING PRICE</h5>
                                <div className="price">₹{Number(property.price).toLocaleString("en-IN")}</div>
                                <p>{property.status}</p>
                            </div>
                            <div className="second-box">
                                <div className="top">

                                    <div className="name">
                                        {property.seller?.name
                                            ? property.seller.name.substring(0, 2).toUpperCase()
                                            : "NA"}
                                    </div>

                                    <div className="user">
                                        {property.seller?.name}

                                        {property.seller?.isApproved ? (
                                            <span className="verified">
                                                <PiSealCheckFill /> Verified Seller
                                            </span>
                                        ) : (
                                            <span className="not-verified">
                                                Seller Not Verified
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="middle">

                                    {user && user.role === "buyer" ? (

                                        <>
                                            <div
                                                className="chat"
                                                onClick={handleStartChat}
                                            >
                                                <BiSolidMessageSquareDetail />
                                                <span>Chat</span>
                                            </div>

                                            <div
                                                className="inquire"
                                                onClick={() => setShowInquiry(true)}
                                            >
                                                Inquire
                                            </div>
                                        </>

                                    ) : (

                                        <>
                                            <div className="chat disabled">
                                                <BiSolidMessageSquareDetail />
                                                <span>Chat</span>
                                            </div>

                                            <div className="inquire disabled">
                                                Inquire
                                            </div>
                                        </>

                                    )}

                                </div>
                                <div className="last-box">
                                    {!user ? (
                                        <>
                                            <p>Please login as a buyer to send inquiries.</p>

                                            <Link to="/login" className="btn">
                                                Login
                                            </Link>
                                        </>
                                    ) : user.role === "buyer" ? (
                                        <>
                                            <p>You can directly contact this seller.</p>

                                            <div
                                                className="btn"
                                                onClick={handleStartChat}
                                            >
                                                Send Message
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p>Only buyers can contact sellers.</p>
                                        </>
                                    )}
                                </div>
                                {
                                    showInquiry && (

                                        <div className="inquiry-modal">

                                            <div className="inquiry-box">

                                                <h3>

                                                    Send Inquiry

                                                </h3>

                                                <textarea

                                                    placeholder="Write your inquiry..."

                                                    rows={5}

                                                    value={inquiryMessage}

                                                    onChange={(e) =>

                                                        setInquiryMessage(
                                                            e.target.value
                                                        )

                                                    }

                                                />

                                                <div className="buttons">

                                                    <button
                                                        className="cancel"
                                                        onClick={() =>
                                                            setShowInquiry(false)
                                                        }
                                                    >

                                                        Cancel

                                                    </button>

                                                    <button
                                                        className="send"
                                                        onClick={handleSendInquiry}
                                                    >

                                                        {sendingInquiry
                                                            ? "Sending..."
                                                            : "Send Inquiry"}

                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                }
                            </div>
                        </div>


                    </div>

                    {/* //Bottom side second -new - box */}
                    <div className="second-main">
                        <div className="heading">Property Details</div>
                        <div className="card">
                            <div className="idd">Property ID</div>
                            <div className="added-on">{property._id} <span>Added On</span></div>
                            <div className="date">{property.createdAt ? new Date(property.createdAt).toLocaleDateString() : "-"}</div>
                        </div>
                        <div className="card">
                            <div className="idd">Property Type</div>
                            <div className="added-on">{property.propertyType} <span>Status</span></div>
                            <div className="date">{property.status}</div>
                        </div>
                    </div>
                    {/* //Last Listing section  */}
                    <div className="last-third">
                        <div className="top">
                            <div className="headings">Similar Properties <span>Listing you might like in Bengaluru.</span></div>
                            <Link to="#" className="list-btn">All Listing <span><FaArrowRightLong /></span></Link>
                        </div>
                        <div className="bottom">
                            <p>No similar properties found in this location.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Property
