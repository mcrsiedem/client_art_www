import axios from "axios";
import { IP } from "../utils/Host";
export  async function refreshZamowienia(setData) {
    const res = await axios.get(IP + "zamowienia");
    let jobs= [...res.data].filter(job => job.final == 1);
    setData(jobs);
  }