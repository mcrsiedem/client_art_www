import axios from "axios";
import DecodeToken from "../pages/Login/DecodeToken";

import { IP } from "../utils/Host";

// * zapis kosztów dodatkowych:
//     - update koszty_dodatkowe set final= 0 where zamowienie_prime_id = X 
//     - insert wszystko z przesłanej tablicy koszty_dodatkowe
//     - update kosztyDodatkoweZamowienia


export async function zapisKosztowDodatkowych({
    kosztyDodatkoweTemporary,
    kosztyDodatkoweZamowienia,
    setKosztyDodatkowe,
    setShowKosztyDodatkoweEdit,
  selectedKosztyDodatkoweZamowienia
}) {

    let zamowienie_prime_id = selectedKosztyDodatkoweZamowienia.zamowienie_prime_id;

//     - update koszty_dodatkowe set final= 0 where zamowienie_prime_id = X 
// console.log("zamowienie_prime_id" +zamowienie_prime_id)
        updateKosztyDodatkowe(zamowienie_prime_id);


//     - insert wszystko z przesłanej tablicy koszty_dodatkowe


//     - update kosztyDodatkoweZamowienia


}

const updateKosztyDodatkowe = (zamowienie_prime_id) => {

    return new Promise(async(resolve,reject)=>{

        // console.log("zamowienie_prime_id" +zamowienie_prime_id)
        // resolve({zamowienie_id,produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit,daneZamowienia,pakowanieEdit,procesyElementowEdit})
    })

}