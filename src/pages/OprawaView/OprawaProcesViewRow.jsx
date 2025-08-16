import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import style from "./OprawaProcesViewRow.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _status } from "utils/initialvalue";
import { zamienNaGodziny } from "actions/zamienNaGodziny";
import { date_time } from "actions/date_time";
import { useGrupyWykonan } from "hooks/useGrupyWykonan";
import { dragDropProcesGrupaOprawa } from "actions/dragDropProcesGrupaOprawa";
import { updateAddPrzerwaOprawa } from "actions/updateAddPrzerwaOprawa";
import { updateZmienCzasTrwaniaGrupyOprawa } from "actions/updateZmienCzasTrwaniaGrupyOprawa";
import { useAccess } from "hooks/useAccess";
import ExpandOprawa from "./expand/ExpandOprawa";

export default function OprawaProcesViewRow({ grup }) {
    const techContext = useContext(TechnologyContext);
    const fechGrupyOprawaForProcesor = techContext.fechGrupyOprawaForProcesor;

    const fechparametryTechnologiiDetails =     techContext.fechparametryTechnologiiDetails;
    const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
    const grupyOprawaAll = techContext.grupyOprawaAll;
      
          const [wolno] = useAccess(false);
          const selectColor = (status) => {
            if (status == 4) return style.procesRow_tr_DRUK;
            if (status == 2) return style.procesRow_tr_RIP;
            if (status == 3) return style.procesRow_tr_RIP;
            if (grup.select) return style.procesRow_select;
            return style.procesRow_tr;
          };

  return (
    <>
      <tr
        title={"Grupa id: " + grup.global_id}
        draggable={wolno()}
        key={grup.global_id}
        onDrop={() => handleDrop(grup.global_id, grup.procesor_id)}
        onDragOver={handleDragOver}
        onDragStart={() => {
          handleDragStart(grup.global_id, grup.typ_grupy);
        }}
        className={selectColor(grup.status)}
        onDoubleClick={(node, event) => {
          if (grup.typ_grupy !=1) {
     
            setGrupyOprawaAll(
              grupyOprawaAll
              .map(x => {return { ...x, show:false}})
              .map((t) => {
                if (t.global_id == grup.global_id) {
                  return { ...t, show:true};
                } else {
                  return t;
                }
              })
            );

            if(grup.typ_grupy != 1 ){
              fechparametryTechnologiiDetails(grup.id,grup.technologia_id)
            }else{
              techContext.setProcesyElementowTech([])
            }


          }
        }}
      >
        <td className={style.td_tableProcesy_poczatek}>{grup.poczatek}</td>
        <td className={style.td_tableProcesy_czas}>
          {zamienNaGodziny(grup.czas)}{" "}
        </td>
        <KoniecGrupa grup={grup} />
        <td className={style.td_tableProcesy_nr_stary}>{grup.nr_stary} </td>
        <td className={style.td_tableProcesy_nr}>{grup.nr} / {grup.rok.substring(2, 4)} </td>
        <td className={style.td_tableProcesy_klient}>{grup.klient}</td>
        <td style={{ minWidth: "130px" }}>{grup.tytul}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td className={style.td_tableProcesy_klient}>{grup.naklad}</td>
        <td className={style.td_tableProcesy_klient}>{grup.typ_procesu}</td>
        <td className={style.td_tableProcesy_klient}>{grup.rodzaj_procesu}</td>
        <td className={style.td_tableProcesy_spedycja}>{grup.data_spedycji}</td>
        <Status grup={grup} />
      </tr>

        <ExpandOprawa grup={grup}/>
    </>
  );


  //--------------- Funkcje
  function handleDrop(id) {
    if (sessionStorage.getItem("typ_drag") == "grupa_proces") {
      let id_drag_grupa_proces = sessionStorage.getItem("id_grupa_proces_drag");
      let id_drop_grupa_proces = id;
      dragDropProcesGrupaOprawa(
        id_drag_grupa_proces,
        id_drop_grupa_proces,
        fechGrupyOprawaForProcesor
      );
    }

    if (sessionStorage.getItem("typ_drag") == "przerwa") {
      let czas = sessionStorage.getItem("czas_przerwy");
      updateAddPrzerwaOprawa(id, czas,fechGrupyOprawaForProcesor);
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





const KoniecGrupa = ({ grup }) => {
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie;
  const fechGrupyOprawaForProcesor = techContext.fechGrupyOprawaForProcesor;
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
updateZmienCzasTrwaniaGrupyOprawa(grup.global_id,date_time( e.target.value),fechGrupyOprawaForProcesor)
            // console.log("data: "+ date_time( e.target.value))
          }
        }}
      ></input>
    </td>
  );
};


function Status({grup}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const _status_wykonania = contextApp._status_wykonania
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const selectedProcesor = techContext.selectedProcesor
    const [sumujGrupe,statusGrupyProcesView,statusGrupyTechnologia,statusGrupyProcesViewPrzerwa,statusGrupyTechnologia_OPRAWA,statusGrupyTechnologia_OPRAWA_PROCESY] = useGrupyWykonan()
            const selectColor = (status) => {
              if (grup.proces_nazwa_id != 1) {
                if (status == 4) return style.select_DRUK;
                if (status == 2) return style.select_RIP;
                if (status == 3) return style.select_RIP;
                return style.select;
              }
            };






  return (
<td style={{width: "160px"}}>
      <select
       className={selectColor(grup.status) }
        value={grup.status}
        onChange={(event) => {
   console.log("grupa"+grup)
          statusGrupyTechnologia_OPRAWA_PROCESY({...grup, status: event.target.value,stary_status: grup.status})
        }}
      >
        {_status_wykonania.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
      </td>

  );
}



