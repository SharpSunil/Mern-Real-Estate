import React, { useState } from 'react'
import './Properties.scss'
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { MdSpaceDashboard } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import Sidebar from '../../components/PropertySidebar/Sidebar';

const dummyProperties = [
    {
        _id: 1,
        title: "DLF Urban Grande Towers",
        price: "₹1,65,00,000",
        type: "FLAT",
        views: 54,
        address:
            "Tower B, DLF Urban Grande Towers, Sector 150, Near Noida-Greater Noida Expressway, Gautam Buddha Nagar, Uttar Pradesh 201310",
        beds: 4,
        baths: 4,
        area: 2400,
    },
    {
        _id: 2,
        title: "Godrej Heights",
        price: "₹1,20,00,000",
        type: "APARTMENT",
        views: 31,
        address:
            "Flat No. 1204, Prestige Residency, Plot No. 45, Sector 137, Noida Expressway, Gautam Buddha Nagar, Uttar Pradesh 201305",
        beds: 3,
        baths: 3,
        area: 1800,
    },
    {
        _id: 3,
        title: "Prestige Residency",
        price: "₹95,00,000",
        type: "FLAT",
        views: 22,
        address: "Greater Noida West",
        beds: 2,
        baths: 2,
        area: 1400,
    },
    {
        _id: 4,
        title: "Tata Elite Homes",
        price: "₹2,10,00,000",
        type: "VILLA",
        views: 67,
        address:
            "Penthouse 2501, Skyview Towers, Plot No. 78A, Sector 150, Adjacent to Noida-Greater Noida Expressway, Near Shaheed Bhagat Singh Park, Gautam Buddha Nagar, Uttar Pradesh 201310, India",
        beds: 5,
        baths: 5,
        area: 3200,
    },
    {
        _id: 5,
        title: "Sobha Greens",
        price: "₹1,45,00,000",
        type: "FLAT",
        views: 48,
        address: "Noida Extension",
        beds: 3,
        baths: 3,
        area: 2100,
    },
    {
        _id: 6,
        title: "Lodha Paradise",
        price: "₹1,75,00,000",
        type: "PENTHOUSE",
        views: 75,
        address: "Sector 78, Noida",
        beds: 4,
        baths: 4,
        area: 2600,
    },
];
const Properties = () => {
    const [activeView, setActiveView] = useState("grid");

    
    return (
        <>
            <div className="properties-parent parent">
                <div className="properties-cont cont">
                    <div className="left-sidebar"><Sidebar /></div>
                    <div className="right-side">
                        <div className="top-sidebar">
                            <p>Showing <span>9</span> properties</p>
                            <div className="last-box">
                                <div className="first">
                                    <div
                                        className={`icon-box ${activeView === "grid" ? "active" : ""}`}
                                        onClick={() => setActiveView("grid")}
                                    >
                                        <MdSpaceDashboard />
                                    </div>

                                    <div
                                        className={`icon-box ${activeView === "list" ? "active" : ""}`}
                                        onClick={() => setActiveView("list")}
                                    >
                                        <IoMenu />
                                    </div>
                                </div>
                                <div className="second">
                                    <label htmlFor="sort">Sort:</label>
                                    <select id="sort">
                                        <option value="latest">Latest</option>
                                        <option value="lowToHigh">Price: Low To High</option>
                                        <option value="highToLow">Price: High To Low</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="card-sections">
                            {dummyProperties.map((property) => (
                                <PropertyCard
                                    key={property._id}
                                    property={property}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Properties
