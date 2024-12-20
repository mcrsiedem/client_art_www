import React, { useState, useEffect, useRef, useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";

import icon from "assets/copy.svg";
import { AppContext } from "context/AppContext";

import style from "./RowWykonanie.module.css";
import { reg_int } from "utils/initialvalue";
// import NrArkusza from "./NrArkusza";
// import { reg_int } from "utils/initialvalue";


export default function ProcesViewRow({ grup }) {

  // return (
  //   <tr draggable onDrag={() => handleDragWykonanieStart(rowWykonanie.id)}>
  //     <div className={style.container}>
  //       <ID rowWykonanie={rowWykonanie} />
  //       <CzasWykoniania rowWykonanie={rowWykonanie} />
  //       <StatusWykonania rowWykonanie={rowWykonanie} />
  //     </div>
  //   </tr>
  // );


  return (
<>
                <tr
                  draggable
                   key={grup.global_id}
                  onDrop={()=>handleDrop(grup.global_id,grup.procesor_id)}
                 onDragOver={handleDragOver}
                  
                  onDragStart={() => handleDragStart(grup.global_id,grup.typ_grupy)}
                  className={style.tr_legi_mini}
                  onDoubleClick={(node, event) => {
         
                      if(grup.typ_grupy != 1 ){
                        fechparametryTechnologii(grup.technologia_id)
                      }
                    
                  }}
                >
                  <td style={{width: "130px"}}>{grup.poczatek}</td>
                  <td style={{width: "60px"}}>{zamienNaGodziny(  grup.czas) } </td>
                  <td style={{width: "140px"}}>{grup.koniec} </td>
                  <td style={{width: "50px"}}>{grup.nr}</td>
                  <td style={{width: "50px"}}>{grup.rok}</td>
                  <td style={{width: "200px"}}>{grup.klient}</td>
                  <td >{grup.tytul}</td>
                  <td style={{width: "100px"}}>{typ_elementu?.filter(x => x.id == grup.element_id)[0]?.nazwa}</td>
                  <td style={{width: "200px"}}>{grup.global_id}</td>
                  {grup.typ_grupy != 1 ?  <Stan grup={grup}/> : <></>}
                  {grup.typ_grupy != 1 ?  <Status grup={grup}/> : <></>}
                  {/* <Stan grup={grup}/>
                  <Status grup={grup}/> */}
                  
                 
                </tr>
                {expand ? (
              wykonaniaAll
                .filter((el) => el.grupa_id == grup.id && el.technologia_id == grup.technologia_id)
                .map((row) => {
                  return (
                    <tr  key={row.global_id}>
                       {/* draggable={lockDragDrop}  onDragStart={()=>handleDragStart(row.id)} */}
      
                      <td>{row.id}</td>
                      <td>{row.czas}</td>
                      <td> global id {row.global_id}</td>

                      <td>element_id {row.element_id}</td>
                      <td></td>
                      <td></td>
                      <td></td>

                      <td>grupa_id {row.grupa_id}</td>
                      {/* <Typ row={row} /> */}
                      {/* <td>{row.ilosc_stron} </td> */}
                      {/* <WersjaOprawaFragment
                        row={row}
                        handleChangeCardFragmenty={handleChangeCardFragmenty}
                      /> */}

                      {/* <NakladOprawaFregment
                        row={row}
                        handleChangeCardFragmenty={handleChangeCardFragmenty}
                      />
                       */}
                  
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      
                 
                    </tr>
                  );
                })
            ) : (
              <></>
            )}   



</>
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
