import axios from "axios";
import DecodeToken from "../pages/Login/DecodeToken";
import { IP } from "../utils/Host";
import { refreshZamowienia } from "./refreshZamowienia";

export async function zapiszTechnologieUpdate({daneTech,setDaneTech,produktyTech,setProduktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech,setElementyTech,
  setFragmentyTech,
  setOprawaTech,
  setLegi,
  setLegiFragmenty,
  setArkusze,
  setGrupaWykonan,
  setWykonania,setProcesyElementowTech}){



          let savedDane  = await saveDane({daneTech,produktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech})

          //  setDaneZamowienia(savedDane.daneZamowienia)
          //  setProdukty(savedDane.produkty)
          //  setElementy(savedDane.elementy)
          //  setFragmenty(savedDane.fragmenty)
          //  setOprawa(savedDane.oprawa)
          //  setProcesyElementow(savedDane.procesyElementow)
           
          // refreshZamowienia(setZamowienia);

}

//----------------------------------------------------------------------------------
const saveDane = ({daneTech,produktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech}) =>{

  return new Promise(async(resolve,reject)=>{
      
  let res = await axios.put(IP + "zapiszTechnologieUpdate/" + sessionStorage.getItem("token"),[ {
     id: daneTech.id,
    nr: daneTech.nr,
    rok: daneTech.rok,
    firma_id: daneTech.firma_id,
    klient_id: daneTech.klient_id,
    tytul: daneTech.tytul,
    zamowienie_id: daneTech.zamowienie_id,
    opiekun_id: daneTech.opiekun_id,
      user: DecodeToken(sessionStorage.getItem("token")).id,
      update: daneTech.update



    }, produktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech])
    
  // let zamowienie_id = res.data[1].id;
  // let produkty_zamowienie_id = res.data[2][0].zamowienie_id;

  // daneZamowienia = res.data[0];
  // produkty = res.data[1];
  // elementy = res.data[2];
  // fragmenty = res.data[3];
  // oprawa = res.data[4];
  // procesyElementow = res.data[5];

      resolve({produktyTech})

  })
}
//----------------------------------------------------------------------------------

// const saveDataOrder = ({daneZamowienia,cookies,produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit,pakowanieEdit,procesyElementowEdit,saveAs}) =>{

//     return new Promise(async(resolve,reject)=>{

//       // przy SaveAs wymuszone zamowienie_id = 1 aby po stronie serwera napisał się prime id
//     let zamowienie_id_edit = 1;
//       // saveAs domyślnie false, bo domyślnie nadpisujemy.
//       if(!saveAs){

//        zamowienie_id_edit =daneZamowienia.id

//               let final_0 = await axios.put(IP + "zamowienia_not_final", { zamowienie_id: daneZamowienia.id,  })
          
//       }

        
//     let res = await axios.post(IP + "zamowienie", {
       
//       zamowienie_id: zamowienie_id_edit, // id zamówienia przed zapisem - gdy jest to pierwszy zapis to id = 1 wtedy po stronie serwera nowe id zostanie także przypisane do prime_id potrzebne do indentyfikacji całej grupy zamówień
//        prime_id: daneZamowienia.prime_id,
//        nr: daneZamowienia.nr,
//         rok: daneZamowienia.rok,
//         firma_id: daneZamowienia.firma_id,
//         klient_id: daneZamowienia.klient_id,
//         tytul: daneZamowienia.tytul,
//         data_przyjecia: daneZamowienia.data_przyjecia,
//         data_materialow: daneZamowienia.data_materialow,
//         data_spedycji: daneZamowienia.data_spedycji,
//         opiekun_id: daneZamowienia.opiekun_id,
//         user: DecodeToken(sessionStorage.getItem("token")).id,
//         stan: daneZamowienia.stan,
//         status: daneZamowienia.status,
//         rodzaj: daneZamowienia.rodzaj,  // szkic, wstępne, finalne
//         cena: daneZamowienia.cena,
//         waluta_id: daneZamowienia.waluta_id,
//         vat_id: daneZamowienia.vat_id,
//         uwagi: daneZamowienia.uwagi,
//         przedplata: daneZamowienia.przedplata,
//         termin_platnosci: daneZamowienia.termin_platnosci,
//         fsc: daneZamowienia.fsc,

//         final: 1 // ostateczna wersja zamówienia, którą widać na liście
//       })
      
//     let zamowienie_id = res.data[0].insertId;
//     let prime_id = res.data[1].prime_id;

    
//       // pierwszy zapis z nadaniem prime_id
//       if(prime_id != 1){
            
//                 produktyEdit = produktyEdit.map((obj) => {
//                   if (obj.zamowienie_id == daneZamowienia.id) {return {
//                     ...obj, zamowienie_id : zamowienie_id, prime_id
//                   } }else {return obj} 
//                 })


//                 elementyEdit = elementyEdit.map((obj) => {
//                   if (obj.zamowienie_id == daneZamowienia.id) {return {
//                     ...obj, zamowienie_id : zamowienie_id, prime_id
//                   } }else {return obj} 
//                 })

//                 fragmentyEdit = fragmentyEdit.map((obj) => {
//                   if (obj.zamowienie_id == daneZamowienia.id) {return {
//                     ...obj, zamowienie_id : zamowienie_id, prime_id
//                   } }else {return obj} 
//                 })

//                 oprawaEdit = oprawaEdit.map((obj) => {
//                   if (obj.zamowienie_id == daneZamowienia.id) {return {
//                     ...obj, zamowienie_id : zamowienie_id, prime_id
//                   } }else {return obj} 
//                 })

//                 pakowanieEdit = pakowanieEdit.map((obj) => {
//                   if (obj.zamowienie_id == daneZamowienia.id) {return {
//                     ...obj, zamowienie_id : zamowienie_id, prime_id
//                   } }else {return obj} 
//                 })

//                 procesyElementowEdit = procesyElementowEdit.map((obj) => {
//                   if (obj.zamowienie_id == daneZamowienia.id) {return {
//                     ...obj, zamowienie_id : zamowienie_id, prime_id
//                   } }else {return obj} 
//                 })


//                 daneZamowienia.id = zamowienie_id
//                 daneZamowienia.prime_id = prime_id
//       }



//             // kolejne zapisy bez zmiany prime_id
//             if(prime_id == 1){
            
//               produktyEdit = produktyEdit.map((obj) => {
//                 if (obj.zamowienie_id == daneZamowienia.id) {return {
//                   ...obj, zamowienie_id : zamowienie_id
//                 } }else {return obj} 
//               })


//               elementyEdit = elementyEdit.map((obj) => {
//                 if (obj.zamowienie_id == daneZamowienia.id) {return {
//                   ...obj, zamowienie_id : zamowienie_id
//                 } }else {return obj} 
//               })

//               fragmentyEdit = fragmentyEdit.map((obj) => {
//                 if (obj.zamowienie_id == daneZamowienia.id) {return {
//                   ...obj, zamowienie_id : zamowienie_id
//                 } }else {return obj} 
//               })

//               oprawaEdit = oprawaEdit.map((obj) => {
//                 if (obj.zamowienie_id == daneZamowienia.id) {return {
//                   ...obj, zamowienie_id : zamowienie_id
//                 } }else {return obj} 
//               })

//               pakowanieEdit = pakowanieEdit.map((obj) => {
//                 if (obj.zamowienie_id == daneZamowienia.id) {return {
//                   ...obj, zamowienie_id : zamowienie_id
//                 } }else {return obj} 
//               })

//               procesyElementowEdit = procesyElementowEdit.map((obj) => {
//                 if (obj.zamowienie_id == daneZamowienia.id) {return {
//                   ...obj, zamowienie_id : zamowienie_id
//                 } }else {return obj} 
//               })


//               daneZamowienia.id = zamowienie_id
//     }

      


//         resolve({zamowienie_id,produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit,daneZamowienia,pakowanieEdit,procesyElementowEdit})

//     })
// }

// const saveProducts2 = ({ produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit,pakowanieEdit,procesyElementowEdit }) => {
//   return new Promise((resolve, reject) => {
//     let promises = [];
//     for (let produkt of produktyEdit) {
//       promises.push(
//         axios
//           .post(IP + "produkty", {
//             zamowienie_id: produkt.zamowienie_id,
//             typ: produkt.typ,
//             nazwa: produkt.nazwa,
//             wersja: produkt.wersja,
//             ilosc_stron: produkt.ilosc_stron,
//             format_x: produkt.format_x,
//             format_y: produkt.format_y,
//             oprawa: produkt.oprawa,
//             naklad: produkt.naklad,
//             indeks: produkt.indeks,
//             uwagi: produkt.uwagi,
//           })

//           .then((response) => {

//             let produkt_id = response.data.insertId;
   
//             elementyEdit = elementyEdit.map((obj) => {
//               if (obj.produkt_id == produkt.id) {return {
//                 ...obj, produkt_id : produkt_id
//               } }else {return obj} 
//             })

//             fragmentyEdit = fragmentyEdit.map((obj) => {
//               if (obj.produkt_id == produkt.id) {return {
//                 ...obj, produkt_id : produkt_id
//               } }else {return obj} 
//             })

//             oprawaEdit = oprawaEdit.map((obj) => {
//               if (obj.produkt_id == produkt.id) {return {
//                 ...obj, produkt_id : produkt_id
//               } }else {return obj} 
//             })

//             pakowanieEdit = pakowanieEdit.map((obj) => {
//               if (obj.produkt_id == produkt.id) {return {
//                 ...obj, produkt_id : produkt_id
//               } }else {return obj} 
//             })

//             procesyElementowEdit = procesyElementowEdit.map((obj) => {
//               if (obj.produkt_id == produkt.id) {return {
//                 ...obj, produkt_id : produkt_id
//               } }else {return obj} 
//             })

//             produkt.id = response.data.insertId;
//       //      produkt.zamowienie_id = zamowienie_id;
//           })
//       );


//     }

//     Promise.all(promises).then(() => resolve({produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit,pakowanieEdit,procesyElementowEdit}));
//   });
// };

// const saveElements = ({ produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit,procesyElementowEdit }) => {
//   return new Promise((resolve, reject) => {
//     let promises = [];
//     for (let element of elementyEdit) {
//       promises.push(axios.post(IP + "elementy", {
//         zamowienie_id: element.zamowienie_id,
//         produkt_id: element.produkt_id,
//         nazwa: element.nazwa,
//         typ: element.typ,
//         naklad: element.naklad,
//         strony: element.ilosc_stron,
//         kolory: element.kolory,
//         format_x: element.format_x,
//         format_y: element.format_y,
//         papier_id: element.papier_id,
//         gramatura_id: element.gramatura_id,
//         papier_info: element.papier_info,
//         uwagi: element.uwagi,
//         indeks: element.indeks,
//           })

//           .then((response) => {

//             let new_element_id = response.data.insertId;

//             fragmentyEdit = fragmentyEdit.map((obj) => {
//               if (obj.element_id == element.id) {return {
//                 ...obj, element_id : new_element_id
//               } }else {return obj} 
//             })

//             procesyElementowEdit = procesyElementowEdit.map((obj) => {
//               if (obj.element_id == element.id) {return {
//                 ...obj, element_id : new_element_id
//               } }else {return obj} 
//             })

//             element.id = new_element_id
//       //      produkt.zamowienie_id = zamowienie_id;
//           })
//       );


//     }

//     Promise.all(promises).then(() => resolve({produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit,procesyElementowEdit}));
//   });
// };

// const saveBindings = ({ produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit }) => {
//   //oprawa
//   return new Promise((resolve, reject) => {
//     let promises = [];
//     for (let oprawa of oprawaEdit) {
//       promises.push(axios.post(IP + "oprawa", {
//                            zamowienie_id: oprawa.zamowienie_id,
//                            produkt_id: oprawa.produkt_id,
//                            oprawa: oprawa.oprawa,
//                            naklad: oprawa.naklad,
//                            bok_oprawy: oprawa.bok_oprawy,
//                            uwagi: oprawa.uwagi,
//                            wersja: oprawa.wersja,
//                            data_spedycji: oprawa.data_spedycji,
//                            data_czystodrukow: oprawa.data_czystodrukow,
//                            indeks: oprawa.indeks,
//           })

//           .then((response) => {

//             let new_oprawa_id = response.data.insertId;

//             fragmentyEdit = fragmentyEdit.map((obj) => {
//               if (obj.oprawa_id === oprawa.id) {return {
//                 ...obj, oprawa_id : new_oprawa_id
//               } }else {return obj} 
//             })

            
//             oprawa.id = new_oprawa_id
//           })
          
//           );

//     }

//     Promise.all(promises).then(() => resolve({produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit}));
//   });
// };

// const saveFragments = ({ produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit }) => {
//   //oprawa
//   return new Promise((resolve, reject) => {
//     let promises = [];
//     for (let fragment of fragmentyEdit) {
//       promises.push(axios.post(IP + "fragmenty", {
//         naklad: fragment.naklad,
//         ilosc_stron: fragment.ilosc_stron,
//         info: fragment.info,
//         indeks: fragment.indeks,
//         zamowienie_id: fragment.zamowienie_id,
//         element_id: fragment.element_id,
//         produkt_id: fragment.produkt_id,
//         typ: fragment.typ,
//         oprawa_id: fragment.oprawa_id,
//         indeks: fragment.indeks,
//         wersja: fragment.wersja

//           })

//           .then((response) => {
//             let new_fragment_id = response.data.insertId;
//             fragment.id = new_fragment_id
//           })
//           );
//     }

//     Promise.all(promises).then(() => resolve({produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit}));
//   });
// };

// const savePacking = ({ pakowanieEdit }) => {
//   //pakowanie
//   return new Promise((resolve, reject) => {
//     let promises = [];
//     for (let paczka of pakowanieEdit) {
//       promises.push(axios.post(IP + "pakowanie", {
//         zamowienie_id: paczka.zamowienie_id,
//         produkt_id: paczka.produkt_id,
//         nazwa: paczka.nazwa,
//         naklad: paczka.naklad,
//         uwagi: paczka.uwagi,
//         rodzaj_pakowania: paczka.rodzaj_pakowania,
//         sztuki_w_paczce: paczka.sztuki_w_paczce,
//         indeks: paczka.indeks

//           })

//           .then((response) => {
//             let new_paczka_id = response.data.insertId;
//             paczka.id = new_paczka_id
//           })
//           );
//     }
//     Promise.all(promises).then(() => resolve({pakowanieEdit}));
//   });
// };

// const saveProcess = ({ procesyElementowEdit }) => {
//   //pakowanie
//   return new Promise((resolve, reject) => {
//     let promises = [];
//     for (let process of procesyElementowEdit) {
//       promises.push(axios.post(IP + "procesyElementow", {
//         zamowienie_id: process.zamowienie_id,
//         produkt_id: process.produkt_id,
//         element_id: process.element_id,
//         proces_id: process.proces_id,
//         nazwa_id: process.nazwa_id,
//         front_ilosc: process.front_ilosc,
//         back_ilosc: process.back_ilosc,
//         front_kolor: process.front_kolor,
//         back_kolor: process.back_kolor,
//         info: process.info,
//         indeks: process.indeks

//           })

//           .then((response) => {
//             let new_proces_id = response.data.insertId;
//             process.id = new_proces_id
//           })
//           );
//     }
//     Promise.all(promises).then(() => resolve({procesyElementowEdit}));
//   });
// };