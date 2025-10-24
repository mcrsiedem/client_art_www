import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import { AppContext } from "context/AppContext";
import { getMaxID } from "actions/getMaxID";
import { getMaxIndeks } from "actions/getMaxIndeks";
import DecodeToken from "pages/Login/DecodeToken";


export function useProcessProdukt(){
const modalcontext = useContext(ModalInsertContext);
const procesyProduktow = modalcontext.procesyProduktow;
const setProcesyProduktow = modalcontext.setProcesyProduktow;
const procesyProduktowTemporary = modalcontext.procesyProduktowTemporary;
const setProcesyProduktowTemporary = modalcontext.setProcesyProduktowTemporary;
const selectedOprawaRow = modalcontext.selectedOprawaRow;

const appContext = useContext(AppContext);


function addProcessProdukt( ) {
let procesyProduktowTemporaryEdit = procesyProduktowTemporary 
    ? [...procesyProduktowTemporary] 
    : [];

      procesyProduktowTemporaryEdit.push({
        ...appContext.procesList.find(x=> x.id == 77), // domyślny proces produktowy
        id: getMaxID(procesyProduktowTemporary),
        indeks: getMaxIndeks(procesyProduktowTemporary),
        utworzyl: DecodeToken(sessionStorage.getItem("token")).id,
        zmodyfikowal: DecodeToken(sessionStorage.getItem("token")).id,
        zamowienie_id: selectedOprawaRow.zamowienie_id,
        oprawa_id: selectedOprawaRow.id,
        insert:true
      });

      procesyProduktowTemporaryEdit.sort((a, b) => a.indeks - b.indeks);
      setProcesyProduktowTemporary(procesyProduktowTemporaryEdit);

}

  return {addProcessProdukt};
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