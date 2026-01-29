import React, { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../RowWykonanie.module.css";
import { reg_int } from "utils/initialvalue";

export default function IndeksWykonania({ rowWykonanie }) {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie;
  return (
    <div className={style.col_dane_indeks}>
      <input
        // disabled
        title={" Procesor ID: "+rowWykonanie.procesor_id + " LEGA_iD: "+rowWykonanie.lega_id }
        className={style.input_indeks}
        value={rowWykonanie.indeks}
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
}
