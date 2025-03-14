import axios from "axios";

import { IP } from "../utils/Host";
import { createArk_modulo_0 } from "./createArkuszeFromElements16/createArk_modulo_0";
import { createArk_modulo_4 } from "./createArkuszeFromElements16/createArk_modulo_4";
import { createArk_modulo_2 } from "./createArkuszeFromElements16/createArk_modulo_2";
import { createArk_modulo_6 } from "./createArkuszeFromElements16/createArk_modulo_6";
import { createArk_modulo_8 } from "./createArkuszeFromElements16/createArk_modulo_8";
import { createArk_modulo_10 } from "./createArkuszeFromElements16/createArk_modulo_10";
import { createArk_modulo_12 } from "./createArkuszeFromElements16/createArk_modulo_12";
import { createArk_modulo_14 } from "./createArkuszeFromElements16/createArk_modulo_14";
import { getMaxIndeks } from "./getMaxIndeks";
import { getMaxID } from "./getMaxID";

export function createArkuszeFromElemenets(
  arkusze,
  setArkusze,
  legi,
  setLegi,
  legiFragmenty,
  setLegiFragmenty,
  oprawaTech,
  setOprawaTech,
  fragmentyTech,
  setFragmentyTech,
  elementyTech,
  rowElement, procesy, grupaWykonan,setGrupaWykonan,wykonania, setWykonania,nadkomplety
) {



  const new_arkusze = [];
  const new_legi = [];
  const new_legiFragmenty = [];
  const new_grupy = [];
  const new_wykonania = [];

  const grupa ={
    id:1,
    element_id:1,
    proces_id:1,
    produkt_id:1,
    technologia_id:1,
    zamowienie_id:1,
    maszyna_id:1,
    uwagi: ""

  }

  // console.log("elementyTech", elementyTech);

  elementyTech.map((row) => {
    // console.log("row: ",row)

    const ilosc_leg_na_arkuszu = row.ilosc_leg;
    const rodzaj_legi = row.lega;
    const rodzaj_arkusza = rodzaj_legi * ilosc_leg_na_arkuszu;
    const ilosc_arkuszy = row.ilosc_stron / rodzaj_arkusza;
    const modulo = row.ilosc_stron % rodzaj_arkusza;

    const ark = {
      typ_elementu: row.typ,
      rodzaj_arkusza,
      naklad: row.naklad,
      nadkomplet: "",
      element_id: row.id,
      ilosc_stron: row.ilosc_stron,
      uwagi: "",
      nr_arkusza: "",
      arkusz_szerokosc: "",
      arkusz_wysokosc: "",
      papier_id: row.papier_id,
      technologia_id: row.technologia_id,
      insert: true
    };

    const lega = {
      typ_elementu: row.typ,
      rodzaj_legi,
      element_id: row.id,
      ilosc_stron: row.ilosc_stron,
      naklad: row.naklad,
      uwagi: "",
      nr_legi: "",
      technologia_id: row.technologia_id,
      insert: true
    };


// if(rodzaj_legi == 16) {
  
  if (modulo == 0) {
      createArk_modulo_0(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }

    if (modulo == 2) {
      createArk_modulo_2(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }

    if (modulo == 4) {
      createArk_modulo_4(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }

    if (modulo == 6) {
      createArk_modulo_6(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }

    if (modulo == 8) {
      createArk_modulo_8(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }

    if (modulo == 10) {
      createArk_modulo_10(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }

    if (modulo == 12) {
      createArk_modulo_12(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }

    if (modulo == 14) {
      createArk_modulo_14(new_arkusze,new_legi,ilosc_arkuszy,ark,ilosc_leg_na_arkuszu,lega,nadkomplety)
    }
// }
    
    setArkusze(new_arkusze);
    setLegi(new_legi);
  });

  new_legi
  .map((l, indeks) => {
    new_legiFragmenty.push({
      id: MaxID(new_legiFragmenty),
      indeks: MaxIndeks(new_legiFragmenty),
      // ...legaFragment,
      lega_id: l.id,
      nr_legi: l.nr_legi,
      naklad: l.naklad,
      fragment_id: l.id,
      // oprawa_id: l.oprawa_id,oprawaTech
      oprawa_id: oprawaTech[0]?.id,
      typ: l.typ_elementu,
      wersja: "",
      element_id: l.element_id,
      arkusz_id: l.arkusz_id,
      insert: true
    });
  });
  setLegiFragmenty(new_legiFragmenty.sort((a,c)=>a.id-c.id).sort((a,c)=>a.oprawa_id-c.oprawa_id).map((x,i)=>{return {...x, indeks: i}}));

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
          uwagi: ""
        });
      })

  new_grupy.map( ng => ({...ng,czas:new_wykonania.filter(x=> x.grupa_id == ng.id).map(x => x.czas).reduce((a, b) => a + b, 0)}) )

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
          czas: parseInt((a.naklad / proces.predkosc * proces.mnoznik) * 60 + proces.narzad,10) ,
          koniec: "2024-10-30 11:00:00",
          procesor_id:proces.procesor_domyslny,
          grupa_id:grupa_id,
          narzad: proces.narzad,
          predkosc: proces.predkosc,
          naklad: a.naklad,
          mnoznik: proces.mnoznik,
          status:1,
          stan:1,
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
  setGrupaWykonan(new_grupy.map( ng => ({...ng,czas:SumaCzasow(new_wykonania,ng)}) ));
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
