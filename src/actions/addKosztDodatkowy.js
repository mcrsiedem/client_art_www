import axios from "axios";

import { IP } from "../utils/Host";


export function addKosztDodatkowy(kosztyDodatkoweTemporary,setKosztyDodatkoweTemporary,kosztyDodatkoweZamowienia) {

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
        id: generateMaxID(kosztyDodatkoweTemporary),
        // id: Math.max(...kosztyDodatkoweTemporary.map((f) => f.id)) + 1,

        nazwa: "",
        ilosc: "",
        cena: "0",
        suma: "",
        info: "",
        zamowienia_koszty_id: kosztyDodatkoweZamowienia[0].id,
        zamowienie_prime_id: kosztyDodatkoweZamowienia[0].zamowienie_prime_id,

        indeks: generateMaxIndeks(kosztyDodatkoweTemporary)
      });

      kosztyEdit.sort((a, b) => a.indeks - b.indeks);
      setKosztyDodatkoweTemporary(kosztyEdit);
    });
}


const generateMaxID = (kosztyDodatkoweTemporary) => {
  let maxID = null;
  if(kosztyDodatkoweTemporary.length == 0) return maxID =1
   maxID = Math.max(...kosztyDodatkoweTemporary.map((f) => f.id)) + 1

  return maxID;
}

const generateMaxIndeks= (kosztyDodatkoweTemporary) => {
  let maxIndeks = null;
  if(kosztyDodatkoweTemporary.length == 0) return maxIndeks = 1
   maxIndeks = Math.max(...kosztyDodatkoweTemporary.map((f) => f.indeks)) + 1

  return maxIndeks;
}