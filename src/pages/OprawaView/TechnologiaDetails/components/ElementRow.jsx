import React, {useContext, } from "react";
import style from "./ElementRow.module.css";
import { TechnologyContext } from "context/TechnologyContext";

export default function ElementRow({ element,i }) {
  const techContext = useContext(TechnologyContext);
  const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
  const grupyOprawaAll = techContext.grupyOprawaAll;
  const elementyTech = techContext.elementyTech;
  const procesyElementowTech = techContext.procesyElementowTech;

  return (
    <div key={i} className={style.elementRow}>
    

      <div><p>{element.typ_nazwa}</p> </div>
      <div className={style.row}>

       {procesyElementowTech
       .filter(x=> x.element_id == element.id)
                    .map((el, i) => {
                      return ( <p>{el.nazwa}</p>)
                      }
                  )}


 
      </div>


    </div>
  );
}


function Row({ elem }) {
  const techContext = useContext(TechnologyContext);
  const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
  const grupyOprawaAll = techContext.grupyOprawaAll;
  const elementyTech = techContext.elementyTech;
  const procesyElementowTech = techContext.procesyElementowTech;

  return (
    <div className={style.row}>





    </div>
  );
}