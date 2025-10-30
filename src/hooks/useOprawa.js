import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import { getMaxID } from "actions/getMaxID";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";

export function useOprawa(row){
const modalcontext = useContext(ModalInsertContext);
    const contextApp = useContext(AppContext);

const historiaZamowienia = modalcontext.historiaZamowienia;
const setHistoriaZamowienia = modalcontext.setHistoriaZamowienia;
const daneZamowienia = modalcontext.daneZamowienia;

const techContext = useContext(TechnologyContext);
// const grupaOprawaTech = techContext.grupaOprawaTech;
// const setGrupaOprawaTech = techContext.setGrupaOprawaTech;
const legiFragmenty = techContext.legiFragmenty;
const oprawaTech = techContext.oprawaTech;
const procesList = contextApp.procesList;

let czas;
function czasOprawy(local_oprawa_id) {

// let naklad = oprawaTech.filter(x=>x.id ==local_oprawa_id).map(x => { return x})[0].naklad
let naklad = oprawaTech.filter(x=>x.id ==local_oprawa_id)[0].naklad
let proces_id = oprawaTech.filter(x=>x.id ==local_oprawa_id)[0].oprawa
let predkosc = procesList.filter(x=>x.id == proces_id)[0].predkosc
let narzad = procesList.filter(x=>x.id == proces_id)[0].narzad
let ilosc_leg = legiFragmenty.filter(x=>x.oprawa_id ==local_oprawa_id&& x.typ!=1).length

// klejona - 50,51
// szytkoklejona - 52
// zeszyt 54-59
// inna 60-66

if(proces_id == 50 || proces_id ==51 || proces_id ==52 || proces_id ==91){

  czas= Math.ceil(ilosc_leg /16) * naklad / predkosc *60 +narzad
  return  parseInt(czas,10);
}



if(proces_id > 53 && proces_id <60){

  czas= Math.ceil(ilosc_leg /6) * naklad / predkosc *60 +narzad
  return  parseInt(czas,10);
}

if(proces_id > 59 && proces_id <67){

  czas= Math.ceil(ilosc_leg /1) * naklad / predkosc *60 +narzad
  return  parseInt(czas,10);
}
  return  czas;
  }

  const iloscZbieran = (local_oprawa_id) => {
let proces_id = oprawaTech.filter(x=>x.id ==local_oprawa_id)[0].oprawa
let ilosc_leg = legiFragmenty.filter(x=>x.oprawa_id ==local_oprawa_id&& x.typ!=1).length


    let ilosc_zbieran;
    if(proces_id == 50 || proces_id ==51 || proces_id ==52){
      ilosc_zbieran= Math.ceil(ilosc_leg /16)
      return  ilosc_zbieran
    }
    
    
    
    if(proces_id > 53 && proces_id <60){
    
      ilosc_zbieran= Math.ceil(ilosc_leg /6) 
      return  ilosc_zbieran
    }
    
    if(proces_id > 59 && proces_id <67){
    
      ilosc_zbieran= Math.ceil(ilosc_leg /1) 
      return  ilosc_zbieran
    }



    return ilosc_zbieran

  }

  return [czasOprawy,iloscZbieran];
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