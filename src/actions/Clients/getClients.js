import axios from "axios";
import { IP } from "../../utils/Host";
export async function getClients(setClients) {
    const res = await axios.get(IP + "lista-klientow");
    setClients([...res.data]);
  }