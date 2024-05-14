import axios from "axios";

import { IP } from "../utils/Host";


export function addKosztDodatkowyZamowienia(kosztyDodatkoweZamowienia,setKosztyDodatkoweZamowienia,daneZamowienia) {

// dodaje nowy koszt i dodaje pusty wpis do bazy, aby zwiększyć id

const kosztyEdit = kosztyDodatkoweZamowienia.slice();
// console.log("zamowienie id "+kosztyDodatkoweZamowienia[0].zamowienie_id )
  axios
    .post(IP + "addKosztDodatkowyZamowienia", {
      status: "1",
        zamowienie_id: daneZamowienia.id,
        zamowienie_prime_id: daneZamowienia.prime_id

    })
    .then((res) => {
      // pakowanieEdit.map((p) => {
      //   if (p.indeks > row.indeks) {
      //     p.indeks++;
      //   }
      // });

      kosztyEdit.push({
        id: res.data.insertId,
        nazwa: "",
        suma: "",
        info: "",
        status: "1",
        stan:"",
        zamowienie_id: daneZamowienia.id,
        zamowienie_prime_id: daneZamowienia.prime_id
      });

      kosztyEdit.sort((a, b) => a.indeks - b.indeks);
      setKosztyDodatkoweZamowienia(kosztyEdit);
    });
}


// const generateMaxID = (kosztyDodatkoweTemporary) => {
//   let maxID = null;
//   if(kosztyDodatkoweTemporary.length == 0) return maxID =1
//    maxID = Math.max(...kosztyDodatkoweTemporary.map((f) => f.id)) + 1

//   return maxID;
// }

// const generateMaxIndeks= (kosztyDodatkoweTemporary) => {
//   let maxIndeks = null;
//   if(kosztyDodatkoweTemporary.length == 0) return maxIndeks = 1
//    maxIndeks = Math.max(...kosztyDodatkoweTemporary.map((f) => f.indeks)) + 1

//   return maxIndeks;
// }