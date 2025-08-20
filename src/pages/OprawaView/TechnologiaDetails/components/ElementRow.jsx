import React, {useContext, } from "react";
import style from "./ElementRow.module.css";
import { TechnologyContext } from "context/TechnologyContext";

export default function ElementRow({ element,i }) {
  const techContext = useContext(TechnologyContext);
  const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
  const grupyOprawaAll = techContext.grupyOprawaAll;
  const elementyTech = techContext.elementyTech;
  return (
    <div key={i} className={style.elementRow}>

{elementyTech
 .filter(x=> x.id == element)
                    .map((el, i) => {
                      return ( <p>{el.id}</p>)
                      }
                  )}
 


    </div>
  );
}


