import axios from "axios";
import DecodeToken from "../../../Login/DecodeToken";
import { ip } from "../../../../Host";



export async function saveOrder({daneZamowienia,produkty,elementy,fragmenty,oprawa,cookies,setProdukty,setElementy,setFragmenty,setOprawa}){
            console.clear();

    // const produktyEdit = produkty.slice();
    // const elementyEdit = elementy.slice();
    let produktyEdit = JSON.parse(JSON.stringify(produkty))
    let elementyEdit = JSON.parse(JSON.stringify(elementy))
    let fragmentyEdit = JSON.parse(JSON.stringify(fragmenty))
    let oprawaEdit = JSON.parse(JSON.stringify(oprawa))

            
            console.log("...from save order start");
    let savedOrder  = await saveDataOrder({daneZamowienia,cookies,produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit})
    produktyEdit = savedOrder.produktyEdit
    elementyEdit = savedOrder.elementyEdit
    fragmentyEdit = savedOrder.fragmentyEdit
    oprawaEdit = savedOrder.oprawaEdit
    daneZamowienia = savedOrder.daneZamowienia



 
            console.log("zamowienie_id: " + savedOrder.zamowienie_id);
    let savedProducts = await saveProducts2({produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit});


    elementyEdit = savedProducts.elementyEdit
    fragmentyEdit = savedProducts.fragmentyEdit
    oprawaEdit = savedProducts.oprawaEdit

     let savedElements = await saveElements({produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit});
     fragmentyEdit = savedElements.fragmentyEdit


    setProdukty(produktyEdit)
     setElementy(elementyEdit)
     setFragmenty(fragmentyEdit)
     setOprawa(oprawaEdit)

            // console.log(savedProducts);
            console.log(savedElements);
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


const saveProducts = ({ produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit }) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    for (let produkt of produktyEdit) {
      promises.push(
        axios
          .post(ip + "produkty", {
            nazwa: produkt.nazwa,
            zamowienie_id: produkt.zamowienie_id,
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
                    zamowienie_id: element.zamowienie_id,
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
                                zamowienie_id: fragment.zamowienie_id,
                                element_id: response.data.insertId,
                                produkt_id: produkt_id,
                                typ: fragment.typ,
                                oprawa_id: fragment.oprawa_id,
                                // oprawa_id: oprawaEdit.find(o => o.id_prev == fragment.oprawa_id).id
//s
                
                  
                                  }).then((response)=>{

                                    const index = oprawaEdit.map(e => e.id).indexOf(fragment.oprawa_id)
                      
                              //  console.log("index: "+index)
                                      fragment.id = response.data.insertId
                                      fragment.element_id = element.id
                                   //   fragment.zamowienie_id = zamowienie_id
                                      fragment.produkt_id = produkt_id
                                      // oprawaEdit= oprawaEdit.map( oprawa => {  if (oprawa.id == fragment.oprawa_id) {
                                      //   return {...oprawa, id_fragmentow: fragment.id}
                                      // }})
                                       oprawaEdit[0].id_fragmentow = oprawaEdit[0].id_fragmentow+","+response.data.insertId
                                  })
                                  )
                          }
                            element.id = response.data.insertId
                            // element.zamowienie_id = zamowienie_id
                            element.produkt_id = produkt_id


                        })
                    
                    )
                    
            }

            produkt.id = response.data.insertId;
      //      produkt.zamowienie_id = zamowienie_id;
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

const saveDataOrder = ({daneZamowienia,cookies,produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit}) =>{

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
      })
      
    let zamowienie_id = res.data.insertId;


    produktyEdit = produktyEdit.map((obj) => {
      if (obj.zamowienie_id == daneZamowienia.id) {return {
        ...obj, zamowienie_id : zamowienie_id
      } }else {return obj} 
    })


    elementyEdit = elementyEdit.map((obj) => {
      if (obj.zamowienie_id == daneZamowienia.id) {return {
        ...obj, zamowienie_id : zamowienie_id
      } }else {return obj} 
    })

    fragmentyEdit = fragmentyEdit.map((obj) => {
      if (obj.zamowienie_id == daneZamowienia.id) {return {
        ...obj, zamowienie_id : zamowienie_id
      } }else {return obj} 
    })

    oprawaEdit = oprawaEdit.map((obj) => {
      if (obj.zamowienie_id == daneZamowienia.id) {return {
        ...obj, zamowienie_id : zamowienie_id
      } }else {return obj} 
    })

    daneZamowienia.id = zamowienie_id

        resolve({zamowienie_id,produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit,daneZamowienia})

    })
}


const saveProducts2 = ({ produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit }) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    for (let produkt of produktyEdit) {
      promises.push(
        axios
          .post(ip + "produkty", {
            nazwa: produkt.nazwa,
            zamowienie_id: produkt.zamowienie_id,
            typ: produkt.typ,
            wersja: produkt.wersja,
            uwagi: produkt.uwagi,
          })

          .then((response) => {

            let produkt_id = response.data.insertId;
   
            elementyEdit = elementyEdit.map((obj) => {
              if (obj.produkt_id == produkt.id) {return {
                ...obj, produkt_id : produkt_id
              } }else {return obj} 
            })

            fragmentyEdit = fragmentyEdit.map((obj) => {
              if (obj.produkt_id == produkt.id) {return {
                ...obj, produkt_id : produkt_id
              } }else {return obj} 
            })

            oprawaEdit = oprawaEdit.map((obj) => {
              if (obj.produkt_id == produkt.id) {return {
                ...obj, produkt_id : produkt_id
              } }else {return obj} 
            })

            produkt.id = response.data.insertId;
      //      produkt.zamowienie_id = zamowienie_id;
          })
      );


    }

    Promise.all(promises).then(() => resolve({produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit}));
  });
};

const saveElements = ({ produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit }) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    for (let element of elementyEdit) {
      promises.push(axios.post(ip + "elementy", {
        zamowienie_id: element.zamowienie_id,
        produkt_id: element.produkt_id,
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
          })

          .then((response) => {

            let new_element_id = response.data.insertId;

            fragmentyEdit = fragmentyEdit.map((obj) => {
              if (obj.element_id == element.id) {return {
                ...obj, element_id : new_element_id
              } }else {return obj} 
            })

            element.id = new_element_id
      //      produkt.zamowienie_id = zamowienie_id;
          })
      );


    }

    Promise.all(promises).then(() => resolve({produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit}));
  });
};