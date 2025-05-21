import React, { useState, useEffect, useRef, useContext } from "react";
import { _etap_plikow, _typ_elementu, reg_int } from "utils/initialvalue";
import { useNavigate } from "react-router-dom";
import style from "./ProcesViewRow.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _status } from "utils/initialvalue";
import { zamienNaGodziny } from "actions/zamienNaGodziny";
import { dragDropProcesGrupa } from "actions/dragDropProcesGrupa";
import { updateAddPrzerwa } from "actions/updateAddPrzerwa";
import { date_time } from "actions/date_time";
import { updateZmienCzasTrwaniaGrupy } from "actions/updateZmienCzasTrwaniaGrupy";
import { useGrupyWykonan } from "hooks/useGrupyWykonan";


export default function ProcesViewRowPrzerwa({ grup,unlockTable, setUnlockTable }) {
    const techContext = useContext(TechnologyContext);
    const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;
  const selectedProces = techContext.selectedProces;
      const fechparametryTechnologii = techContext.fechparametryTechnologii;
          const selectColor = (etapPlikow,status) =>{
            if (status==4 ) return style.procesRow_tr_DRUK
    if (etapPlikow==1 && selectedProces==1) return style.procesRow_tr
    if (etapPlikow==2 && selectedProces==1) return style.procesRow_tr
    if (etapPlikow==3 && selectedProces==1) return style.procesRow_tr
    if (etapPlikow==4 && selectedProces==1) return style.procesRow_tr_AKCEPT
    if (etapPlikow==5 && selectedProces==1) return style.procesRow_tr_AKCEPT
    if (etapPlikow==6 && selectedProces==1) return style.procesRow_tr_RIP
    if (etapPlikow==7 && selectedProces==1) return style.procesRow_tr_RIP
       if (etapPlikow==8 && selectedProces==1 && status ==4) return style.procesRow_tr_DRUK
    if (etapPlikow==8 && selectedProces==1) return style.procesRow_tr_RIP
 

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
        <td style={{ minWidth: "130px", width: "130px" }}>{grup.poczatek}</td>
        <td style={{ width: "60px" }}>{zamienNaGodziny(grup.czas)} </td>
        <KoniecGrupa grup={grup} />
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
        <Status grup={grup} />
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
    <td style={{minWidth: "150px",width: "150px"}}>
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
updateZmienCzasTrwaniaGrupy(grup.global_id,date_time( e.target.value),fechGrupyAndWykonaniaForProcesor)
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
  const _status_wykonania = contextApp._status_wykonania
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor
  const selectedProcesor = techContext.selectedProcesor
 const [sumujGrupe,statusGrupyProcesView,statusGrupyTechnologia,statusGrupyProcesViewPrzerwa] = useGrupyWykonan()
            const selectColor = (etap,status) =>{
    if (status==4) return style.select_DRUK
    if (etap==1) return style.select
    if (etap==2) return style.select
    if (etap==3) return style.select
    if (etap==4) return style.select_AKCEPT
    if (etap==5) return style.select_AKCEPT
    if (etap==6) return style.select_RIP
    if (etap==7) return style.select_RIP
      if (etap==8) return style.select_DRUK
     return style.procesRow_tr
  }
  return (
<td style={{width: "160px"}}>
      <select
       className={selectColor(grup.zamowienia_pliki_etap,grup.status) }
        value={grup.status}
        onChange={(event) => {
          if(grup.typ_grupy!=1){
            statusGrupyProcesView({...grup, status: event.target.value})
          }
                if(grup.typ_grupy==1){
                  //przerwa
            statusGrupyProcesViewPrzerwa({...grup, status: event.target.value})
          }
          // updateWykonaniaOrazGrupaFromProcesView(grup.global_id,1,event.target.value,fechGrupyAndWykonaniaForProcesor,selectedProcesor)
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
