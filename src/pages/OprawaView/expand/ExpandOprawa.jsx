import React, {useContext } from "react";
import style from "./ExpandOprawa.module.css";

import { TechnologyContext } from "context/TechnologyContext";




export default function ExpandOprawa({setExpand}) {

  const techContext = useContext(TechnologyContext);



  return (
    <tr  className={style.container} >
      <td className={style.main}  colSpan={16}>
      
        <div className={style.container}>
          <div className={style.container2}>
          <button className={style.btn_zamknij} onClick={()=>setExpand(false)}>Zamknij</button>
          <button className={style.btn_zamknij} onClick={()=>setExpand(false)}>Zamknij</button>
          </div>
        </div>
      
      </td>
 
    </tr>
  );
}


