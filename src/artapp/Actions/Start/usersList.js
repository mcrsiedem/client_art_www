import axios from "axios";
import { ip } from "../../../Host";
export async function getUsersList(setUsers) {
    const res = await axios.get(ip + "lista-userow");
    setUsers([...res.data]);
  }