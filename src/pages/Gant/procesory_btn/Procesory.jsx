
import React, { useEffect, useState,useRef,useContext,useCallback } from "react";
import style from "./ProcesyView.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _status } from "utils/initialvalue";
import { dragDropProcesGrupaToProcesor } from "actions/dragDropProcesGrupaToProcesor";
import { useGant } from "../useGant";


export default function Procesory() {

  
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const procesory = contextApp.procesory
  const setSelectedProcesor = techContext.setSelectedProcesor
  const selectedProces = techContext.selectedProces
  return (
    <div className={style.procesor_btn_main}>
      <div className={style.procesor_btn_left}>  </div>

                  <div className={style.procesor_btn_center}>
                              {procesory
                ?.filter(x => x.grupa == selectedProces  )
                .filter(x => x.id == 35  )
                .map((procesor) => (
                  <Btn_procesor key={procesor.id} setSelectedProcesor={setSelectedProcesor} id={procesor.id} nazwa={procesor.nazwa} procesor={procesor} />
                ))}
        {procesory
                ?.filter(x => x.grupa == selectedProces && x.id !=35 )
                .map((procesor) => (
                  <Btn_procesor key={procesor.id} setSelectedProcesor={setSelectedProcesor} id={procesor.id} nazwa={procesor.nazwa} procesor={procesor} />
                ))}
            </div>
        <div className={style.procesor_btn_right}>  </div>
    </div>
  );
}

const Btn_procesor = ({id,nazwa,procesor}) =>{
  const appContext = useContext(AppContext)
  const techContext = useContext(TechnologyContext);
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const setSelectedProcesor = techContext.setSelectedProcesor
  const selectedProcesor = techContext.selectedProcesor
  const procesory = appContext.procesory
  const setProcesory = appContext.setProcesory
  const [refreshGant] = useGant();

//   function handleDrop(id) {
//     if(id!=selectedProcesor){
//           if (sessionStorage.getItem("typ_drag") == "grupa_proces" && sessionStorage.getItem("typ_grupy") != 1) {
//       let id_drag_grupa_proces = sessionStorage.getItem("id_grupa_proces_drag");
//       dragDropProcesGrupaToProcesor(id_drag_grupa_proces,id,fechGrupyAndWykonaniaForProcesor)
//     }
//     }
//   }

//   function handleDragOver(e) {
//     e.preventDefault();
//   }

  return(
    <button  

    title={"Procesor ID: "+ id}
    key={id}
//    onDrop={()=>handleDrop(id)}
//   onDragOver={handleDragOver}
    className={selectedProcesor == id ? style.btn_procesor_selected : style.btn_procesor}
    onClick={(event) => {
        refreshGant(id)
     setSelectedProcesor(id)
   }}>
     {nazwa} 
   </button> 
  )
}