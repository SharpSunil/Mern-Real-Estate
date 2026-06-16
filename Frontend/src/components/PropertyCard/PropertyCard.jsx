import React from 'react'
import './propertycard.scss'
import image from "../../assets/realestate.jpg";
import { FaRegHeart } from "react-icons/fa6";
import { VscWorkspaceTrusted } from "react-icons/vsc";
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
                            <div className="btn1">new</div>
                            <div className="btn2"><div className="icon"><VscWorkspaceTrusted /></div>verified</div>
                        </div>
                        <div className="price">1,65,00,000</div>
                        <div className="like"><FaRegHeart /></div>
                    </div>
                    <div className="bottom-card"></div>
                </div>
            </div>
        </>
    )
}

export default PropertyCard
