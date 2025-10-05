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


