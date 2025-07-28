import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "./Grupa_wykonan.module.css";
import { AppContext } from "context/AppContext";
import { useGrupyWykonan } from "hooks/useGrupyWykonan";
import { useAccess } from "hooks/useAccess";


export default  function StatusGrupy({ rowGrupa,rowProces }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _status_wykonania = contextApp._status_wykonania
  const daneTech = techContext.daneTech
  const [sumujGrupe,statusGrupy,statusGrupyTechnologia] = useGrupyWykonan()
const [wolno,wolno_procesor] = useAccess(false);

  return (
    <div className={style.col_dane}>
      <label className={style.label}> Status </label>
      <select 
        className={style.select}
        value={rowGrupa.status}
        onChange={(event) => {
  
   if(wolno_procesor(rowProces.nazwa_id)){
         if(daneTech.id != 1){
            statusGrupyTechnologia({...rowGrupa, status: event.target.value, stary_status: rowGrupa.status,})
          }
   }
     

        }}
      >
        {_status_wykonania.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );
}