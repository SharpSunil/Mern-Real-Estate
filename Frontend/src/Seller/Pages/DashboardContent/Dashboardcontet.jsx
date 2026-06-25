
import React from 'react'
import "./DashboardContent.scss"
import { FaBuilding } from 'react-icons/fa'
import { LuTableProperties } from 'react-icons/lu'
import { IoMdChatboxes } from 'react-icons/io'
import { SiInquirer } from 'react-icons/si'
const Dashboardcontent = () => {
  return (
    <>
      <div className="top">
        <h2>Seller Dashboard</h2>
        <p>Welcome Back 👋</p>
      </div>
      <div className="card-main">
        <div className="card">
          <div className="icon">
            <FaBuilding />
          </div>
          <div className="number">15</div>
          <div className="text">Total Properties</div>
        </div>
        <div className="card">
          <div className="icon">
            <LuTableProperties />
          </div>
          <div className="number">12</div>
          <div className="text">Active Listings</div>
        </div>
        <div className="card">
          <div className="icon"> <IoMdChatboxes /> </div>
          <div className="number">8</div>
          <div className="text">Unread Chats</div>
        </div> <div className="card"> <div className="icon"> <SiInquirer />
        </div>
          <div className="number">21</div>
          <div className="text">Inquiries</div>
        </div>
      </div> <h2>Recent Activity</h2> <div className="activity-box">
        <div className="activity-card"> Added a new Luxury Villa property </div>
        <div className="activity-card"> Updated Apartment listing details </div>
        <div className="activity-card"> Received a new inquiry from buyer </div>
        <div className="activity-card"> New chat message received </div>
      </div>
    </>
  )
}

export default Dashboardcontent
