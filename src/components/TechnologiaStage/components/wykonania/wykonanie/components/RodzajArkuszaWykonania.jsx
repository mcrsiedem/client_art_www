import React, { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../RowWykonanie.module.css";
import { reg_int } from "utils/initialvalue";

export default function RodzajArkuszaWykonania({ rowWykonanie }) {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie;

  return (
    <div className={style.col_dane_rodzaj_arkusza}>
      <input
      title="nazwa_wykonania"
        disabled
        className={style.input}
        value={rowWykonanie.nazwa_wykonania}
        onChange={(e) => {
          if (e.target.value == "" || reg_int.test(e.target.value)) {
            updateWykonanie({
              ...rowWykonanie,
              nazwa_wykonania: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
}
