import React, { useContext } from "react";
import style from "./Footer.module.css";
import { AppContext } from "context/AppContext";
import { _etapy_produkcji } from "utils/initialvalue";

export default function Footer({ }) {
   const contextApp = useContext(AppContext);
  return (
    <footer onDoubleClick={()=>{  
     }} id="header" className={style.headerZamowieniaContainer}>
      <div className={style.leftHeaderContener}>
              <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> Zaznaczono: </p><p className={style.title_przeloty_zaznaczenie}> { contextApp.realizacjeZestawienie.filter(x => x.select == true).length} /  { contextApp.realizacjeZestawienie.filter(x => x.select == true).map(x => x.zrealizowano).reduce((a, b) => a + b, 0).toLocaleString()} ark.</p></div>
      </div>
      <div className={style.centerHeaderContener}>
        <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> Narządy: </p><p className={style.title_przeloty_wartosc}> { contextApp.realizacjeZestawienie.length} </p></div>
        <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> Przeloty: </p><p className={style.title_przeloty_wartosc}> { contextApp.realizacjeZestawienie.map(x => x.zrealizowano || 0).reduce((a, b) => a + b, 0).toLocaleString()} </p></div>           
        <div className={style.title_przeloty_container}> <p className={style.title_przeloty}> Naklad: </p><p className={style.title_przeloty_wartosc}> { contextApp.realizacjeZestawienie.map(x => x.zrealizowano_naklad || 0).reduce((a, b) => a + b, 0).toLocaleString()} </p></div>           
      </div>
      <div className={style.rightHeaderContener}>

      </div>
    </footer>
  );
}





