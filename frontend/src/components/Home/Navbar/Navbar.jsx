import React from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"
const Navbar = () => {
  return (
    <header className="has-background-danger py-5 my-4">
         <div className="container">
              <div className="nav">
                   <ul className="is-flex nav-ul">
                        <li><Link to="/">خانه</Link></li>
                        <li><Link to="/about">درباره ما</Link></li>
                        <li><Link to="/contact">تماس با ما</Link></li>
                   </ul>
              </div>
         </div>
    </header>
  )
}

export default Navbar