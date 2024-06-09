import axios from "axios";

import { IP } from "../utils/Host";

export function createGrupaWykonan(rowElement, procesy, grupy,setGrupy,legi,arkusze) {


  const new_grupy = [];

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
        new_grupy.push({
          id: i + 1,
          indeks: i + 1,
          nazwa: proc.nazwa
        });
  })


    

   
  setGrupy(new_grupy);

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
