import axios from "axios";
import DecodeToken from "../pages/Login/DecodeToken";
import { IP } from "../utils/Host";
import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useZamowienia } from "./useZamowienia";

export  function useZamowienieZapiszDuzo(){
  let contextModalInsert = useContext(ModalInsertContext);
  let setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  let produkty = contextModalInsert.produkty;
  let daneZamowienia = contextModalInsert.daneZamowienia;
  let setDaneZamowienia= contextModalInsert.setDaneZamowienia;
  let elementy= contextModalInsert.elementy;
  let fragmenty= contextModalInsert.fragmenty;
  let oprawa= contextModalInsert.oprawa;
  let setProdukty= contextModalInsert.setProdukty;
  let setElementy= contextModalInsert.setElementy;
  let setFragmenty= contextModalInsert.setFragmenty;
  let setOprawa= contextModalInsert.setOprawa;
  let setProcesyElementow= contextModalInsert.setProcesyElementow;
  let procesyElementow= contextModalInsert.procesyElementow;

const [refreshZamowienia] = useZamowienia()

 async function zapiszZamowienieDuzo(){

  setSaveButtonDisabled(true)
          let response = [];
          let savedDane  = await saveDane({daneZamowienia,produkty,elementy,fragmenty,oprawa,procesyElementow})

          let zapis = savedDane.data[0][0].zapis; // jeśli dane zapisały sie to zapis == true
          let zamowienie_id = savedDane.data[0][1].zamowienie_id;  // nr id pod jakim zapisała sietechnologia
          // let res = await axios.get(IP + "parametry/"+savedDane.daneZamowienia.id+"/"+ sessionStorage.getItem("token"));


          if(zapis){
              produkty = produkty.map((obj) => {return{...obj, zamowienie_id} })
              elementy = elementy.map((obj) => {return{...obj, zamowienie_id} })
              fragmenty = fragmenty.map((obj) => {return{...obj, zamowienie_id} })
              oprawa = oprawa.map((obj) => {return{...obj, zamowienie_id} })
              procesyElementow = procesyElementow.map((obj) => {return{...obj, zamowienie_id} })

         

          let savedParametry  = await saveParametry({produkty,elementy,fragmenty,oprawa,procesyElementow})

          response.push(savedParametry.data)
          console.log(response)
          if(isSavedCorrect(response).status) {
            
            // alert("Zamowienie zapisana...")
        
          let res = await axios.get(IP + "parametry/"+zamowienie_id+"/"+ sessionStorage.getItem("token"));
        

          setDaneZamowienia(res.data[0][0])
          setProdukty(res.data[1])
          setElementy(res.data[2])
          setFragmenty(res.data[3])
          setOprawa(res.data[4])
          setProcesyElementow(res.data[5])


           }
        
           }else{
            // alert(" Coś poszło nie tak." + isSavedCorrect(response).error.sqlMessage +"\n sql: "+isSavedCorrect(response).error.sql)
            console.log("Uwaga : " ,isSavedCorrect(response).error.sqlMessage +" sql: ",isSavedCorrect(response).error.sql) ;
            setSaveButtonDisabled(false)
           }

           
           refreshZamowienia();

}

//----------------------------------------------------------------------------------
const saveDane = ({daneZamowienia}) =>{

  return new Promise(async(resolve,reject)=>{
      
  let res = await axios.post(IP + "zamowienieInsertDane/" + sessionStorage.getItem("token"),[ {
     
     nr: daneZamowienia.nr,
      rok: daneZamowienia.rok,
      firma_id: daneZamowienia.firma_id,
      klient_id: daneZamowienia.klient_id,
      tytul: daneZamowienia.tytul,
      data_przyjecia: daneZamowienia.data_przyjecia,
      data_materialow: daneZamowienia.data_materialow,
      data_spedycji: daneZamowienia.data_spedycji,
      opiekun_id: daneZamowienia.opiekun_id,
      user: DecodeToken(sessionStorage.getItem("token")).id,
      stan: daneZamowienia.stan,
      status: daneZamowienia.status,
      etap: daneZamowienia.etap,  // pliki akcept druk etc
      cena: daneZamowienia.cena,
      waluta_id: daneZamowienia.waluta_id,
      vat_id: daneZamowienia.vat_id,
      uwagi: daneZamowienia.uwagi,
      przedplata: daneZamowienia.przedplata,
      termin_platnosci: daneZamowienia.termin_platnosci,
      fsc: daneZamowienia.fsc,
      nr_stary: daneZamowienia.nr_stary,
      kod_pracy: daneZamowienia.kod_pracy,
      nr_zamowienia_klienta: daneZamowienia.nr_zamowienia_klienta,
      isbn: daneZamowienia.isbn,
      wartosc_zamowienia: daneZamowienia.wartosc_zamowienia,



    }])
    

      resolve(res)

  })
}

const saveParametry = ({produkty,elementy,fragmenty,oprawa,procesyElementow}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zamowienieInsertParametry/" + sessionStorage.getItem("token"),[produkty,elementy,fragmenty,oprawa,procesyElementow])
resolve(res)
  })
}

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


  return[zapiszZamowienieDuzo]
}

