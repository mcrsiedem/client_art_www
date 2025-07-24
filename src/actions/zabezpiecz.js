import axios from "axios";
import { IP } from "../utils/Host";
export async function zabezpiecz() {
  const res = await axios.get(IP + "uprawnienia/" + sessionStorage.getItem("token"))
    // setUsers([...res.data]);
  }


  //funkcja testująca zabezpieczenia