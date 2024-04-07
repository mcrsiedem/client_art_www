import axios from "axios";
import { IP } from "../utils/Host";
export async function getBindingType(setBindingTyp) {
    const res = await axios.get(IP + "lista-opraw");
    setBindingTyp([...res.data]);
  }