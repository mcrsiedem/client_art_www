import style from "./KosztyDodatkowe.module.css";
import HeaderKoszty from "./components/HaderKoszty";
import TableKoszty from "./components/TableKoszty";

import { ModalInsertContext } from "context/ModalInsertContext";
import { addKosztDodatkowyZamowienia } from "actions/addKosztDodatkowyZamowienia";
import React, { useEffect, useState, useContext,useRef,useCallback } from "react";
import { useKosztyDodatkowe } from "hooks/useKosztyDodatkowe";
export default function KosztyDodatkowe({ handleChangeCardPakowanie}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const kosztyDodatkoweZamowienia = contextModalInsert.kosztyDodatkoweZamowienia;
const setKosztyDodatkoweZamowienia = contextModalInsert.setKosztyDodatkoweZamowienia;
const showKosztyDodatkoweEdit = contextModalInsert.showKosztyDodatkoweEdit;
const daneZamowienia = contextModalInsert.daneZamowienia;
const showTabs = contextModalInsert.showTabs
const setShowTabs = contextModalInsert.setShowTabs
 const [dodajKoszty] = useKosztyDodatkowe();
if(showTabs.koszty){



if(kosztyDodatkoweZamowienia.length == 0){
  return <>
  <div className={style.container2}>
   <button
    className={style.btn_dodaj_koszty}
    onClick={()=> dodajKoszty()}
   >Dodaj koszty dodatkowe</button> 
  </div>
  
  </>
}
  return (
    
      <div className={style.container}>
        <div className={style.pakowanie}>
        {/* <HeaderKoszty style={style}/> */}
        <TableKoszty  handleChangeCardPakowanie={handleChangeCardPakowanie} />
        </div>

      </div>
  );
}




}
