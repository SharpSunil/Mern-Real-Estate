import React from 'react';
import "./about.scss";
import { FaBuilding } from "react-icons/fa";

const About = () => {

    const cardData = [
        {
            id: 1,
            icon: <FaBuilding />,
            name: "Modern Flats",
            des: "5 Properties"
        },
        {
            id: 2,
            icon: <FaBuilding />,
            name: "Luxury Villas",
            des: "8 Properties"
        },
        {
            id: 3,
            icon: <FaBuilding />,
            name: "Commercial Spaces",
            des: "12 Properties"
        },
        {
            id: 4,
            icon: <FaBuilding />,
            name: "Apartments",
            des: "15 Properties"
        }
    ];

    return (
        <div className="about-parent parent">
            <div className="about-cont cont">
                <div className="heading">Browse by Category</div>

                <p>
                    Explore curated collections of properties tailored to your specific lifestyle and needs.
                </p>

                <div className="main-card">

                    {cardData.map((item) => (
                        <div className="card" key={item.id}>
                            <div className="icon">{item.icon}</div>
                            <div className="pr-name">{item.name}</div>
                            <div className="des">{item.des}</div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default About;