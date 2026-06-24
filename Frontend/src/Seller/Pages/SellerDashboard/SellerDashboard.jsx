import React from 'react'
import "./Seller.scss"
import { MdAddchart, MdOutlineDashboard } from 'react-icons/md'
import { FaBuilding } from "react-icons/fa";
import { LuTableProperties } from "react-icons/lu";
import { IoLogOutOutline } from 'react-icons/io5'
import { IoMdChatboxes } from "react-icons/io";
import { SiInquirer } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
const SellerDashboard = () => {
    return (
        <>
            <div className="seller-parent parent">
                <div className="seller-cont cont">
                    <div className="sidebar">
                        <div className="first"><img
                            src="https://randomuser.me/api/portraits/men/1.jpg"
                            alt="User"
                            style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                objectFit: "cover"
                            }}
                        />
                            <div className="name">VS  </div>
                        </div>

                        <div className="list">
                            <li className='active'><MdOutlineDashboard /><span>Dashboard</span></li>
                            <li><LuTableProperties /> <span>My Properties</span></li>
                            <li><MdAddchart /> <span>Add Properties</span></li>
                            <li><IoMdChatboxes /><span>Chat</span></li>
                            <li><SiInquirer /><span>Inquiries</span></li>
                            <li><CgProfile /><span>Profile</span></li>
                        </div>
                        <div className="last"><IoLogOutOutline /><span>Logout</span></div>
                    </div>
                    <div className="right-side">
                        <h2>Seller Dashboard</h2>
                        <p>Welcom Back</p>
                        <div className="card-main">
                            <div className="card">
                                <div className="icon"><FaBuilding /></div>
                                <div className="number">15</div>
                                <div className="text">Total Properties</div>
                            </div>
                             <div className="card">
                                <div className="icon"><FaBuilding /></div>
                                <div className="number">15</div>
                                <div className="text">Total Properties</div>
                            </div>
                             <div className="card">
                                <div className="icon"><FaBuilding /></div>
                                <div className="number">15</div>
                                <div className="text">Total Properties</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default SellerDashboard
