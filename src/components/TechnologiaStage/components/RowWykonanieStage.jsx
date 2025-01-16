
import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";

import style from "./RowWykonanieStage.module.css";
import { reg_int } from "utils/initialvalue";
import { zamienNaGodziny } from "actions/zamienNaGodziny";
import { updateWykonania } from "actions/updateWykonania";
import {updateWydzielWykonanieZgrupy} from "actions/updateWydzielWykonanieZgrupy"
import icon from "assets/copy.svg";
import extract from "assets/extract.svg";
export default function RowWykonanieStage  ({rowWykonanie,updateWykonaniaWszystkie})  {


  return(<div
    draggable
    onDrag={() => handleDragWykonanieStart(rowWykonanie)}>
    <div  className={style.container}> 
      
      <CzasWykoniania rowWykonanie={rowWykonanie}/>
      <PredkoscWykoniania rowWykonanie={rowWykonanie}/>
      <MnoznikWykoniania rowWykonanie={rowWykonanie}/>
  
      <StanWykonania rowWykonanie={rowWykonanie}/>
      <StatusWykonania rowWykonanie={rowWykonanie}/>
      <DuplikujWykonanie rowWykonanie={rowWykonanie}/>
      
      <DodajGrupeWykonan row={rowWykonanie}/>
      

    </div>
  </div>)
  
  function handleDragWykonanieStart(rowWykonanie) {
    //   e.preventDefault();
    let id = null;
    if(rowWykonanie.technologia_id==1){
      id= rowWykonanie.id
    }
    if(rowWykonanie.technologia_id!=1){
      id= rowWykonanie.global_id
    }
    sessionStorage.setItem("id_wykonanie_drag", id);
    sessionStorage.setItem("typ_drag", "wykonanie");
    sessionStorage.setItem("id_proces_wykonanie_drag", rowWykonanie.proces_id);
    sessionStorage.setItem("id_grupa_wykonanie_drag", rowWykonanie.grupa_id);
  }
}

function StanWykonania({ rowWykonanie }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _stan_wykonania = contextApp._stan_wykonania
  const updateWykonanie = techContext.updateWykonanie
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  return (
    <div className={style.col_dane}>
      {/* <label className={style.label}> Status </label> */}
      <select 
        className={style.select}
        value={rowWykonanie.stan}
        onChange={(event) => {

          if(rowWykonanie.technologia_id==1){
          updateWykonanie({ ...rowWykonanie, stan: event.target.value });
          }else{
 // 1 - status
            // 2 - stan
            updateWykonania(rowWykonanie.global_id,2,event.target.value,fechparametryTechnologii)
          }
         
        }}
      >
        {_stan_wykonania.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );
}

function DodajGrupeWykonan({ row }) {
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const fechparametryTechnologii = techContext.fechparametryTechnologii;

  return (
    <div style={{ paddingLeft: "00px" }}>
      <img
      title="Wydziel wykonanie do oddzielnej grupy"
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(1)}
        className={style.expand}
        src={extract}
        onClick={() => {
          updateWydzielWykonanieZgrupy(row.id, fechparametryTechnologii);
        }}
        alt="Procesy"
      />
    </div>
  );

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(id) {
    if (sessionStorage.getItem("typ_drag") == "wykonanie") {
      let id_drag_wykonania = sessionStorage.getItem("id_wykonanie_drag");
      updateWydzielWykonanieZgrupy(id_drag_wykonania, fechparametryTechnologii);
    }
  }
}

function DuplikujWykonanie({ row }) {
  const techContext = useContext(TechnologyContext);
  const grupaWykonan = techContext.grupaWykonan;
  const setGrupaWykonan = techContext.setGrupaWykonan;
  const fechparametryTechnologii = techContext.fechparametryTechnologii;

  return (
    <div style={{ paddingLeft: "0px" }}>
      <img
      title="Duplikuj wykonanie"
        // onDragOver={handleDragOver}
        // onDrop={() => handleDrop(1)}
        className={style.expand}
        src={icon}
        onClick={() => {
          updateWydzielWykonanieZgrupy(row.id, fechparametryTechnologii);
        }}
        alt="Procesy"
      />
    </div>
  );

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(id) {
    if (sessionStorage.getItem("typ_drag") == "wykonanie") {
      let id_drag_wykonania = sessionStorage.getItem("id_wykonanie_drag");
      updateWydzielWykonanieZgrupy(id_drag_wykonania, fechparametryTechnologii);
    }
  }
}


function StatusWykonania({ rowWykonanie }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _status_wykonania = contextApp._status_wykonania
  const updateWykonanie = techContext.updateWykonanie
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  


  return (
    <div className={style.col_dane}>
      {/* <label className={style.label}> Status </label> */}
      <select 
        className={style.select}
        value={rowWykonanie.status}
        onChange={(event) => {

          if(rowWykonanie.technologia_id==1){
            updateWykonanie({ ...rowWykonanie, status: event.target.value });
            }else{
              updateWykonania(rowWykonanie.global_id,1,event.target.value,fechparametryTechnologii)
            }
      
        }}
      >
        {_status_wykonania.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </div>
  );
}

const CzasWykoniania = ({ rowWykonanie }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  return (
    <div className={style.col_dane}>
      
      {/* <label className={style.label}> Czas </label> */}
      <input
      disabled
        className={style.input}
        value={zamienNaGodziny(rowWykonanie.czas)}
        onChange={(e) => {


          if (e.target.value == "" || reg_int.test(e.target.value)) {
            updateWykonanie({
              ...rowWykonanie,
              czas: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};

const MnoznikWykoniania = ({ rowWykonanie }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  return (
    <div className={style.col_dane}>
      
      {/* <label className={style.label}> Czas </label> */}
      <input
      disabled
        className={style.input}
        value={rowWykonanie.mnoznik}
        onChange={(e) => {


          if (e.target.value == "" || reg_int.test(e.target.value)) {
            updateWykonanie({
              ...rowWykonanie,
              czas: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};

const PredkoscWykoniania = ({ rowWykonanie }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  return (
    <div className={style.col_dane}>
      
      {/* <label className={style.label}> Czas </label> */}
      <input
      disabled
        className={style.input}
        value={rowWykonanie.predkosc}
        onChange={(e) => {


          if (e.target.value == "" || reg_int.test(e.target.value)) {
            updateWykonanie({
              ...rowWykonanie,
              czas: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};

const ID = ({ rowWykonanie }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  return (
    <div className={style.col_dane}>
      
      {/* <label className={style.label}>  {rowWykonanie.nazwa} </label> */}
      <input
      disabled
        className={style.input}
        value={rowWykonanie.global_id}
        onChange={(e) => {


          if (e.target.value == "" || reg_int.test(e.target.value)) {
            updateWykonanie({
              ...rowWykonanie,
              czas: e.target.value,
            });
          }
        }}
      ></input>
    </div>
  );
};
