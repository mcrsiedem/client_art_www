import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "./Grupa_wykonan.module.css";
import { reg_txt } from "utils/initialvalue";


export default  function NakladGrupy({ rowGrupa}) {
  const techContext = useContext(TechnologyContext);
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  return (
    <div className={style.col_dane_przeloty}>
      
      <label className={style.label}> Naklad </label>
      <input
      disable
        className={style.input}
        value={rowGrupa.naklad}
        onChange={(e) => {
          if (e.target.value == "" || reg_txt.test(e.target.value)) {
            updateGrupaWykonan({
              ...rowGrupa,
              naklad: e.target.value,
              update:true
            });
          }

          
        }}
      ></input>
    </div>
  );

}
