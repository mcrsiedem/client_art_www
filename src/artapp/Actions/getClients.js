import axios from "axios";
import { ip } from "../../Host";
export async function getClients(setClients) {
    const res = await axios.get(ip + "lista-klientow");
    setClients([...res.data]);
  }