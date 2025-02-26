import axios from "axios";

import { IP } from "../utils/Host";

export function createGrupaWykonanManual(rowProces,rowElement, procesy, grupaWykonan,setGrupaWykonan,legi,arkusze,wykonania, setWykonania) {


  // funkcja dodaje grupe wykonan i wykonania do pojedynczego procesu

  const new_grupy = [];
  const new_wykonania = [];

  const grupa ={
    id:1,
    element_id:1,
    proces_id:1,
    produkt_id:1,
    technologia_id:1,
    zamowienie_id:1,
    maszyna_id:1

  }



  procesy.map((proc,i)=> {
    if(proc.nazwa_id==1){  // druk

      new_grupy.push({
        id: i + 1,
        indeks: i + 1,
        nazwa: proc.nazwa,
        narzad: proc.narzad,
        predkosc: proc.predkosc
      });

      arkusze
      .filter(a => a.element_id == proc.element_id)
      .map(a=>{
        new_wykonania.push({
          id: i + 1,
          indeks: i + 1,
          nazwa: proc.nazwa,
          element_id: a.element_id,
          arkusz_id: a.id,
          proces_id: proc.id,
          typ_elementu: a.typ_elementu,
          narzad: proc.narzad,
          predkosc: proc.predkosc
        });
      })

    }
    if(proc.nazwa_id==3){ // falcowanie
      new_grupy.push({
        id: i + 1,
        indeks: i + 1,
        nazwa: proc.nazwa,
        narzad: proc.narzad,
        predkosc: proc.predkosc
      });

      legi
      .filter(a => a.element_id == proc.element_id)
      .map(a=>{
        new_wykonania.push({
          id: i + 1,
          indeks: i + 1,
          nazwa: proc.nazwa,
          element_id: a.element_id,
          arkusz_id: a.id,
          proces_id: proc.id,
          typ_elementu: a.typ_elementu,
          narzad: proc.narzad,
          predkosc: proc.predkosc
        });
      })








    }
    
  })

console.log("procesy: ", procesy)
console.log("arkusze: ", arkusze) 

   
setGrupaWykonan(new_grupy);
setWykonania(new_wykonania)
  // generateLegi(new_arkusze)

}


const generateLegi = (new_arkusze) => {
  const new_legi = []

  new_arkusze.forEach(ark => {

    
  });
}





const generateMaxID = (value) => {
  let maxID = null;
  if (value.length == 0) return (maxID = 1);
  maxID = Math.max(...value.map((f) => f.id)) + 1;

  return maxID;
};

const generateMaxIndeks = (value) => {
  let maxIndeks = null;
  if (value.length == 0) return (maxIndeks = 1);
  maxIndeks = Math.max(...value.map((f) => f.indeks)) + 1;

  return maxIndeks;
};
