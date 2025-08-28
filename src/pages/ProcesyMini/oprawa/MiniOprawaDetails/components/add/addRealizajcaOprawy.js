import axios from "axios";
import { IP } from "utils/Host";
import { getClients } from "actions/getClients";

export const  addRealizajcaOprawy  = async ({setShow,grup,value}) =>{
  
    await axios.post(IP + "klienci/" + sessionStorage.getItem("token"), {
        naklad: value,
        global_id: grup.global_id
      })
      .then((res2) => {
        
         setShow(false)
      })
       
    
    }