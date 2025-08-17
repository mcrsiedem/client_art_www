import React, {useContext, } from "react";
import style from "./ElementPane.module.css";
import { TechnologyContext } from "context/TechnologyContext";

export default function ElementPane({ grup }) {
  const techContext = useContext(TechnologyContext);
  const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
  const grupyOprawaAll = techContext.grupyOprawaAll;
  return (
    <div className={style.elementPane}>
   
    </div>
  );
}


