import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify"

export const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {

     const [error, setError] = useState("")
     const [name, setName] = useState("")
     const [userId, setUserId] = useState("")
     const [token, setToken] = useState("")
     const [admin, setAdmin] = useState(null)
     const navigate = useNavigate();

     console.log(error);

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

     return (
          <AuthContext.Provider value={{ login, error }}>
               {children}
          </AuthContext.Provider>
     )
}