import React, { useContext } from "react";


import { _etap_plikow, _status_wydania_papieru, _typ_elementu } from "utils/initialvalue";
import style from "../ProcesViewRow.module.css";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _status } from "utils/initialvalue";
import { usePliki } from "hooks/usePliki";
import { useHistoria } from "hooks/useHistoria";



export default function Etap({grup,setShowNaswietlenia}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);


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
    if (etap==7) return style.select_ZAS
    if (etap==8 && status==4) return style.select_DRUK
    if (etap==8 ) return style.select_RIP
     return style.procesRow_tr
  }

  return (
<td className={style.td_tableProcesy_pliki}>
      <select
        className={selectColor(grup.zamowienia_pliki_etap,grup.status) }
        value={grup.zamowienia_pliki_etap}
        onChange={(event) => {
          techContext.setSelectedGrupaTechROW(grup)
setShowNaswietlenia(true)
            // etapPlikowGrupyWykonan(event.target.value,grup,grup.zamowienia_pliki_etap)

          // fechGrupyAndWykonaniaForProcesor_dni_wstecz(selectedProcesor,dniWstecz)
          // fechGrupyAndWykonaniaForProcesor(selectedProcesor);
        

        }}
      >
        {_etap_plikow.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
      </td>

  );
}