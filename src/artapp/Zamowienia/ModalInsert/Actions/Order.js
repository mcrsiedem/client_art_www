import axios from "axios";
import DecodeToken from "../../../Login/DecodeToken";
import { ip } from "../../../../Host";



export async function saveOrder({daneZamowienia,produkty,elementy,fragmenty,oprawa,pakowanie,cookies,setProdukty,setElementy,setFragmenty,setOprawa,setPakowanie}){
            // console.clear();

    let produktyEdit = JSON.parse(JSON.stringify(produkty))
    let elementyEdit = JSON.parse(JSON.stringify(elementy))
    let fragmentyEdit = JSON.parse(JSON.stringify(fragmenty))
    let oprawaEdit = JSON.parse(JSON.stringify(oprawa))
    let pakowanieEdit = JSON.parse(JSON.stringify(pakowanie))
            
            // console.log("...from save order start");
            // console.log(oprawaEdit);          
            // console.log(fragmentyEdit);

    let savedOrder  = await saveDataOrder({daneZamowienia,cookies,produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit,pakowanieEdit})
    produktyEdit = savedOrder.produktyEdit
    elementyEdit = savedOrder.elementyEdit
    fragmentyEdit = savedOrder.fragmentyEdit
    oprawaEdit = savedOrder.oprawaEdit
    daneZamowienia = savedOrder.daneZamowienia
    pakowanieEdit = savedOrder.pakowanieEdit
 
            // console.log("zamowienie_id: " + savedOrder.zamowienie_id);
    let savedProducts = await saveProducts2({produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit,pakowanieEdit});

    elementyEdit = savedProducts.elementyEdit
    fragmentyEdit = savedProducts.fragmentyEdit
    oprawaEdit = savedProducts.oprawaEdit
    pakowanieEdit = savedProducts.pakowanieEdit

     let savedElements = await saveElements({produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit});
     fragmentyEdit = savedElements.fragmentyEdit

     let savedBindings = await saveBindings({produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit});
     fragmentyEdit = savedBindings.fragmentyEdit

     let savedFragments= await saveFragments({produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit});
     fragmentyEdit = savedFragments.fragmentyEdit

     let savedPacking= await savePacking({pakowanieEdit});
     pakowanieEdit = savedPacking.pakowanieEdit


    setProdukty(produktyEdit)
     setElementy(elementyEdit)
     setFragmenty(fragmentyEdit)
     setOprawa(oprawaEdit)
     setPakowanie(pakowanieEdit)
            // console.log(savedBindings);
            // console.log("...from save order end");
}




//----------------------------------------------------------------------------------

const saveDataOrder = ({daneZamowienia,cookies,produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit,pakowanieEdit}) =>{

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

    pakowanieEdit = pakowanieEdit.map((obj) => {
      if (obj.zamowienie_id == daneZamowienia.id) {return {
        ...obj, zamowienie_id : zamowienie_id
      } }else {return obj} 
    })


    daneZamowienia.id = zamowienie_id

        resolve({zamowienie_id,produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit,daneZamowienia,pakowanieEdit})

    })
}


const saveProducts2 = ({ produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit,pakowanieEdit }) => {
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

            pakowanieEdit = pakowanieEdit.map((obj) => {
              if (obj.produkt_id == produkt.id) {return {
                ...obj, produkt_id : produkt_id
              } }else {return obj} 
            })

            produkt.id = response.data.insertId;
      //      produkt.zamowienie_id = zamowienie_id;
          })
      );


    }

    Promise.all(promises).then(() => resolve({produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit,pakowanieEdit}));
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

const saveBindings = ({ produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit }) => {
  //oprawa
  console.log("tu: ")
  console.log(oprawaEdit)
  return new Promise((resolve, reject) => {
    let promises = [];
    for (let oprawa of oprawaEdit) {
      promises.push(axios.post(ip + "oprawa", {
                           zamowienie_id: oprawa.zamowienie_id,
                           produkt_id: oprawa.produkt_id,
                           oprawa: oprawa.oprawa,
                           naklad: oprawa.naklad,
                           uwagi: oprawa.uwagi,
                           data_spedycji: oprawa.data_spedycji
          })

          .then((response) => {

            let new_oprawa_id = response.data.insertId;

            fragmentyEdit = fragmentyEdit.map((obj) => {
              if (obj.oprawa_id === oprawa.id) {return {
                ...obj, oprawa_id : new_oprawa_id
              } }else {return obj} 
            })

            
            oprawa.id = new_oprawa_id
          })
          
          );

    }

    Promise.all(promises).then(() => resolve({produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit}));
  });
};


const saveFragments = ({ produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit }) => {
  //oprawa
  return new Promise((resolve, reject) => {
    let promises = [];
    for (let fragment of fragmentyEdit) {
      promises.push(axios.post(ip + "fragmenty", {
        naklad: fragment.naklad,
        info: fragment.info,
        index: fragment.index,
        zamowienie_id: fragment.zamowienie_id,
        element_id: fragment.element_id,
        produkt_id: fragment.produkt_id,
        typ: fragment.typ,
        oprawa_id: fragment.oprawa_id,
          })

          .then((response) => {

            let new_fragment_id = response.data.insertId;

            // fragmentyEdit = fragmentyEdit.map((obj) => {
            //   if (obj.oprawa_id == oprawa.id) {return {
            //     ...obj, oprawa_id : new_oprawa_id
            //   } }else {return obj} 
            // })

            fragment.id = new_fragment_id

          })
     
          );

    }

    Promise.all(promises).then(() => resolve({produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit}));
  });
};

const savePacking = ({ pakowanieEdit }) => {
  //pakowanie
  return new Promise((resolve, reject) => {
    let promises = [];
    for (let paczka of pakowanieEdit) {
      promises.push(axios.post(ip + "pakowanie", {
        zamowienie_id: paczka.zamowienie_id,
        produkt_id: paczka.produkt_id,
        nazwa: paczka.nazwa,
        naklad: paczka.naklad,
        uwagi: paczka.uwagi,

          })

          .then((response) => {

            let new_paczka_id = response.data.insertId;

            paczka.id = new_paczka_id

          })
     
          );

    }

    Promise.all(promises).then(() => resolve({pakowanieEdit}));
  });
};