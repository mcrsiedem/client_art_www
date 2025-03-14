import axios from "axios";
import { IP } from "../utils/Host";
export async function getPapiery(setListaPapierow) {
  // console.log("token"+sessionStorage.getItem("token") )
    const res = await axios.get(IP + "lista-papierow/" + sessionStorage.getItem("token"));
    setListaPapierow([...res.data]);
  }

