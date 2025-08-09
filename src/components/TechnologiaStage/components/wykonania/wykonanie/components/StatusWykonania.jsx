import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "../RowWykonanie.module.css";
import icon from "assets/copy.svg";


import { reg_txt } from "utils/initialvalue";
import { zamienNaGodziny } from "actions/zamienNaGodziny";
import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";
import { useWykonania } from "hooks/useWykonania";
import { useAccess } from "hooks/useAccess";


export default  function StatusWykonania({ rowWykonanie,rowProces }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _status_wykonania = contextApp._status_wykonania
  const updateWykonanie = techContext.updateWykonanie
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  
  const [czasWykonania,statusWykonaniaTechnologia] = useWykonania(true);
const [wolno,wolno_procesor] = useAccess(false);


  return (
    <div className={style.col_dane}>
      {/* <label className={style.label}> Status </label> */}
      <select 
        className={style.select}
        value={rowWykonanie.status}
        onChange={(event) => {

          if(rowWykonanie.technologia_id==1){
            // updateWykonanie({ ...rowWykonanie, status: event.target.value });
            }else{
              if(wolno_procesor(rowProces.nazwa_id)){
                 statusWykonaniaTechnologia({...rowWykonanie,status:event.target.value,stary_status: rowWykonanie.status })
              }
             
              // updateWykonania(rowWykonanie.global_id,1,event.target.value,fechparametryTechnologii)
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