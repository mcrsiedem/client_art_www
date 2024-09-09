
import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import SelectBoxArkusze from "./SelectBoxArkusze";

import TypElementu from "./TypElementu";
import RodzajArkusza from "./RodzajArkusza";
import UsunArkusz from "./UsunArkusz";
import DodajArkusz from "./DodajArkusz";
import Rozwin from "./Rozwin";
import style from "../ArkuszeTech.module.css";
import NrArkusza from "./NrArkusza";


export default function RowArkusze  ({ row,i })  {
    const techContext = useContext(TechnologyContext);
    const legi = techContext.legi;
    const setLegi = techContext.setLegi;
    const arkusze = techContext.arkusze;
    const setArkusze = techContext.setArkusze;
    const dragLegaId = techContext.dragLegaId;
    const setDragLegaId = techContext.setDragLegaId;
    const legiFragmenty = techContext.legiFragmenty;
    
    const [showLegi, setShowLegi] = useState(false);
  
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
        <div className={style.main2}>
      <div      className={style.row3}        onDrop={()=>handleDrop(row.id)}
              onDragOver={handleDragOver}  key={row.id}>
              
{/*        
        <div className={style.input2}>{row.indeks}</div> */}
        {/* <td>{row.typ_elementu}</td> */}
        <Rozwin setShowLegi={setShowLegi} showLegi={showLegi} />
        <NrArkusza row={row} i={i+1}/>
        <TypElementu row={row} i={i+1}/>
   
        
        <div className={style.input_ark}>{row.naklad}</div>
        <RodzajArkusza row={row} />
   
        <td>{row.ilosc_leg}</td>
        <td>{row.uwagi}</td>
        {/* <td>{row.element_id}</td> */}
        {/* <td>{row.ilosc_stron}</td> */}
        <UsunArkusz row={row} />
        <DodajArkusz row={row} />

        <SelectBoxArkusze row={row} />
      </div>
      </div>
      {showLegi &&(<>     {legi.filter(x=> x.arkusz_id == row.id).map( (l,i) => {
        return  <>  <div draggable  onDragStart={()=>handleDragStart(l.id)}  className={style.row4} key={l.id}>
  
        {/* <td  >{i+1}</td> */}
        <td className={style.input2}>lega {l.indeks}</td>
   
     
        <td className={style.input2}>{l.naklad}</td>
        <td>{l.ilosc_stron}</td>
        {/* <td>{l.ilosc_leg}</td> */}
        <td>{l.uwagi}</td>
        {/* <td>{row.element_id}</td> */}
        {/* <td>{row.ilosc_stron}</td> */}
        <td></td>
        <td></td>
      </div>


{showLegi &&(<>     {legiFragmenty.filter(x=> x.lega_id == row.id).map( (l,i) => {
  return     <tr draggable  onDragStart={()=>handleDragStart(l.id)} className={style.tr_legi_mini} key={l.id}>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  {/* <td  >idfrag{l.id}</td>
  <td>frag.idx {l.indeks}</td> */}

  <td>{l.naklad}</td>
  <td> fragment</td>
  <td>{l.ilosc_leg}</td>
  <td>lega id{l.lega_id}</td>
  {/* <td>{row.element_id}</td> */}
  {/* <td>{row.ilosc_stron}</td> */}
  <td></td>
  <td></td>
</tr>
})}</>)}
</> 

      })
      
      }
      
      
      {/* {showLegiFragmenty &&(<>     {legiFragmenty.filter(x=> x.lega_id == row.id).map( (l,i) => { */}

      
      </>)}
  
      </>
    );
  };