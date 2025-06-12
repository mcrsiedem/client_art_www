import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import { getMaxID } from "actions/getMaxID";
import axios from "axios";
// import { useContext } from "react";
import { IP } from "../utils/Host";
import { TechnologyContext } from "context/TechnologyContext";

export function useWykonania(row){
const modalcontext = useContext(ModalInsertContext);
const historiaZamowienia = modalcontext.historiaZamowienia;
const setHistoriaZamowienia = modalcontext.setHistoriaZamowienia;
  const techContext = useContext(TechnologyContext);
  const updateWykonanie = techContext.updateWykonanie
  const setGrupaWykonan = techContext.setGrupaWykonan
  const grupaWykonan = techContext.grupaWykonan
  const setWykonania = techContext.setWykonania
  const wykonania = techContext.wykonania

const procesyElementowTech = techContext.procesyElementowTech;
  const fechparametryTechnologii = techContext.fechparametryTechnologii;

function czasWykonania(wykonanie,naklad,predkosc) {
//         czas: parseInt((a.naklad /  proces.predkosc / proces.ilosc_uzytkow * proces.mnoznik) * 60 + proces.narzad,10) ,

  // let predkosc = wykonanie.predkosc
  let ilosc_uzytkow =  procesyElementowTech.filter(x=>x.id == wykonanie.proces_id)[0].ilosc_uzytkow
  let mnoznik = wykonanie.mnoznik
  let narzad = wykonanie.narzad

 let newCzas= parseInt((naklad /  predkosc / ilosc_uzytkow * mnoznik) * 60 + narzad,10)
  return newCzas
  }

        async function statusWykonaniaTechnologia(wykonanieRow) {
        const res = await axios.put(
          IP +
            "zakoncz_wykonanie_uwolnij_dalej/" +
            sessionStorage.getItem("token"), wykonanieRow

        );

        fechparametryTechnologii(wykonanieRow.zamowienie_id, wykonanieRow.technologia_id);
      }



    function updateGrupaWykonan_updateWykonania_narzad(row) {

      // przelicza czas wykonan po zmianie narzdu grupy

        setWykonania(
          wykonania         .map((t) => {
            if (t.grupa_id == row.id) {
              return {
                ...t,
                narzad: row.narzad,
                predkosc: row.predkosc,
                // czas: czasWykonania(t,t.naklad,t.predkosc),
                czas: parseInt((t.naklad /  parseInt(row.predkosc) /  procesyElementowTech.filter(x=>x.id == t.proces_id)[0].ilosc_uzytkow * t.mnoznik) * 60 +  parseInt(row.narzad),10),
                update: true
      
              };
            } else {
              return t;
            }
          })

        )
        setGrupaWykonan(
          grupaWykonan.map((t) => {
            if (t.id === row.id) {
              return row;
            } else {
              return t;
            }
          })
        )
    

      }






  return [czasWykonania,statusWykonaniaTechnologia,updateGrupaWykonan_updateWykonania_narzad];
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