import React, { useState, useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "./ChangePaper.module.css";



export default function ChangePaper({showChange,setShowChange,selectRow}) {
      const modalcontext = useContext(ModalInsertContext);
      const selectedElementROW = modalcontext.selectedElementROW;


    return (
    <div className={style.window}>
      <Header setShowChange={setShowChange}></Header>
      <p className={style.alert_label}> {selectRow.nazwa} {selectRow.gramatura} g/m2 {selectRow.wykonczenie}</p>
      <Zmien setShowChange={setShowChange} selectRow={selectRow}/>

    </div>
  );


}
