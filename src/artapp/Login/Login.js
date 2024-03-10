import React from "react";
import { useState, createContext, useContext, useEffect } from "react";

import style from './Login.module.css';
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { ip } from "../../Host";
import TokenContext from "../Context/tokenContext";
import { useCookies } from "react-cookie";
import DecodeToken from "./DecodeToken";

import iconLogo from "../../svg/logo.svg";

var header;

export default function Login({user,setUser}) {
  function parseJwt(token) {
    //wyciaga payload z tokenu
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  useEffect(() => {
    header = document.getElementById("header");
    header.style.display = "none";
  }, []);

  const token = useContext(TokenContext);
  const [cookies, setCookie] = useCookies([""]);

  const [values, setValues] = useState({
    login: "",
    haslo: "",
  });

  //   axios.defaults.withCredentials= true;

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(ip + "users/" + values.login + "/" + values.haslo).then((res) => {
      if (res.data.length > 0) {
       //   token.setToken(parseJwt(res.data).id);
        // localStorage.setItem('header', true)
        // setCookie("token", res.data, { path: "/" });

        // sessionStorage.setItem("id", parseJwt(res.data).id); // tymczasowo zapisje id usera
        sessionStorage.setItem("id", DecodeToken(res.data).id); // tymczasowo zapisje id usera
        sessionStorage.setItem("token", res.data); // token w sesionStorage aby kazda karta przegladarki wymagala zalogowania

        // przechowuje usera w contexcie ale po odswieżeniu context jest pusty
        // token.setUser({
        //   id:parseJwt(res.data).id,
        //   imie:parseJwt(res.data).imie,
        //   nazwisko:parseJwt(res.data).nazwisko,
        //   login:parseJwt(res.data).login,
        //   dostep:parseJwt(res.data).dostep,

        //   })

        header.style.display = "grid";
        navigate("/Panel");
      } else {
        console.log("Błąd");
      }
      // console.log(res);
    });
  };

  return (
    <div className={style.container}>
      {/* <div className={style.header}>
        <Header/>
      </div> */}
      <div className={style.center}>
      
      <Center values={values} setValues={setValues} handleSubmit={handleSubmit}/>
      </div>

    </div>
  );
}

function Header(){
 return (<>

  
  </>)
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