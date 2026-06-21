import React, { useState } from "react";
import "./Properties.scss";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import Sidebar from "../../components/PropertySidebar/Sidebar";
import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const dummyProperties = [
    {
        _id: 1,
        title: "DLF Urban Grande Towers",
        price: "₹1,65,00,000",
        type: "FLAT",
        views: 54,
        address: "Sector 150, Noida",
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
        address: "Sector 137, Noida",
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
];

const Properties = () => {
    // Grid/List View State
    const [activeView, setActiveView] = useState("grid");

    // Mobile Sidebar State
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            {/* Overlay for Mobile Sidebar */}
            {showSidebar && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setShowSidebar(false)}
                ></div>
            )}

            <div className="properties-parent parent">
                <div className="properties-cont cont">

                    {/* Left Sidebar */}
                    <div className={`left-sidebar ${showSidebar ? "show" : ""}`}>

                        {/* Close Button - Mobile Only */}
                        <div
                            className="close-sidebar"
                            onClick={() => setShowSidebar(false)}
                        >
                            <IoClose />
                        </div>

                        <Sidebar />
                    </div>

                    {/* Right Content */}
                    <div className="right-side">

                        {/* Mobile Filter Button */}
                        <div
                            className="new-box-popup"
                            onClick={() => setShowSidebar(true)}
                        >
                            <FaFilter />
                            <span>Show Filters & Searches</span>
                        </div>

                        {/* Top Toolbar */}
                        <div className="top-sidebar">
                            <p>
                                Showing <span>{dummyProperties.length}</span> properties
                            </p>

                            <div className="last-box">

                                {/* View Toggle */}
                                <div className="first">
                                    <div
                                        className={`icon-box ${activeView === "grid" ? "active" : ""
                                            }`}
                                        onClick={() => setActiveView("grid")}
                                    >
                                        <MdSpaceDashboard />
                                    </div>

                                    <div
                                        className={`icon-box ${activeView === "list" ? "active" : ""
                                            }`}
                                        onClick={() => setActiveView("list")}
                                    >
                                        <IoMenu />
                                    </div>
                                </div>

                                {/* Sort Dropdown */}
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

                        {/* Property Cards */}
                        <div className="card-sections">
                            {dummyProperties.map((property) => (
                                <PropertyCard
                                    key={property._id}
                                    property={property}
                                    view={activeView}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Properties;