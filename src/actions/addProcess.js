import axios from "axios";

import { IP } from "../utils/Host";


export function addNewProcess(row,procesyElementowTemporary, setProcesyElementowTemporary) {

const procesyElementowEditTemporary = procesyElementowTemporary.slice();
console.log("row", row)
  axios
    .post(IP + "procesyElementow", {
      id:0,
      zamowienie_id: 0,
      produkt_id: 0,
      element_id: 1,
      proces_id: 1,
      nazwa_id: 1,
      proces_nazwa: 2,
      proces_typ: 1,
      front_ilosc: "",
      back_ilosc: "4",
      front_kolor: "CMYK",
      back_kolor: "CMYK",
      info: "",
      indeks: 0,
    })
    .then((res) => {
      procesyElementowEditTemporary.map((p) => {
        if (p.indeks > row.indeks) {
          p.indeks++;
        }
      });

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
        indeks: row.indeks + 1,
      });

      procesyElementowEditTemporary.sort((a, b) => a.indeks - b.indeks);
      setProcesyElementowTemporary(procesyElementowEditTemporary);
    });
}
