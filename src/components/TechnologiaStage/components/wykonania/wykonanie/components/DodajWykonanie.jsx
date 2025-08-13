import React, { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../RowWykonanie.module.css";
import icon from "assets/copy.svg";
import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";

export default function DodajWykonanie({ rowWykonanie }) {
  const techContext = useContext(TechnologyContext);
  const wykonania = techContext.wykonania;
  const setWykonania = techContext.setWykonania;
  const updateGrupaAfterAddWykonanie = techContext.updateGrupaAfterAddWykonanie;
  return (
    <div className={style.col_dane_kopiuj}>
      <img
        className={style.expand}
        src={icon}
        onClick={() => {
          let newWykonania = [...wykonania];
          let wyk = {
            ...rowWykonanie,
            id: getMaxID(wykonania),
            indeks: getMaxIndeks(wykonania),
            insert: true,
          }
          newWykonania.push(wyk);

          updateGrupaAfterAddWykonanie(wyk)
          
          setWykonania(newWykonania);


        }}
        alt="Procesy"
      />
    </div>
  );
}
