import { useContext } from "react";
import { _etap_plikow, _status_wydania_papieru, _typ_elementu } from "utils/initialvalue";
import { AppContext } from "context/AppContext";
import { TechnologyContext } from "context/TechnologyContext";
import { _status } from "utils/initialvalue";
import { updateAddPrzerwa } from "actions/updateAddPrzerwa";
import { updateAddPrzerwaMagic } from "actions/updateAddPrzerwaMagic";
import { dragDropProcesGrupa } from "actions/dragDropProcesGrupa";

export function useDragDrop(){
  const techContext = useContext(TechnologyContext);
  const selectedProcesor = techContext.selectedProcesor;
  const appContext = useContext(AppContext);
  const fechGrupyAndWykonaniaForProcesor = techContext.fechGrupyAndWykonaniaForProcesor;

  //========================================================================================================

  function handleDrop(id) {
    if (sessionStorage.getItem("typ_drag") == "grupa_proces") {
      let id_drag_grupa_proces = sessionStorage.getItem("id_grupa_proces_drag");
      let id_drop_grupa_proces = id;
      appContext.setIsLoading(true);
      dragDropProcesGrupa(id_drag_grupa_proces,id_drop_grupa_proces,fechGrupyAndWykonaniaForProcesor);
    }

    if (sessionStorage.getItem("typ_drag") == "przerwa") {
      let czas = sessionStorage.getItem("czas_przerwy");
      updateAddPrzerwa(id, czas,fechGrupyAndWykonaniaForProcesor);
    }
        if (sessionStorage.getItem("typ_drag") == "przerwa_magic") {
      let czas = sessionStorage.getItem("czas_przerwy");
      updateAddPrzerwaMagic(id, czas,fechGrupyAndWykonaniaForProcesor,selectedProcesor);
    }
  }

  //========================================================================================================

  function handleDragOver(e) {
    e.preventDefault();
  }

  //========================================================================================================

  function handleDragStart(id, typ_grupy) {
    sessionStorage.setItem("id_grupa_proces_drag", id);
    sessionStorage.setItem("typ_drag", "grupa_proces");
    sessionStorage.setItem("typ_grupy", typ_grupy);
  }

  //========================================================================================================
  



  return {handleDrop,handleDragOver,handleDragStart};
}

