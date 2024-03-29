import axios from "axios";
import { IP } from "../utils/Host";
export async function getProductType(setProductType) {
    const res = await axios.get(IP + "lista-produktow");
    setProductType([...res.data]);
  }