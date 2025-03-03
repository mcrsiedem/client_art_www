import axios from "axios";

import { IP } from "../utils/Host";


export function addNewProcess(row,procesyElementowTemporary, setProcesyElementowTemporary) {

const procesyElementowEditTemporary = procesyElementowTemporary.slice();



      procesyElementowEditTemporary.push({
        id: Math.max(...procesyElementowTemporary.map((f) => f.id)) + 1,
        zamowienie_id: row.zamowienie_id,
        produkt_id: row.produkt_id,
        element_id: row.id,
        proces_id: 14,
        nazwa_id: 2,
        proces_nazwa: 2,
        proces_typ: 1,
        front_ilosc: 1,
        back_ilosc: 0,
        front_kolor: "",
        back_kolor: "",
        info: "",
        indeks: Math.max(...procesyElementowTemporary.map((f) => f.indeks)) + 1,
        insert:true
      });

      procesyElementowEditTemporary.sort((a, b) => a.indeks - b.indeks);
      setProcesyElementowTemporary(procesyElementowEditTemporary);

}
