import axios from "axios";
import { IP } from "../utils/Host2";
export async function getUsers(setUsers) {
    const res = await axios.get(IP + "lista-userow");
    setUsers([...res.data]);
  }