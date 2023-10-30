import React from "react";
import { BsFillTelephoneFill, BsReception4 } from "react-icons/bs";
import logo from "../../../assets/images/logo.png"
import ads from "../../../assets/images/ads.jpg"
import "./topmenu.css"
const TopMenu = () => {
  return (
    <>
      <div className="top-menu has-background-black py-2">
        <div className="container">
          <div className="columns">
            <div className="column is-two-thirds is-flex is-justify-content-start">
              <span className="has-text-white is-flex is-align-items-center">
                <BsReception4 className="ml-2 has-text-danger" /> برقراری ارتباط
                : marryam.jam@gmail.com
              </span>
            </div>
            <div className="column is-one-third is-flex is-justify-content-end">
              <span className="has-text-white is-flex is-align-items-center is-size-5">
                <BsFillTelephoneFill className="ml-2" /> 09389706771
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="home-page-logo pt-3">
           <div className="container">
                <div className="columns">
                     <div className="column is-two-thirds ads">
                         <img src={ads} alt="" />
                     </div>
                     <div className="column is-one-third is-flex is-justify-content-end">
                         <img src={logo} alt="" />
                     </div>
                </div>
           </div>
      </div>
    </>
  );
};

export default TopMenu;
