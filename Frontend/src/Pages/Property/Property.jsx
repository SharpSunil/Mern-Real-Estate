import React from 'react'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import "./property.scss"

import image from "../../assets/realestate.jpg";
const Property = () => {
    return (
        <>
            <div className="property-parent parent">
                <div className="property-cont cont">
                    <Breadcrumbs
                        items={[
                            { label: "Home", path: "/" },
                            { label: "Properties", path: "/properties" },
                            { label: "Property Details" },
                        ]}
                    />

                    {/* //Page code start here  */}
                    <div className="image-grid">
                        <div
                            className="left-img"
                            style={{ backgroundImage: `url(${image})` }}
                        />

                        <div className="right-img-box">
                            <div
                                className="right-img1"
                                style={{ backgroundImage: `url(${image})` }}
                            />

                            <div
                                className="right-img2"
                                style={{ backgroundImage: `url(${image})` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Property
