import React, { useContext } from "react";
import iconAdd from "assets/add4.svg";


import { _etap_plikow, _status_wydania_papieru, _typ_elementu } from "utils/initialvalue";
import axios from "axios";
import { IP } from "utils/Host";
import style from "../ProcesViewRow.module.css";
import { TechnologyContext } from "context/TechnologyContext";
import { _status } from "utils/initialvalue";
import { usePliki } from "hooks/usePliki";
import { useHistoria } from "hooks/useHistoria";
import DecodeToken from "pages/Login/DecodeToken";


export default function WydaniePapieruStatus({grup}) {
  const techContext = useContext(TechnologyContext);

  const fechGrupyAndWykonaniaForProcesor_dni_wstecz = techContext.fechGrupyAndWykonaniaForProcesor_dni_wstecz
  const selectedProcesor = techContext.selectedProcesor
  const dniWstecz = techContext.dniWstecz

  const [etapPlikow,etapPlikowGrupyWykonan] = usePliki()
      const [add,dodajDoZamowienia] = useHistoria()
            const selectColor = (etap,status) =>{
                 if (status==4) return style.select_DRUK
    if (etap==1) return style.select
    if (etap==2) return style.select
    if (etap==3) return style.select
    if (etap==4) return style.select_AKCEPT
    if (etap==5) return style.select_AKCEPT
    if (etap==6) return style.select_RIP
    if (etap==7) return style.select_RIP
    if (etap==8 && status==4) return style.select_DRUK
    if (etap==8 ) return style.select_RIP
     return style.procesRow_tr
  }

  if(grup.wydanie_papieru_status ==null){
return (<td className={style.td_tableProcesy_papier_wydanie}>        <div>
        {DecodeToken(sessionStorage.getItem("token")).technologie_wszystkie == 1 ?  <img
            className={style.iconSettings}
            src={iconAdd}
            onClick={async() => {
             await axios.post(IP + "insertWydaniePapieru_status/" + sessionStorage.getItem("token"), {global_id_grupa:grup.global_id,status:2});
            fechGrupyAndWykonaniaForProcesor_dni_wstecz(selectedProcesor,dniWstecz)

            }}
            alt="Procesy"
          />:<></>}
         
        </div></td>)
  } else {
      return (
<td className={style.td_tableProcesy_pliki}>
      <select
        className={selectColor(grup.zamowienia_pliki_etap,grup.status) }
        value={grup?.wydanie_papieru_status || 1}
        onChange={async(event) => {

          fechGrupyAndWykonaniaForProcesor_dni_wstecz(selectedProcesor,dniWstecz)
        

        }}
      >
        {_status_wydania_papieru.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
      </td>

  );
  }
}
