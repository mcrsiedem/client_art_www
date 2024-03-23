import axios from "axios";
import { IP } from "../../../Host2";

export const  addClient  = async (daneKlienta,getClients,test,setShowAddClientPane) =>{
  
    await axios.post(IP + "klienci", {
        firma: daneKlienta.firma,
        adres: daneKlienta.adres,
        kod: daneKlienta.kod,
        nIP: daneKlienta.nIP,
        opiekun_id: daneKlienta.opiekun_id,
        utworzyl_user_id: daneKlienta.utworzyl_user_id,
    
      })
      .then((res2) => {
         getClients()
         setShowAddClientPane(false)
      })
       
    
    }