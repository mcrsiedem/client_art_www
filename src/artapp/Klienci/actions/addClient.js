import axios from "axios";
import { ip } from "../../../Host";

export const  addClient  = async (daneKlienta,context,getClients,test,setShowAddClientPane) =>{
  
    await axios.post(ip + "klienci", {
        firma: daneKlienta.firma,
        adres: daneKlienta.adres,
        kod: daneKlienta.kod,
        nip: daneKlienta.nip,
        opiekun_id: daneKlienta.opiekun_id,
        utworzyl_user_id: daneKlienta.utworzyl_user_id,
    
      })
      .then((res2) => {
         getClients()
         setShowAddClientPane(false)
      })
       
    
    }