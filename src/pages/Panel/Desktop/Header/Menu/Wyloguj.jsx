import React from "react";
import axios from "axios";
import { IP } from "utils/Host";
import DecodeToken from "pages/Login/DecodeToken";
import { useNavigate } from "react-router-dom";
import { useSocket } from "context/SocketContext";
export default function Wyloguj ({setIsOpen}){
  const navigate = useNavigate();
  const { logoutIO } =
    useSocket();
 return(
             

              <li
                onClick={() => {
                      navigate("/Login");
    sessionStorage.removeItem("token");
logoutIO()
                  setIsOpen(false);
                }}
              >
                Wyloguj
              </li>
              ) 


  
}