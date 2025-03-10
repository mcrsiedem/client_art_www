import axios from "axios";
import { IP } from "../utils/Host";
export async function getNadkomplety(setNadkomplety) {
    const res = await axios.get(IP + "nadkomplety/"+  sessionStorage.getItem("token"));
    setNadkomplety([...res.data]);
  }