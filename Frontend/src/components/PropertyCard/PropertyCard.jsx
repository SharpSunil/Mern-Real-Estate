import React from "react";
import "./propertycard.scss";
import image from "../../assets/realestate.jpg";
import {
    FaRegHeart,
    FaHeart,
} from "react-icons/fa6";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { MdRemoveRedEye } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({
    property,
    view,
    isWishlisted = false,
    onWishlistClick,
}) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/property/${property._id}`);
    };

    const handleFavourite = (e) => {
        e.stopPropagation();

        try {
            console.log("Favourite clicked:", property._id);
        } catch (error) {
            console.error(error);
        }
    };

    const propertyImage =
        property?.images?.length > 0
            ? property.images[0].url
            : image;

    const formatPrice = (price) => {
        if (!price) return "₹0";

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className={`property-main-card ${view}`}>
            <div
                className="card"
                onClick={handleCardClick}
            >
                {/* Top Section */}
                <div className="top-card">
                    <div
                        className="bg-img"
                        style={{
                            backgroundImage: `url(${propertyImage})`,
                        }}
                    />

                    <div className="overlay"></div>

                    <div className="content">
                        <div className="btn1">
                            {property?.status
                                ? property.status.toUpperCase()
                                : "NEW"}
                        </div>

                        <div className="btn2">
                            <div className="icon">
                                <VscWorkspaceTrusted />
                            </div>
                            VERIFIED
                        </div>
                    </div>

                    <button
                        className={`like ${isWishlisted ? "active" : ""}`}
                        onClick={(e) => {

                            e.stopPropagation();

                            if (onWishlistClick) {

                                onWishlistClick(property._id);

                            }

                        }}
                    >

                        {
                            isWishlisted
                                ? <FaHeart />
                                : <FaRegHeart />
                        }

                    </button>

                    <div className="price">
                        {formatPrice(property?.price)}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="bottom-card">
                    <div className="first-box">
                        <div className="first">
                            {property?.propertyType
                                ?.replace("-", " ")
                                .toUpperCase()}
                        </div>

                        <div className="second">
                            <MdRemoveRedEye />
                            <span>
                                {property?.views || 0}
                            </span>
                        </div>
                    </div>

                    <div className="second-box">
                        <div
                            className="headingg"
                            title={property?.title}
                        >
                            {property?.title}
                        </div>

                        <div className="address">
                            <CiLocationOn />
                            <span>
                                {[property?.area, property?.city]
                                    .filter(Boolean)
                                    .join(", ")}
                            </span>
                        </div>
                    </div>

                    <div className="third-box">
                        <div className="one">
                            <div className="icon">
                                <IoHomeOutline />
                            </div>

                            <div className="num">
                                {property?.bhk || "-"}
                            </div>

                            <div className="dess">
                                BHK
                            </div>
                        </div>

                        <div className="one">
                            <div className="icon">
                                <FaUsers />
                            </div>

                            <div className="num">
                                {property?.bathrooms || "-"}
                            </div>

                            <div className="dess">
                                BATHS
                            </div>
                        </div>

                        <div className="one">
                            <div className="icon">
                                <FaCompressArrowsAlt />
                            </div>

                            <div className="num">
                                {property?.areaSize || "-"}
                            </div>

                            <div className="dess">
                                SQ FT
                            </div>
                        </div>
                    </div>

                    <div className="btns">
                        View Details
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;