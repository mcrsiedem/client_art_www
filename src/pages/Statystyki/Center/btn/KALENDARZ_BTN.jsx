import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./KALENDARZ_BTN.module.css"
import Logo_ustawienia2 from "assets/refresh_green2.svg";
import iconKalendarz from "assets/kalendarz.svg";
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
import { useStatystyki } from "hooks/useStatystyki";



export default function KALENDARZ_BTN  () {
    const [refreshKalendarz] = useStatystyki()

    return (
    <button className={style.btn}
    onClick={()=> {refreshKalendarz()}}>
                      <img
                    className={style.icon}
                    src={iconKalendarz}

                    alt="React Logo"
                  />
      KALENDARZ
    </button>
  );
}




