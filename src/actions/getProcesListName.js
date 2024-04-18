import axios from "axios";
import { IP } from "../utils/Host";
export async function getProcesListName(setProcessName) {
    const res = await axios.get(IP + "lista-procesow-nazwa");
    setProcessName([...res.data]);
  }