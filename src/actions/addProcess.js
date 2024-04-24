import axios from "axios";

import { IP } from "../utils/Host";


export function addNewProcess(row,procesyElementow, setProcesyElementow) {

const procesyElementowEdit = procesyElementow.slice();

  axios
    .post(IP + "proces", {
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
      procesyElementowEdit.map((p) => {
        if (p.indeks > row.indeks) {
          p.indeks++;
        }
      });

      procesyElementowEdit.push({
        id: Math.max(...procesyElementow.map((f) => f.id)) + 1,
        zamowienie_id: row.zamowienie_id,
        produkt_id: row.produkt_id,
        element_id: row.element_id,
        proces_id: row.proces_id,
        nazwa_id: row.nazwa_id,
        proces_nazwa: row.proces_nazwa,
        proces_typ: row.proces_typ,
        front_ilosc: row.front_ilosc,
        back_ilosc: row.back_ilosc,
        front_kolor: row.front_kolor,
        back_kolor: row.back_kolor,
        info: row.info,
        indeks: row.indeks + 1,
      });

      procesyElementowEdit.sort((a, b) => a.indeks - b.indeks);
      setProcesyElementow(procesyElementowEdit);
    });
}
