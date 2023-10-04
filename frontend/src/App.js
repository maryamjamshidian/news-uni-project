import Login from "./admin/auth/Login";
import {Routes, Route} from "react-router-dom";
import Dashboard from "./admin/dashboard/Dashboard";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Routes>
        <Route path="/administrator" element={<Login />}  />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
