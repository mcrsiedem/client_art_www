import { useContext } from "react";
import { AppContext } from "context/AppContext";

export function useSortowanieZamowienia(){
  const contextApp = useContext(AppContext);
  const sortowanieZamowieniaEtap = contextApp.sortowanieZamowieniaEtap

function sortWgEtapu({ zamowienie }) {
  if (sortowanieZamowieniaEtap == 1) {
    return zamowienie.etap > 1 && zamowienie.status != 7;
  }
  if (sortowanieZamowieniaEtap == 2) {
    return zamowienie.etap == 1 && zamowienie.status != 7;
  }
  if (sortowanieZamowieniaEtap == 3) {
    return true;
  }
   if (sortowanieZamowieniaEtap == 4) {
    return zamowienie.status == 7; // anulowane
  }
   if (sortowanieZamowieniaEtap == 5) {
    return zamowienie.etap == 16; // anulowane
  }
}

  return [sortWgEtapu];
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