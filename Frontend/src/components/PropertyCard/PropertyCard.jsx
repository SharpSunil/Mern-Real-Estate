import React from 'react'
import './propertycard.scss'
import image from "../../assets/realestate.jpg";
import { FaRegHeart } from "react-icons/fa6";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { MdRemoveRedEye } from "react-icons/md";
const PropertyCard = () => {
    return (
        <>
            <div className="property-main-card">
                <div className="card">
                    <div className="top-card">
                        <div
                            className="bg-img"
                            style={{ backgroundImage: `url(${image})` }}
                        ></div>
                        <div className="overlay"></div>
                        <div className="content">
                            <div className="btn1">NEW</div>
                            <div className="btn2"><div className="icon"><VscWorkspaceTrusted /></div>VERIFIED</div>

                        </div>
                        <div className="like"><FaRegHeart /></div>
                        <div className="price"> ₹1,65,00,000</div>

                    </div>

                    {/* //bottom part of card */}
                    <div className="bottom-card">
                        <div className="first-box">
                            <div className="first">FLAT</div>
                            <div className="second"><MdRemoveRedEye /><span>54</span></div>
                        </div>
                        <div className="second-box">
                            <div className="heading">DLF URBAN Grande Towers</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PropertyCard
