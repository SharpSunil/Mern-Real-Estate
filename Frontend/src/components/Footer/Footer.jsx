import React from 'react'
import { FaHome } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { IoMailUnreadOutline } from "react-icons/io5";
import { RiMapPinLine, RiSignpostFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import "./footer.scss"
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <>
      <div className="footer-parent parent">
        <div className="footer-cont-1 cont">
          <div className="box1">
            <div className="logo"><FaHome />
              <span>RealEstate</span></div>
            <p className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus necessitatibus quo aliquid eaque nobis </p>
            <div className="social-icons">
              <FaFacebookF />
              <FaXTwitter />
              <FiInstagram />
              <FaLinkedinIn />
            </div>
          </div>
          <div className="box2"><div className="heading">Company</div>
            <div className="menu-list">
              <Link to="/">Home</Link>
              <Link to="/property">Property</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/contact">Contact</Link>
            </div></div>
          <div className="box3">
            <div className="heading">Support</div>
            <div className="group1">
              <div className="icon"><IoMailUnreadOutline /></div>
              <a href='#'>Contact@domain.com</a>
            </div>

            <div className="group2">
              <div className="icon"><FaPhone /></div>
              <a href='#'>+91 8098569852</a>
            </div>

            <div className="group3">
              <div className="icon"><RiMapPinLine /></div>
              <a href='#'>office no. 212, 10 Biz Park, near symboisis law college, viman nagar , pune - 411014</a>
            </div>

          </div>
          <div className="box4">
            <div className="heading">Newsletter</div>
            <p className='desc'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. .</p>
            <div className="input-letter">
              <input type='text' placeholder='Enter Your Mail Id' />
              <div className="join-btn">Join</div>
            </div>
          </div>
        </div>

        {/* //second footer start here */}
        <div className="footer-cont-2 ">
          <div className="group-one cont">
            <p className="copyright">
              © {new Date().getFullYear()} RealEstate. All Rights Reserved.
            </p>
            <div className="imp-link">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/term-conditions">Term & Conditions</Link>
             <Link to="/cookies">Cookies Setting</Link>
            </div>
          </div>
          <div className="group-second cont">
            <p><RiSignpostFill /><span>Designed by SharpSunil</span></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
