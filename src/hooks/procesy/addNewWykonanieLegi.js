import { getMaxID } from "actions/getMaxID";


export function addNewWykonanieLegi({new_legi,new_wykonania,grupa_id,proces}){


      new_legi
    .filter(a => a.element_id == proces.element_id)
    .map((a,indeks)=>{
      new_wykonania.push({
        id: getMaxID(new_wykonania),
        indeks: indeks + 1,
        global_id:0,
        nazwa: proces.nazwa,
        element_id: a.element_id,
        arkusz_id: a.arkusz_id, // bylo a.id
        lega_id: a.id, // bylo a.id
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
        uwagi: "",
        nazwa_wykonania: a.rodzaj_legi
      });
    })

  

}
