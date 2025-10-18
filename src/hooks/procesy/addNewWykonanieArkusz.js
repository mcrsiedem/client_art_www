import { getMaxID } from "actions/getMaxID";


export function addNewWykonanieArkusz({new_arkusze,new_wykonania,grupa_id,proces}){
    new_arkusze
    .filter(a => a.element_id == proces.element_id)
    .map((a,i)=>{
      new_wykonania.push({
        id: getMaxID(new_wykonania),
        global_id:0,
        indeks: i + 1,
        nazwa: proces.nazwa,
        element_id: a.element_id,
        arkusz_id: a.id,
        proces_id: proces.id,
        typ_elementu: a.typ_elementu,
        poczatek: "2024-10-30 10:00:00",
        czas: parseInt(((parseInt(a.naklad) + parseInt(a.nadkomplet))/ proces.predkosc * proces.mnoznik) * 60 + proces.narzad,10),
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
        uwagi: "",
        nazwa_wykonania: a.rodzaj_arkusza
      });
    })
}
