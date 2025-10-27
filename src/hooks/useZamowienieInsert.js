import axios from "axios";
import DecodeToken from "../pages/Login/DecodeToken";
import { IP } from "../utils/Host";
import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useZamowienia } from "./useZamowienia";
import { useSocket } from "context/SocketContext";

// 25/07/2025
// nowy zapis zamówienia - dane i parametry w jednym

export  function useZamowienieInsert(){
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
  let pakowanie= contextModalInsert.pakowanie;
  let setPakowanie= contextModalInsert.setPakowanie;
  let ksiegowosc= contextModalInsert.ksiegowosc;
  let setKsiegowosc= contextModalInsert.setKsiegowosc;
  let kosztyDodatkoweZamowienia= contextModalInsert.kosztyDodatkoweZamowienia;
  let setKosztyDodatkoweZamowienia= contextModalInsert.setKosztyDodatkoweZamowienia;
  let setFaktury= contextModalInsert.setFaktury;
  let faktury= contextModalInsert.faktury;

    const procesyProduktow= contextModalInsert.procesyProduktow;
  const setProcesyProduktow= contextModalInsert.setProcesyProduktow;

const [refreshZamowienia] = useZamowienia()
     const {         socket } = useSocket()
 async function zapiszZamowienie({dialogBox}){

  setSaveButtonDisabled(true)
  dialogBox.current.show();
          const response = [];

          // tutaj testujemy błąd
  //  daneZamowienia = {...daneZamowienia, data_spedycji:1}

          const saved  = await save({produkty,elementy,fragmenty,oprawa,procesyElementow,pakowanie,kosztyDodatkoweZamowienia,ksiegowosc,faktury,daneZamowienia,procesyProduktow})

          if(saved.data !="error"){

     const   zamowienie_id = saved.data[0][1].zamowienie_id; 

          response.push(saved.data)
          console.log(response)

          if(isSavedCorrect(response).status) {

            dialogBox.current.showOK();
        
          const res = await axios.get(IP + "parametry/"+zamowienie_id+"/"+ sessionStorage.getItem("token"));
        

          setDaneZamowienia(res.data[0][0])
          setProdukty(res.data[1])
          setElementy(res.data[2])
          setFragmenty(res.data[3])
          setOprawa(res.data[4])
          setProcesyElementow(res.data[5])
          setPakowanie(res.data[8].sort((a, b) => a.indeks - b.indeks))
          setKosztyDodatkoweZamowienia(res.data[9])
          setKsiegowosc(res.data[10][0])
          setFaktury(res.data[11])
          //pliki
          setProcesyProduktow(res.data[13])
          socket.emit("realizacja")
           }else{
            alert("Błąd")
           }
           
           refreshZamowienia();
           dialogBox.current.hide();
          }else{
            alert("Bład zapisu zamówienia...")
             dialogBox.current.hide();
          }
  
}

//----------------------------------------------------------------------------------

const save = ({produkty,elementy,fragmenty,oprawa,procesyElementow,pakowanie,kosztyDodatkoweZamowienia,ksiegowosc,faktury,daneZamowienia,procesyProduktow}) =>{
  return new Promise(async(resolve,reject)=>{
   let res = await axios.post(IP + "zamowienieInsert/" + sessionStorage.getItem("token"),[produkty,elementy,fragmenty,oprawa,procesyElementow,pakowanie,kosztyDodatkoweZamowienia,ksiegowosc,faktury,daneZamowienia,procesyProduktow])
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


  return[zapiszZamowienie]
}

