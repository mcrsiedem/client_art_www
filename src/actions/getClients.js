import axios from "axios";
import { IP } from "../utils/Host";
export async function getClients(setClients,setClientsWyszukiwarka) {
  // console.log("token"+sessionStorage.getItem("token") )
    const res = await axios.get(IP + "lista-klientow/" + sessionStorage.getItem("token"))
    setClients([...res.data]);
    setClientsWyszukiwarka([...res.data]);
  }

