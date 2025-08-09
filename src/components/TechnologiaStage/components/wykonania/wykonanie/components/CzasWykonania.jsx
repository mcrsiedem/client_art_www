import React, {useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../RowWykonanie.module.css";
import { reg_int } from "utils/initialvalue";
import { zamienNaGodziny } from "actions/zamienNaGodziny";

export default  function CzasWykonania ({ rowWykonanie }) {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  return (
    <div className={style.col_dane_przeloty}>
      <input
      disabled
        className={style.input}
        value={zamienNaGodziny(rowWykonanie.czas)}
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