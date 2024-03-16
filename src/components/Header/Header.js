import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./Header.module.css";
import ReactLogo from "../../assets/grid.svg";
import ReactLogo_ilosc from "./ilosc.svg";
import ReactLogo_ustawienia from "./settings.svg";
import ReactLogo_full from "./full.svg";
import ReactLogo_history from "./history.svg";
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
          src={ReactLogo}
          onClick={() => {
            navigate("/Panel");
            // console.log("z contextu :"+ token.rowSelected)
          //  sessionStorage.setItem("us",{id:1,imie:"Maciek"})

          }}
          alt="React Logo"
        />
        <img className={style.icon} src={ReactLogo_ustawienia} alt="React Logo" />
        <img className={style.icon} src={ReactLogo} alt="React Logo" />
        <img className={style.icon} src={ReactLogo} alt="React Logo" />
        <img
          className={style.icon}
          src={ReactLogo_ilosc}
          onClick={() => {
            navigate("/Print");
          }}
          alt="React Logo"
        />
        <img
          className={style.icon}
          src={ReactLogo_history}
          onClick={() => {
            navigate("/History");
          }}
          alt="React Logo"
        />
      </div>
      <div className={style.leftHeaderContener}></div>
      <div className={style.rightHeaderContener}>
        <img
          className={style.icon}
          src={ReactLogo_full}
          onClick={() => {
            // fullScrean();
          }}
          alt="React Logo"
        />
      </div>
    </header>
  );
}

export default Header;
