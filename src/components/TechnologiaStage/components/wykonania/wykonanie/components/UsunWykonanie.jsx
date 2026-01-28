import React, { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../RowWykonanie.module.css";
import icon from "assets/trash2.svg";
import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";

export default function UsunWykonanie({ rowWykonanie }) {
  const techContext = useContext(TechnologyContext);
  const wykonania = techContext.wykonania;
  const grupaWykonan = techContext.grupaWykonan;
  const setWykonania = techContext.setWykonania;
  const updateGrupaAfterAddWykonanie = techContext.updateGrupaAfterAddWykonanie;
  const updateGrupaAfterDeleteWykonanie = techContext.updateGrupaAfterDeleteWykonanie;

  // nie można skasować w ten spodób ostatniego wykonania
  if(wykonania.filter(x=> x.grupa_id == rowWykonanie.grupa_id && x.delete !=true).length >1){
      return (
    <div className={style.col_dane_kopiuj}>
      <img
      title={"global_id: "+rowWykonanie.global_id}
        className={style.expand}
        src={icon}
        onClick={() => {
          let newWykonania = [...wykonania];

          updateGrupaAfterDeleteWykonanie(rowWykonanie);
    setWykonania(
      newWykonania.map((t) => {
        if (t.global_id == rowWykonanie.global_id) {
          return {...t,delete: true};
        } else {
          return t;
        }
      })
    );


        }}
        alt="Procesy"
      />
    </div>
  );
  }

}
