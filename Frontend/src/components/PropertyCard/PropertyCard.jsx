import React from "react";
import "./propertycard.scss"
import image from "../../assets/realestate.jpg";
import { FaRegHeart } from "react-icons/fa6";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { MdRemoveRedEye } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/property/${property._id}`);
    };

    const handleFavourite = async (e) => {
        e.stopPropagation();

        try {
            console.log("Favourite clicked:", property._id);

            // API Integration Later
            // await axios.post("/api/favourite", {
            //   propertyId: property._id,
            // });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="property-main-card">
            <div className="card" onClick={handleCardClick}>
                <div className="top-card">
                    <div
                        className="bg-img"
                        style={{ backgroundImage: `url(${image})` }}
                    />

                    <div className="overlay"></div>

                    <div className="content">
                        <div className="btn1">NEW</div>

                        <div className="btn2">
                            <div className="icon">
                                <VscWorkspaceTrusted />
                            </div>
                            VERIFIED
                        </div>
                    </div>

                    <button
                        className="like"
                        onClick={handleFavourite}
                        type="button"
                    >
                        <FaRegHeart />
                    </button>

                    <div className="price">{property.price}</div>
                </div>

                <div className="bottom-card">
                    <div className="first-box">
                        <div className="first">{property.type}</div>

                        <div className="second">
                            <MdRemoveRedEye />
                            <span>{property.views}</span>
                        </div>
                    </div>

                    <div className="second-box">
                        <div className="headingg">{property.title}</div>


                        <div className="address">
                            <CiLocationOn />
                            <span>{property.address}</span>
                        </div>
                    </div>

                    <div className="third-box">
                        <div className="one">
                            <div className="icon">
                                <IoHomeOutline />
                            </div>

                            <div className="num">{property.beds}</div>

                            <div className="dess">BEDS</div>
                        </div>

                        <div className="one">
                            <div className="icon">
                                <FaUsers />
                            </div>

                            <div className="num">{property.baths}</div>

                            <div className="dess">BATHS</div>
                        </div>

                        <div className="one">
                            <div className="icon">
                                <FaCompressArrowsAlt />
                            </div>

                            <div className="num">{property.area}</div>

                            <div className="dess">SQ FT</div>
                        </div>
                    </div>

                    <div className="btns">View Details</div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;