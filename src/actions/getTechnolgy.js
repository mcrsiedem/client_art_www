import axios from "axios";
import { IP } from "../utils/Host";
export async function getTechnology(setTechnology) {
    const res = await axios.get(IP + "technologie");

  
    setTechnology([...res.data]);
  }