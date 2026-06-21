import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CgMenuRight } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import "./navbar.scss"
const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="navbar-parent parent">
        <div className="navbar-cont-desktop cont">
          {/* //Desktop menu */}
          <div className="logo">
            <Link to="/">
              <FaHome />
              <span>RealEstate</span>
            </Link>
          </div>
          <div className="nav-links">
            <ul>
              <li><Link to="/properties">Browse Properties</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Registration</Link></li>
            </ul>
          </div>
          <div className="menu-icon" onClick={() => setOpen(true)}><CgMenuRight /></div>


        </div>
        {open && (
          <div className="navbar-cont-mobile cont">
            {/* //mobile menu */}

            <div onClick={() => setOpen(false)} className="mobile-logo">
              <Link to="/">
                <FaHome />
                <span>RealEstate</span>
              </Link>
            </div>

            <div onClick={() => setOpen(false)} className="menu-list-mb">
              <ul>
                <li><Link to="/properties">Browse Properties</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Registration</Link></li>
              </ul>
            </div>
            <div className="close" onClick={() => setOpen(false)}><IoClose /></div>

          </div>
        )}

      </div>
    </>
  )
}

export default Navbar
