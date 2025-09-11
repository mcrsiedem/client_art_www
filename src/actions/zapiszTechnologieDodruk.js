import axios from "axios";
import DecodeToken from "../pages/Login/DecodeToken";
import { IP } from "../utils/Host";
import { refreshZamowienia } from "./refreshZamowienia";

export async function zapiszTechnologieDodruk({daneTech,produktyTech,elementyTech,fragmentyTech,oprawaTech,arkusze,legi,legiFragmenty,grupaWykonan,wykonania,procesyElementowTech,setDaneTech,setProduktyTech,
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
    let technologia_id = daneTech.id

      grupaWykonan = grupaWykonan.map((obj) => {return{...obj, technologia_id:daneTech.id, zamowienie_id: daneTech.zamowienie_id} })
      wykonania = wykonania.map((obj) => {return{...obj, technologia_id:daneTech.id, zamowienie_id: daneTech.zamowienie_id} })
      grupaOprawaTech = grupaOprawaTech.map((obj) => {return{...obj, technologia_id:daneTech.id, zamowienie_id: daneTech.zamowienie_id} })


      // console.log("grupy:",grupaWykonan.filter(x=> x.global_id ==0))
      // console.log("wykonania:",wykonania.filter(x=> x.global_id ==0))

  //  console.log("grupy:",grupaWykonan)
      // console.log("wykonania:",wykonania)


    let savedWykonania = await saveWykonania({wykonania})
    let savedGrupaWykonan  = await saveGrupaWykonan({grupaWykonan})
    let savedGrupaWykonanOprawa  = await saveGrupaWykonanOprawa({grupaOprawaTech})
    response.push(savedGrupaWykonan.data)
    response.push(savedWykonania.data)
    response.push(savedGrupaWykonanOprawa.data)

   
   if(isSavedCorrect(response).status) {
    setSaveButtonDisabled(true)
    alert("Dodruk zapisany...")


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
    //  const res = await axios.get(IP + "restoreTechnologia/"+daneTech.zamowienie_id+"/"+ sessionStorage.getItem("token"));
    alert(" Coś poszło nie tak." + isSavedCorrect(response).error.sqlMessage +"\n sql: "+isSavedCorrect(response).error.sql)
    console.log("Uwaga : " ,isSavedCorrect(response).error.sqlMessage +" sql: ",isSavedCorrect(response).error.sql) ;
    setSaveButtonDisabled(true)


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










const saveGrupaWykonan = ({grupaWykonan}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertGrupyZammowienia/" + sessionStorage.getItem("token"),[grupaWykonan.filter(x=> x.global_id ==0)])
                        .catch(function(rej) {
                              // alert(rej)
                              console.log("eror M ",rej);
                            });
resolve(res)
  })
}


const saveGrupaWykonanOprawa= ({grupaOprawaTech}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertGrupyOprawa/" + sessionStorage.getItem("token"),[grupaOprawaTech.filter(x=> x.global_id ==0)])
resolve(res)
  })
}


const saveWykonania = ({wykonania}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zapiszTechnologieInsertWykonania/" + sessionStorage.getItem("token"),[wykonania.filter(x=> x.global_id ==0)])
resolve(res)
  })
}


