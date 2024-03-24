import axios from "axios";
import { IP } from "../utils/Host";
export async function getBindingType(setUsers) {
    const res = await axios.get(IP + "lista-opraw");
    setUsers([...res.data]);
  }