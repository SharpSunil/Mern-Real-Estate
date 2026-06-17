import React from 'react'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import "./property.scss"
import { FiMapPin } from "react-icons/fi";
import { FaCompress, FaRegHeart, FaUsers } from "react-icons/fa6";
import image from "../../assets/realestate.jpg";
import { PiSealCheckFill } from "react-icons/pi";
import { GiFlatPlatform } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
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
                                    <div className="user">Sunil <span>Verified Seller</span></div>
                                    </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Property
