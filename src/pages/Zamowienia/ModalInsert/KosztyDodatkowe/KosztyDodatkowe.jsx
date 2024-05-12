import style from "./KosztyDodatkowe.module.css";
import HeaderKoszty from "./components/HaderKoszty";
import TableKoszty from "./components/TableKoszty";
import KosztyDodatkoweEdit from "pages/Zamowienia/KosztyDodatkoweEdit/KosztyDodatkoweEdit";
import { ModalInsertContext } from "context/ModalInsertContext";
import React, { useEffect, useState, useContext,useRef,useCallback } from "react";
export default function KosztyDodatkowe({ handleChangeCardPakowanie}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const kosztyDodatkoweZamowienia = contextModalInsert.kosztyDodatkoweZamowienia;
const setKosztyDodatkoweZamowienia = contextModalInsert.setKosztyDodatkoweZamowienia;
const showKosztyDodatkoweEdit = contextModalInsert.showKosztyDodatkoweEdit;


if(kosztyDodatkoweZamowienia.length == 0){
  return <>
  <button>Dodaj koszty dodatkowe...</button>
  </>
}
  return (
    
      <div className={style.container}>
        <div className={style.pakowanie}>
        <HeaderKoszty style={style}/>
        <TableKoszty  handleChangeCardPakowanie={handleChangeCardPakowanie} />
        </div>
        {showKosztyDodatkoweEdit &&(
        <KosztyDodatkoweEdit/>
      )}
      </div>
  );
}





