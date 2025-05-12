import axios from "axios";

import { IP } from "../utils/Host";


export function addNewProcess(row,procesyElementowTemporary, setProcesyElementowTemporary,procesList) {

const procesyElementowEditTemporary = procesyElementowTemporary.slice();
const procesListEdit = procesList.slice();

let proc = procesList.filter(x=> x.id == 14).map(x=>{return x})

      procesyElementowEditTemporary.push({
        ...proc[0],
        id: Math.max(...procesyElementowTemporary.map((f) => f.id)) + 1,
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
        indeks: Math.max(...procesyElementowTemporary.filter(x=>x.element_id==row.id&& x.delete !=true).map((f) => f.indeks)) + 1, // kolejny indeks danego elementu
        insert:true
      });





      procesyElementowEditTemporary.sort((a, b) => a.indeks - b.indeks);
      setProcesyElementowTemporary(procesyElementowEditTemporary);

}
