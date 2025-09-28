import React, {useContext, } from "react";
import style from "./ElementPane.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import ElementRow from "./ElementRow";

export default function ElementPane({ grup }) {
  const techContext = useContext(TechnologyContext);
  const legiFragmenty = techContext.legiFragmenty;
  const unikalneElementsIds = [...new Set(legiFragmenty.filter(x=> x.oprawa_id==grup.id).map(x => x.element_id))]
  const elementyTech = techContext.elementyTech;
  
  return (
    <div className={style.elementPane}>
                  {
                  elementyTech.filter(element => unikalneElementsIds.includes(element.id))
                    .map((element, i) => {
                      return (<ElementRow element={element} i={i}/>)
                      // return (<p> {element}</p>)
                      }
                  )}
    </div>
  );
}


