import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import axios from "axios";
import { IP } from "../utils/Host";
import { AppContext } from "context/AppContext";
import { refreshZamowienia } from "actions/refreshZamowienia";
export  function useZamowienieUpdate(){
  const contextModalInsert = useContext(ModalInsertContext);
  const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  const produkty= contextModalInsert.produkty;
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
  const elementy= contextModalInsert.elementy;
  const fragmenty= contextModalInsert.fragmenty;
  const oprawa= contextModalInsert.oprawa;
  const setProdukty= contextModalInsert.setProdukty;
  const setElementy= contextModalInsert.setElementy;
  const setFragmenty= contextModalInsert.setFragmenty;
  const setOprawa= contextModalInsert.setOprawa;
  const setProcesyElementow= contextModalInsert.setProcesyElementow;
  const procesyElementow= contextModalInsert.procesyElementow;
  const technologieID= contextModalInsert.technologieID;
  const historiaZamowienia= contextModalInsert.historiaZamowienia?.filter(x=>x.insert == true );
  const setHistoriaZamowienia= contextModalInsert.setHistoriaZamowienia;
  const contextApp = useContext(AppContext);
  const setZamowienia = contextApp.setZamowienia
const setTechnologieID = contextModalInsert.setTechnologieID;



  async function saveZamowienieUpdate(){

  let savedDane  = await save({daneZamowienia,produkty,elementy,fragmenty,oprawa,procesyElementow,technologieID,historiaZamowienia})
  
  const res = await axios.get(IP + "parametry/"+daneZamowienia.id+"/"+ sessionStorage.getItem("token"));

  

  // setDaneZamowienia(savedDane.daneZamowienia)
  // setProdukty(savedDane.produkty)
  // setElementy(savedDane.elementy)
  // setFragmenty(savedDane.fragmenty)
  // setOprawa(savedDane.oprawa)
  // setProcesyElementow(savedDane.procesyElementow)
  // setHistoriaZamowienia(savedDane.historiaZamowienia)

  setDaneZamowienia(res.data[0][0])
  setProdukty(res.data[1])
  setElementy(res.data[2])
  setFragmenty(res.data[3])
  setOprawa(res.data[4])
  setProcesyElementow(res.data[5])
  setTechnologieID(res.data[6])
  setHistoriaZamowienia(res.data[7])

  refreshZamowienia(setZamowienia);
  setSaveButtonDisabled(true)

}

return[saveZamowienieUpdate]
}





//----------------------------------------------------------------------------------
const save = ({daneZamowienia,produkty,elementy,fragmenty,oprawa,procesyElementow,technologieID,historiaZamowienia}) =>{

  return new Promise(async(resolve,reject)=>{
      
  let res = await axios.put(IP + "zapiszZamowienieUpdate/" + sessionStorage.getItem("token"),[ {
     
     id: daneZamowienia.id,
     nr: daneZamowienia.nr,
     produkt_nr: daneZamowienia.produkt_nr,
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
      etap: daneZamowienia.etap,  
      cena: daneZamowienia.cena,
      waluta_id: daneZamowienia.waluta_id,
      vat_id: daneZamowienia.vat_id,
      uwagi: daneZamowienia.uwagi,
      przedplata: daneZamowienia.przedplata,
      termin_platnosci: daneZamowienia.termin_platnosci,
      fsc: daneZamowienia.fsc,
      update: daneZamowienia.update



    }, produkty,elementy,fragmenty,oprawa,procesyElementow,technologieID,historiaZamowienia])
    
  // let zamowienie_id = res.data[1].id;
  // let produkty_zamowienie_id = res.data[2][0].zamowienie_id;

  daneZamowienia = res.data[0];
  produkty = res.data[1];
  elementy = res.data[2];
  fragmenty = res.data[3];
  oprawa = res.data[4];
  procesyElementow = res.data[5];
  historiaZamowienia = res.data[6];

      resolve({produkty,elementy,fragmenty,oprawa,daneZamowienia,procesyElementow,historiaZamowienia})

  })
}


// użycie

// const [add] = useHistoria()

// add(   {
//   kategoria: "Status zamówienia",
//   event: "Zmiana statusu zamówienia z "+ _status_dokumentu.filter(x=>x.id == daneZamowienia.status )[0].nazwa + " na "+ _status_dokumentu.filter(x=>x.id == event.target.value )[0].nazwa,
// })

// add(                    {
//   kategoria: "Stan zamówienia",
//   event: "Zmiana stanu zamówienia z "+ _stan_dokumentu.filter(x=>x.id == daneZamowienia.stan )[0].nazwa + " na "+ _stan_dokumentu.filter(x=>x.id == event.target.value )[0].nazwa}
// );

// add({kategoria: "Etap zamówienia",
//   event: "Zmiana etapu zamówienia z "+ _etapy_produkcji.filter(x=>x.id == daneZamowienia.etap )[0].nazwa + " na "+ _etapy_produkcji.filter(x=>x.id == event.target.value )[0].nazwa}
// );