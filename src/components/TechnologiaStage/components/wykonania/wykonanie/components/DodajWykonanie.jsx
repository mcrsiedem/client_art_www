import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "../RowWykonanie.module.css";
import icon from "assets/copy.svg";


import { reg_txt } from "utils/initialvalue";
import { zamienNaGodziny } from "actions/zamienNaGodziny";
import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";


export default  function DodajWykonanie({ rowWykonanie }) {
  const techContext = useContext(TechnologyContext);
  const wykonania = techContext.wykonania;
  const setWykonania = techContext.setWykonania;
  return (
    <div className={style.col_dane_kopiuj}>
      <img

        className={style.expand}
        src={icon}
        onClick={() => {

          let newWykonania = [...wykonania]
          newWykonania.push({...rowWykonanie,id: getMaxID(wykonania),indeks:getMaxIndeks(wykonania),insert:true })
          setWykonania(newWykonania)

        }}
        alt="Procesy"
      />
    </div>
  );
}