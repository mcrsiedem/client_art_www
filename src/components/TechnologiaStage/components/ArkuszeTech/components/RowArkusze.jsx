
import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import SelectBoxArkusze from "./SelectBoxArkusze";

import TypElementu from "./TypElementu";
import RodzajArkusza from "./RodzajArkusza";
import UsunArkusz from "./UsunArkusz";
import DodajArkusz from "./DodajArkusz";
import style from "../ArkuszeTech.module.css";


export default function RowArkusze  ({ row,showLegi })  {
    const techContext = useContext(TechnologyContext);
    const legi = techContext.legi;
    const setLegi = techContext.setLegi;
    const arkusze = techContext.arkusze;
    const setArkusze = techContext.setArkusze;
    const dragLegaId = techContext.dragLegaId;
    const setDragLegaId = techContext.setDragLegaId;
    
  
  
    const setDropArkuszId = techContext.setDropArkuszId;
    function handleDragStart(id){
      //   e.preventDefault();
  
      setDragLegaId(id)
     }
    function handleDrop(id) {
      // sprawdza czy upuszczamy właściwy obiekt
      // if (sessionStorage.getItem("typ_drag") == "fragment") {
      //   let id_drag_element = sessionStorage.getItem("id_element_drag");
      //   let id_drop_oprawa = id;
      //   handleChangeCardFragmentyOprawaId(id_drag_element, id_drop_oprawa);
      // }
      setLegi(
        legi.map((t, a) => {
        // console.log("oprawa id" +prev)
        if (t.id === dragLegaId) {
          return {
            ...t,
            arkusz_id: id
  
          };
        } else {
          return t;
        }
      })
    );
      console.log("drop: "+id)
      setDropArkuszId(id)
    }
  
    function handleDragOver(e) {
      e.preventDefault();
    }
  
    return (
      <>
      
      <tr              onDrop={()=>handleDrop(row.id)}
              onDragOver={handleDragOver} className={style.tr_legi} key={row.id}>
                <td></td>
        <SelectBoxArkusze row={row} />
        <td>{row.indeks}</td>
        {/* <td>{row.typ_elementu}</td> */}
  
        <TypElementu row={row} />
        <RodzajArkusza row={row} />
        <td>{row.naklad}</td>
        <td>{row.ilosc_leg}</td>
        <td>{row.uwagi}</td>
        {/* <td>{row.element_id}</td> */}
        {/* <td>{row.ilosc_stron}</td> */}
        <UsunArkusz row={row} />
        <DodajArkusz row={row} />
      </tr>
      {showLegi &&(<>     {legi.filter(x=> x.arkusz_id == row.id).map( (l,i) => {
        return     <tr draggable  onDragStart={()=>handleDragStart(l.id)} className={style.tr_legi_mini} key={l.id}>
        <td></td>
        <td></td>
        <td  >{i+1}</td>
        <td>lega {l.indeks}</td>
        <td></td>
        <td>{l.naklad}</td>
        <td>{l.ilosc_leg}</td>
        <td>{l.uwagi}</td>
        {/* <td>{row.element_id}</td> */}
        {/* <td>{row.ilosc_stron}</td> */}
        <td></td>
        <td></td>
      </tr>
      })}</>)}
  
      </>
    );
  };