import React from 'react'
import TopMenu from '../components/Home/TopMenu/TopMenu'
import Navbar from '../components/Home/Navbar/Navbar'
import Content from '../components/Detail/Content/Content'
import SideLeft from '../components/Detail/SideLeft/SideLeft'
import { useLocation } from 'react-router-dom'

const Detail = () => {
     const {state} = useLocation()
  return (
     <>
           <TopMenu />
          <Navbar />

    <div className="detail-post mt-6">
         <div className="container">
              <div className="columns">
                   <div className="column is-two-thirds">
                        <Content data={state} />
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