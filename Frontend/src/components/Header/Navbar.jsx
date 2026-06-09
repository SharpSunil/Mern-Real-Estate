import React, { useState } from 'react'
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
          <div className="logo"><FaHome />
            <span>RealEstate</span></div>
          <div className="nav-links">
            <ul>
              <li><a href="/">Brouse Properties</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/registration">Registration</a></li>
            </ul>
          </div>
          <div className="menu-icon" onClick={() => setOpen(true)}><CgMenuRight /></div>


        </div>
        {open && (
          <div className="navbar-cont-mobile cont">
            {/* //mobile menu */}

            <div className="mobile-logo"><FaHome />
              <span>RealEstate</span></div>

            <div className="menu-list-mb">
              <ul>
                <li><a href="/">Brouse Properties</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/registration">Registration</a></li>
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
