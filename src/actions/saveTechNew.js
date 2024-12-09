import axios from "axios";
import DecodeToken from "../pages/Login/DecodeToken";

import { IP } from "../utils/Host";



export async function saveTechNew({daneTech,setDaneTech,produktyTech,setProduktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech}){
// let daneTechEdit = JSON.parse(JSON.stringify(daneTech))

  let savedData  = await goSaveDataTech({daneTech,setDaneTech,produktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech})

  //stany po dodaniu technologia_id
  
  let daneTechEdit = savedData.daneTechEdit
  let produktyTechEdit =savedData.produktyTechEdit
  let grupaWykonanEdit =savedData.grupaWykonanEdit 
  let wykonaniaEdit =savedData.wykonaniaEdit 




  // let elementyTechEdit =savedData.elementyTechEdit
  // let fragmentyTechEdit =savedData.fragmentyTechEdit
  // let oprawaTechEdit =savedData.oprawaTechEdit
  // let legiEdit =savedData.legiEdit
  // let legiFragmentyEdit =savedData.legiFragmentyEdit 
  // let arkuszeEdit =savedData.arkuszeEdit 
  // let procesyElementowTechEdit =savedData.procesyElementowTechEdit 

// console.log("legi tech po zapisie: ", legiEdit )

let savedGrupyWykonania = await saveGrupy({grupaWykonanEdit});


  setProduktyTech(produktyTechEdit);
  setDaneTech(daneTechEdit);


}




//----------------------------------------------------------------------------------

const goSaveDataTech = ({daneTech,produktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech,saveAs}) =>{

    return new Promise(async(resolve,reject)=>{

      // przy SaveAs wymuszone zamowienie_id = 1 aby po stronie serwera napisał się prime id
       let id = 1;

      // saveAs domyślnie false, bo domyślnie nadpisujemy.
      if(!saveAs){

        id =daneTech.id
              // let final_0 = await axios.put(IP + "technologia_not_final", { technologia_id: daneTech.id,  })
          
      }

        
    let res = await axios.post(IP + "technologie_new", [{
       
       id: id, // id zamówienia przed zapisem - gdy jest to pierwszy zapis to id = 1 wtedy po stronie serwera nowe id zostanie także przypisane do prime_id potrzebne do indentyfikacji całej grupy zamówień
       prime_id: daneTech.prime_id,
       nr: daneTech.nr,
        rok: daneTech.rok,
        firma_id: daneTech.firma_id,
        klient_id: daneTech.klient_id,
        tytul: daneTech.tytul,
        final: 1, // ostateczna wersja zamówienia, którą widać na liście
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
      // dodaje do wszystkiego id techologi
      // produktyTech = produktyTech.map((obj) => {return{...obj, technologia_id:technologia_id_final} })
      // elementyTech = elementyTech.map((obj) => {return{...obj, technologia_id:technologia_id_final} })
      // fragmentyTech = fragmentyTech.map((obj) => {return{...obj, technologia_id:technologia_id_final} })
      // oprawaTech = oprawaTech.map((obj) => {return{...obj, technologia_id:technologia_id_final} })
      // legi = legi.map((obj) => {return{...obj, technologia_id:technologia_id_final} })
      // legiFragmenty = legiFragmenty.map((obj) => {return{...obj, technologia_id:technologia_id_final} })
      // arkusze = arkusze.map((obj) => {return{...obj, technologia_id:technologia_id_final} })
      // grupaWykonan = grupaWykonan.map((obj) => {return{...obj, technologia_id:technologia_id_final} })
      // wykonania = wykonania.map((obj) => {return{...obj, technologia_id:technologia_id_final} })
      // procesyElementowTech = procesyElementowTech.map((obj) => {return{...obj, technologia_id:technologia_id_final} })
 


    // daneTech.prime_id = prime_id
    // daneTech.id = technologia_id_final

        resolve({daneTechEdit,produktyTechEdit,elementyTechEdit,fragmentyTechEdit,oprawaTechEdit,legiEdit,legiFragmentyEdit,arkuszeEdit,grupaWykonanEdit,wykonaniaEdit,procesyElementowTechEdit})

    })
}


const saveGrupy = ({ grupaWykonanEdit }) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    for (let grupa of grupaWykonanEdit) {
      promises.push(axios.post(IP + "grupa", {
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