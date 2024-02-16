import axios from "axios";
import DecodeToken from "../../../Login/DecodeToken";
import { ip } from "../../../../Host";



export async function saveOrder({daneZamowienia,produkty,elementy,fragmenty,oprawa,cookies}){
            console.clear();
    let produktyEdit = produkty.slice();
    let elementyEdit = elementy.slice();


            
            console.log("...from save order start");
    let zamowienie_id  = await saveDataOrder({daneZamowienia,cookies})
            console.log("zamowienie_id: " +zamowienie_id);
    let savedProducts = await saveProducts({produktyEdit,zamowienie_id});

            console.log(savedProducts);
            console.log("...from save order end");
}




const saveFragmets = ({ savedProducts,elementyEdit, zamowienie_id }) => {
    return new Promise((resolve, reject) => {
      let promises = [];
      for (let i = 0; i < produktyEdit.length; i++) {
        promises.push(
          axios
            .post(ip + "produkty", {
              nazwa: produktyEdit[i].nazwa,
              zamowienie_id: zamowienie_id,
              typ: produktyEdit[i].typ,
              wersja: produktyEdit[i].wersja,
              uwagi: produktyEdit[i].uwagi,
            })
            .then((response) => {
              // do something with response
  
              produktyEdit[i].id = response.data.insertId;
              produktyEdit[i].zamowienie_id = zamowienie_id;
            })
        );
      }
  
      Promise.all(promises).then(() => resolve(produktyEdit));
    });
  };

const saveProducts = ({ produktyEdit, zamowienie_id }) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    for (let i = 0; i < produktyEdit.length; i++) {
      promises.push(
        axios
          .post(ip + "produkty", {
            nazwa: produktyEdit[i].nazwa,
            zamowienie_id: zamowienie_id,
            typ: produktyEdit[i].typ,
            wersja: produktyEdit[i].wersja,
            uwagi: produktyEdit[i].uwagi,
          })
          .then((response) => {
            // do something with response

            produktyEdit[i].id = response.data.insertId;
            produktyEdit[i].zamowienie_id = zamowienie_id;
          })
      );
    }

    Promise.all(promises).then(() => resolve(produktyEdit));
  });
};





//----------------------------------------------------------------------------------

const saveDataOrder = ({daneZamowienia,cookies}) =>{

    return new Promise(async(resolve,reject)=>{

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
    let zamowienie_id = res.data.insertId;

        resolve(zamowienie_id)

    })
}