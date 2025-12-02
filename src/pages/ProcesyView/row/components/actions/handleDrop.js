


export function handleDrop(id) {
    if (sessionStorage.getItem("typ_drag") == "grupa_proces") {
      let id_drag_grupa_proces = sessionStorage.getItem("id_grupa_proces_drag");
      let id_drop_grupa_proces = id;
    appContext.setIsLoading(true);
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
        if (sessionStorage.getItem("typ_drag") == "przerwa_magic") {
      let czas = sessionStorage.getItem("czas_przerwy");
      updateAddPrzerwaMagic(id, czas,fechGrupyAndWykonaniaForProcesor,selectedProcesor);
    }
  }