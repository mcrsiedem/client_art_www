import axios from "axios";
import { IP } from "utils/Host";
import { getClients } from "actions/getClients";
import { getMaxID } from "actions/getMaxID";
import { today_teraz } from "actions/today_teraz";

export const  addRealizajcaOprawy  = async (setShow,grup,value,wykonaniaOprawy,setWykonaniaOprawy) =>{
  
  let status, insertId;
    await axios.post(IP + "dodaj_realizacje_oprawy/" + sessionStorage.getItem("token"), {...grup, naklad: value})
      .then((res) => {
           status = res.data.status
          insertId = res.data.insertId  

        if(status=='OK'){


const new_wykonaniaOprawy = wykonaniaOprawy.slice();

new_wykonaniaOprawy.push({...grup, id: getMaxID(wykonaniaOprawy),naklad:value, global_id :insertId,utworzono: today_teraz() })



      setWykonaniaOprawy(new_wykonaniaOprawy );
    }else{
      alert(status.sqlMessage)
    }



        
        
         setShow(false)
      })
       
    
    }