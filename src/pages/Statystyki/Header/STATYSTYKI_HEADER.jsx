import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./STATYSTYKI_HEADER.module.css";
import Logo_ustawienia2 from "assets/refresh_green2.svg";
import iconClose2 from "assets/x2.svg";
import iconCopy from "assets/copy.svg";
import iconCalc from "assets/calc.svg";
import iconSheet from "assets/extract.svg";

import iconWC from "assets/wc.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { updateDeletePrzerwa } from "actions/updateDeletePrzerwa";  
import axios from "axios";
// import { IP } from "";
import { getZamowieniaInfoGrupy } from "actions/getZamowieniaInfoGrupy";


function STATYSTYKI_HEADER() {
  const [value, setValue] = useState("cos2");
  const navigate = useNavigate();
  const show = localStorage.getItem("header");
  const techContext = useContext(TechnologyContext);
  const selectedProces = techContext.selectedProces;
  const setSelectedProces = techContext.setSelectedProces;
  const setSelectedProcesor = techContext.setSelectedProcesor;
  const selectedProcesor = techContext.selectedProcesor;
  const wykonaniaAll = techContext.wykonaniaAll;
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
  const appContext = useContext(AppContext)

  return (
    <div className={style.container}>
              <header  className={style.body}>
                <div className={style.leftHeaderContener}>

                </div>

                <div className={style.centerHeaderContener}>

                

                </div>
                <div className={style.rightHeaderContener}>

            
                  <img
                    className={style.icon_close}
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

export default STATYSTYKI_HEADER;







