import React, { useState, useEffect, useRef, useContext } from "react";
import { _etap_plikow, _status_wykonania, _typ_elementu, reg_int } from "utils/initialvalue";
import { useNavigate } from "react-router-dom";
import style from "./RowPrzerwaMiniOprawa.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _status } from "utils/initialvalue";
import { zamienNaGodziny } from "actions/zamienNaGodziny";
import { dragDropProcesGrupa } from "actions/dragDropProcesGrupa";
import { updateAddPrzerwa } from "actions/updateAddPrzerwa";
import { date_time } from "actions/date_time";
import { updateZmienCzasTrwaniaGrupy } from "actions/updateZmienCzasTrwaniaGrupy";
import { useGrupyWykonan } from "hooks/useGrupyWykonan";
import { updateZmienCzasTrwaniaGrupyPrzerwa } from "actions/updateZmienCzasTrwaniaGrupyPrzerwa";


export default function RowPrzerwaMiniOprawa({ grup,unlockTable, setUnlockTable }) {
    const techContext = useContext(TechnologyContext);
    const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
  const selectedProces = techContext.selectedProces;
      const fechparametryTechnologii = techContext.fechparametryTechnologii;

                  const selectColor = (etap,status) =>{
    if (status==4) return style.procesRow_tr_DRUK
    if (status==2) return style.procesRow_tr_AKCEPT
    if (status==3) return style.procesRow_tr_RIP
     return style.procesRow_tr
  }


  return (
    <>
      <tr
        title={"Grupa id: " + grup.global_id}
        draggable={unlockTable}
        key={grup.global_id}
        onDrop={() => handleDrop(grup.global_id, grup.procesor_id)}
        onDragOver={handleDragOver}
        onDragStart={() => {
          handleDragStart(grup.global_id, grup.typ_grupy);
        }}
        className={selectColor(grup.zamowienia_pliki_etap, grup.status)}
      >
        {/* <td style={{ paddingLeft:"5px",minWidth: "130px", width: "130px", fontSize:"0.9rem" }}>{grup.poczatek}</td> */}
                  {/* <td className={style.td_tableProcesy_poczatek}>{grup.poczatek}</td> */}

        {/* <td className={style.td_tableProcesy_czas} >{zamienNaGodziny(grup.czas)} </td> */}
        {/* <KoniecGrupa grup={grup} /> */}
        <td></td>
        
        
      {grup.typ_grupy == 1 && selectedProces==1?  <><td></td><td></td><td></td><td></td></> : <><td></td><td></td><td></td> </> }
                  
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        {/* <Status grup={grup} /> */}
      </tr>
    </>
  );


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
      let czas = sessionStorage.getItem("czas_przerwy");
      updateAddPrzerwa(id, czas,fechGrupyAndWykonaniaForProcesor);
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
}


const KoniecGrupa = ({ grup }) => {
  const techContext = useContext(TechnologyContext);
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
  return (
    <td className={style.td_tableProcesy_koniec}>
      <input
        disabled= {false}
        className={style.input2}
        type="datetime-local"
  //        min="2023-06-07T00:00"
  // max="2023-06-14T00:00"
       
        date-
        value={grup.koniec}
        onChange={(e) => {


          if (e.target.value != "" ) {
updateZmienCzasTrwaniaGrupyPrzerwa(grup.global_id,date_time( e.target.value),fechGrupyAndWykonaniaForProcesor)
            console.log("data: "+ date_time( e.target.value))
          }
        }}
      ></input>
    </td>
  );
};


function Status({grup}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _status_wykonania_przerwy = contextApp._status_wykonania_przerwy
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const selectedProcesor = techContext.selectedProcesor
    const _status_wykonania = contextApp._status_wykonania
 const [sumujGrupe,statusGrupyProcesView,statusGrupyTechnologia,statusGrupyProcesViewPrzerwa] = useGrupyWykonan()
            const selectColor = (etap,status) =>{
    if (status==4) return style.select_DRUK
    if (status==2) return style.select_AKCEPT
    if (status==3) return style.select_RIP
     return style.select
  }
  return (
<td style={{width: "160px"}}>
      <select
       className={selectColor(grup.zamowienia_pliki_etap,grup.status) }
        value={grup.status}
        onChange={(event) => {

            // statusGrupyProcesViewPrzerwa({...grup, status: event.target.value})
      
        }}
      >
        {grup.typ_grupy==1 && selectedProcesor==1 ?_status_wykonania_przerwy.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        )) : _status_wykonania.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))
      
      }
      </select>
      </td>

  );
}
