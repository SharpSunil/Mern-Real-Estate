import React from "react";
import "./breadcrumps.scss";
import { Link } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";

const Breadcrumbs = ({ items = [] }) => {
  return (
    <div className="breadcrumps">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index !== 0 && <RiArrowRightSLine />}

          {index === items.length - 1 ? (
            <span className="active">{item.label}</span>
          ) : (
            <Link to={item.path}>{item.label}</Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;