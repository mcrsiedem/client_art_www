import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./Footer.module.css";
import iconClose2 from "assets/x2.svg";
import iconAdd from "assets/addIcon2.svg";
import iconAdd2 from "assets/edit3.svg";
import iconCopy from "assets/edit2.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import REFRESH_ZAMOWIENIA_BTN from "components/REFRESH_BTN/REFRESH_ZAMOWIENIA_BTN";
import DecodeToken from "pages/Login/DecodeToken";
import { _etapy_produkcji } from "utils/initialvalue";
import BTN_INFO_ZAMOWIENIA from "./BTN_INFO_ZAMOWIENIA";
import { ModalInsertContext } from "context/ModalInsertContext";
import { zabezpiecz } from "actions/zabezpiecz";
import Szukaj from "./Szukaj";
import BTN_DIAGNOSTYKA from "./BTN_INSPEKCJA";
import BTN_INSPEKCJA from "./BTN_INSPEKCJA";
import { useZestawienia } from "hooks/useZestawienia";

export default function Footer({ dodaj_clikHandler,kto, setKto,dataDo,dataOd,setDataDo,setDataOd}) {
  const navigate = useNavigate();
  const effectRan = useRef(false);

   const contextApp = useContext(AppContext);
   const contexModal = useContext(ModalInsertContext);
     const contextModalInsert = useContext(ModalInsertContext);



  return (
    <footer onDoubleClick={()=>{  
     }} id="header" className={style.headerZamowieniaContainer}>
      <div className={style.leftHeaderContener}>
      </div>

      <div className={style.centerHeaderContener}>
        <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> Narządy: </p><p className={style.title_przeloty_wartosc}> { contextApp.realizacjeZestawienie.length} </p></div>
        <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> Przeloty: </p><p className={style.title_przeloty_wartosc}> { contextApp.realizacjeZestawienie.map(x => x.zrealizowano).reduce((a, b) => a + b, 0).toLocaleString()} </p></div>
               


      </div>
      <div className={style.rightHeaderContener}>




      </div>
    </footer>
  );
}





