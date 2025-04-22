import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import style from "./RowWykonanie.module.css";
import { reg_int } from "utils/initialvalue";
import { zamienNaGodziny } from "actions/zamienNaGodziny";
import { updateWykonania } from "actions/updateWykonania";

export default function RowWykonanie  ({rowWykonanie,updateWykonaniaWszystkie})  {
  return(<div
    draggable
    onDrag={() => handleDragWykonanieStart(rowWykonanie)}>
    <div  className={style.container}> 
      <ArkuszWykonania rowWykonanie={rowWykonanie}/>
      <RodzajArkuszaWykonania rowWykonanie={rowWykonanie}/>
      <NakladWykonanie rowWykonanie={rowWykonanie}/>
      <CzasWykoniania rowWykonanie={rowWykonanie}/>
      <PredkoscWykoniania rowWykonanie={rowWykonanie}/>
      <PrzelotyWykonania rowWykonanie={rowWykonanie}/>
      <MnoznikWykoniania rowWykonanie={rowWykonanie}/>
      <StanWykonania rowWykonanie={rowWykonanie}/>
      <StatusWykonania rowWykonanie={rowWykonanie}/>
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
    <div className={style.col_dane_przeloty}>
      
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
const ArkuszWykonania = ({ rowWykonanie }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  const arkusze = techContext.arkusze
  return (
    <div className={style.col_dane_arkusz}>
      
      {/* <label className={style.label}> Czas </label> */}
      <input
      disabled
        className={style.input}
        value={"ark. "+arkusze.filter(x=>x.id == rowWykonanie.arkusz_id)[0].nr_arkusza }
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
const RodzajArkuszaWykonania = ({ rowWykonanie }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  const arkusze = techContext.arkusze
  return (
    <div className={style.col_dane_rodzaj_arkusza}>
      
      <input
      disabled
        className={style.input}
        value={arkusze.filter(x=>x.id == rowWykonanie.arkusz_id)[0].rodzaj_arkusza+"ka"}
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

const NakladWykonanie = ({ rowWykonanie }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  return (
    <div className={style.col_dane_przeloty}>
      
      {/* <label className={style.label}> Czas </label> */}
      <input
      disabled
        className={style.input}
        value={rowWykonanie.naklad}
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
    <div className={style.col_dane_przeloty}>
      
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
    <div className={style.col_dane_przeloty}>
      
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

const PrzelotyWykonania = ({ rowWykonanie }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  return (
    <div className={style.col_dane_przeloty}>
      
      {/* <label className={style.label}> Czas </label> */}
      <input
      disabled
        className={style.input}
        value={rowWykonanie.przeloty}
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

