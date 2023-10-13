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
  const [errorVideo, setErrorVideo] = useState("")
  const [allVideo, setAllVideo] = useState([])
  const [resgisterError, setRegisterError] = useState("")
  const [users, setUsers] = useState([])
  const [profilePhoto, setProfilePhoto] = useState("")
  const [profileName,setProfileName] = useState("")
  const [comments, setComments] = useState([])
  const navigate = useNavigate();
  useEffect(()=> {
    getAllUsers()
    getAllComment()
    handleNews()
    console.log("test");
  }, [])
  useEffect(() => {
    refreshToken();
    profile()
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

  const register = async(inputs) => {
    try {
      const res = await axiosJWT.post(`${baseUrl}/api/users/register`, inputs, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      if(res.data.error){
        setRegisterError(res.data.error)
      }else{
        toast.success(res.data.message, {
          position: "bottom-center",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
        });
        navigate("/view-users");
      }
    } catch (error) {
      console.log(error);
    }
  }

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
      profile()
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
      setUsers(res.data);
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

  // video 

  const createVideo = async(data) => {
    const formData = new FormData();
    formData.append("file", data.file)
    try {
      const res = await axiosJWT.post(`${baseUrl}/api/create-video`, formData,{
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      if(res.data.error){
        setErrorVideo(res.data.error)
      }
     if(res.data.msg){
      toast.success(res.data.msg, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/view-video");
     }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllVideo = async() => {
    try {
      const res = await axiosJWT.get(`${baseUrl}/api/get-video`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      setAllVideo(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteVideo = async(id)=>{
    try {
        const res = await axiosJWT.delete(`${baseUrl}/api/delete-video/${id}`, {
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
        getAllVideo()
        
    } catch (error) {
      console.log(error);
    }
  }
// Use api

  const updataUser = async(value)=>{
    try {
      const res = await axiosJWT.put(`${baseUrl}/api/users/${value.id}`, value,{
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      toast.success(res.data.message, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      navigate("/view-users");
    } catch (error) {
      console.log(error);
    }
  }

  const deleteUser = async(id)=> {
    try {
      const res = await axiosJWT.delete(`${baseUrl}/api/users/${id}`,{
        headers:{
          authorization: `Bearer ${token}`
        }
      })
      toast.success(res.data.message, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      getAllUsers()
    } catch (error) {
      console.log(error);
    }
  }


  const Logout = async()=> {
    try {
      const res = await axiosJWT.delete(`${baseUrl}/api/users/logout`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      navigate("/")
      toast.success(res.data, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const updateProfile = async(data)=> {
    try {
      const formData = new FormData();
      formData.append("name", data.name)
      formData.append("password", data.password)
      formData.append("confPassword", data.confPassword)
      formData.append("id", data.id)
      formData.append("file", data.file)
      const res = await axiosJWT.put(`${baseUrl}/api/users/profile/${data.id}`, formData, {
        headers:{
          authorization: `Bearer ${token}`
        }
      })
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const profile = async () => {
    try {
      const res = await axiosJWT.get(`${baseUrl}/api/users/profile`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      setProfilePhoto(res.data.url);
      setProfileName(res.data.name)
     
    } catch (error) {
      console.log(error);
    }
  }


  // comments
  const getAllComment = async()=> {
    try {
      const res = await axiosJWT.get(`${baseUrl}/api/comment`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      setComments(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteComment = async(id)=> {
    try {
      const res = await axiosJWT.delete(`${baseUrl}/api/comment/${id}`,{
        headers:{
          authorization : `Bearer ${token}`
        }
      })
      toast.success(res.data, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      getAllComment()
    } catch (error) {
      console.log(error);
    }
  }

  const activeComment = async(id) => {
    const data = {
      isActive: true
    }
    try {
      const res = await axiosJWT.put(`${baseUrl}/api/comment/active/${id}`,data,{
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      getAllComment()
      toast.success(res.data, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const unActiveComment = async(id) => {
    const data = {
      isActive: false
    }
    try {
      const res = await axiosJWT.put(`${baseUrl}/api/comment/unactive/${id}`,data,{
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      getAllComment()
      toast.success(res.data, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
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
        deleteCategory,
        createVideo,
        errorVideo,
        getAllVideo,
        allVideo,
        deleteVideo,
        register,
        resgisterError,
        users,
        updataUser,
        deleteUser,
        Logout,
        userId,
        updateProfile,
        profile,
        profilePhoto,
        profileName,
        getAllComment,
        comments,
        deleteComment,
        activeComment,
        unActiveComment,
        admin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
