import React from 'react'
import TopMenu from '../components/Home/TopMenu/TopMenu'
import Navbar from '../components/Home/Navbar/Navbar'
import Content from '../components/Detail/Content/Content'
import SideLeft from '../components/Detail/SideLeft/SideLeft'

const Detail = () => {
  return (
     <>
           <TopMenu />
          <Navbar />

    <div className="detail-post mt-6">
         <div className="container">
              <div className="columns">
                   <div className="column is-two-thirds">
                        <Content />
                   </div>
                   <div className="column is-one-third">
                        <SideLeft />
                   </div>
              </div>
         </div>
    </div>
     </>
  )
}

export default Detail