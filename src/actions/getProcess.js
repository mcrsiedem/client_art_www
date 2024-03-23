import axios from "axios";
import { IP } from "../Host";
export async function getProcess(setProcess) {
    const res = await axios.get(IP + "lista-procesow");
    setProcess([...res.data]);
  }