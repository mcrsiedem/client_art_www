
// fukncja do generowania wykonań i grup po stworzeniu arkuszy
// podobna do useArkusze, ale rozdzielona na osobną część tylko do wykonań 


import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { AppContext } from "context/AppContext";
import { useOprawa } from "./useOprawa";

export function useProcesy(){
    const contextApp = useContext(AppContext);
  

  const techContext = useContext(TechnologyContext);
  const arkusze = techContext.arkusze;
  const legi = techContext.legi;
    const procesy = techContext.procesyElementow;
    const setGrupaWykonan = techContext.setGrupaWykonan;
    const setWykonania = techContext.setWykonania;
    const oprawaTech = techContext.oprawaTech;
    const legiFragmenty = techContext.legiFragmenty;
    const grupaOprawaTech = techContext.grupaOprawaTech;
    const setGrupaOprawaTech = techContext.setGrupaOprawaTech;
    const procesList = contextApp.procesList;
    // procesList
    const [getCzasOprawy] = useOprawa()
   function createWykonaniaFromArkuszeLegi(
  ) {
   const new_arkusze = [...arkusze.filter(x=>x.delete != true)];
   const new_legi = [...legi.filter(x=>x.delete != true)];
   const new_procesy = [...procesy.filter(x=>x.delete != true)];
   const new_grupaOprawaTech = [...grupaOprawaTech.filter(x=>x.delete != true)];
   const new_grupy = [];
   const new_wykonania = [];

   oprawaTech.map((oprawa,i)=> {
    let grupa_id = MaxID(new_grupaOprawaTech)
    new_grupaOprawaTech.push({
      id: grupa_id,
      global_id:0,
      indeks: MaxIndeks(new_grupaOprawaTech),
      nazwa:procesList.filter(x=>x.id == oprawa.oprawa)[0].nazwa,
      poczatek: "2024-10-30 10:00:00",
      czas: getCzasOprawy(oprawa.id),
      koniec: "2024-10-30 11:00:00",
      procesor_id: procesList.filter(x=>x.id == oprawa.oprawa)[0].procesor_domyslny,
      narzad: procesList.filter(x=>x.id == oprawa.oprawa)[0].narzad,
      predkosc: procesList.filter(x=>x.id == oprawa.oprawa)[0].predkosc,
      proces_id: oprawa.oprawa, 
      oprawa_id: oprawa.id, //lokalne id oprawy, w przypadku jednej == 1
      mnoznik: procesList.filter(x=>x.id == oprawa.oprawa)[0].mnoznik,
      naklad: oprawa.naklad,
      bok_oprawy:oprawa.bok_oprawy,
      status:1,
      stan:1,
      uwagi: ""
    });
   })
   setGrupaOprawaTech(new_grupaOprawaTech)
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