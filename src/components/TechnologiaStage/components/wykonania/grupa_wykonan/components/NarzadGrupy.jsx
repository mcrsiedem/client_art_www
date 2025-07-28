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
import { useWykonania } from "hooks/useWykonania";


export default function NarzadGrupy ({ rowGrupa }) {
  const techContext = useContext(TechnologyContext);
  // const updateGrupaWykonan_updateWykonania_narzad = techContext.updateGrupaWykonan_updateWykonania_narzad
  const [czasWykonania,statusWykonaniaTechnologia,updateGrupaWykonan_updateWykonania_narzad]=useWykonania()

  return (
    <div className={style.col_dane_przeloty}>
      
      <label className={style.label}> Narzad </label>
      <input
      
       className={style.input}
        value={rowGrupa.narzad}
        onChange={(e) => {
          if (e.target.value == "" || reg_txt.test(e.target.value)) {
            updateGrupaWykonan_updateWykonania_narzad({
              ...rowGrupa,
              narzad: e.target.value,
              update: true
            });
          }
        }}
      ></input>
    </div>
  );
};
