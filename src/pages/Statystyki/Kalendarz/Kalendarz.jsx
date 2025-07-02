import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./Kalendarz.module.css"
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
// import KALENDARZ_BTN from "./btn/KALENDARZ_BTN";
import Dzien from "./Dzien";


export default function Kalendarz() {
  const [value, setValue] = useState("cos2");
  const navigate = useNavigate();

  const techContext = useContext(TechnologyContext);

  const appContext = useContext(AppContext)
  const kalendarz = appContext.kalendarz;


  return (
    <div className={style.container}>
              <div  className={style.main}>
                <Dzien/>
              </div>
    </div>
  );
}




