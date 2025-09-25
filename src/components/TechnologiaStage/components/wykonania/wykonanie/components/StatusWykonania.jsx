import React, {useContext } from "react";
import { AppContext } from "context/AppContext";
import style from "../RowWykonanie.module.css";
import { useWykonania } from "hooks/useWykonania";
import { useAccess } from "hooks/useAccess";

export default  function StatusWykonania({ rowWykonanie,rowProces }) {
  const contextApp = useContext(AppContext);
  const _status_wykonania = contextApp._status_wykonania

  
  const [czasWykonania,statusWykonaniaTechnologia] = useWykonania(true);
const [wolno,wolno_procesor] = useAccess(false);


  return (
    <div className={style.col_dane}>

      <select 
        className={style.select}
        value={rowWykonanie.status}
        onChange={(event) => {

          if(rowWykonanie.technologia_id==1){
            }else{
              if(wolno_procesor(rowProces.nazwa_id)){
                // wyłączone aby zakańczać z pozycji operatora
                //  statusWykonaniaTechnologia({...rowWykonanie,status:event.target.value,stary_status: rowWykonanie.status })
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