import axios from "axios";
import DecodeToken from "../../../Login/DecodeToken";
import { ip } from "../../../../Host";



export async function saveOrder({daneZamowienia,produkty,elementy,fragmenty,oprawa,cookies,setProdukty,setElementy}){
            console.clear();
    // const produktyEdit = produkty.slice();
    // const elementyEdit = elementy.slice();
    const produktyEdit = [...produkty]
    const elementyEdit = [...elementy]

            
            console.log("...from save order start");
    let zamowienie_id  = await saveDataOrder({daneZamowienia,cookies})
            console.log("zamowienie_id: " +zamowienie_id);
    let savedProducts = await saveProducts({produktyEdit,elementyEdit,zamowienie_id});
    // let set2 = await setE({setElementy,savedProducts});
    // let set = await setP({setProdukty,savedProducts});

    // setProdukty(savedProducts.produktyEdit)
    // setElementy(savedProducts.elementyEdit)
            console.log(savedProducts);
            console.log("...from save order end");
}



// const setP = ({ setProdukty,savedProducts}) => {
//     return new Promise((resolve, reject) => {

// setProdukty(savedProducts.produktyEdit)
// resolve()

//     })}

//     const setE = ({ setElementy,savedProducts}) => {
//         return new Promise((resolve, reject) => {
    
//             setElementy(savedProducts.elementyEdit)
//     resolve()
    
//         })}


const saveProducts = ({ produktyEdit,elementyEdit, zamowienie_id }) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    for (let produkt of produktyEdit) {
      promises.push(
        axios
          .post(ip + "produkty", {
            nazwa: produkt.nazwa,
            zamowienie_id: zamowienie_id,
            typ: produkt.typ,
            wersja: produkt.wersja,
            uwagi: produkt.uwagi,
          })
          .then((response) => {
            // do something with response filter(element => element.produkt_id == produktyEdit[i].id)
            let produkt_id = response.data.insertId;

            for (let element of elementyEdit.filter(e => e.produkt_id == produkt.id)) {
                promises.push(axios.post(ip + "elementy", {
                    zamowienie_id: zamowienie_id,
                    produkt_id: produkt_id,
                    nazwa: element.nazwa,
                    typ: element.typ,
                    naklad: element.naklad,
                    strony: element.ilosc_stron,
                    kolory: element.kolory,
                    format_x: element.format_x,
                    format_y: element.format_y,
                    papier_id: element.papier_id,
                    gramatura_id: element.gramatura_id,
                    papier_info: element.papier_info,
                    uwagi: element.uwagi,
    
                    }).then((response)=>{
                        element.id = response.data.insertId
                        element.zamowienie_id = zamowienie_id
                         element.produkt_id = produkt_id
                    })
                    
                    )
                    
            }

            produkt.id = response.data.insertId;
            produkt.zamowienie_id = zamowienie_id;
          })
      );


    }

    Promise.all(promises).then(() => resolve({produktyEdit,elementyEdit}));
  });
};


// const saveFragmets = ({ savedProducts,elementyEdit, zamowienie_id }) => {
//     return new Promise((resolve, reject) => {
//       let promises = [];
//       for (let i = 0; i < produktyEdit.length; i++) {
//         promises.push(
//           axios
//             .post(ip + "produkty", {
//               nazwa: produktyEdit[i].nazwa,
//               zamowienie_id: zamowienie_id,
//               typ: produktyEdit[i].typ,
//               wersja: produktyEdit[i].wersja,
//               uwagi: produktyEdit[i].uwagi,
//             })
//             .then((response) => {
//               // do something with response
  
//               produktyEdit[i].id = response.data.insertId;
//               produktyEdit[i].zamowienie_id = zamowienie_id;
//             })
//         );
//       }
  
//       Promise.all(promises).then(() => resolve(produktyEdit));
//     });
//   };


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