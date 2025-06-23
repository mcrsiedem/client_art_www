import React, { useEffect, useState,useContext,useRef} from "react";
import style from "./ZamowieniaInfo.module.css";
import iconClose2 from "assets/x2.svg";

import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";

import { useApiPapier, usePapier } from "hooks/useApiPapier";



export default function ZamowieniaInfo({parent}) {

  // parent oznacza pochodzenie komponentu - zamowienia / technologia
    const appContext = useContext(AppContext);

 if(appContext.showZamowieniaInfo){
  return (
    <div className={style.grayScaleBackground}>
      <div className={style.window}>
        <div className={style.header}>
          <p className={style.title}>Ilość przelotów </p>
          <img
            className={style.icon2}
            src={iconClose2}
            onClick={() => {
              appContext.setShowZamowieniaInfo(false);
            }}
          />
        </div>

        <div>
          <div className={style.bindingContainer}>
            <Technologie />
            <Zamowienia />
          </div>

          <div className={style.containerDrukFalc}>
            <div className={style.bindingContainer}>
              <Druk />
            </div>

            <div className={style.bindingContainer}>
              <Falc />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
 }
}

const Zamowienia = () => {
    const appContext = useContext(AppContext);
  return (
    <div className={style.cardNetto} >
      Zamówienia
      <input
        className={style.cardInputNetto}
        value={appContext.zamowienia.filter(x=>x.select == true).length}
        placeholder="..."
        type="text"
      ></input>
      szt.
    </div>
  );
};

const Technologie = () => {
    const appContext = useContext(AppContext);
    let ilosc_tech = parseInt(appContext.zamowienia.filter(x=>x.select == true && x.technologia_id != null).length)
    let ilosc_zam = parseInt(appContext.zamowienia.filter(x=>x.select == true ).length)
  return (
    <div className={style.cardNetto} >
    Technologie
      <input
        className={ilosc_tech == ilosc_zam ? style.cardInputNetto:style.cardInputNettoRed}
        value={ilosc_tech} 
        placeholder="..."
        type="text"
      ></input>{" "}
      szt.
    </div>
  );
};

const Druk = () => {
    const appContext = useContext(AppContext);
    const zamowieniaInfo = appContext.zamowieniaInfo;
    let procent = Math.ceil(parseInt(zamowieniaInfo.przeloty_druk_zakonczone)*100/ parseInt(zamowieniaInfo.przeloty_druk)) ||0
  return (
    <div  className={style.drukContainer} >
    <p className={style.carDruk}> Przeloty druk : {zamowieniaInfo.przeloty_druk_zakonczone.toLocaleString()}  </p> <p className={style.carDrukZ}> z </p>  <p className={style.carDruk}> {zamowieniaInfo.przeloty_druk.toLocaleString()} ark.</p>   
    <p className={procent == 100 ? style.carDrukGreen:style.carDrukBlue}> {procent} %</p> 
    </div>
  );
};

const Falc = () => {
    const appContext = useContext(AppContext);
    const zamowieniaInfo = appContext.zamowieniaInfo;
    let procent = Math.ceil(parseInt(zamowieniaInfo.przeloty_falc_zakonczone)*100/ parseInt(zamowieniaInfo.przeloty_falc)) ||0

  return (
     <div  className={style.drukContainer} >
    <p className={style.carDruk}> Przeloty falc : {zamowieniaInfo.przeloty_falc_zakonczone.toLocaleString() }  </p>  <p className={style.carDrukZ} > z </p>  <p className={style.carDruk}>  {zamowieniaInfo.przeloty_falc.toLocaleString()} ark.</p>  
   
    <p className={procent == 100 ? style.carDrukGreen:style.carDrukBlue}> {procent} %</p> 
    </div>
  );
};