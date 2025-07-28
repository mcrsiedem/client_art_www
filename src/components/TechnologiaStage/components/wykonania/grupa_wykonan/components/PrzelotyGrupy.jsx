import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "./Grupa_wykonan.module.css";

import { reg_txt } from "utils/initialvalue";


export default  function PrzelotyGrupy  ({ rowGrupa }) {
  const techContext = useContext(TechnologyContext);
  const updateGrupaWykonan = techContext.updateGrupaWykonan
  return (
    <div className={style.col_dane_przeloty}>
      
      <label className={style.label}> Przeloty </label>
      <input
      
       className={style.input}
        value={rowGrupa.przeloty}
        onChange={(e) => {
          if (e.target.value == "" || reg_txt.test(e.target.value)) {
            // updateGrupaWykonan({
            //   ...rowGrupa,
            //   predkosc: e.target.value,
            // });
          }
        }}
      ></input>
    </div>
  );
};