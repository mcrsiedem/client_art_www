import { getMaxIndeks } from "actions/getMaxIndeks";


export function addNewGrupa({new_grupy,grupa_id,proces}){



  if(proces.proces_id == 82 || proces.proces_id == 83){
      // czystodruki
        new_grupy.push({
      id: grupa_id,
      global_id:0,
      indeks: getMaxIndeks(new_grupy),
      element_id: proces.element_id,
      nazwa: proces.nazwa,
      poczatek: "2024-10-30 10:00:00",
      czas: 1,
      koniec: "2024-10-30 11:00:00",
      procesor_id:proces.procesor_domyslny,
      narzad: proces.narzad,
      predkosc: 1,
      proces_id: proces.id,
      mnoznik: proces.mnoznik,
      naklad: 2,
      status:1,
      stan:1,
      uwagi: "",
      insert: true,
      technologia_id: proces.technologia_id || 0,
      zamowienie_id: proces.zamowienie_id
    });
  } else{
    // wszystko inne poza czystodrukami
      new_grupy.push({
      id: grupa_id,
      global_id:0,
      indeks: getMaxIndeks(new_grupy),
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
      naklad: proces.naklad,
      status:1,
      stan:1,
      uwagi: "",
      insert: true,
      technologia_id: proces.technologia_id || 0,
      zamowienie_id: proces.zamowienie_id
    });


  }

}
