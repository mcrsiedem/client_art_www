import axios from "axios";
import { IP } from "../utils/Host";
export async function getProcesList(setProcess) {
    const res = await axios.get(IP + "lista-procesow");
    setProcess([...res.data]);
  }