import React from 'react'
import { BsArrowReturnLeft } from "react-icons/bs";

const ViewComment = () => {
  return (
   <div className="comment-view mt-5">
        <div className="box">
             <div className="name is-size-5">فرزاد</div>
             <div className="subject has-text-grey">
                  <div className='pr-2 mt-2'>
                       <BsArrowReturnLeft />
                  </div>
                  <span className='pr-4 pt-1 is-size-6'>موضوع فلان</span>
             </div>
             <div className="desc pt-4">
                  <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
             </div>
        </div>
        <div className="box">
             <div className="name is-size-5">فرزاد</div>
             <div className="subject has-text-grey">
                  <div className='pr-2 mt-2'>
                       <BsArrowReturnLeft />
                  </div>
                  <span className='pr-4 pt-1 is-size-6'>موضوع فلان</span>
             </div>
             <div className="desc pt-4">
                  <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
             </div>
        </div>
   </div>
  )
}

export default ViewComment