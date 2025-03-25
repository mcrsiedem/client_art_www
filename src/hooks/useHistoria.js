import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";

export function useHistoria(row){
const modalcontext = useContext(ModalInsertContext);
const historiaZamowienia = modalcontext.historiaZamowienia;
const setHistoriaZamowienia = modalcontext.setHistoriaZamowienia;

function add(row) {
const   new_historia = historiaZamowienia.slice();
        new_historia.push({...row, zamowienie_id:modalcontext.selectedZamowienie.id, user_id: DecodeToken(sessionStorage.getItem("token")).id,insert:true})
        setHistoriaZamowienia(new_historia)
}
  return [add];
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