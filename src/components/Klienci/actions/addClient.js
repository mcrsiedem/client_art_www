import axios from "axios";
import { IP } from "../../../utils/Host";
import { getClients } from "actions/getClients";

export const  addClient  = async (daneKlienta,setClients,setClientsWyszukiwarka,setShowAddClientPane) =>{
  
    await axios.post(IP + "klienci", {
        firma: daneKlienta.firma,
        adres: daneKlienta.adres,
        kod: daneKlienta.kod,
        nIP: daneKlienta.nIP,
        opiekun_id: daneKlienta.opiekun_id,
        utworzyl_user_id: daneKlienta.utworzyl_user_id,
    
      })
      .then((res2) => {
        
         getClients(setClients,setClientsWyszukiwarka )
         setShowAddClientPane(false)
      })
       
    
    }