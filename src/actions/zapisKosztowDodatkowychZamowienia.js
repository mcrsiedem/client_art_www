import axios from "axios";
import DecodeToken from "../pages/Login/DecodeToken";

import { IP } from "../utils/Host";

// * zapis kosztów dodatkowych:
//     - update koszty_dodatkowe set final= 0 where zamowienie_prime_id = X 
//     - insert wszystko z przesłanej tablicy koszty_dodatkowe
//     - update kosztyDodatkoweZamowienia


export async function zapisKosztowDodatkowychZamowienia(
    
    kosztyDodatkoweZamowienia,
    setKosztyDodatkoweZamowienia,
    value
   
) {
// console.log("koszty :" +kosztyDodatkoweZamowienia[0].id)
     let zapis = await   zapisKosztyDodatkoweZamowienia(kosztyDodatkoweZamowienia,value);

     if(zapis.zapis.status==201){

         setKosztyDodatkoweZamowienia({...kosztyDodatkoweZamowienia, status: value});
     }



}

const zapisKosztyDodatkoweZamowienia = (kosztyDodatkoweZamowienia,value) => {

    return new Promise(async(resolve,reject)=>{

        let zapis = await axios.post(IP + "zapis_kosztow_dodatkowych_zamowienia", {
          id:  kosztyDodatkoweZamowienia[0].id,
          value
        })

         resolve({zapis,kosztyDodatkoweZamowienia})
    })

}