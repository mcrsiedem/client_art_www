import axios from "axios";

import { ip } from "../../../Host";


export function addNewPacking(row, pakowanie, setPakowanie) {
const pakowanieEdit = pakowanie.slice();

  axios
    .post(ip + "pakowanie", {
      zamowienie_id: 0,
      produkt_id: 0,
      nazwa: 0,
      naklad: 0,
      sztuki_w_paczce: 0,
      rodzaj_pakowania: 0,
      uwagi: "pakowanie temp",
      indeks: 0,
    })
    .then((res) => {
      pakowanieEdit.map((p) => {
        if (p.indeks > row.indeks) {
          p.indeks++;
        }
      });

      pakowanieEdit.push({
        id: Math.max(...pakowanie.map((f) => f.id)) + 1,
        zamowienie_id: row.zamowienie_id,
        produkt_id: row.produkt_id,
        nazwa: row.nazwa,
        naklad: row.naklad,
        sztuki_w_paczce: row.sztuki_w_paczce,
        rodzaj_pakowania: row.rodzaj_pakowania,
        uwagi: row.uwagi,
        indeks: row.indeks + 1,
      });

      pakowanieEdit.sort((a, b) => a.indeks - b.indeks);
      setPakowanie(pakowanieEdit);
    });
}
