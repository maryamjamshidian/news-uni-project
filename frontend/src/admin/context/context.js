import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import {baseUrl} from "../../utils/baseUrl"

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(null);
  const [expire, setExpire] = useState("");
  const [news, setNews] = useState([]);
  const [singlePost, setSinglePost] = useState([]);
  const [category, setCategory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);
  const refreshToken = async () => {
    try {
      const response = await axios.get(`${baseUrl}/token`);
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setUserId(decoded.userId);
      setAdmin(decoded.isAdmin);
      setExpire(decoded.exp);
    } catch (error) {
      console.log(error);
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(`${baseUrl}/token`);
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setUserId(decoded.userId);
        setAdmin(decoded.isAdmin);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/users/login`,
        inputs
      );
      if (res.data.error) {
        setError(res.data.error);
      } else {
        navigate("/dashboard");
        toast.success(res.data.msg, {
          position: "bottom-center",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setName(res.data.name);
        setUserId(res.data.userId);
        setToken(res.data.accessToken);
        setAdmin(res.data.isAdmin);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await axiosJWT.get(`${baseUrl}/api/users`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const createNews = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("desc", data.desc);
    formData.append("catId", data.catId);
    formData.append("userId", userId);
    formData.append("file", data.file);
    try {
      const res = await axiosJWT.post(
        `${baseUrl}/api/news`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.msg, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/view-news");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNews = async () => {
    try {
      const res = await axiosJWT.get(`${baseUrl}/api/news`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setNews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNews = async (id) => {
    try {
      const res = await axiosJWT.delete(
        `${baseUrl}/api/news/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.msg, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      handleNews();
    } catch (error) {
      console.log(error);
    }
  };

  const singleNews = async (id) => {
    try {
      const res = await axiosJWT.get(`${baseUrl}/api/news/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setSinglePost(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  const updateNews = async(data)=>{
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("desc", data.desc);
    formData.append("catId", data.catId);
    formData.append("userId", userId);
    formData.append("file", data.file);
    try {
      const res = await axiosJWT.put(`${baseUrl}/api/news/${data.id}`,formData, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      toast.success(res.data.msg, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/view-news");
      
    } catch (error) {
      console.log(error);
    }
  }

  // Category

  const createCategory = async(value)=>{
    try {
      const res = await axiosJWT.post(`${baseUrl}/api/create-category`, value,{
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      toast.success(res.data.msg, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/view-category");
    } catch (error) {
      console.log(error);
    }
  }

  const getCategory = async()=>{
    try {
      const res = await axiosJWT.get(`${baseUrl}/api/get-category`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const updateCategory = async(values)=>{
    try {
      const res = await axiosJWT.put(`${baseUrl}/api/update-category/${values.id}`, values,{
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      toast.success(res.data, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/view-category");
    } catch (error) {
      console.log(error);
    }
  }

  const deleteCategory = async(id)=> {
    try {
      const res = await axiosJWT.delete(`${baseUrl}/api/delete-category/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      toast.success(res.data, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      getCategory()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        error,
        getAllUsers,
        axiosJWT,
        token,
        createNews,
        news,
        handleNews,
        deleteNews,
        singleNews,
        singlePost,
        updateNews,
        createCategory,
        getCategory,
        category,
        updateCategory,
        deleteCategory
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
