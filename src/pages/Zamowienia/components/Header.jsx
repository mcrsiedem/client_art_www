import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./Header.module.css";
import ReactLogo from "assets/grid.svg";
import ReactLogo_ilosc from "assets/ilosc.svg";
import ReactLogo_ustawienia from "assets/settings.svg";
import ReactLogo_full from "assets/full.svg";
import ReactLogo_history from "assets/history.svg";
import iconClose from "assets/x.svg";
import iconAdd from "assets/addIcon2.svg";

import { useNavigate } from "react-router-dom";



function Header() {
  const [value, setValue] = useState("cos2");
  const navigate = useNavigate();
  const show = localStorage.getItem("header");

  // aby useEffect załadował się tylko raz
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === true) {
      // console.log("value: "+ value)
   //   console.log("Test tokenu"+ token.token)
      //console.log("Test pojedynczego rendera Header")
    }
    return () => {
      effectRan.current = true;
    };
  }, []);
  //---------------------------------------------------------



  return (
    <header id="header" className={style.body}>
      <div className={style.leftHeaderContener}>
        <img
          className={style.icon}
          src={iconAdd}
          onClick={() => {
            navigate("/Panel");
            // console.log("z contextu :"+ token.rowSelected)
          //  sessionStorage.setItem("us",{id:1,imie:"Maciek"})

          }}
          alt="React Logo"
        />
       


      </div>
      <div className={style.leftHeaderContener}></div>
      <div className={style.rightHeaderContener}>
        {/* <input></input> */}
        <img
          className={style.icon}
          src={iconClose}
          onClick={() => {
            navigate("/Panel");
          }}
          alt="React Logo"
        />
      </div>
    </header>
  );
}

export default Header;
