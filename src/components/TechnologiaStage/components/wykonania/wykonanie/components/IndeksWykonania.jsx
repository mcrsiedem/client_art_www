import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "../RowWykonanie.module.css";
import icon from "assets/copy.svg";


import { reg_int, reg_txt } from "utils/initialvalue";
import { zamienNaGodziny } from "actions/zamienNaGodziny";
import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";
import { useWykonania } from "hooks/useWykonania";
import { useAccess } from "hooks/useAccess";


export default  function IndeksWykonania ({ rowWykonanie }) {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  const arkusze = techContext.arkusze
  return (
    <div className={style.col_dane_indeks}>
      
      {/* <label className={style.label}> Czas </label> */}
      <input
      disabled
      title="Kolejność"
        className={style.input_indeks}
        value={rowWykonanie.indeks }
        onChange={(e) => {


          if (e.target.value == "" || reg_int.test(e.target.value)) {
            updateWykonanie({
              ...rowWykonanie,
              indeks: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};