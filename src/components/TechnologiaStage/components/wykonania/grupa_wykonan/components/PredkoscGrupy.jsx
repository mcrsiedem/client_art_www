import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "./Grupa_wykonan.module.css";

import { reg_txt } from "utils/initialvalue";
import { zamienNaGodziny } from "actions/zamienNaGodziny";
import { useWykonania } from "hooks/useWykonania";


export default  function PredkoscGrupy ({ rowGrupa })  {
  const techContext = useContext(TechnologyContext);
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  const [czasWykonania,statusWykonaniaTechnologia,updateGrupaWykonan_updateWykonania_narzad]=useWykonania()

  return (
    <div className={style.col_dane_przeloty}>
      
      <label className={style.label}> Prędkość </label>
      <input
      
        className={style.input}
        value={rowGrupa.predkosc}
        onChange={(e) => {
          if (e.target.value == "" || reg_txt.test(e.target.value)) {
                       updateGrupaWykonan_updateWykonania_narzad({
              ...rowGrupa,
              predkosc: e.target.value,
              update: true
            });
          }
        }}
      ></input>
    </div>
  );
};