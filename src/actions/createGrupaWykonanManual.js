import axios from "axios";

import { IP } from "../utils/Host";
import { getMaxID } from "./getMaxID";
import { getMaxIndeks } from "./getMaxIndeks";

export function createGrupaWykonanManual(rowProces,procesList,grupaWykonan,setGrupaWykonan,legi,wykonania, setWykonania,arkusze,setArkusze) {
  
  // funkcja dodaje grupe wykonan i wykonania do pojedynczego procesu
  // rowProces - proces przypisany do elementu z którego mają być wykonania i grupa
  // procesList - wszystkie dostępne procesy

  // const proces = procesList.filter(p => p.id == rowProces.proces_id )Z
  

  const grupaWykonanEdit = grupaWykonan.slice();
  grupaWykonanEdit.push({
    global_id:1,
    id: getMaxID(grupaWykonan),
    indeks: getMaxIndeks(grupaWykonan),
    element_id: rowProces.element_id,
    nazwa: rowProces.nazwa,
    narzad: procesList.filter(p => p.id == rowProces.proces_id )[0].narzad,
    predkosc: procesList.filter(p => p.id == rowProces.proces_id )[0].predkosc,
    mnoznik:1,
    procesor_id: procesList.filter(p => p.id == rowProces.proces_id )[0].procesor_domyslny,
    proces_id: rowProces.id,
    naklad: rowProces.naklad,
    stan:1,
    status:1,
    uwagi: ""
  });

   setGrupaWykonan(grupaWykonanEdit);


const wykonaniaEdit = wykonania.slice();


// jeżli aktualny proces ma w kolumnie lega = 1 to gereuje wykonania z leg danego alementu
if(procesList.filter(p => p.id == rowProces.proces_id )[0].lega == 1){

legi.filter(lega => lega.element_id == rowProces.element_id).forEach(lega => {
  wykonaniaEdit.push({
    id: getMaxID(wykonania),
    indeks: getMaxIndeks(wykonania),
    element_id: lega.element_id,
    grupa_id: getMaxID(grupaWykonan),
            arkusz_id: lega.arkusz_id, // bylo a.id
            lega_id: lega.id, // bylo a.id
    nazwa: rowProces.nazwa,
          nazwa_wykonania: lega.rodzaj_legi,
    narzad: procesList.filter(p => p.id == rowProces.proces_id )[0].narzad,
    predkosc: procesList.filter(p => p.id == rowProces.proces_id )[0].predkosc,
    mnoznik:1,
    procesor_id: procesList.filter(p => p.id == rowProces.proces_id )[0].procesor_domyslny,
    proces_id: rowProces.id,
    stan:1,
    status:1,
       naklad: lega.naklad,
    przeloty: lega.naklad / rowProces.ilosc_uzytkow,
    czas: parseInt((lega.naklad / procesList.filter(p => p.id == rowProces.proces_id )[0].predkosc ) * 60 + procesList.filter(p => p.id == rowProces.proces_id )[0].narzad,10),
    uwagi: ""
  });
  
});

}

// jeżli aktualny proces ma w kolumnie arkusz = 1 to gereuje wykonania z arkuszy danego alementu
if(procesList.filter(p => p.id == rowProces.proces_id )[0].arkusz == 1){

  arkusze.filter(arkusz => arkusz.element_id == rowProces.element_id).forEach(arkusz => {
    wykonaniaEdit.push({
      id: getMaxID(wykonania),
      indeks: getMaxIndeks(wykonania),
      element_id: arkusz.element_id,
      grupa_id: getMaxID(grupaWykonan),
      nazwa: rowProces.nazwa,
      narzad: procesList.filter(p => p.id == rowProces.proces_id )[0].narzad,
      predkosc: procesList.filter(p => p.id == rowProces.proces_id )[0].predkosc,
      mnoznik:1,
      procesor_id: procesList.filter(p => p.id == rowProces.proces_id )[0].procesor_domyslny,
      proces_id: rowProces.id,
      stan:1,
      nazwa_wykonania: arkusz.rodzaj_arkusza,
      arkusz_id: arkusz.id,
      naklad: arkusz.naklad,
      przeloty: parseInt(arkusz.naklad) + parseInt(arkusz.nadkomplet) ,
      status:1,
      czas: parseInt((arkusz.naklad / procesList.filter(p => p.id == rowProces.proces_id )[0].predkosc ) * 60 + procesList.filter(p => p.id == rowProces.proces_id )[0].narzad,10),
      uwagi: ""
    });
    
  });
  
  }





setWykonania(wykonaniaEdit)
// setGrupaWykonan(prev=> prev.map( ng => ({...ng,czas:wykonaniaEdit.filter(x=> x.grupa_id == ng.id).map(x => x.czas).reduce((a, b) => a + b, 0)}) ))
setGrupaWykonan(grupaWykonanEdit.map( ng => ({...ng,czas:SumaCzasow(wykonaniaEdit,ng),przeloty:SumaPrzelotow(wykonaniaEdit,ng),ilosc_narzadow:SumaWykonan(wykonaniaEdit,ng)}) ));


}




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

const SumaWykonan= (wykonania,grupa) => {

  return wykonania.filter(x=> x.grupa_id == grupa.id).length;
};
