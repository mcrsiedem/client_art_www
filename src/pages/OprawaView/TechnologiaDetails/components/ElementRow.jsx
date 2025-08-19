import React, {useContext, } from "react";
import style from "./ElementRow.module.css";
import { TechnologyContext } from "context/TechnologyContext";

export default function ElementRow({ grup }) {
  const techContext = useContext(TechnologyContext);
  const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
  const grupyOprawaAll = techContext.grupyOprawaAll;
  return (
    <div className={style.elementRow}>
  <p>OK</p>
    </div>
  );
}


