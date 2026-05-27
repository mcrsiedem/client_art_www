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

  const realizacjeZestawienieKlienci = contextApp.realizacjeZestawienie
const listaZKontekstu = contextApp?.realizacjeZestawienieKlienci || [];

// 2. Filtrujemy tylko te, które mają select ustawiony na true
const zaznaczoneElementy = listaZKontekstu.filter(x => x && x.select === true);

// 3. Sprawdzamy, czy są przynajmniej dwa zaznaczone elementy
const czySaPrzynajmniejDwa = zaznaczoneElementy.length >= 2;

  return (
    <footer onDoubleClick={()=>{  
     }} id="header" className={style.headerZamowieniaContainer}>
      <div className={style.leftHeaderContener}>
              {/* <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> Zaznaczono: </p><p className={style.title_przeloty_zaznaczenie}> { contextApp.realizacjeZestawienieKlienci.filter(x => x.select == true).length} /  { contextApp.realizacjeZestawienie.filter(x => x.select == true).map(x => x.zrealizowano).reduce((a, b) => a + b, 0).toLocaleString()} ark.</p></div> */}
      
      </div>
      
{czySaPrzynajmniejDwa ? (
  // WIDOK 1: Jeśli zaznaczono 2 lub więcej elementów -> Pokazuje CAŁOŚĆ
  <div className={style.centerHeaderContener}>
    <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> Zaznaczone: </p></div>           
    <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> Przeloty druk: </p><p className={style.title_przeloty_wartosc}> { listaZKontekstu.map(x => parseInt(x.druk_przeloty) || 0).reduce((a, b) => a + b, 0).toLocaleString()} </p></div>           
    <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> Przeloty falc: </p><p className={style.title_przeloty_wartosc}> { listaZKontekstu.map(x => parseInt(x.falc_przeloty) || 0).reduce((a, b) => a + b, 0).toLocaleString()} </p></div>           
    <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> Przeloty uv/folia: </p><p className={style.title_przeloty_wartosc}> { listaZKontekstu.map(x => parseInt(x.uszlachetnienie_przeloty) || 0).reduce((a, b) => a + b, 0).toLocaleString()} </p></div>           
    <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> PLN: </p><p className={style.title_przeloty_wartosc}> { listaZKontekstu.map(x => parseInt(x.suma_waluta_1) || 0).reduce((a, b) => a + b, 0).toLocaleString()} </p></div>           
    <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> EURO: </p><p className={style.title_przeloty_wartosc}> { listaZKontekstu.map(x => parseInt(x.suma_waluta_2) || 0).reduce((a, b) => a + b, 0).toLocaleString()} </p></div>           
    <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> USD: </p><p className={style.title_przeloty_wartosc}> { listaZKontekstu.map(x => parseInt(x.suma_waluta_3) || 0).reduce((a, b) => a + b, 0).toLocaleString()} </p></div>           
  </div>
) : (
  // WIDOK 2: Jeśli zaznaczono mniej niż 2 elementy -> Pokazuje tylko ZAZNACZONE
  <div className={style.centerHeaderContener}>
    <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> Całość: </p></div>           
    <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> Przeloty druk: </p><p className={style.title_przeloty_wartosc}> { zaznaczoneElementy.map(x => parseInt(x.druk_przeloty) || 0).reduce((a, b) => a + b, 0).toLocaleString()} </p></div>           
    <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> Przeloty falc: </p><p className={style.title_przeloty_wartosc}> { zaznaczoneElementy.map(x => parseInt(x.falc_przeloty) || 0).reduce((a, b) => a + b, 0).toLocaleString()} </p></div>           
    <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> Przeloty uv/folia: </p><p className={style.title_przeloty_wartosc}> { zaznaczoneElementy.map(x => parseInt(x.uszlachetnienie_przeloty) || 0).reduce((a, b) => a + b, 0).toLocaleString()} </p></div>           
    <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> PLN: </p><p className={style.title_przeloty_wartosc}> { zaznaczoneElementy.map(x => parseInt(x.suma_waluta_1) || 0).reduce((a, b) => a + b, 0).toLocaleString()} </p></div>           
    <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> EURO: </p><p className={style.title_przeloty_wartosc}> { zaznaczoneElementy.map(x => parseInt(x.suma_waluta_2) || 0).reduce((a, b) => a + b, 0).toLocaleString()} </p></div>           
    <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> USD: </p><p className={style.title_przeloty_wartosc}> { zaznaczoneElementy.map(x => parseInt(x.suma_waluta_3) || 0).reduce((a, b) => a + b, 0).toLocaleString()} </p></div>           
  </div>
)}





      <div className={style.rightHeaderContener}>




      </div>
    </footer>
  );
}





