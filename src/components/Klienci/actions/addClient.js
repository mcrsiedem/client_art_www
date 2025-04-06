import axios from "axios";
import { IP } from "../../../utils/Host";
import { getClients } from "actions/getClients";

export const  addClient  = async ({daneKlienta,setClients,setClientsWyszukiwarka,setShowAddClientPane,setDaneKlienta,initialKlient}) =>{
  
    await axios.post(IP + "klienci", {
        firma: daneKlienta.firma,
        firma_nazwa: daneKlienta.firma_nazwa,
        adres: daneKlienta.adres,
        kod: daneKlienta.kod,
        nip: daneKlienta.nip,
        opiekun_id: daneKlienta.opiekun_id,
        utworzyl_user_id: daneKlienta.utworzyl_user_id,
    
      })
      .then((res2) => {
        
         getClients(setClients,setClientsWyszukiwarka )
         console.log("initialKlient",initialKlient)
         setDaneKlienta(initialKlient)
         setShowAddClientPane(false)
      })
       
    
    }