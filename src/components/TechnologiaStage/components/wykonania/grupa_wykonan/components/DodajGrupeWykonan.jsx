import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "./Grupa_wykonan.module.css";

import { reg_txt } from "utils/initialvalue";
import { useAccess } from "hooks/useAccess";
import { updateWydzielWykonanieZgrupy } from "actions/updateWydzielWykonanieZgrupy";
import icon from "assets/copy.svg";
import { getMaxID } from "actions/getMaxID";


export default  function DodajGrupeWykonan({ rowGrupa,rowProces }) {
  const techContext = useContext(TechnologyContext);
  let grupaWykonan = techContext.grupaWykonan;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const daneTech = techContext.daneTech;
  const wykonania = techContext.wykonania;

const [wolno,wolno_procesor] = useAccess(false);

      const sprawdzCzyOstnieWykonanie = () => {

  if (wykonania.filter( x => x.grupa_id == sessionStorage.getItem("id_grupa_wykonanie_drag")).length >1) return true
}
  return (
    <div style={{ paddingTop: "13px" }}>
      <img
        onDragOver={handleDragOver}
        onDrop={() => {

     
                     if(wolno_procesor(rowProces.nazwa_id)){
            handleDrop()
          }
          
 
        } }
        className={style.expand}
        src={icon}
        onClick={() => {
            if(daneTech.id==1){
   let newGrupa = [...grupaWykonan]
          newGrupa.push({...rowGrupa,id: getMaxID(grupaWykonan),czas:0,przeloty:0 })
          setGrupaWykonan(newGrupa)
          console.log(newGrupa)
            }
       
        }}
        alt="Procesy"
      />
    </div>
  );



  function handleDragOver(e) {
    // e.preventDefault();

        if (sprawdzCzyOstnieWykonanie()) {
      e.preventDefault();
    }
  }

  function handleDrop() {
 if (sessionStorage.getItem("id_proces_wykonanie_drag") == rowGrupa.proces_id) {

 
    if (sessionStorage.getItem("typ_drag") == "wykonanie") {
      if(daneTech.id!=1){
      let id_drag_wykonania = sessionStorage.getItem("id_wykonanie_drag");
      updateWydzielWykonanieZgrupy(id_drag_wykonania, fechparametryTechnologii,daneTech.zamowienie_id);
      }
      if(daneTech.id==1){
        let id_drag_wykonania = sessionStorage.getItem("id_wykonanie_drag");
 
        // let id_drop_grupa = id;
        
        }


    }

    
  }
  }
}