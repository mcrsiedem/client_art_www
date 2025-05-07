import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import { getMaxID } from "actions/getMaxID";
import axios from "axios";
// import { useContext } from "react";
import { IP } from "../utils/Host";

export function useHistoria(row){
const modalcontext = useContext(ModalInsertContext);
const historiaZamowienia = modalcontext.historiaZamowienia;
const setHistoriaZamowienia = modalcontext.setHistoriaZamowienia;
const daneZamowienia = modalcontext.daneZamowienia;

function add(row) {
  if(daneZamowienia.id !=1){

    const   new_historia = historiaZamowienia?.slice() || [];
        new_historia.push({...row, id:getMaxID(historiaZamowienia), user_id: DecodeToken(sessionStorage.getItem("token")).id,insert:true})
        setHistoriaZamowienia(new_historia)
}
  }



  const dodajDoZamowienia = async (row) =>{
    // console.log(row)
    const res = await axios.put(IP + "updateHistoria/" + sessionStorage.getItem("token"), {
    ...row
        });
  }

  return [add,dodajDoZamowienia];
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