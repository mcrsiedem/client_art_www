import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";

import icon from "assets/copy.svg";
import { AppContext } from "context/AppContext";

import style from "./RowWykonanie.module.css";
import { reg_int } from "utils/initialvalue";
// import NrArkusza from "./NrArkusza";
// import { reg_int } from "utils/initialvalue";


export default function ProcesViewRow({ rowWykonanie, updateWykonaniaWszystkie }) {

  return (
    <div draggable onDrag={() => handleDragWykonanieStart(rowWykonanie.id)}>
      <div className={style.container}>
        <ID rowWykonanie={rowWykonanie} />
        {/* grupa id: {rowWykonanie.grupa_id}  */}
        <CzasWykoniania rowWykonanie={rowWykonanie} />
        <StatusWykonania rowWykonanie={rowWykonanie} />
      </div>
    </div>
  );




  //--------------- Funkcje
  function handleDrop(id) {
    if (sessionStorage.getItem("typ_drag") == "grupa_proces") {
      let id_drag_grupa_proces = sessionStorage.getItem("id_grupa_proces_drag");
      let id_drop_grupa_proces = id;
      dragDropProcesGrupa(
        id_drag_grupa_proces,
        id_drop_grupa_proces,
        fechGrupyAndWykonaniaForProcesor
      );
    }

    if (sessionStorage.getItem("typ_drag") == "przerwa") {
      updateAddPrzerwa(id, fechGrupyAndWykonaniaForProcesor);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragStart(id, typ_grupy) {
    sessionStorage.setItem("id_grupa_proces_drag", id);
    sessionStorage.setItem("typ_drag", "grupa_proces");
    sessionStorage.setItem("typ_grupy", typ_grupy);
  }
//----------------- 










}







function StatusWykonania({ rowWykonanie }) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _status_wykonania = contextApp._status_wykonania;
  const updateWykonanie = techContext.updateWykonanie;
  return (
    <div className={style.col_dane}>
      {/* <label className={style.label}> Status </label> */}
      <select
        className={style.select}
        value={rowWykonanie.status}
        onChange={(event) => {
          updateWykonanie({ ...rowWykonanie, status: event.target.value });
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
  const updateWykonanie = techContext.updateWykonanie;
  return (
    <div className={style.col_dane}>
      {/* <label className={style.label}> Czas </label> */}
      <input
        disabled
        className={style.input}
        value={rowWykonanie.czas}
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
  const updateWykonanie = techContext.updateWykonanie;
  return (
    <div className={style.col_dane}>
      {/* <label className={style.label}>  {rowWykonanie.nazwa} </label> */}
      <input
        disabled
        className={style.input}
        value={rowWykonanie.id}
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
