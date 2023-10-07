import React from "react";
import "./sidebar.css";
import logo from "../../../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
const Sidebar = () => {
  const [showNews, setShowNews] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  return (
    <div className="sidebar">
      <div className="logo mb-5 has-text-centered">
        <img src={logo} alt="" />
      </div>
      <ul>
        <li>
          <Link to="/dashboard">داشبورد</Link>
        </li>
        <li>
          <span onClick={() => setShowNews(!showNews)}>اخبار</span>

          {showNews && (
            <ul>
              <li>
                <Link to="/add-news">افزودن خبر</Link>
              </li>
              <li>
                <Link to="/view-news">مشاهده خبر</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <span onClick={() => setShowCategory(!showCategory)}>دسته بندی ها</span>

          {showCategory && (
            <ul>
              <li>
                <Link to="/add-category">افزودن دسته بندی</Link>
              </li>
              <li>
                <Link to="/view-category">مشاهده دسته بندی</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="">ویدیو</Link>
        </li>
        <li>
          <Link to="">کاربران</Link>
        </li>
        <li>
          <Link to="">نظرات</Link>
        </li>
        <li>
          <Link to="">خروج</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
