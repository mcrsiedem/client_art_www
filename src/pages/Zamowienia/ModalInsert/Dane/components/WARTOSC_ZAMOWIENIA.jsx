import style from "../Dane.module.css";
import { useContext, useEffect, useState} from "react";

import { ModalInsertContext } from "context/ModalInsertContext";




export default function  WARTOSC_ZAMOWIENIA( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
const ksiegowosc = contextModalInsert.ksiegowosc;

const produkty = contextModalInsert.produkty;
  return(
      <div className={style.col}>
      <label className={style.label}> Wartość </label>
      <input className={style.input} 
      title="Nakład * cena"
      value={daneZamowienia.wartosc_zamowienia}
      onChange={(event) => {
       const re = /^\d{0,10}(?:\,\d{0,2}){0,1}$/;
       if ( event.target.value === '' || re.test(event.target.value)) {
             const cenaAsNumber = daneZamowienia.cena ? parseFloat(event.target.value.replace(',', '.')) : 0;
             const wartoscAsNumber = event.target.value  ? parseFloat(event.target.value.replace(',', '.')) : 0;
              let skonto =((parseFloat(daneZamowienia.skonto) || 0) / 100 )
              let wartosc_koncowa =(parseFloat(event.target.value) || 0) + (parseFloat(ksiegowosc.koszty_wartosc) || 0)


        setDaneZamowienia({
          ...daneZamowienia,
          wartosc_zamowienia: event.target.value,
          cena: (wartoscAsNumber / produkty[0].naklad || 0).toFixed(2),
          status: daneZamowienia.stan == 3 ? 3 : daneZamowienia.status,
          wartosc_koncowa: (wartosc_koncowa - (wartosc_koncowa * skonto)).toFixed(2),

          update: true,
        });
       }
        
      }}></input>
    </div>
  );
}