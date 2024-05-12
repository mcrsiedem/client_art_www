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
    setShowKosztyDodatkoweEdit}
) {

     let zapis = await   zapisKosztyDodatkowe(kosztyDodatkoweTemporary,kosztyDodatkoweZamowienia);

     if(zapis.zapis.status==201){
        setShowKosztyDodatkoweEdit(false);
     setKosztyDodatkowe(kosztyDodatkoweTemporary)
     }
// console.log(zapis.zapis.status)
     // jeśli ok to:


}

const zapisKosztyDodatkowe = (kosztyDodatkoweTemporary,kosztyDodatkoweZamowienia) => {

    return new Promise(async(resolve,reject)=>{

        let zapis = await axios.post(IP + "zapis_kosztow_dodatkowych", {
            kosztyDodatkoweTemporary,kosztyDodatkoweZamowienia})
        // console.log("zamowienie_prime_id" +zamowienie_prime_id)
         resolve({zapis})
    })

}