import React from "react";
import { useState, createContext, useContext, useEffect,useRef } from "react";

import style from './Login.module.css';
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { ip,ip_socket_io } from "../../Host";
import TokenContext from "../Context/tokenContext";
import { useCookies } from "react-cookie";
import DecodeToken from "./DecodeToken";

import iconLogo from "../../svg/logo.svg";
import io from "socket.io-client"
var header;

export default function Login({user,setUser}) {

  
 let socket;
  const context = useContext(TokenContext);

  const pokazSocket = () =>{
    context.setSocketStan(socket)
    console.log(context.socketStan)
  }
  useEffect(() => {
  
     socket = io.connect(ip_socket_io)
     context.setSocketStan(socket)
    header = document.getElementById("header");
    header.style.display = "none";
  }, []);


  const token = useContext(TokenContext);
  useEffect(()=>{
    socket.on("receive_message", (data)=>{
      //tu przychodzi odpowiedź i jest zapisana w contexcie
      token.setSocketReceive(data.message)

    })
  },[socket])

  const[socketReceive, setSocketReceive] = useState([])
  const[socketStan, setSocketStan] = useState([])

  const [cookies, setCookie] = useCookies([""]);

  const [values, setValues] = useState({
    login: "",
    haslo: "",
  });

  const navigate = useNavigate();
  
  const handleSubmit = (event,socekt) => {
    event.preventDefault();
    axios.get(ip + "users/" + values.login + "/" + values.haslo).then((res) => {
      if (res.data.length > 0) {
        sessionStorage.setItem("id", DecodeToken(res.data).id); // tymczasowo zapisje id usera
        sessionStorage.setItem("token", res.data); // token w sesionStorage aby kazda karta przegladarki wymagala zalogowania

        header.style.display = "grid";
        navigate("/Panel");


      } else {
        console.log("Błąd");
      }

    });
  };

  return (
    <div className={style.container}>
      <div className={style.center}>
      <Center values={values} setValues={setValues} handleSubmit={handleSubmit}/>
      </div>
    </div>
  );
}


function Center({values,setValues,handleSubmit}){
  return(
    <div className={style.loginPaine}>
    <form onSubmit={handleSubmit} className={style.form}> 
    <div>
    <img className={style.icon2} src={iconLogo} alt="logo" />
    </div>
    
    <div >
        <input
          type="text"
          name="login"
          placeholder="Login"
          onChange={(e) => setValues({ ...values, login: e.target.value })}
          className={style.loginInput}
       
        />
      </div>

      <div >
        <input
          type="password"
          name="haslo"
          placeholder="Hasło"
          onChange={(e) => setValues({ ...values, haslo: e.target.value })}
          className={style.loginInput}
         
        />
      </div>

      <button type="submit"  className={style.myButton}           >
        
        Zaloguj
      </button>


    </form>
  </div>
  )
}