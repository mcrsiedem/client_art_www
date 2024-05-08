import style from "./KosztyDodatkowe.module.css";
import HeaderKoszty from "./components/HaderKoszty";
import TableKoszty from "./components/TableKoszty";
import { ModalInsertContext } from "context/ModalInsertContext";
import React, { useEffect, useState, useContext,useRef,useCallback } from "react";
export default function KosztyDodatkowe({ handleChangeCardPakowanie}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const kosztyDodatkowe = contextModalInsert.kosztyDodatkowe;
const setKosztyDodatkowe = contextModalInsert.setKosztyDodatkowe;

if(kosztyDodatkowe.length == 0){
  return null
}
  return (
    
      <div className={style.container}>
        <div className={style.pakowanie}>
        <HeaderKoszty style={style}/>
        <TableKoszty  handleChangeCardPakowanie={handleChangeCardPakowanie} />
        </div>
      
      </div>
  );
}





