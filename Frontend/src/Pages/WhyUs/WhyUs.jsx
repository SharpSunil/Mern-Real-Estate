import React from 'react';
import "./whyus.scss";
import { Link } from "react-router-dom";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { GrUserExpert } from "react-icons/gr";
import { CiLocationOn } from "react-icons/ci";
import { GiProcessor } from "react-icons/gi";
import { BsPlayFill } from "react-icons/bs";

const WhyUs = () => {

    const cardData = [
        {
            id: 1,
            icon: <VscWorkspaceTrusted />,
            title: "Verified Trust",
            desc: "Every listing is strictly audited for ownership, condition, and legality."
        },
        {
            id: 2,
            icon: <GrUserExpert />,
            title: "Expert Guidance",
            desc: "Our experienced consultants help you make informed property decisions."
        },
        {
            id: 3,
            icon: <CiLocationOn />,
            title: "Prime Locations",
            desc: "Access premium residential and commercial properties in top locations."
        },
        {
            id: 4,
            icon: <GiProcessor />,
            title: "Easy Process",
            desc: "From search to possession, we ensure a smooth and transparent journey."
        }
    ];

    return (
        <div className="why-us-parent parent">
            <div className="why-us-cont cont">

                <div className="why-left">
                    <div className="main-card">

                        {cardData.map((item) => (
                            <div className="card" key={item.id}>
                                <div className="icon">
                                    {item.icon}
                                </div>

                                <div className="pr-name">
                                    {item.title}
                                </div>

                                <div className="des">
                                    {item.desc}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                <div className="why-right">
                    <div className="heading">
                        Why RealEstate is the <span>Preferred Choice.</span>
                    </div>

                    <p>
                        We've reinvented the property search experience from the ground up.
                        By focusing on transparency, technological precision, and user-centric design,
                        we help you find not just a house, but a home.
                    </p>
                    <div className="new-list">
                        <ul>
                            <li><div className="icon"><BsPlayFill /></div>
                                <p>Direct connection with certified agents</p></li>
                            <li><div className="icon"><BsPlayFill /></div>
                                <p>Real-time market valuation data</p></li>
                            <li><div className="icon"><BsPlayFill /></div>
                                <p>Secure document management system</p></li>
                            <li><div className="icon"><BsPlayFill /></div>
                                <p>24/7 Premium customer support</p></li>
                        </ul>
                    </div>
                    <Link to="#" className='why-btn-link'>Learn more about our process →</Link>
                </div>

            </div>
        </div>
    );
};

export default WhyUs;