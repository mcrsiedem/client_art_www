import axios from "axios";

import { IP } from "../utils/Host";


export function addNewProcess(row,procesyElementowTemporary, setProcesyElementowTemporary,procesList) {

const procesyElementowEditTemporary = procesyElementowTemporary.slice();

let proc = procesList.filter(x=> x.id == 14).map(x=>{return x})

      procesyElementowEditTemporary.push({
        ...proc[0],
        id: procesyElementowEditTemporary.length ==0 ? 1: Math.max(...procesyElementowTemporary.map((f) => f.id)) + 1,
        zamowienie_id: row.zamowienie_id,
        produkt_id: row.produkt_id,
        element_id: row.id,
        ilosc_uzytkow:2,
        proces_id: 14,
        nazwa_id: 2,
        front_ilosc: 1,
        back_ilosc: 0,
        front_kolor: "",
        back_kolor: "",
        info: "",
        indeks: newIndex(row,procesyElementowTemporary),
        insert:true
      });

      procesyElementowEditTemporary.sort((a, b) => a.indeks - b.indeks);
      setProcesyElementowTemporary(procesyElementowEditTemporary);

}

const newIndex = (row,procesyElementowTemporary) =>{

  let index;

  if(procesyElementowTemporary.filter(x=>x.element_id==row.id&& x.delete !=true).length == 0){
    index = 1
  }else{
    index = Math.max(...procesyElementowTemporary.filter(x=>x.element_id==row.id&& x.delete !=true).map((f) => f.indeks)) + 1

  }

  return index
}