import axios from "axios";

import { IP } from "../utils/Host";


export function addNewProcessTech(row,procesyElementowTechTemporary, setProcesyElementowTechTemporary,procesList) {

const procesyElementowEditTemporary = procesyElementowTechTemporary.slice();

// row = selectedElementTechROW
let proc = procesList.filter(x=> x.id == 14).map(x=>{return x})

    procesyElementowEditTemporary.push({
      // id: Math.max(...procesyElementowTechTemporary.map((f) => f.id)) + 1,
        ...proc[0],

      id: procesyElementowEditTemporary.length ==0 ? 1: Math.max(...procesyElementowEditTemporary.map((f) => f.id)) + 1,
      zamowienie_id: row.zamowienie_id,
      technologia_id: row.technologia_id,
      produkt_id: row.produkt_id,
      element_id: row.id,
      proces_id: 14,
      nazwa_id: 2,
      nazwa: "Uszlachetnianie",
      front_ilosc: 1,
      back_ilosc: 0,
      front_kolor: "",
      back_kolor: "",
      info: "",
      indeks: Math.max(...procesyElementowTechTemporary.map((f) => f.indeks)) + 1,
      insert: true
    });

    procesyElementowEditTemporary.sort((a, b) => a.indeks - b.indeks);
    setProcesyElementowTechTemporary(procesyElementowEditTemporary);

}
