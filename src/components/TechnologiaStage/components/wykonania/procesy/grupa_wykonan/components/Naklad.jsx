import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "./Grupa_wykonan.module.css";

import { updatePrzeniesWykonanieDoInnejGrupy } from "actions/updatePrzeniesWykonanieDoInnejGrupy";

import { useGrupyWykonan } from "hooks/useGrupyWykonan";
import { useGrupyWykonanFirst } from "hooks/useGrupyWykonanFirst";

import { useAccess } from "hooks/useAccess";
import { dragDropProcesGrupaToProcesorFromTech } from "actions/dragDropProcesGrupaToProcesorFromTech";
import { reg_txt } from "utils/initialvalue";


export default  function NakladGrupy({ rowGrupa}) {
  const techContext = useContext(TechnologyContext);
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  const [sumujGrupe] = useGrupyWykonan()
  return (
    <div className={style.col_dane_przeloty}>
      
      <label className={style.label}> Naklad </label>
      <input
      disable
        className={style.input}
        // value={rowGrupa.nazwa}
        onChange={(e) => {
          if (e.target.value == "" || reg_txt.test(e.target.value)) {
            updateGrupaWykonan({
              ...rowGrupa,
              czas: e.target.value,
              update:true
            });
          }

          
        }}
      ></input>
    </div>
  );

}
