// import iconCopy from "../../../../../svg/copy.svg";
// import iconTrash from "../../../../../svg/trash2.svg";
import style from "./ElementyProcesInsert.module.css";
// import { _papiery } from "../../api";
// import ElementTableHeader from "./ElementTableHeader";
// import { useState } from "react";
// import Logo_ustawienia from "../../../../svg/settings.svg";



export default function ElementyProcesInsert({showElementyProcesyInsert,setShowElementyProcesyInsert}) {

  return (
    <div className={style.insertContainer}>
      
      <div className={style.header} > <p className={style.title}>Procesy</p></div>
      <div className={style.center} > </div>
      <div className={style.row} > <button className={style.btn} onClick={() => { setShowElementyProcesyInsert(false) }} >Anuluj</button > <button className={style.btn}>OK</button></div>
    </div>
  );
}

