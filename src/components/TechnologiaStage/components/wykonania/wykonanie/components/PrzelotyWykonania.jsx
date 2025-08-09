import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../RowWykonanie.module.css";
import { reg_int } from "utils/initialvalue";
import { useWykonania } from "hooks/useWykonania";

export default  function PrzelotyWykonania ({ rowWykonanie }){
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  return (
    <div className={style.col_dane_przeloty}>
      
      <input
        className={style.input}
        value={rowWykonanie.przeloty}
        onChange={(e) => {


          if (e.target.value == "" || reg_int.test(e.target.value)) {
            if(e.target.value == "" ) e.target.value =0

            updateWykonanie({
              ...rowWykonanie,
              przeloty: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};