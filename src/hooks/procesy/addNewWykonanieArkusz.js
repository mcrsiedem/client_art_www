import { getMaxID } from "actions/getMaxID";


export function addNewWykonanieArkusz({new_arkusze,new_wykonania,grupa_id,proces}){
  if(proces.proces_id == 82 || proces.proces_id == 83){

    // czystodruki - tylko jedno wykonanie
const pierwszyArkusz = new_arkusze
  .find(a => a.element_id == proces.element_id);

// Sprawdź, czy element istnieje, zanim spróbujesz się do niego odwołać
if (pierwszyArkusz) {
  const a = pierwszyArkusz;
  const i = 0; // i=0, bo to pierwszy i jedyny element, który nas interesuje
  
  new_wykonania.push({
    id: getMaxID(new_wykonania),
    global_id:0,
    indeks: i + 1, // Będzie 1
    nazwa: proces.nazwa,
    element_id: a.element_id,
    arkusz_id: a.id,
    proces_id: proces.id,
    typ_elementu: a.typ_elementu,
    poczatek: "2024-10-30 10:00:00",
    czas:  60,
    koniec: "2024-10-30 11:00:00",
    procesor_id:proces.procesor_domyslny,
    grupa_id:grupa_id,
    narzad: proces.narzad,
    predkosc:  1,
    naklad:  2,
    mnoznik: proces.mnoznik,
    status:1,
    stan:1,
    przeloty: 2 ,
    uwagi: "",
    nazwa_wykonania: a.rodzaj_arkusza,
          technologia_id: proces.technologia_id || 0,
      zamowienie_id: proces.zamowienie_id,
         insert: true,
  })
  }

  }else{

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
        czas:  proces.proces_id == 82 || proces.proces_id == 83 ? 60: parseInt(((parseInt(a.naklad) + parseInt(a.nadkomplet))/ proces.predkosc * proces.mnoznik) * 60 + proces.narzad,10),
        koniec: "2024-10-30 11:00:00",
        procesor_id:proces.procesor_domyslny,
        grupa_id:grupa_id,
        narzad: proces.narzad,
        predkosc: proces.proces_id == 82 || proces.proces_id == 83 ? 1: proces.predkosc,
        naklad: proces.proces_id == 82 || proces.proces_id == 83 ? 1 : a.naklad,
        mnoznik: proces.mnoznik,
        status:1,
        stan:1,
        przeloty: proces.proces_id == 82 || proces.proces_id == 83 ? 1: parseInt(a.naklad) + parseInt(a.nadkomplet) ,
        uwagi: "",
        nazwa_wykonania: a.rodzaj_arkusza
        ,
    nazwa_wykonania: a.rodzaj_arkusza,
          technologia_id: proces.technologia_id || 0,
      zamowienie_id: proces.zamowienie_id,
         insert: true,
      });
    })
  }


}
