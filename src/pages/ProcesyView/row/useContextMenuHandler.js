import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import { getMaxID } from "actions/getMaxID";
import axios from "axios";
import { TechnologyContext } from "context/TechnologyContext";
// import { useContext } from "react";
// import { IP } from "../utils/Host";

export function useContextMenuHandler(row){
const modalcontext = useContext(ModalInsertContext);
const historiaZamowienia = modalcontext.historiaZamowienia;
const setHistoriaZamowienia = modalcontext.setHistoriaZamowienia;
const daneZamowienia = modalcontext.daneZamowienia;

  const techContext = useContext(TechnologyContext);
  const grupyWykonanAll = techContext.grupyWykonanAll;
  const setGrupWykonanAll = techContext.setGrupWykonanAll;
  const selectedProcesor = techContext.selectedProcesor;
  const selectedProces = techContext.selectedProces;

function onContextMenuHanlder(  event,  grup) {

  // if(prevet){
  //   event.preventDefault();
  // }
  event.preventDefault();
  if (grup.typ_grupy != 1) {
    setGrupWykonanAll(
      grupyWykonanAll
        .map((x) => {
          return { ...x, show: false };
        })
        .map((t) => {
          if (t.global_id == grup.global_id) {
            return { ...t, show: true };
          } else {
            return t;
          }
        })
    );

    // if (grup.typ_grupy != 1) {
    //   fechparametryTechnologiiDetails(grup.zamowienie_id, grup.technologia_id);
    // } else {
    //   setProcesyElementowTech([]);
    // }
  }
}



  

  return [onContextMenuHanlder];
}


// użycie

// const [add] = useHistoria()

// add(   {
//   kategoria: "Status zamówienia",
//   event: "Zmiana statusu zamówienia z "+ _status_dokumentu.filter(x=>x.id == daneZamowienia.status )[0].nazwa + " na "+ _status_dokumentu.filter(x=>x.id == event.target.value )[0].nazwa,
// })

// add(                    {
//   kategoria: "Stan zamówienia",
//   event: "Zmiana stanu zamówienia z "+ _stan_dokumentu.filter(x=>x.id == daneZamowienia.stan )[0].nazwa + " na "+ _stan_dokumentu.filter(x=>x.id == event.target.value )[0].nazwa}
// );

// add({kategoria: "Etap zamówienia",
//   event: "Zmiana etapu zamówienia z "+ _etapy_produkcji.filter(x=>x.id == daneZamowienia.etap )[0].nazwa + " na "+ _etapy_produkcji.filter(x=>x.id == event.target.value )[0].nazwa}
// );