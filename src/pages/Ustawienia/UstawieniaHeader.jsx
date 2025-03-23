import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./UstawieniaHeader.module.css";

import iconClose2 from "assets/x2.svg";
import iconAdd from "assets/addIcon2.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";



function UstawieniaHeader() {
  const [value, setValue] = useState("cos2");
  const navigate = useNavigate();
  const show = localStorage.getItem("header");
  const techContext = useContext(TechnologyContext);


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

{/* <ProcesSelect selectedProces={selectedProces} setSelectedProces={setSelectedProces} setSelectedProcesor={setSelectedProcesor} selectedProcesor={selectedProcesor}/> */}
          <p className={style.ustawienia_txt}>Ustawienia </p> 
            {/* // wywietla zaznaczone zamowienia
          {appContext.zamowienia
          .filter(x=> x.select == true)
          .map((x=>{ return ( 
            <p> {x.id}, </p>
          )})) } */}



          </div>
          

      <div className={style.centerHeaderContener}>
        
             {/* <p>{selectedProcesor}</p> */}
       
        {/* <img
              className={style.icon}
              src={iconAdd}
              onClick={() => {
                // console.clear()
                console.log("Procesy: ")
                // console.log("Wykonania: ", wykonaniaAll)
                console.log("grupy: ",grupyWykonanAll)
              }}
              alt="React Logo"
            /> */}
       
      </div>
        <div className={style.rightHeaderContener}>
          {/* <input></input> */}
          <img
            className={style.iconClose}
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

export default UstawieniaHeader;


