import axios from "axios";
import { IP } from "../utils/Host";

export async function zapiszTechnologie({daneTech,setDaneTech,produktyTech,setProduktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech}){
// let daneTechEdit = JSON.parse(JSON.stringify(daneTech))

  let savedDane  = await saveDane({daneTech,setDaneTech,produktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech})

  


  //stany po dodaniu technologia_id
  // let daneTechEdit = savedData.daneTechEdit
  // let produktyTechEdit =savedData.produktyTechEdit
  // let grupaWykonanEdit =savedData.grupaWykonanEdit 
  // let wykonaniaEdit =savedData.wykonaniaEdit 
  // let procesyElementowTechEdit =savedData.procesyElementowTechEdit 

  // let elementyTechEdit =savedData.elementyTechEdit
  // let fragmentyTechEdit =savedData.fragmentyTechEdit
  // let oprawaTechEdit =savedData.oprawaTechEdit
  // let legiEdit =savedData.legiEdit
  // let legiFragmentyEdit =savedData.legiFragmentyEdit 
  // let arkuszeEdit =savedData.arkuszeEdit 
// console.log("legi tech po zapisie: ", legiEdit )
// if(daneTech.id ==1) {
let savedGrupyWykonania = await saveGrupy({grupaWykonanEdit,wykonaniaEdit,procesyElementowTechEdit});
let savedWykonania = await saveWykonania({wykonaniaEdit});
let savedProcesyElementow = await saveProcesyElementow({procesyElementowTechEdit});


let res = await axios.get(IP + "technologie_parametry/"+savedDane.daneTech.id+"/"+ sessionStorage.getItem("token"));

  setDaneTech(res.data[0][0]);
  setProduktyTech(res.data[1]);

// }




}
//----------------------------------------------------------------------------------
const saveDane = ({daneTech,produktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech,saveAs}) =>{

  return new Promise(async(resolve,reject)=>{

  let res = await axios.post(IP + "zapiszTechnologie/" + sessionStorage.getItem("token"), [{
     
      nr: daneTech.nr,
      rok: daneTech.rok,
      firma_id: daneTech.firma_id,
      klient_id: daneTech.klient_id,
      tytul: daneTech.tytul,
      zamowienie_id: daneTech.zamowienie_id,
    }, produktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech])
    
  // let technologia_id_final = res.data[0].insertId;
  // let prime_id = res.data[1].prime_id;
  let daneTechEdit = res.data[0]
  let produktyTechEdit = res.data[1]
  let elementyTechEdit = res.data[2]
  let fragmentyTechEdit = res.data[3]
  let oprawaTechEdit = res.data[4]
  let legiEdit = res.data[5]
  let legiFragmentyEdit = res.data[6]
  let arkuszeEdit = res.data[7]
  let grupaWykonanEdit = res.data[8]
  let wykonaniaEdit = res.data[9]
  let procesyElementowTechEdit = res.data[10]

      resolve({daneTechEdit,produktyTechEdit,elementyTechEdit,fragmentyTechEdit,oprawaTechEdit,legiEdit,legiFragmentyEdit,arkuszeEdit,grupaWykonanEdit,wykonaniaEdit,procesyElementowTechEdit})

  })
}



// //----------------------------------------------------------------------------------
const saveGrupy = ({ grupaWykonanEdit }) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    for (let grupa of grupaWykonanEdit) {
      promises.push(axios.post(IP + "grupa/" + sessionStorage.getItem("token"), {
        id: grupa.id,
        indeks: grupa.indeks,
        technologia_id: grupa.technologia_id,
        mnoznik: grupa.mnoznik,
        czas: grupa.czas,
        koniec: grupa.koniec,
        narzad: grupa.narzad,
        nazwa: grupa.nazwa,
        poczatek: grupa.poczatek,
        predkosc: grupa.predkosc,
        proces_id: grupa.proces_id,
        procesor_id: grupa.procesor_id,
        element_id: grupa.element_id,
        status: grupa.status,
        stan: grupa.stan,
        uwagi: grupa.uwagi,
        id: grupa.id,
          })
          .then((response) => {
            let global_id = response.data.insertId;
            grupaWykonanEdit = grupaWykonanEdit.map((obj) => {
              if (obj.id == grupa.id) {return {
                ...obj, global_id : global_id
              } }else {return obj} 
            })
          })
      );
    }
    Promise.all(promises).then(() => resolve({grupaWykonanEdit}));
  });
};

// //---------------------------------------------------------------------------------
const saveWykonania = ({ wykonaniaEdit }) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    for (let wykonanie of wykonaniaEdit) {
      promises.push(axios.post(IP + "wykonania/" + sessionStorage.getItem("token"), wykonanie

          ) 
          .then((response) => {
            let global_id = response.data.insertId;
            wykonaniaEdit = wykonaniaEdit.map((obj) => {
              if (obj.id == wykonanie.id) {return {
                ...obj, global_id : global_id
              } }else {return obj} 
            })
          })
      );
    }
    Promise.all(promises).then(() => resolve({wykonaniaEdit}));
  });
};

// //---------------------------------------------------------------------------------
const saveProcesyElementow = ({ procesyElementowTechEdit }) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    for (let procesElementu of procesyElementowTechEdit) {
      promises.push(axios.post(IP + "procesy_elementow/" + sessionStorage.getItem("token"), procesElementu

          ) 
          .then((response) => {
            let global_id = response.data.insertId;
            procesyElementowTechEdit = procesyElementowTechEdit.map((obj) => {
              if (obj.id == procesElementu.id) {return {
                ...obj, global_id : global_id
              } }else {return obj} 
            })
          })
      );
    }
    Promise.all(promises).then(() => resolve({procesyElementowTechEdit}));
  });
};

// //---------------------------------------
