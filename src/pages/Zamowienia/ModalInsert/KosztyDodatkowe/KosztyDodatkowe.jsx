import style from "./KosztyDodatkowe.module.css";
import HeaderKoszty from "./components/HaderKoszty";
import TableKoszty from "./components/TableKoszty";
import KosztyDodatkoweEdit from "pages/Zamowienia/KosztyDodatkoweEdit/KosztyDodatkoweEdit";
import { ModalInsertContext } from "context/ModalInsertContext";
import { addKosztDodatkowyZamowienia } from "actions/addKosztDodatkowyZamowienia";
import React, { useEffect, useState, useContext,useRef,useCallback } from "react";
export default function KosztyDodatkowe({ showTabs,handleChangeCardPakowanie}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const kosztyDodatkoweZamowienia = contextModalInsert.kosztyDodatkoweZamowienia;
const setKosztyDodatkoweZamowienia = contextModalInsert.setKosztyDodatkoweZamowienia;
const showKosztyDodatkoweEdit = contextModalInsert.showKosztyDodatkoweEdit;
const daneZamowienia = contextModalInsert.daneZamowienia;


if(showTabs.koszty){



if(kosztyDodatkoweZamowienia.length == 0){
  return <>
  <div className={style.container2}>
   <button
    className={style.btn_dodaj_koszty}
    onClick={()=>addKosztDodatkowyZamowienia(kosztyDodatkoweZamowienia,setKosztyDodatkoweZamowienia,daneZamowienia)}
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
        {showKosztyDodatkoweEdit &&(
        <KosztyDodatkoweEdit/>
      )}
      </div>
  );
}




}
