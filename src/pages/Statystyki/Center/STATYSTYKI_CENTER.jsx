import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./STATYSTYKI_CENTER.module.css"
import KALENDARZ_BTN from "./btn/KALENDARZ_BTN";
import Kalendarz from "../Kalendarz/Kalendarz";


export default function STATYSTYKI_CENTER() {

  return (
    <div className={style.container}>
          
              <div className={style.leftHeaderContener}>
                <KALENDARZ_BTN/>
              </div>

              <div className={style.rightHeaderContener}>
                <Kalendarz/>
              </div>
    </div>
  );
}




