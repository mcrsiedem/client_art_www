

export function addNewGrupa({new_grupy,grupa_id,proces,i}){
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
      naklad: proces.naklad,
      status:1,
      stan:1,
      uwagi: ""
    });
}
