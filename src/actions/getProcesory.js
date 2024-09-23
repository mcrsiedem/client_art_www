import axios from "axios";
import { IP } from "../utils/Host";
export async function getProcesory(setProcesory) {
    const res = await axios.get(IP + "procesory");
    setProcesory([...res.data]);
    console.log("Pobieranie getProcesory")
  }