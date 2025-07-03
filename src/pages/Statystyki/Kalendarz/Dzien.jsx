import React, { useState, useEffect, useRef, useContext } from "react";
import style from "./Dzien.module.css";
import Logo_ustawienia2 from "assets/refresh_green2.svg";
import iconClose2 from "assets/x2.svg";
import iconCopy from "assets/copy.svg";
import iconCalc from "assets/calc.svg";
import iconSheet from "assets/extract.svg";

import iconWC from "assets/wc.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";


export default function Dzien({ grup }) {


  const appContext = useContext(AppContext);

  const kalendarzDane = appContext.kalendarzDane;

  return (
    <div className={style.container}>
      <div className={style.data}>  {grup.data}</div>

      <div>        {kalendarzDane
        .filter((x) => x.data_spedycji == grup.data)
        .map((praca, i) => {
         return <PRACA key={"abc" + i} praca={praca}/>
          // return <p key={"abc" + i}>{praca.firma_nazwa}</p>;
        })}
        </div>
     
     <DZIEN_DRUK grup={grup}/>
      {/* <div className={style.data}>  {kalendarzDane.filter(x=>  x.data_spedycji == grup.data).map(x => parseInt(x.przeloty_druku)).reduce((a, b) => a + b, 0).toLocaleString()}</div> */}

    </div>
  );
}



function PRACA({ praca }) {


  const appContext = useContext(AppContext);

  const kalendarzDane = appContext.kalendarzDane;

  // let do_druku = parseInt(kalendarzDane.filter(x=>  x.data_spedycji == grup.data).map(x => parseInt(x.przeloty_druku)).reduce((a, b) => a + b, 0))
  // let wydrukowano = parseInt(kalendarzDane.filter(x=>  x.data_spedycji == grup.data).map(x => parseInt(x.przeloty_druku_zakonczone)).reduce((a, b) => a + b, 0))
  // let wydrukowano_procent = Math.ceil(wydrukowano*100 / do_druku)

      return (
    <div className={style.container_praca}>

  
   <div className={style.title_praca}> {praca.firma_nazwa}  - 100 {praca.wydrukowano_procent} %  </div>
 
   

     </div>
  );
  

}


function DZIEN_DRUK({ grup }) {


  const appContext = useContext(AppContext);

  const kalendarzDane = appContext.kalendarzDane;

  let do_druku = parseInt(kalendarzDane.filter(x=>  x.data_spedycji == grup.data).map(x => parseInt(x.przeloty_druku)).reduce((a, b) => a + b, 0))
  let wydrukowano = parseInt(kalendarzDane.filter(x=>  x.data_spedycji == grup.data).map(x => parseInt(x.przeloty_druku_zakonczone)).reduce((a, b) => a + b, 0))
  let wydrukowano_procent = Math.ceil(wydrukowano*100 / do_druku)
  if(do_druku!=0){
      return (
    <div className={style.container_druk}>

     
      <div className={style.title}> Do druku : {do_druku.toLocaleString()} ark.</div>
      <div className={style.title}> Wydrukowane : {wydrukowano.toLocaleString()} ark.</div>
      <div className={style.title}>  {wydrukowano_procent} %</div>

     </div>
  );
  }

}