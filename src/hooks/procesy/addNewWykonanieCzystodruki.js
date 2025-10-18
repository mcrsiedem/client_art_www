import { getMaxID } from "actions/getMaxID";

// tak jak wykonanie z arkusza ale ze zmianą nakłądu i przelotów na 1 szt. 
export function addNewWykonanieCzystodruki({new_arkusze,new_wykonania,grupa_id,proces}){
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
        // czas: parseInt(((parseInt(a.naklad) + parseInt(a.nadkomplet))/ proces.predkosc * proces.mnoznik) * 60 + proces.narzad,10),
        czas: 60,
        koniec: "2024-10-30 11:00:00",
        procesor_id:proces.procesor_domyslny,
        grupa_id:grupa_id,
        narzad: proces.narzad,
        predkosc: 1,
        naklad: 1,
        mnoznik: proces.mnoznik,
        status:1,
        stan:1,
        przeloty: 1 ,
        uwagi: "",
        nazwa_wykonania: a.rodzaj_arkusza
      });
    })
}
