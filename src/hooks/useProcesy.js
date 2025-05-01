
// fukncja do generowania wykonań i grup po stworzeniu arkuszy
// podobna do useArkusze, ale rozdzielona na osobną część tylko do wykonań 


import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import { TechnologyContext } from "context/TechnologyContext";
import { createArk_modulo_0 } from "actions/createArkusze/createArk_modulo_0";
import { createArk_16_K_modulo_2 } from "actions/createArkusze/16K/createArk_16_K_modulo_2";
import { createArk_16_K_modulo_4 } from "actions/createArkusze/16K/createArk_16_K_modulo_4";
import { createArk_16_K_modulo_6 } from "actions/createArkusze/16K/createArk_16_K_modulo_6";
import { createArk_16_K_modulo_8 } from "actions/createArkusze/16K/createArk_16_K_modulo_8";
import { createArk_16_K_modulo_10 } from "actions/createArkusze/16K/createArk_16_K_modulo_10";
import { createArk_16_K_modulo_12 } from "actions/createArkusze/16K/createArk_16_K_modulo_12";
import { createArk_16_K_modulo_14 } from "actions/createArkusze/16K/createArk_16_K_modulo_14";
import { createArk_16_K_single_ark } from "actions/createArkusze/16K/createArk_16_K_single_ark";
import { createArk_12_K_modulo_2 } from "actions/createArkusze/12K/createArk_12_K_modulo_2";
import { createArk_12_K_modulo_4 } from "actions/createArkusze/12K/createArk_12_K_modulo_4";
import { createArk_12_K_modulo_6 } from "actions/createArkusze/12K/createArk_12_K_modulo_6";
import { createArk_12_K_modulo_8 } from "actions/createArkusze/12K/createArk_12_K_modulo_8";
import { createArk_12_K_modulo_10 } from "actions/createArkusze/12K/createArk_12_K_modulo_10";
import { createArk_12_K_single_ark } from "actions/createArkusze/12K/createArk_12_K_single_ark";
import { createArk_24_K_modulo_2 } from "actions/createArkusze/24K/createArk_24_K_modulo_2";
import { createArk_24_K_modulo_4 } from "actions/createArkusze/24K/createArk_24_K_modulo_4";
import { createArk_24_K_modulo_6 } from "actions/createArkusze/24K/createArk_24_K_modulo_6";
import { createArk_24_K_modulo_8 } from "actions/createArkusze/24K/createArk_24_K_modulo_8";
import { createArk_24_K_modulo_10 } from "actions/createArkusze/24K/createArk_24_K_modulo_10";
import { createArk_24_K_modulo_12 } from "actions/createArkusze/24K/createArk_24_K_modulo_12";
import { createArk_24_K_modulo_14 } from "actions/createArkusze/24K/createArk_24_K_modulo_14";
import { createArk_24_K_modulo_16 } from "actions/createArkusze/24K/createArk_24_K_modulo_16";
import { createArk_24_K_modulo_18 } from "actions/createArkusze/24K/createArk_24_K_modulo_18";
import { createArk_24_K_modulo_20 } from "actions/createArkusze/24K/createArk_24_K_modulo_20";
import { createArk_24_K_modulo_22 } from "actions/createArkusze/24K/createArk_24_K_modulo_22";
import { createArk_24_K_single_ark } from "actions/createArkusze/24K/createArk_24_K_single_ark";
import { createArk_32_K_modulo_2 } from "actions/createArkusze/32K/createArk_32_K_modulo_2";
import { createArk_32_K_modulo_4 } from "actions/createArkusze/32K/createArk_32_K_modulo_4";
import { createArk_32_K_modulo_6 } from "actions/createArkusze/32K/createArk_32_K_modulo_6";
import { createArk_32_K_modulo_8 } from "actions/createArkusze/32K/createArk_32_K_modulo_8";
import { createArk_32_K_modulo_10 } from "actions/createArkusze/32K/createArk_32_K_modulo_10";
import { createArk_32_K_modulo_12 } from "actions/createArkusze/32K/createArk_32_K_modulo_12";
import { createArk_32_K_modulo_14 } from "actions/createArkusze/32K/createArk_32_K_modulo_14";
import { createArk_32_K_modulo_16 } from "actions/createArkusze/32K/createArk_32_K_modulo_16";
import { createArk_32_K_modulo_18 } from "actions/createArkusze/32K/createArk_32_K_modulo_18";
import { createArk_32_K_modulo_20 } from "actions/createArkusze/32K/createArk_32_K_modulo_20";
import { createArk_32_K_modulo_22 } from "actions/createArkusze/32K/createArk_32_K_modulo_22";
import { createArk_32_K_modulo_24 } from "actions/createArkusze/32K/createArk_32_K_modulo_24";
import { createArk_32_K_modulo_26 } from "actions/createArkusze/32K/createArk_32_K_modulo_26";
import { createArk_32_K_modulo_28 } from "actions/createArkusze/32K/createArk_32_K_modulo_28";
import { createArk_32_K_modulo_30 } from "actions/createArkusze/32K/createArk_32_K_modulo_30";
import { createArk_32_K_single_ark } from "actions/createArkusze/32K/createArk_32_K_single_ark";
import { createArk_16_Z_modulo_4 } from "actions/createArkusze/16Z/createArk_16_Z_modulo_4";
import { createArk_16_Z_modulo_8 } from "actions/createArkusze/16Z/createArk_16_Z_modulo_8";
import { createArk_16_Z_modulo_12 } from "actions/createArkusze/16Z/createArk_16_Z_modulo_12";
import { createArk_12_Z_modulo_4 } from "actions/createArkusze/12Z/createArk_12_Z_modulo_4";
import { createArk_12_Z_modulo_8 } from "actions/createArkusze/12Z/createArk_12_Z_modulo_8";
import { createArk_12_Z_single_ark } from "actions/createArkusze/12Z/createArk_12_Z_single_ark";
import { createArk_24_Z_modulo_4 } from "actions/createArkusze/24Z/createArk_24_Z_modulo_4";
import { createArk_24_Z_modulo_8 } from "actions/createArkusze/24Z/createArk_24_Z_modulo_8";
import { createArk_24_Z_modulo_12 } from "actions/createArkusze/24Z/createArk_24_Z_modulo_12";
import { createArk_24_Z_modulo_16 } from "actions/createArkusze/24Z/createArk_24_Z_modulo_16";
import { createArk_24_Z_modulo_20 } from "actions/createArkusze/24Z/createArk_24_Z_modulo_20";
import { createArk_32_Z_modulo_4 } from "actions/createArkusze/32Z/createArk_32_Z_modulo_4";
import { createArk_32_Z_modulo_8 } from "actions/createArkusze/32Z/createArk_32_Z_modulo_8";
import { createArk_32_Z_modulo_12 } from "actions/createArkusze/32Z/createArk_32_Z_modulo_12";
import { createArk_32_Z_modulo_16 } from "actions/createArkusze/32Z/createArk_32_Z_modulo_16";
import { createArk_32_Z_modulo_20 } from "actions/createArkusze/32Z/createArk_32_Z_modulo_20";
import { createArk_32_Z_modulo_24 } from "actions/createArkusze/32Z/createArk_32_Z_modulo_24";
import { createArk_32_Z_modulo_28 } from "actions/createArkusze/32Z/createArk_32_Z_modulo_28";
import { AppContext } from "context/AppContext";


export function useProcesy(status_id){
// const modalcontext = useContext(ModalInsertContext);
// const daneZamowienia = modalcontext.daneZamowienia;
// const setDaneZamowienia = modalcontext.setDaneZamowienia;

  const techContext = useContext(TechnologyContext);
  const elementyTech = techContext.elementyTech;
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;
  const legi = techContext.legi;
  const setLegi = techContext.setLegi;

    const legiFragmenty = techContext.legiFragmenty;
    const setLegiFragmenty = techContext.setLegiFragmenty;

    const procesy = techContext.procesyElementow;
    const grupaWykonan = techContext.grupaWykonan;
    const setGrupaWykonan = techContext.setGrupaWykonan;
    const wykonania = techContext.wykonania;
    const setWykonania = techContext.setWykonania;
    const oprawaTech = techContext.oprawaTech;
    const setOprawaTech = techContext.setOprawaTech;
    const fragmentyTech = techContext.fragmentyTech;
    const setFragmentyTech = techContext.setFragmentyTech;
  
   const contextApp = useContext(AppContext);
   const nadkomplety = contextApp.nadkomplety;

   function createWykonaniaFromArkuszeLegi(
  ) {




   const new_arkusze = [...arkusze];
   const new_legi = [...legi];
   const new_legiFragmenty = [];
   const new_grupy = [];
   const new_wykonania = [];

procesy.map((proces,i)=> {
  if(proces.arkusz==1){ 
let grupa_id = MaxID(new_grupy)
    new_grupy.push({
      id: grupa_id,
      global_id:0,
      indeks: i + 1,
      element_id: proces.element_id,
      nazwa: proces.nazwa,
      poczatek: "2024-10-30 10:00:00",
      czas: 1,
      koniec: "2024-10-30 11:00:00",
      procesor_id:proces.procesor_domyslny,
      narzad: proces.narzad,
      predkosc: proces.predkosc,
      proces_id: proces.id,
      mnoznik: proces.mnoznik,
      status:1,
      stan:1,
      uwagi: ""
    });

    new_arkusze
    .filter(a => a.element_id == proces.element_id)
    .map((a,i)=>{
      new_wykonania.push({
        id: MaxID(new_wykonania),
        indeks: i + 1,
        nazwa: proces.nazwa,
        element_id: a.element_id,
        arkusz_id: a.id,
        proces_id: proces.id,
        typ_elementu: a.typ_elementu,
        poczatek: "2024-10-30 10:00:00",
        czas: parseInt((a.naklad / proces.predkosc * proces.mnoznik) * 60 + proces.narzad,10),
        koniec: "2024-10-30 11:00:00",
        procesor_id:proces.procesor_domyslny,
        grupa_id:grupa_id,
        narzad: proces.narzad,
        predkosc: proces.predkosc,
        naklad: a.naklad,
        mnoznik: proces.mnoznik,
        status:1,
        stan:1,
        przeloty: parseInt(a.naklad) + parseInt(a.nadkomplet) ,
        uwagi: ""
      });
    })

// new_grupy.map( ng => ({...ng,czas:new_wykonania.filter(x=> x.grupa_id == ng.id).map(x => x.czas).reduce((a, b) => a + b, 0)}) )

  }

  if(proces.lega==1){ 
    let grupa_id = MaxID(new_grupy)
    new_grupy.push({
      id: grupa_id,
      global_id:0,
      indeks: i + 1,
      element_id: proces.element_id,
      nazwa: proces.nazwa,
      poczatek: "2024-10-30 10:00:00",
      czas: 1,
      koniec: "2024-10-30 11:00:00",
      procesor_id:proces.procesor_domyslny,
      narzad: proces.narzad,
      predkosc: proces.predkosc,
      proces_id: proces.id,
      mnoznik: proces.mnoznik,
      status:1,
      stan:1,
      uwagi: ""
    });

    new_legi
    .filter(a => a.element_id == proces.element_id)
    .map(a=>{
      new_wykonania.push({
        id: MaxID(new_wykonania),
        indeks: i + 1,
        nazwa: proces.nazwa,
        element_id: a.element_id,
        arkusz_id: a.id,
        proces_id: proces.id,
        typ_elementu: a.typ_elementu,
        poczatek: "2024-10-30 10:00:00",
        czas: parseInt((a.naklad /  proces.predkosc / proces.ilosc_uzytkow * proces.mnoznik) * 60 + proces.narzad,10) ,
        koniec: "2024-10-30 11:00:00",
        procesor_id:proces.procesor_domyslny,
        grupa_id:grupa_id,
        narzad: proces.narzad,
        predkosc: proces.predkosc,
        naklad: a.naklad,
        mnoznik: proces.mnoznik,
        status:1,
        stan:1,
        przeloty: a.naklad / proces.ilosc_uzytkow,
        uwagi: ""
      });
    })

  }

  

})
//oprawa

//   oprawaTech.map(
//     opt => {
// new_grupy.push({
//     id: MaxID(new_grupy),
//     global_id:0,
//     indeks: getMaxIndeks(new_grupy),
//     element_id: opt.element_id,
//     nazwa: opt.nazwa,
//     poczatek: "2024-10-30 10:00:00",
//     czas: 1,
//     koniec: "2024-10-30 11:00:00",
//     procesor_id:opt.procesor_domyslny,
//     narzad: opt.narzad,
//     predkosc: opt.predkosc,
//     proces_id: opt.id,
//     mnoznik: opt.mnoznik,
//     status:1,
//     stan:1,
//     uwagi: ""
//   });
//     }
//   )

// setGrupaWykonan(new_grupy);
// setGrupaWykonan(new_grupy.map( ng => ({...ng,czas:new_wykonania.filter(x=> x.grupa_id == ng.id).map(x => x.czas).reduce((a, b) => a + b, 0)}) ));
setGrupaWykonan(new_grupy.map( ng => ({...ng,czas:SumaCzasow(new_wykonania,ng),przeloty:SumaPrzelotow(new_wykonania,ng)}) ));
setWykonania(new_wykonania)
}

const MaxID = (value) => {
  let maxID = null;
  if (value.length == 0) return (maxID = 1);
  maxID = Math.max(...value.map((f) => f.id)) + 1;

  return maxID;
};

const MaxIndeks = (value) => {
  let maxIndeks = null;
  if (value.length == 0) return (maxIndeks = 1);
  maxIndeks = Math.max(...value.map((f) => f.indeks)) + 1;

  return maxIndeks;
};

const MaxIndeksOprawa = (value,oprawa_id) => {
  let maxIndeks = null;
  if (value.length == 0) return (maxIndeks = 1);
  maxIndeks = Math.max(...value
    .filter(x=> x.oprawa_id == oprawa_id)
    .map((f) => f.indeks)) + 1;

  return maxIndeks;
};


const SumaCzasow = (wykonania,grupa) => {
  // sumuje wszystkie czasy z dowolnej grupy
  let  suma = wykonania.filter(x=> x.grupa_id == grupa.id).map(x => x.czas).reduce((a, b) => a + b, 0)
  return suma;
};

const SumaPrzelotow = (wykonania,grupa) => {
  // sumuje wszystkie czasy z dowolnej grupy
  let  suma = wykonania.filter(x=> x.grupa_id == grupa.id).map(x => x.przeloty).reduce((a, b) => a + b, 0)
  return suma;
};


  return [createWykonaniaFromArkuszeLegi];

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