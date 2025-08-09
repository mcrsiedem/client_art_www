import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../RowWykonanie.module.css";
import { reg_int } from "utils/initialvalue";

export default  function RodzajArkuszaWykonania({ rowWykonanie }) {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  const arkusze = techContext.arkusze
  return (
    <div className={style.col_dane_rodzaj_arkusza}>
      
      <input
      disabled
        className={style.input}
        value={rowWykonanie.nazwa_wykonania }
        // value={parseInt(arkusze?.filter(x=>x.id == rowWykonanie.arkusz_id)[0]?.rodzaj_arkusza)/parseInt(arkusze?.filter(x=>x.id == rowWykonanie.arkusz_id)[0]?.ilosc_leg)+"ka"}
        onChange={(e) => {


          if (e.target.value == "" || reg_int.test(e.target.value)) {
            updateWykonanie({
              ...rowWykonanie,
              czas: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};