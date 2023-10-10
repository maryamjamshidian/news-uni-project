import React from 'react'
import TopMenu from '../components/Home/TopMenu/TopMenu'
import Navbar from '../components/Home/Navbar/Navbar'
import HomeWrapper from '../components/Home/Home-wrapper/HomeWrapper'
import WhatsNews from '../components/Home/WhatsNews/WhatsNews'
import PopularNews from '../components/Home/Popular/PopularNews'
import Footer from "../components/Home/Footer/Footer"
const HomeScreen = () => {
  return (
    <div className="wrapper">
         <TopMenu />
         <Navbar />
         <HomeWrapper />
         <WhatsNews />
         <PopularNews />
         <Footer />
    </div>
  )
}

export default HomeScreen