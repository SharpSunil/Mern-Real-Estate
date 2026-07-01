import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../../Config";
import "./Properties.scss";

import PropertyCard from "../../../Components/PropertyCard/PropertyCard";
import Sidebar from "../../../Components/PropertySidebar/Sidebar";

import { MdSpaceDashboard } from "react-icons/md";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";

const Properties = () => {
    const [activeView, setActiveView] = useState("grid");
    const [showSidebar, setShowSidebar] = useState(false);
    const [wishlistIds, setWishlistIds] = useState([]);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        city: "",
        propertyType: [],
        bhk: "",
        maxPrice: 100000000,
        furnishing: [],
        sort: "latest",
    });

    const fetchProperties = async (
        currentFilters = filters
    ) => {
        try {
            setLoading(true);

            const params = new URLSearchParams();

            if (currentFilters.city) {
                params.append("city", currentFilters.city);
            }

            if (currentFilters.propertyType.length > 0) {
                params.append(
                    "propertyType",
                    currentFilters.propertyType.join(",")
                );
            }

            if (currentFilters.bhk) {
                params.append("bhk", currentFilters.bhk);
            }

            if (currentFilters.maxPrice) {
                params.append(
                    "maxPrice",
                    currentFilters.maxPrice
                );
            }

            if (currentFilters.furnishing.length > 0) {
                params.append(
                    "furnishing",
                    currentFilters.furnishing.join(",")
                );
            }

            if (currentFilters.sort) {
                params.append("sort", currentFilters.sort);
            }

            const res = await axios.get(
                `${API_URL}/api/property?${params.toString()}`
            );

            setProperties(
                res.data.properties || []
            );
        } catch (error) {
            console.error(
                "Error fetching properties:",
                error
            );
        } finally {
            setLoading(false);
        }
    };



    // Real Time Filtering
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchProperties(filters);
        }, 300);

        return () => clearTimeout(timer);
    }, [filters]);

    const resetFilters = () => {
        setFilters({
            city: "",
            propertyType: [],
            bhk: "",
            maxPrice: 100000000,
            furnishing: [],
            sort: "latest",
        });
    };

    const handleSortChange = (e) => {
        setFilters({
            ...filters,
            sort: e.target.value,
        });
    };
    const fetchWishlist = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) return;

            const user = JSON.parse(localStorage.getItem("user"));

            if (user?.role !== "buyer") return;

            const res = await axios.get(

                `${API_URL}/api/wishlist`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            const ids = res.data.data.map(

                (item) => item.property._id

            );

            setWishlistIds(ids);

        }

        catch (error) {

            console.log(error);

        }

    };
    const toggleWishlist = async (propertyId) => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {

                return;

            }

            if (wishlistIds.includes(propertyId)) {

                await axios.delete(

                    `${API_URL}/api/wishlist/${propertyId}`,

                    {

                        headers: {

                            Authorization: `Bearer ${token}`,

                        },

                    }

                );

            } else {

                await axios.post(

                    `${API_URL}/api/wishlist/${propertyId}`,

                    {},

                    {

                        headers: {

                            Authorization: `Bearer ${token}`,

                        },

                    }

                );

            }

            fetchWishlist();

        }

        catch (error) {

            console.log(error);

        }

    };
    // Initial Load
    useEffect(() => {

        fetchProperties();

        fetchWishlist();

    }, []);
    return (
        <>
            {showSidebar && (
                <div
                    className="sidebar-overlay"
                    onClick={() =>
                        setShowSidebar(false)
                    }
                />
            )}

            <div className="properties-parent parent">
                <div className="properties-cont cont">

                    {/* Sidebar */}
                    <div
                        className={`left-sidebar ${showSidebar
                            ? "show"
                            : ""
                            }`}
                    >
                        <div
                            className="close-sidebar"
                            onClick={() =>
                                setShowSidebar(false)
                            }
                        >
                            <IoClose />
                        </div>

                        <Sidebar
                            filters={filters}
                            setFilters={setFilters}
                            resetFilters={resetFilters}
                        />
                    </div>

                    {/* Right Side */}
                    <div className="right-side">

                        {/* Mobile Filter Button */}
                        <div
                            className="new-box-popup"
                            onClick={() =>
                                setShowSidebar(true)
                            }
                        >
                            <FaFilter />
                            <span>
                                Show Filters &
                                Searches
                            </span>
                        </div>

                        {/* Top Toolbar */}
                        <div className="top-sidebar">
                            <p>
                                Showing{" "}
                                <span>
                                    {properties.length}
                                </span>{" "}
                                properties
                            </p>

                            <div className="last-box">

                                {/* Grid View */}
                                <div className="first">
                                    <div
                                        className={`icon-box ${activeView ===
                                            "grid"
                                            ? "active"
                                            : ""
                                            }`}
                                        onClick={() =>
                                            setActiveView(
                                                "grid"
                                            )
                                        }
                                    >
                                        <MdSpaceDashboard />
                                    </div>

                                    {/* List View */}
                                    <div
                                        className={`icon-box ${activeView ===
                                            "list"
                                            ? "active"
                                            : ""
                                            }`}
                                        onClick={() =>
                                            setActiveView(
                                                "list"
                                            )
                                        }
                                    >
                                        <IoMenu />
                                    </div>
                                </div>

                                {/* Sort */}
                                <div className="second">
                                    <label>
                                        Sort:
                                    </label>

                                    <select
                                        value={
                                            filters.sort
                                        }
                                        onChange={
                                            handleSortChange
                                        }
                                    >
                                        <option value="latest">
                                            Latest
                                        </option>

                                        <option value="priceLow">
                                            Price:
                                            Low To High
                                        </option>

                                        <option value="priceHigh">
                                            Price:
                                            High To Low
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Properties */}
                        <div className="card-sections">
                            {loading ? (
                                <h3>
                                    Loading
                                    Properties...
                                </h3>
                            ) : properties.length >
                                0 ? (
                                properties.map(
                                    (
                                        property
                                    ) => (
                                        <PropertyCard
                                            key={property._id}
                                            property={property}
                                            view={activeView}
                                            isWishlisted={wishlistIds.includes(property._id)}
                                            onWishlistClick={toggleWishlist}
                                        />
                                    )
                                )
                            ) : (
                                <h3>
                                    No Properties
                                    Found
                                </h3>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Properties;