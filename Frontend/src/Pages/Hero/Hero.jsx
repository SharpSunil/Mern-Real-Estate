import React from 'react'
import './hero.scss'
const Hero = () => {
    return (
        <>
            <div className="hero-parent parent">
                <div className="hero-cont cont">
                    <div className="hero-left">
                        <div className="sec-indicator">
                            TRUSTED BY 20,000 + HOMEOWNERS
                        </div>
                        <div className="main-heading">Find Your <span>Perfect</span>Next Chapter.</div>
                        <div className="desc">Experience the most advanced real estate search platform. Discover verified listings, connect with top agents, and find a place you'll love.</div>
                        <div className="search-bar">
                            <div className="group-first">

                                <div className="icon"></div>
                                <div className="input-box">
                                    <label>Location</label>
                                    <input type='text' placeholder='Where are you looking?' />
                                </div>
                            </div>
                            <div className="group-first">
                                <div className="icon"></div>

                                <div className="input-box">
                                    <label>PROPERTY TYPE</label>

                                    <select>
                                        <option value="">Select Type</option>
                                        <option value="flat-apartment">Flat/Apartment</option>
                                        <option value="villa-house">Villa/House</option>
                                        <option value="penthouse">Penthouse</option>
                                        <option value="commercial">Commercial</option>
                                        <option value="office-space">Office Space</option>
                                        <option value="shop-showroom">Shop/Showroom</option>
                                        <option value="warehouse">Warehouse</option>
                                        <option value="plot-land">Plot/Land</option>
                                        <option value="farmhouse">Farmhouse</option>
                                        <option value="studio">Studio Apartment</option>
                                        <option value="co-working">Co-Working Space</option>
                                        <option value="industrial">Industrial Property</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* //in Number figures */}
                        <div className="main-box">
                            <div className="first">
                                <div className="number">12k+</div>
                                <p>PREADY PROPERTIES</p>
                            </div>
                            <div className="first">
                                <div className="number">500+</div>
                                <p>AGENT NETWORK</p>
                            </div>
                            <div className="first">
                                <div className="number">4.9/5</div>
                                <p>USER RATING</p>
                            </div>
                        </div>
                    </div>
                    <div className="hero-right"></div>
                </div>
            </div>

        </>
    )
}

export default Hero
