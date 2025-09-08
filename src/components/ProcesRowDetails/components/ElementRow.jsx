import React, {useContext, } from "react";
import style from "./ElementRow.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { getNameStatus } from "actions/getNameStatus";

import { AppContext } from "context/AppContext";

export default function ElementRow({ element,i }) {
  const techContext = useContext(TechnologyContext);
  const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
  const grupyOprawaAll = techContext.grupyOprawaAll;
  const elementyTech = techContext.elementyTech;
  const procesyElementowTech = techContext.procesyElementowTech;



  return (
    <div key={i} className={style.elementRow}>
      <p className={style.title_nazwa} >{element.typ_nazwa}</p> 
       {procesyElementowTech
       .filter(x=> x.element_id == element.id)
                    .map((el, i) => {
                      return ( <Row el={el}/>)
                      }
                  )}
    </div>
  );
}


function Row({ el }) {
  const techContext = useContext(TechnologyContext);
    const contextApp = useContext(AppContext);
  
  const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
  const grupyOprawaAll = techContext.grupyOprawaAll;
  const elementyTech = techContext.elementyTech;
  const procesyElementowTech = techContext.procesyElementowTech;
  const _status_wykonania = contextApp._status_wykonania
  const ifNull = (val) =>{

if(val == null){
  return ''
}else return val
   
  }


  const ifNullStatus = (val) =>{

if(val == null){
  return getNameStatus(1, _status_wykonania)
}else return getNameStatus(val, _status_wykonania)
   
  }

  return (
    <div className={style.row}>

    <p>{el.nazwa + " "+ ifNull(el.rodzaj) + " "+ ifNull(el.typ)+ " "+ ifNull(el.wykonczenie)}</p>
    <p className={el.status == 4 ?style.status_green:style.status_grey }>{ifNullStatus(el.status)}</p>



    </div>
  );
}