import { getMaxIndeks } from "actions/getMaxIndeks";


export function addNewGrupaOprawa({new_grupaOprawaTech,oprawa,grupa_id,procesList,czasOprawy,iloscZbieran}){




new_grupaOprawaTech.push({
      id: grupa_id,
      global_id:0,
      indeks: getMaxIndeks(new_grupaOprawaTech),
      nazwa:procesList.filter(x=>x.id == oprawa.oprawa)[0].nazwa,
      poczatek: "2024-10-30 10:00:00",
      czas: czasOprawy(oprawa.id),
      koniec: "2024-10-30 11:00:00",
      procesor_id: procesList.filter(x=>x.id == oprawa.oprawa)[0].procesor_domyslny,
      narzad: procesList.filter(x=>x.id == oprawa.oprawa)[0].narzad,
      predkosc: procesList.filter(x=>x.id == oprawa.oprawa)[0].predkosc,
      proces_id: oprawa.oprawa, 
      oprawa_id: oprawa.id, //lokalne id oprawy, w przypadku jednej == 1
      mnoznik: procesList.filter(x=>x.id == oprawa.oprawa)[0].mnoznik,
      naklad: oprawa.naklad,
      bok_oprawy:oprawa.bok_oprawy,
      wersja: oprawa.wersja,
      ilosc_zbieran: iloscZbieran(oprawa.id),

      status:1,
      stan:1,
      uwagi: oprawa.uwagi
    });


  

}
