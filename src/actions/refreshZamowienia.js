import axios from "axios";
import { IP } from "../utils/Host";
export  async function refreshZamowienia(setData,setZamowieniaWyszukiwarka) {
    const res = await axios.get(IP + "zamowienia/"+ sessionStorage.getItem("token"));
    let jobs= [...res.data]
    setData(jobs);
    setZamowieniaWyszukiwarka(jobs);
  }

  