import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify"
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {

     const [error, setError] = useState("")
     const [name, setName] = useState("")
     const [userId, setUserId] = useState("")
     const [token, setToken] = useState("")
     const [admin, setAdmin] = useState(null)
     const [expire, setExpire] = useState("")
     const navigate = useNavigate();

     useEffect(()=> {
          refreshToken()
     }, [])
     const refreshToken = async () => {
          try {
               const response = await axios.get("http://localhost:5000/token")
               setToken(response.data.accessToken)
               const decoded = jwt_decode(response.data.accessToken)
               setName(decoded.name)
               setUserId(decoded.userId)
               setAdmin(decoded.isAdmin)
               setExpire(decoded.exp)
          } catch (error) {
               console.log(error);
          }
     }

     const axiosJWT  = axios.create();

     axiosJWT.interceptors.request.use(
          async (config) => {
               const currentDate = new Date();
               if(expire * 1000 < currentDate.getTime()){
                    const response = await axios.get("http://localhost:5000/token")
                    config.headers.Authorization = `Bearer ${response.data.accessToken}`
                    setToken(response.data.accessToken)
                    const decoded = jwt_decode(response.data.accessToken)
                    setName(decoded.name)
                    setUserId(decoded.userId)
                    setAdmin(decoded.isAdmin)
                    setExpire(decoded.exp)
               }
               return config;
          }, (error)=> {
               return Promise.reject(error)
          }
     )




     const login = async(inputs)=>{
          try {
              const res = await axios.post("http://localhost:5000/api/users/login", inputs);
              if(res.data.error){
                    setError(res.data.error)
               }else{
                    navigate("/dashboard")
                    toast.success(res.data.msg, {
                         position: "bottom-center",
                         autoClose: 3000,
                         closeOnClick: true,
                         pauseOnHover: true,
                    })
                    setName(res.data.name)
                    setUserId(res.data.userId)
                    setToken(res.data.accessToken)
                    setAdmin(res.data.isAdmin)
               }
          } catch (error) {
               console.log(error);
          }
     }

     const getAllUsers = async()=>{
          try {
               const res = await axiosJWT.get("http://localhost:5000/api/users", {
                    headers:{
                         authorization : `Bearer ${token}`
                    }
               })
               console.log(res);
          } catch (error) {
             console.log(error);  
          }
     }

     return (
          <AuthContext.Provider value={{ login, error,getAllUsers }}>
               {children}
          </AuthContext.Provider>
     )
}