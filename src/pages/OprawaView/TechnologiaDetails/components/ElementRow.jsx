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
                    .map((elem, i) => {
                      return ( <Row elem={elem}/>)
                      }
                  )}
 


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

      <div><p>{elem.typ_nazwa}</p> </div>
      <div>

       {procesyElementowTech
       .filter(x=> x.element_id == elem.id)
                    .map((el, i) => {
                      return ( <p>{el.nazwa}</p>)
                      }
                  )}

                         {procesyElementowTech
       .filter(x=> x.element_id == elem.id)
                    .map((el, i) => {
                      return ( <p>{el.status}</p>)
                      }
                  )}
 
      </div>




    </div>
  );
}