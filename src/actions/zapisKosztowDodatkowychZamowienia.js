import axios from "axios";
import DecodeToken from "../pages/Login/DecodeToken";

import { IP } from "../utils/Host";

// * zapis kosztów dodatkowych:
//     - update koszty_dodatkowe set final= 0 where zamowienie_prime_id = X 
//     - insert wszystko z przesłanej tablicy koszty_dodatkowe
//     - update kosztyDodatkoweZamowienia


export async function zapisKosztowDodatkowychZamowienia({
    
    kosztyDodatkoweZamowienia,
    setKosztyDodatkoweZamowienia,
   }
) {

     let zapis = await   zapisKosztyDodatkoweZamowienia(kosztyDodatkoweZamowienia);

     if(zapis.zapis.status==201){
         setKosztyDodatkoweZamowienia(zapis.kosztyDodatkoweZamowienia);
    
     }
// console.log(zapis.zapis.status)
     // jeśli ok to:


}

const zapisKosztyDodatkoweZamowienia = (kosztyDodatkoweZamowienia) => {

    return new Promise(async(resolve,reject)=>{

        let zapis = await axios.post(IP + "zapis_kosztow_dodatkowych-zamowienia", {
            kosztyDodatkoweZamowienia})

         resolve({zapis,kosztyDodatkoweZamowienia})
    })

}