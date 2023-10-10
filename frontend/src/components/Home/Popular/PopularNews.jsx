import React from 'react'
import { Link } from 'react-router-dom'
import popularImg from "../../../assets/images/1.jpeg"
import { BsEye } from "react-icons/bs";
import travel from "../../../assets/images/traveling.jpg"
import "./popular.css"
const PopularNews = () => {
  return (
    <div className="container mt-6">
         <div className="columns">
              <div className="column is-four-fifths has-background-white p-4">
                   <div className="popular mb-5">
                        <h1>محبوب ترین خبرها</h1>
                   </div>
                   <div className="columns">
                        <div className="column popular-news">
                             <div className="popular-img is-relative">
                                  <Link to="/">
                                       <img src={popularImg}
                                        className='is-fullwidth popular-image'
                                       alt="" />
                                  </Link>
                                  <div className="num-views">
                                       <span>
                                             <BsEye />
                                             167
                                       </span>
                                  </div>
                             </div>
                             <div className="popular-title">
                                  <h6 className="is-flex has-text-weight-bold is-size-5">
                                       <Link to="/">
                                            تست تایتل
                                       </Link>
                                  </h6>
                             </div>
                             <div className="author mt-4">
                                  <span className='is-size-6 has-text-grey ml-2'>
                                       16/6/91
                                  </span>
                                  <span className="is-size-6 has-text-grey mr-2">
                                       فرزاد معصومی
                                  </span>
                             </div>
                        </div>
                        <div className="column popular-news">
                             <div className="popular-img is-relative">
                                  <Link to="/">
                                       <img src={popularImg}
                                        className='is-fullwidth popular-image'
                                       alt="" />
                                  </Link>
                                  <div className="num-views">
                                       <span>
                                             <BsEye />
                                             167
                                       </span>
                                  </div>
                             </div>
                             <div className="popular-title">
                                  <h6 className="is-flex has-text-weight-bold is-size-5">
                                       <Link to="/">
                                            تست تایتل
                                       </Link>
                                  </h6>
                             </div>
                             <div className="author mt-4">
                                  <span className='is-size-6 has-text-grey ml-2'>
                                       16/6/91
                                  </span>
                                  <span className="is-size-6 has-text-grey mr-2">
                                       فرزاد معصومی
                                  </span>
                             </div>
                        </div>
                      
                        <div className="column popular-news">
                             <div className="popular-img is-relative">
                                  <Link to="/">
                                       <img src={popularImg}
                                        className='is-fullwidth popular-image'
                                       alt="" />
                                  </Link>
                                  <div className="num-views">
                                       <span>
                                             <BsEye />
                                             167
                                       </span>
                                  </div>
                             </div>
                             <div className="popular-title">
                                  <h6 className="is-flex has-text-weight-bold is-size-5">
                                       <Link to="/">
                                            تست تایتل
                                       </Link>
                                  </h6>
                             </div>
                             <div className="author mt-4">
                                  <span className='is-size-6 has-text-grey ml-2'>
                                       16/6/91
                                  </span>
                                  <span className="is-size-6 has-text-grey mr-2">
                                       فرزاد معصومی
                                  </span>
                             </div>
                        </div>
                      
                      
                   </div>
              </div>
              <div className="column is-one-fifth has-text-centered">
                   <img src={travel} alt="" />
              </div>
         </div>
    </div>
  )
}

export default PopularNews