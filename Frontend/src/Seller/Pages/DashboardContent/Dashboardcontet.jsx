
import React, { useEffect, useState } from 'react'
import "./DashboardContent.scss"
import { FaBuilding } from 'react-icons/fa'
import { LuTableProperties } from 'react-icons/lu'
import { IoMdChatboxes } from 'react-icons/io'
import { SiInquirer } from 'react-icons/si'
import axios from 'axios'
import API_URL from '../../../Config'
const Dashboardcontent = ({ setActiveTab }) => {
  const token = localStorage.getItem("token");

  const [dashboard, setDashboard] = useState({
    totalProperties: 0,
    activeListings: 0,
    unreadChats: 0,
    totalInquiries: 0,
    recentActivitity: [],
  });
  const [loading, setLoading] = useState(true);

  // ---------------Fetch dashboard----------------------//
  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/property/seller/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setDashboard(res.data.stats);
      console.log(setDashboard, " Alll Data try to show hare");
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <h2>Loading Dashboard.....</h2>;
  }
  return (

    <>
      <div className="top">
        <h2>Seller Dashboard</h2>
        <p>Welcome Back 👋</p>
      </div>
      <div className="card-main">
        <div className="card" onClick={() => setActiveTab("properties")}>
          <div className="icon">
            <FaBuilding />
          </div>
          <div className="number">{dashboard.totalProperties}</div>
          <div className="text">Total Properties</div>
        </div>
        <div className="card" onClick={() => setActiveTab("properties")}>
          <div className="icon">
            <LuTableProperties />
          </div>
          <div className="number">{dashboard.activeListings}</div>
          <div className="text">Active Listings</div>
        </div>
        <div className="card" onClick={() => setActiveTab("chat")}>
          <div className="icon">
             <IoMdChatboxes /> 
             </div>
          <div className="number">{dashboard.unreadChats}</div>
          <div className="text">Unread Chats</div>
        </div> <div className="card" onClick={()=> setActiveTab("inquiry")}>
           <div className="icon">
             <SiInquirer />
        </div>
          <div className="number">{dashboard.totalInquiries}</div>
          <div className="text">Inquiries</div>
        </div>
      </div> <h2>Recent Activity</h2>

      <div className="activity-box">
        {dashboard.recentActivity.length === 0 ? (
          <div className="activity-card"> No Recent Activity</div>
        ) : (
          dashboard.recentActivity.map((item) => (

            <div className="activity-card" key={item._id}>
              <strong>Added Property:</strong>{
                item.title}
              <br />
              <small>

                {new Date(item.createdAt).toLocaleString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}

              </small>

            </div>
          ))
        )}

      </div>
    </>
  )
}

export default Dashboardcontent
