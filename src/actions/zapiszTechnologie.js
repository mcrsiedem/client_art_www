import axios from "axios";
import DecodeToken from "../pages/Login/DecodeToken";
import { IP } from "../utils/Host";
import { refreshZamowienia } from "./refreshZamowienia";

export async function zapiszTechnologie({daneTech,produktyTech,elementyTech,fragmentyTech,oprawaTech,arkusze,legi,legiFragmenty,grupaWykonan,wykonania,procesyElementowTech,setDaneTech,setProduktyTech,
  setElementyTech,
  setFragmentyTech,
  setOprawaTech,
  setLegi,
  setLegiFragmenty,
  setArkusze,
  setGrupaWykonan,
  setWykonania,
  setProcesyElementowTech,setSaveButtonDisabled,grupaOprawaTech, setGrupaOprawaTech}){

    let response = [];
    let savedDane  = await saveDane({daneTech})
   
    let zapis = savedDane.data[0][0].zapis; // jeśli dane zapisały sie to zapis == true
    let technologia_id = savedDane.data[0][1].technologia_id;  // nr id pod jakim zapisała sietechnologia

    if(zapis){
      produktyTech = produktyTech.map((obj) => {return{...obj, technologia_id, zamowienie_id: daneTech.zamowienie_id} })
      elementyTech = elementyTech.map((obj) => {return{...obj, technologia_id, zamowienie_id: daneTech.zamowienie_id} })
      fragmentyTech = fragmentyTech.map((obj) => {return{...obj, technologia_id, zamowienie_id: daneTech.zamowienie_id} })
      oprawaTech = oprawaTech.map((obj) => {return{...obj, technologia_id, zamowienie_id: daneTech.zamowienie_id} })
      arkusze = arkusze.map((obj) => {return{...obj, technologia_id, zamowienie_id: daneTech.zamowienie_id} })
      legi = legi.map((obj) => {return{...obj, technologia_id, zamowienie_id: daneTech.zamowienie_id} })
      legiFragmenty = legiFragmenty.map((obj) => {return{...obj, technologia_id, zamowienie_id: daneTech.zamowienie_id} })
      grupaWykonan = grupaWykonan.map((obj) => {return{...obj, technologia_id, zamowienie_id: daneTech.zamowienie_id} })
      wykonania = wykonania.map((obj) => {return{...obj, technologia_id, zamowienie_id: daneTech.zamowienie_id} })
      procesyElementowTech = procesyElementowTech.map((obj) => {return{...obj, technologia_id, zamowienie_id: daneTech.zamowienie_id} })
      grupaOprawaTech = grupaOprawaTech.map((obj) => {return{...obj, technologia_id, zamowienie_id: daneTech.zamowienie_id} })

    let savedProdukty  = await saveProdukty({produktyTech})
    let savedElementy = await saveElementy({elementyTech})
    let savedFragmenty = await saveFragmenty({fragmentyTech})
    let savedOprawa = await saveOprawa({oprawaTech})
    let savedArkusze  = await saveArkusze({arkusze})
    let savedLegi  = await saveLegi({legi})
    let savedLegiFragmenty  = await saveLegiFragmenty({legiFragmenty})
    let savedGrupaWykonan;
    //wstępna
    if(daneTech.stan==1){
    savedGrupaWykonan  = await saveGrupaWykonanHarmonogram({grupaWykonan})
    }
    if(daneTech.stan==2){
    savedGrupaWykonan  = await saveGrupaWykonan({grupaWykonan})
    }

    let savedGrupaWykonanOprawa;

    if(daneTech.stan==1){
      savedGrupaWykonanOprawa  = await saveGrupaWykonanOprawaHarmonogram({grupaOprawaTech})
      }
      if(daneTech.stan==2){
        savedGrupaWykonanOprawa  = await saveGrupaWykonanOprawa({grupaOprawaTech})
      }

    // let savedGrupaWykonan  = await saveGrupaWykonan({grupaWykonan})
    let savedWykonania = await saveWykonania({wykonania})
    let savedProcesyElementow = await saveProcesyElementow({procesyElementowTech})

    response.push(savedProdukty.data)
    response.push(savedElementy.data)
    response.push(savedFragmenty.data)
    response.push(savedOprawa.data)
    response.push(savedArkusze.data)
    response.push(savedLegi.data)
    response.push(savedLegiFragmenty.data)
    response.push(savedGrupaWykonan.data)
    response.push(savedWykonania.data)
    response.push(savedProcesyElementow.data)
    response.push(savedGrupaWykonanOprawa.data)

   
   if(isSavedCorrect(response).status) {
    setSaveButtonDisabled(true)
    alert("Technologia zapisana...")


      const res = await axios.get(IP + "technologie_parametry/"+technologia_id+"/"+ sessionStorage.getItem("token"));
      setDaneTech(res.data[0][0]) 
      setProduktyTech(res.data[1])
      setElementyTech(res.data[2])
      setFragmentyTech(res.data[3])
      setOprawaTech(res.data[4])
      setProcesyElementowTech(res.data[5])
      setLegi(res.data[6])
      setLegiFragmenty(res.data[7])
      setArkusze(res.data[8])
      setGrupaWykonan(res.data[9])
      setWykonania(res.data[10])
      setGrupaOprawaTech(res.data[11])



   }else{
     const res = await axios.get(IP + "restoreTechnologia/"+daneTech.zamowienie_id+"/"+ sessionStorage.getItem("token"));
    alert(" Coś poszło nie tak." + isSavedCorrect(response).error.sqlMessage +"\n sql: "+isSavedCorrect(response).error.sql)
    console.log("Uwaga : " ,isSavedCorrect(response).error.sqlMessage +" sql: ",isSavedCorrect(response).error.sql) ;
    setSaveButtonDisabled(true)


   }
   

    
   
    }
}
//---------------------------------------------------------------------------------
const isSavedCorrect = (response) =>{

  // sprawdza wszystkie statusy z opowiedzi
  // jeśli chociaż jednej jest false to cały zapis trzeba anulować 

  for( let val of response){
    for( let value of val){
      if (value[0].zapis == false) return {status: false, error: value[1] }
    }
  }

  return {status: true }
  
}

// const isSavedCorrect2 = (response) =>{
//   for( let val of response){
//     for( let value of val){
//       if (value[0].zapis == false) return false
//     }
//   }

//   return true;
  
// }


//----------------------------------------------------------------------------------

const saveDane = ({daneTech}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertDane/" + sessionStorage.getItem("token"),[daneTech])
resolve(res)
  })
}

const saveProdukty = ({produktyTech}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertProdukty/" + sessionStorage.getItem("token"),[produktyTech])
resolve(res)
  })
}

const saveElementy = ({elementyTech}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertElementy/" + sessionStorage.getItem("token"),[elementyTech])
resolve(res)
  })
}

const saveFragmenty = ({fragmentyTech}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertFragmenty/" + sessionStorage.getItem("token"),[fragmentyTech])
resolve(res)
  })
}

const saveOprawa = ({oprawaTech}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertOprawa/" + sessionStorage.getItem("token"),[oprawaTech])
resolve(res)
  })
}
const saveArkusze = ({arkusze}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertArkusze/" + sessionStorage.getItem("token"),[arkusze])
resolve(res)
  })
}
const saveLegi = ({legi}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertLegi/" + sessionStorage.getItem("token"),[legi])
resolve(res)
  })
}

const saveLegiFragmenty = ({legiFragmenty}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertLegiFragmenty/" + sessionStorage.getItem("token"),[legiFragmenty])
resolve(res)
  })
}

const saveGrupaWykonan = ({grupaWykonan}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertGrupyZammowienia/" + sessionStorage.getItem("token"),[grupaWykonan])
                        .catch(function(rej) {
                              // alert(rej)
                              console.log("eror M ",rej);
                            });
resolve(res)
  })
}

const saveGrupaWykonanHarmonogram = ({grupaWykonan}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertGrupyHarmonogram/" + sessionStorage.getItem("token"),[grupaWykonan])
resolve(res)
  })
}

const saveGrupaWykonanOprawa= ({grupaOprawaTech}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertGrupyOprawa/" + sessionStorage.getItem("token"),[grupaOprawaTech])
resolve(res)
  })
}

const saveGrupaWykonanOprawaHarmonogram= ({grupaOprawaTech}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertGrupyOprawaHarmonogram/" + sessionStorage.getItem("token"),[grupaOprawaTech])
resolve(res)
  })
}
const saveWykonania = ({wykonania}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertWykonania/" + sessionStorage.getItem("token"),[wykonania])
resolve(res)
  })
}

const saveProcesyElementow = ({procesyElementowTech}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertProcesyElementow/" + sessionStorage.getItem("token"),[procesyElementowTech])
resolve(res)
  })
}


// const saveDane = ({daneTech,produktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech}) =>{

//   return new Promise(async(resolve,reject)=>{
//    let res = await axios.put(IP + "zapiszTechnologieUpdate/" + sessionStorage.getItem("token"),[ {
//      id: daneTech.id,
//     nr: daneTech.nr,
//     rok: daneTech.rok,
//     firma_id: daneTech.firma_id,
//     klient_id: daneTech.klient_id,
//     tytul: daneTech.tytul,
//     uwagi: daneTech.uwagi,
//     zamowienie_id: daneTech.zamowienie_id,
//     opiekun_id: daneTech.opiekun_id,
//     autor_id: daneTech.autor_id,
//     data_przyjecia:daneTech.data_przyjecia,
//     data_spedycji:daneTech.data_spedycji,
//     data_materialow: daneTech.data_materialow,
//     stan: daneTech.stan,
//     status: daneTech.status,
//     etap: daneTech.etap,
//       user: DecodeToken(sessionStorage.getItem("token")).id,
//       update: daneTech.update
//     }, produktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech])
// resolve(res)
//   })
// }
//----------------------------------------------------------------------------------

// const saveArkusze = ({ arkusze }) => {
//   return new Promise((resolve, reject) => {
//     let promises = [];
//     for (let row of arkusze) {
//       promises.push(axios.post(IP + "arkusze", {
//         id: row.id,
//         indeks: row.indeks,
//         technologia_id: row.technologia_id,
//         typ_elementu: row.typ_elementu,
//         rodzaj_arkusza: row.rodzaj_arkusza,
//         element_id: row.element_id,
//         ilosc_stron: row.ilosc_stron,
//         ilosc_leg: row.ilosc_leg,
//         naklad: row.naklad,
//         nadkomplet: row.nadkomplet,
//         papier_id: row.papier_id,
//         nr_arkusza: row.nr_arkusza,
//         arkusz_szerokosc: row.arkusz_szerokosc,
//         arkusz_wysokosc: row.arkusz_wysokosc,
//         uwagi: row.uwagi,
      
//           })

//           .then((response) => {

//             row.global_id = response.data.insertId;

//           })
//       );

//     }
//     Promise.all(promises).then(() => resolve({arkusze}));
//   });
// };

//---------------------------------
// const saveDane = ({daneTech,produktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech}) =>{

//   return new Promise(async(resolve,reject)=>{
//    let res = await axios.put(IP + "zapiszTechnologieUpdate/" + sessionStorage.getItem("token"),[ {
//      id: daneTech.id,
//     nr: daneTech.nr,
//     rok: daneTech.rok,
//     firma_id: daneTech.firma_id,
//     klient_id: daneTech.klient_id,
//     tytul: daneTech.tytul,
//     uwagi: daneTech.uwagi,
//     zamowienie_id: daneTech.zamowienie_id,
//     opiekun_id: daneTech.opiekun_id,
//     autor_id: daneTech.autor_id,
//     data_przyjecia:daneTech.data_przyjecia,
//     data_spedycji:daneTech.data_spedycji,
//     data_materialow: daneTech.data_materialow,
//     stan: daneTech.stan,
//     status: daneTech.status,
//     etap: daneTech.etap,
//       user: DecodeToken(sessionStorage.getItem("token")).id,
//       update: daneTech.update
//     }, produktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech])
// resolve(res)
//   })
// }

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