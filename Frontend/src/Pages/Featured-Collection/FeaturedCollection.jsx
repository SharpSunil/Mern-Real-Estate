import React from 'react'
import './featured.scss'
import PropertyCard from '../../components/PropertyCard/PropertyCard'
const FeaturedCollection = () => {
  return (
    <>
      <div className="featured-parent parent">
        <div className="featured-cont cont">
             <div className="sec-indi">HANDPICKED FOR YOU</div>
            <div className="heading">Featured Collections</div>
            <div className="des">Discover high-value properties curated by our experts for their exceptional design, location, and investment potential.</div>

            <PropertyCard />
        </div>
      </div>
    </>
  )
}

export default FeaturedCollection
