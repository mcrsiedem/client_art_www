import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "./Grupa_wykonan.module.css";

import { updatePrzeniesWykonanieDoInnejGrupy } from "actions/updatePrzeniesWykonanieDoInnejGrupy";

import { useGrupyWykonan } from "hooks/useGrupyWykonan";
import { useGrupyWykonanFirst } from "hooks/useGrupyWykonanFirst";

import { useAccess } from "hooks/useAccess";
import { dragDropProcesGrupaToProcesorFromTech } from "actions/dragDropProcesGrupaToProcesorFromTech";


export default  function ProcesorGrupy({ rowGrupa,rowProces, handleChangeCardOprawa }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesory = contextApp.procesory
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const wykonania = techContext.wykonania;
  const setWykonania = techContext.setWykonania;
  const daneTech = techContext.daneTech;
  const [sumujGrupe] = useGrupyWykonan()
  const [updateGrupaWykonan] = useGrupyWykonanFirst()
  const [wolno,wolno_procesor] = useAccess(false);

  return (
    <div
                onDragOver={handleDragOver}
                onDrop={() => {

                     if(wolno_procesor(rowProces.nazwa_id)){
                      handleDrop(rowGrupa.id,rowProces.id,rowGrupa.id)}
                     }
                }
     className={style.col_dane}>
      <label className={style.label}> Start : {rowGrupa.poczatek} Wyk.: {rowGrupa.ilosc_narzadow}</label>
      <select
        className={rowGrupa.global_id == 0 && daneTech.id !=1 ? style.input_yellow:style.input}
        value={rowGrupa.procesor_id}
        onChange={(event) => {

          if(wolno_procesor(rowProces.nazwa_id)){
            if(daneTech.id !=1){
               dragDropProcesGrupaToProcesorFromTech(rowGrupa.global_id,event.target.value,fechparametryTechnologii,rowGrupa.zamowienie_id,rowGrupa.technologia_id)
            }else{
              updateGrupaWykonan({ ...rowGrupa, procesor_id: event.target.value });
            }
                
         
          }
      
    
        }}
      >
        {procesory
        .filter(x => x.grupa == rowProces.nazwa_id )
        .map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );

  function handleDragOver(e) {
    e.preventDefault();
  
  }

 
  function handleDrop(id,proces_id,grupa_id_drop) {
    if (sessionStorage.getItem("typ_drag") == "wykonanie" && sessionStorage.getItem("id_proces_wykonanie_drag") == proces_id && sessionStorage.getItem("id_grupa_wykonanie_drag") != grupa_id_drop) {

if(daneTech.id !=1){
      let id_drag_wykonania = sessionStorage.getItem("id_wykonanie_drag");
        if(wykonania.filter(x => x.grupa_id == sessionStorage.getItem("id_grupa_wykonanie_drag")).length == 1){
          updatePrzeniesWykonanieDoInnejGrupy(id_drag_wykonania, grupa_id_drop, fechparametryTechnologii, true,daneTech.zamowienie_id)
        }
        if(wykonania.filter(x => x.grupa_id == sessionStorage.getItem("id_grupa_wykonanie_drag")).length > 1){
        updatePrzeniesWykonanieDoInnejGrupy(id_drag_wykonania, grupa_id_drop, fechparametryTechnologii, false,daneTech.zamowienie_id)
        }
}else{

  // przed pierwszym zapisem
  let new_wykonania;
  new_wykonania = wykonania.map((t) => {
    if (t.id == sessionStorage.getItem("id_wykonanie_drag")) {
      return {...t,grupa_id: grupa_id_drop};
    } else {
      return t;
    }
  })

  setWykonania(new_wykonania);
  sumujGrupe(new_wykonania)
  

}

    }
  }


}
