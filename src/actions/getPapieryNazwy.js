import axios from "axios";
import { IP } from "../utils/Host";
export async function getPapieryNazwy(setListaPapierowNazwy) {
  // console.log("token"+sessionStorage.getItem("token") )
    const res = await axios.get(IP + "lista-papierow-nazwy/" + sessionStorage.getItem("token"));
    setListaPapierowNazwy([...res.data]);
  }

