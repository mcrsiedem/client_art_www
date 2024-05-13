import axios from "axios";

import { IP } from "../utils/Host";


export function addKosztDodatkowy(kosztyDodatkoweTemporary,setKosztyDodatkoweTemporary) {

// dodaje nowy koszt i dodaje pusty wpis do bazy, aby zwiększyć id

const kosztyEdit = kosztyDodatkoweTemporary.slice();

  axios
    .post(IP + "addKosztDodatkowy", {
      zamowienie_id: 0,

    })
    .then((res) => {
      // pakowanieEdit.map((p) => {
      //   if (p.indeks > row.indeks) {
      //     p.indeks++;
      //   }
      // });

      kosztyEdit.push({
        id: Math.max(...kosztyDodatkoweTemporary.map((f) => f.id)) + 1,
        nazwa: "",
        ilosc: "",
        cena: "0",
        suma: "",
        info: "",
        zamowienia_koszty_id: kosztyDodatkoweTemporary[0].zamowienia_koszty_id,
        zamowienie_prime_id: kosztyDodatkoweTemporary[0].zamowienie_prime_id,

        indeks: Math.max(...kosztyDodatkoweTemporary.map((f) => f.indeks)) + 1
      });

      kosztyEdit.sort((a, b) => a.indeks - b.indeks);
      setKosztyDodatkoweTemporary(kosztyEdit);
    });
}
