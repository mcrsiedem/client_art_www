import React, {  useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../RowWykonanie.module.css";
import { reg_int } from "utils/initialvalue";
import { useWykonania } from "hooks/useWykonania";

export default  function NakladWykonanie({ rowWykonanie }){
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  const [czasWykonania] = useWykonania()

  return (
    <div className={style.col_dane_przeloty}>
      
      <input
        className={style.input}
        value={rowWykonanie.naklad}
        onChange={(e) => {
          if (e.target.value == "" || reg_int.test(e.target.value)) {
            if(e.target.value == "" ) e.target.value =0
            if(rowWykonanie.nazwa=="Falcowanie")
              {
                updateWykonanie({
                  ...rowWykonanie,
                  naklad: e.target.value,
                  przeloty:e.target.value,
                  czas: czasWykonania(rowWykonanie,e.target.value,rowWykonanie.predkosc),
                  update:true
                });
              }else {
                            updateWykonanie({
              ...rowWykonanie,
              naklad: e.target.value,
              czas: czasWykonania(rowWykonanie,e.target.value,rowWykonanie.predkosc),
              update:true
            });
              }

          }
        }}
      ></input>
    </div>
  );
};
