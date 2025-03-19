import axios from "axios";
import { IP } from "../utils/Host";

export async function getPapieryPostac(setListaPapierowPostac,setListaPapierowPostacWyszukiwarka) {
  const res = await axios.get(IP + "lista-papierow-postac/" + sessionStorage.getItem("token"));
  setListaPapierowPostac([...res.data]);
  setListaPapierowPostacWyszukiwarka([...res.data]);
  }
