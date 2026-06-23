import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CgMenuRight } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import "./navbar.scss";
import { useAuth } from "../../Context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();

  return (
    <>
      <div className="navbar-parent parent">
        <div className="navbar-cont-desktop cont">

          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <FaHome />
              <span>RealEstate</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="nav-links">
            <ul>

              <li>
                <Link to="/properties">Browse Properties</Link>
              </li>

              {/* Not Logged In */}
              {!user && (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>

                  <li>
                    <Link to="/register">Registration</Link>
                  </li>
                </>
              )}

              {/* Buyer Menu */}
              {user?.role === "buyer" && (
                <>
                  <li>
                    <Link to="/my-favourites">
                      My Favourites
                    </Link>
                  </li>
                </>
              )}

              {/* Seller Menu */}
              {user?.role === "seller" && (
                <>
                  <li>
                    <Link to="/seller-dashboard">
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <Link to="/add-property">
                      Add Property
                    </Link>
                  </li>
                </>
              )}

              {/* Admin Menu */}
              {user?.role === "admin" && (
                <li>
                  <Link to="/admin">
                    Admin Panel
                  </Link>
                </li>
              )}

              {/* Logout */}
              {user && (
                <li>
                  <button
                    className="logout-btn"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Menu Icon */}
          <div
            className="menu-icon"
            onClick={() => setOpen(true)}
          >
            <CgMenuRight />
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="navbar-cont-mobile cont">

            {/* Logo */}
            <div
              className="mobile-logo"
              onClick={() => setOpen(false)}
            >
              <Link to="/">
                <FaHome />
                <span>RealEstate</span>
              </Link>
            </div>

            {/* Mobile Links */}
            <div className="menu-list-mb">
              <ul>

                <li onClick={() => setOpen(false)}>
                  <Link to="/properties">
                    Browse Properties
                  </Link>
                </li>

                {/* Not Logged In */}
                {!user && (
                  <>
                    <li onClick={() => setOpen(false)}>
                      <Link to="/login">
                        Login
                      </Link>
                    </li>

                    <li onClick={() => setOpen(false)}>
                      <Link to="/register">
                        Registration
                      </Link>
                    </li>
                  </>
                )}

                {/* Buyer */}
                {user?.role === "buyer" && (
                  <li onClick={() => setOpen(false)}>
                    <Link to="/my-favourites">
                      My Favourites
                    </Link>
                  </li>
                )}

                {/* Seller */}
                {user?.role === "seller" && (
                  <>
                    <li onClick={() => setOpen(false)}>
                      <Link to="/seller-dashboard">
                        Dashboard
                      </Link>
                    </li>

                    <li onClick={() => setOpen(false)}>
                      <Link to="/add-property">
                        Add Property
                      </Link>
                    </li>
                  </>
                )}

                {/* Admin */}
                {user?.role === "admin" && (
                  <li onClick={() => setOpen(false)}>
                    <Link to="/admin">
                      Admin Panel
                    </Link>
                  </li>
                )}

                {/* Logout */}
                {user && (
                  <li>
                    <button
                      className="logout-btn"
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Close Icon */}
            <div
              className="close"
              onClick={() => setOpen(false)}
            >
              <IoClose />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;