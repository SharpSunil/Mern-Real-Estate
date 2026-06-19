import React, { useState } from 'react';
import { FaFilter } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import "./sidebar.scss";

const Sidebar = () => {
    const [price, setPrice] = useState(99600000);

    const formatPrice = (value) => {
        if (value >= 10000000) {
            return `₹${(value / 10000000).toFixed(2)} Cr`;
        }
        return `₹${(value / 100000).toFixed(0)} L`;
    };

    return (
        <div className="sidebar">
            {/* Filters */}
            <div className="first">
                <div className="heading">
                    <FaFilter /> Filters
                </div>
                <p>Reset</p>
            </div>

            {/* Search */}
            <div className="search">
                <div className="heading">Location</div>
                <div className="search-box">
                    <IoSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search properties..."
                    />
                </div>
            </div>

            {/* Price Range */}
            <div className="price-range">
                <div className="first">
                    <div className="heading">Price Range</div>
                    <div className="price">{formatPrice(price)}</div>
                </div>

                <input
                    type="range"
                    min="100000"
                    max="100000000"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="slider"
                    style={{
                        background: `linear-gradient(
      to right,
      var(--accent) 0%,
      var(--accent) ${(price / 100000000) * 100}%,
      #e5e7eb ${(price / 100000000) * 100}%,
      #e5e7eb 100%
    )`,
                    }}
                />

                <div className="labels">
                    <span>₹1L</span>
                    <span>₹10Cr</span>
                </div>
            </div>

            {/* PROPERTY TYPE */}
            <div className="property-type">
                <div className="heading">Property Type</div>
                <div className="checkbox-group">
                    <label className="checkbox-item">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Apartment
                    </label>

                    <label className="checkbox-item">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Villa
                    </label>

                    <label className="checkbox-item">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Plot
                    </label>

                    <label className="checkbox-item">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Commercial
                    </label>
                </div>
            </div>
            
            {/* Bedrooms Number */}
            <div className="bedroom">
                <div className="heading">Bedrooms (BHK)</div>
                .room
            </div>
        </div>
    );
};

export default Sidebar;