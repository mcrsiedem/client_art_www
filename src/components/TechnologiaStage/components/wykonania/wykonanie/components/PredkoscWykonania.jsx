import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../RowWykonanie.module.css";
import { reg_int } from "utils/initialvalue";
import { useWykonania } from "hooks/useWykonania";

export default  function PredkoscWykoniania ({ rowWykonanie }) {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  const [czasWykonania] = useWykonania()

  return (
    <div className={style.col_dane_przeloty}>
      
      <input
        className={style.input}
        value={rowWykonanie.predkosc}
        onChange={(e) => {


          if (e.target.value == "" || reg_int.test(e.target.value)) {
            updateWykonanie({
              ...rowWykonanie,
              predkosc:e.target.value,
              czas: czasWykonania(rowWykonanie,rowWykonanie.naklad,e.target.value),
              update: true
            });
          }
        }}
      ></input>
    </div>
  );
};