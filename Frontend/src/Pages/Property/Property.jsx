import React from 'react'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import "./property.scss"
import { FiMapPin } from "react-icons/fi";
import { FaCompress, FaRegHeart, FaUsers } from "react-icons/fa6";
import image from "../../assets/realestate.jpg";
import { PiSealCheckFill } from "react-icons/pi";
import { GiFlatPlatform } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Property = () => {
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
                            style={{ backgroundImage: `url(${image})` }}
                        />

                        <div className="right-img-box">
                            <div
                                className="right-img1"
                                style={{ backgroundImage: `url(${image})` }}
                            />

                            <div
                                className="right-img2"
                                style={{ backgroundImage: `url(${image})` }}
                            />
                        </div>
                    </div>
                    <div className="first-new-box">
                        <div className="left-side-box">
                            <div className="sec-indicator">PREMIUM LISTING</div>
                            <div className="heading">Orchid Sunrize Heights </div>
                            <div className="address"><FiMapPin /><span>Baner Road, Opp. Orchid School, Baner, 411045, Pune, India</span></div>
                            <div className="like"><FaRegHeart /></div>
                            <div className="main-card-box">
                                <div className="card"><div className="icon"><IoHomeOutline /></div>
                                    <div className="number">4</div>
                                    <div className="desc">BEDROOMS</div>
                                </div>
                                <div className="card"><div className="icon"><FaUsers /></div>
                                    <div className="number">4</div>
                                    <div className="desc">BEDROOMS</div>
                                </div>
                                <div className="card"><div className="icon"><FaCompress /></div>
                                    <div className="number">4</div>
                                    <div className="desc">BEDROOMS</div>
                                </div>
                                <div className="card"><div className="icon"><GiFlatPlatform /></div>
                                    <div className="number">4</div>
                                    <div className="desc">BEDROOMS</div>
                                </div>

                            </div>
                            <div className="new-desc-box">
                                <h4>Description</h4>
                                <p>Spacious high-rise close to IT hubs and metro connectivity. Offers well-planned layouts with premium flooring and wide windows. The society includes landscaped gardens and recreational areas, making it ideal for families.</p>
                            </div>
                            <div className="amenities-box">
                                <h4>Amenities</h4>
                                <div className="amenities-list">
                                    <ul>
                                        <li>
                                            <div className="icon"><PiSealCheckFill /></div>Parking
                                        </li>
                                        <li>
                                            <div className="icon"><PiSealCheckFill /></div>Parking
                                        </li>
                                        <li>
                                            <div className="icon"><PiSealCheckFill /></div>Parking
                                        </li>
                                        <li>
                                            <div className="icon"><PiSealCheckFill /></div>Parking
                                        </li>
                                        <li>
                                            <div className="icon"><PiSealCheckFill /></div>Parking
                                        </li>
                                        <li>
                                            <div className="icon"><PiSealCheckFill /></div>Parking
                                        </li>
                                        <li>
                                            <div className="icon"><PiSealCheckFill /></div>Parking
                                        </li>


                                    </ul>

                                </div>


                            </div>
                        </div>
                        <div className="right-side-box">
                            <div className="first-box">
                                <h5>LISTING PRICE</h5>
                                <div className="price">₹1,12,00,000</div>
                                <p>Available for Sale</p>
                            </div>
                            <div className="second-box">
                                <div className="top">
                                    <div className="name">SS</div>
                                    <div className="user">Sunil <span><PiSealCheckFill /> Verified Seller</span></div>
                                </div>
                                <div className="middle">
                                    <div className="chat"><BiSolidMessageSquareDetail /><span>Chat</span></div>
                                    <div className="inquire">Inquire</div>
                                </div>
                                <div className="last-box">
                                    <p>Please login as a buyer to send inquiries.</p>
                                    <div className="btn">Login</div>
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* //Bottom side second -new - box */}
                    <div className="second-main">
                        <div className="heading">Property Details</div>
                        <div className="card">
                            <div className="idd">Property ID</div>
                            <div className="added-on">674D4564D <span>Added On</span></div>
                            <div className="date">04/15/2026</div>
                        </div>
                        <div className="card">
                            <div className="idd">Property Type</div>
                            <div className="added-on">Flat <span>Status</span></div>
                            <div className="date">For Sale</div>
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
