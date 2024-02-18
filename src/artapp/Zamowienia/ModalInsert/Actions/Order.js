import axios from "axios";
import DecodeToken from "../../../Login/DecodeToken";
import { ip } from "../../../../Host";



export async function saveOrder({daneZamowienia,produkty,elementy,fragmenty,oprawa,cookies,setProdukty,setElementy,setFragmenty,setOprawa}){
            console.clear();

    // const produktyEdit = produkty.slice();
    // const elementyEdit = elementy.slice();
    const produktyEdit = JSON.parse(JSON.stringify(produkty))
    const elementyEdit = JSON.parse(JSON.stringify(elementy))
    const fragmentyEdit = JSON.parse(JSON.stringify(fragmenty))
    const oprawaEdit = JSON.parse(JSON.stringify(oprawa))

            
            console.log("...from save order start");
    let zamowienie_id  = await saveDataOrder({daneZamowienia,cookies})
            console.log("zamowienie_id: " +zamowienie_id);
    let savedProducts = await saveProducts({produktyEdit,elementyEdit,zamowienie_id,fragmentyEdit,oprawaEdit});
    // let set2 = await setE({setElementy,savedProducts});
    // let set = await setP({setProdukty,savedProducts});

    setProdukty(savedProducts.produktyEdit)
     setElementy(savedProducts.elementyEdit)
     setFragmenty(savedProducts.fragmentyEdit)
     setOprawa(savedProducts.oprawaEdit)

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


const saveProducts = ({ produktyEdit,elementyEdit, zamowienie_id,fragmentyEdit,oprawaEdit }) => {
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

            let produkt_id = response.data.insertId;
            
                          //------ oprawa

                  
                          //------

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
                            
                            

                            for (let fragment of fragmentyEdit.filter(e => e.element_id == element.id)) {
                              promises.push(axios.post(ip + "fragmenty", {
                                naklad: fragment.naklad,
                                info: fragment.info,
                                index: fragment.index,
                                zamowienie_id: zamowienie_id,
                                element_id: response.data.insertId,
                                produkt_id: produkt_id,
                                typ: fragment.typ,
                                oprawa_id: fragment.oprawa_id,
                                // oprawa_id: oprawaEdit.find(o => o.id_prev == fragment.oprawa_id).id

                
                  
                                  }).then((response)=>{

                                    const index = oprawaEdit.map(e => e.id).indexOf(fragment.oprawa_id)
                      
                              //  console.log("index: "+index)
                                      fragment.id = response.data.insertId
                                      fragment.element_id = element.id
                                      fragment.zamowienie_id = zamowienie_id
                                      fragment.produkt_id = produkt_id
                                      // oprawaEdit= oprawaEdit.map( oprawa => {  if (oprawa.id == fragment.oprawa_id) {
                                      //   return {...oprawa, id_fragmentow: fragment.id}
                                      // }})
                                       oprawaEdit[0].id_fragmentow = oprawaEdit[0].id_fragmentow+","+response.data.insertId
                                  })
                                  )
                          }
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

    Promise.all(promises).then(() => resolve({produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit}));
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