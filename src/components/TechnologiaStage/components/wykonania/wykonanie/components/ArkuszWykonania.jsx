import React, {useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../RowWykonanie.module.css";
import { reg_int } from "utils/initialvalue";

export default  function ArkuszWykonania  ({ rowWykonanie })  {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  const arkusze = techContext.arkusze
  return (
    <div className={style.col_dane_arkusz}>
      <input
      disabled
        className={style.input}
        value={"ark. "+arkusze?.filter(x=>x.id == rowWykonanie.arkusz_id)[0]?.nr_arkusza }
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