import React, { useContext } from "react";


import { _etap_plikow, _status_wydania_papieru, _typ_elementu } from "utils/initialvalue";
import style from "../ProcesViewRow.module.css";
import { AppContext } from "context/AppContext";
import { _status } from "utils/initialvalue";
import { useGrupyWykonan } from "hooks/useGrupyWykonan";





export default function Status({grup}) {
  const contextApp = useContext(AppContext);
  const _status_wykonania = contextApp._status_wykonania
 const [sumujGrupe,statusGrupyProcesView,statusGrupyTechnologia,statusGrupyProcesViewPrzerwa] = useGrupyWykonan()
            const selectColorStatus = (etap,status) =>{
              //druk
              if(grup.proces_nazwa_id ==1){
    if (status==4) return style.select_DRUK
    if (etap==1) return style.select
    if (etap==2) return style.select
    if (etap==3) return style.select
    if (etap==4) return style.select_AKCEPT
    if (etap==5) return style.select_AKCEPT
    if (etap==6) return style.select_RIP
    if (etap==7) return style.select_ZAS
      if (etap==8) return style.select_DRUK
     return style.procesRow_tr
              }

              //wsystko poza drukierm
              if(grup.proces_nazwa_id !=1){
    if (status==4) return style.select_DRUK
    if (status==2) return style.select_RIP
    if (status==3) return style.select_trakcie
     return style.select
              }

  }
  return (
<td className={style.td_tableProcesy_pliki}>

      <select
       className={selectColorStatus(grup.zamowienia_pliki_etap,grup.status) }
        value={grup.status}
        disabled
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
