// import iconCopy from "../../../../../svg/copy.svg";
// import iconTrash from "../../../../../svg/trash2.svg";
import style from "./OprawaElementyStage.module.css";
// import { _papiery } from "../../api";
// import ElementTableHeader from "./ElementTableHeader";
// import { useState } from "react";
// import Logo_ustawienia from "../../../../svg/settings.svg";


// okienko do wydzielania części z oprawy


export default function OprawaElementyStage({
  setShowOprawaElementyStage,
  showOprawaElementyStage,

  procesyElementow,
  listaDostepnychProcesow
}) {
  return (
    <div className={style.insertContainer}>
      <div className={style.header}>
        {" "}
        <p className={style.title}>Podziel oprawę </p>
      </div>
      <div className={style.center}>
        
      </div>
      <div className={style.row}>
        <button
          className={style.btn}
          onClick={() => {
            setShowOprawaElementyStage(false);
          }}
        >
          Anuluj
        </button>

        <button className={style.btn}>OK</button>
      </div>
    </div>
  );
}
