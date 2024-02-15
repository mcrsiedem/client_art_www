import axios from "axios";
import DecodeToken from "../../../Login/DecodeToken";
import { ip } from "../../../../Host";



export async function saveOrder({daneZamowienia,produkty,elementy,fragmenty,oprawa,cookies}){

    let produktyEdit = produkty.slice();
    console.clear();

    console.log("...from save order start");

    let res = await axios.post(ip + "zamowienie", {
        nr: daneZamowienia.nr,
        rok: daneZamowienia.rok,
        firma_id: daneZamowienia.firma_id,
        klient_id: daneZamowienia.klient_id,
        tytul: daneZamowienia.tytul,
        data_przyjecia: daneZamowienia.dataPrzyjecia,
        data_materialow: daneZamowienia.dataMaterialow,
        data_spedycji: daneZamowienia.dataSpedycji,
        opiekun: daneZamowienia.opiekun_id,
        user: DecodeToken(cookies.token).id,
        stan: daneZamowienia.stan,
        status: daneZamowienia.status,
        uwagi: daneZamowienia.uwagi,
      });
  const zamowienie_id = res.data.insertId;

  console.log("zamowienie_id: " +zamowienie_id);

    await saveProduct({produktyEdit,zamowienie_id});
   
  console.log("...from save order end");
}

const saveProduct = ({produktyEdit,zamowienie_id}) =>{

    return new Promise((resolve,reject)=>{

        produktyEdit.forEach(async (produkt, index) => {

         let res2 = await axios.post(ip + "produkty", {
                          nazwa: produkt.nazwa,
                          zamowienie_id: zamowienie_id,
                          typ: produkt.typ,
                          wersja: produkt.wersja,
                          uwagi: produkt.uwagi,
                          });
                          let produkt_id = res2.data.insertId;             
            console.log('...from produkt '+ produkt_id)
            resolve();
        })


    

        
    })
}