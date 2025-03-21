import axios from "axios";
import { IP } from "../utils/Host";
export async function getClients(papier_id) {
  // console.log("token"+sessionStorage.getItem("token") )
    const res = await axios.get(IP + "sprawdzCzyPapierUzyty/"+papier_id+"/"+ sessionStorage.getItem("token"));
    
    // setClients([...res.data]);
console.log(res.data)
    return true
  }

