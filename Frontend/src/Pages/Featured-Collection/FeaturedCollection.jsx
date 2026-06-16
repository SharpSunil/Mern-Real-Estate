import React from 'react';
import './featured.scss';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { Link } from 'react-router-dom';

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

const FeaturedCollection = () => {
  return (
    <div className="featured-parent parent">
      <div className="featured-cont cont">
        <div className="sec-indi">HANDPICKED FOR YOU</div>

        <div className="heading">
          Featured Collections
        </div>

        <div className="des">
          Discover high-value properties curated by our experts for
          their exceptional design, location, and investment potential.
        </div>

        <div className="property-grid">
          {dummyProperties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
            />
          ))}
        </div>

        {/* view more properties button  */}
        <Link to="/">Discover More Properties  </Link>
      </div>
    </div>
  );
};

export default FeaturedCollection;