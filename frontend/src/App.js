import Login from "./admin/auth/Login";
import {Routes, Route} from "react-router-dom";
import Dashboard from "./admin/dashboard/Dashboard";
import ViewNews from "./admin/dashboard/components/news/ViewNews"
import AddNews from "./admin/dashboard/components/news/AddNews"
import { ToastContainer } from 'react-toastify';
import Main from "./admin/dashboard/components/main/Main";
import EditNews from "./admin/dashboard/components/news/EditNews";
import ViewCategory from "./admin/dashboard/components/category/ViewCategory";
import AddCategory from "./admin/dashboard/components/category/AddCategory";
import EditCategory from "./admin/dashboard/components/category/EditCategory";

function App() {
  return (
    <>
      <Routes>
        <Route path="/administrator" element={<Login />}  />
        <Route path="/dashboard" element={<Main />} />
        <Route path="/add-news" element={<AddNews />} />
        <Route path="/view-news" element={<ViewNews />} />
        <Route path="/edit-news/:id" element={<EditNews />} />

        <Route path="/view-category" element={<ViewCategory />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/update-category/:id" element={<EditCategory />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
