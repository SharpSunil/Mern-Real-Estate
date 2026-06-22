import React, { useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import "./sidebar.scss";

const Sidebar = ({
    filters,
    setFilters,
    resetFilters,
}) => {

    const formatPrice = (value) => {
        if (value >= 10000000) {
            return `₹${(value / 10000000).toFixed(2)} Cr`;
        }
        return `₹${(value / 100000).toFixed(0)} L`;
    };

    const handlePropertyType = (value) => {
        const exists = filters.propertyType.includes(value);

        const updated = exists
            ? filters.propertyType.filter(
                (item) => item !== value
            )
            : [...filters.propertyType, value];

        setFilters({
            ...filters,
            propertyType: updated,
        });
    };
    useEffect(() => {
        const delay = setTimeout(() => {
            fetchProperties(filters);
        }, 300);

        return () => clearTimeout(delay);
    }, [filters]);

    const handleFurnishing = (value) => {
        const exists = filters.furnishing.includes(value);

        const updated = exists
            ? filters.furnishing.filter(
                (item) => item !== value
            )
            : [...filters.furnishing, value];

        setFilters({
            ...filters,
            furnishing: updated,
        });
    };

    return (
        <div className="sidebar">

            {/* Header */}
            <div className="first">
                <div className="heading">
                    <FaFilter /> Filters
                </div>

                <p onClick={resetFilters}>
                    Reset
                </p>
            </div>

            {/* Location */}
            <div className="search">
                <div className="heading">
                    Location
                </div>

                <div className="search-box">
                    <IoSearch className="search-icon" />

                    <input
                        type="text"
                        placeholder="Search City..."
                        value={filters.city}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                city: e.target.value,
                            })
                        }
                    />
                </div>
            </div>

            {/* Price */}
            <div className="price-range">
                <div className="first">
                    <div className="heading">
                        Price Range
                    </div>

                    <div className="price">
                        {formatPrice(
                            filters.maxPrice
                        )}
                    </div>
                </div>

                <input
                    type="range"
                    min="100000"
                    max="100000000"
                    step="500000"
                    value={filters.maxPrice}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            maxPrice: Number(
                                e.target.value
                            ),
                        })
                    }
                    className="slider"
                    style={{
                        background: `linear-gradient(
                            to right,
                            var(--accent) 0%,
                            var(--accent) ${(filters.maxPrice / 100000000) * 100}%,
                            #e5e7eb ${(filters.maxPrice / 100000000) * 100}%,
                            #e5e7eb 100%
                        )`,
                    }}
                />

                <div className="labels">
                    <span>₹1L</span>
                    <span>₹10Cr</span>
                </div>
            </div>

            {/* Property Type */}
            <div className="property-type">
                <div className="heading">
                    Property Type
                </div>

                <div className="checkbox-group">

                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            checked={filters.propertyType.includes("flat")}
                            onChange={() =>
                                handlePropertyType("flat")
                            }
                        />
                        <span className="checkmark"></span>
                        Apartment
                    </label>

                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            checked={filters.propertyType.includes("villa")}
                            onChange={() =>
                                handlePropertyType("villa")
                            }
                        />
                        <span className="checkmark"></span>
                        Villa
                    </label>

                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            checked={filters.propertyType.includes("plot")}
                            onChange={() =>
                                handlePropertyType("plot")
                            }
                        />
                        <span className="checkmark"></span>
                        Plot
                    </label>

                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            checked={filters.propertyType.includes("commercial")}
                            onChange={() =>
                                handlePropertyType("commercial")
                            }
                        />
                        <span className="checkmark"></span>
                        Commercial
                    </label>

                </div>
            </div>

            {/* BHK */}
            <div className="bedroom">
                <div className="heading">
                    Bedrooms (BHK)
                </div>

                <div className="rooms">
                    {["1", "2", "3", "4", "5+"].map(
                        (bhk) => (
                            <p
                                key={bhk}
                                className={
                                    filters.bhk === bhk
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setFilters({
                                        ...filters,
                                        bhk:
                                            filters.bhk === bhk
                                                ? ""
                                                : bhk,
                                    })
                                }
                            >
                                {bhk}
                            </p>
                        )
                    )}
                </div>
            </div>

            {/* Furnishing */}
            <div className="property-type">
                <div className="heading">
                    Furnishing
                </div>

                <div className="checkbox-group">

                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            checked={filters.furnishing.includes("furnished")}
                            onChange={() =>
                                handleFurnishing("furnished")
                            }
                        />
                        <span className="checkmark"></span>
                        Furnished
                    </label>

                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            checked={filters.furnishing.includes("semi-furnished")}
                            onChange={() =>
                                handleFurnishing("semi-furnished")
                            }
                        />
                        <span className="checkmark"></span>
                        Semi Furnished
                    </label>

                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            checked={filters.furnishing.includes("unfurnished")}
                            onChange={() =>
                                handleFurnishing("unfurnished")
                            }
                        />
                        <span className="checkmark"></span>
                        Unfurnished
                    </label>

                </div>
            </div>



        </div>
    );
};

export default Sidebar;