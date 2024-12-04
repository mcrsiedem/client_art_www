import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./TechnologieViewHeader.module.css";

import iconClose2 from "assets/x2.svg";
import iconAdd from "assets/addIcon2.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";



function TechnologieViewHeader({ selectedProces,setSelectedProces,setSelectedProcesor}) {
  const navigate = useNavigate();
  const show = localStorage.getItem("header");

  const appContext = useContext(AppContext)

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
    <div className={style.container}>
    <header id="header" className={style.body}>


          <div className={style.leftHeaderContener}>
<p>Technologie</p>

          </div>
          

      <div className={style.centerHeaderContener}>
        
        {/* <img
              className={style.icon}
              src={iconAdd}
              onClick={() => {
                dodaj_clikHandler();
                console.log("z contextu :"+ token.rowSelected)
                 sessionStorage.setItem("us",{id:1,imie:"Maciek"})
              }}
              alt="React Logo"
            />
        */}
      </div>
        <div className={style.rightHeaderContener}>
          {/* <input></input> */}
          <img
            className={style.icon}
            src={iconClose2}
            onClick={() => {
              navigate("/Panel");
            }}
            alt="React Logo"
          />
        </div>


    </header>
    </div>
  );
}

export default TechnologieViewHeader;


