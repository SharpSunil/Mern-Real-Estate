import React from 'react'
import './worksec.scss'
import { SiZincsearch } from "react-icons/si";
import { FaVideo } from "react-icons/fa6";
import { VscWorkspaceTrusted } from "react-icons/vsc";
const WorkSec = () => {
  const cardData = [
    {
      id:1,
      number:"01",
      icon:<SiZincsearch />,
      title:"Smart Search",
      desc:"Leverage our AI-driven Smart Search algorithms to find the best property matches tailored to your specific preferences."
    },
    {
      id:2,
      number:"02",
      icon:<FaVideo />,
      title:"Virtual Tours",
      desc:"Experience your future home from anywhere with our high-definition 3D virtual tours and immersive walkthroughs."
    },
    {
        id:3,
      number:"03",
      icon:<VscWorkspaceTrusted />,
      title:"Verified Trust",
      desc:"Every listing is strictly audited for ownership and condition, ensuring your peace of mind and a secure transaction."
    }
  ]
  return (
    <>
      <div className="worksec-parent parent">
        <div className="work-cont cont">
            <div className="sec-indi"> HOW IT WORKS</div>
            <div className="heading">Our Seamless <span>Process</span></div>
            <div className="des">We've simplified the journey of finding your dream home into three clear, stress-free steps.</div>
            <div className="main-card-sec">
                {cardData.map((item) =>(
                  <div className="card">
                    <div className="number">{item.number}</div>
                    <div className="icon">{item.icon}</div>
                    <div className="title">{item.title}</div>
                    <div className="desc">{item.desc}</div>
                </div>
                ))}
            </div>
        </div>
      </div>
    </>
  )
}

export default WorkSec
