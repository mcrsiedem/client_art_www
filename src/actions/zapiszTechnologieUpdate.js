import axios from "axios";
import DecodeToken from "../pages/Login/DecodeToken";
import { IP } from "../utils/Host";
import { refreshZamowienia } from "./refreshZamowienia";

export async function zapiszTechnologieUpdate({daneTech,setDaneTech,produktyTech,setProduktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech,setElementyTech,
  setFragmentyTech,
  setOprawaTech,
  setLegi,
  setLegiFragmenty,
  setArkusze,
  setGrupaWykonan,
  setWykonania,setProcesyElementowTech,setSaveButtonDisabled,fechparametryTechnologii}){



          let savedDane  = await saveDane({daneTech,produktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech})
          setSaveButtonDisabled(true)

          fechparametryTechnologii(daneTech.zamowienie_id,daneTech.id)
          //  setDaneZamowienia(savedDane.daneZamowienia)
          //  setProdukty(savedDane.produkty)
          //  setElementy(savedDane.elementy)
          //  setFragmenty(savedDane.fragmenty)
          //  setOprawa(savedDane.oprawa)
          //  setProcesyElementow(savedDane.procesyElementow)
           
          // refreshZamowienia(setZamowienia);
          // alert(savedDane.data.sqlMessage + "\n \n " +savedDane.data.sql)
          console.log(savedDane)
          //sqlMessage: "Unknown column 'id1' in 'field list'", sql:
          
          // savedDane .catch( err => console.log(err))
}

//----------------------------------------------------------------------------------
const saveDane = ({daneTech,produktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech}) =>{

  return new Promise(async(resolve,reject)=>{



      
   let res = await axios.put(IP + "zapiszTechnologieUpdate/" + sessionStorage.getItem("token"),[ {
     id: daneTech.id,
    nr: daneTech.nr,
    rok: daneTech.rok,
    firma_id: daneTech.firma_id,
    klient_id: daneTech.klient_id,
    tytul: daneTech.tytul,
    uwagi: daneTech.uwagi,
    zamowienie_id: daneTech.zamowienie_id,
    opiekun_id: daneTech.opiekun_id,
    autor_id: daneTech.autor_id,
    data_przyjecia:daneTech.data_przyjecia,
    data_spedycji:daneTech.data_spedycji,
    data_materialow: daneTech.data_materialow,
    stan: daneTech.stan,
    status: daneTech.status,
    etap: daneTech.etap,
      user: DecodeToken(sessionStorage.getItem("token")).id,
      update: daneTech.update,
      alert: daneTech.alert || false



    }, produktyTech,elementyTech,fragmentyTech,oprawaTech,legi,legiFragmenty,arkusze,grupaWykonan,wykonania,procesyElementowTech])
    


   
resolve(res)
   



  })
}
