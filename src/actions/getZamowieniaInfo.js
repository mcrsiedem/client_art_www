import axios from "axios";

import { IP } from "../utils/Host";


export function getZamowieniaInfo(zamowienia,setShowZamowieniaInfo,setZamowieniaInfo) {


console.log(zamowienia)

  axios.put(IP + "zamowieniaInfo/"+ sessionStorage.getItem("token"),zamowienia)
    .then((res) => {

    setZamowieniaInfo(res.data)
setShowZamowieniaInfo(true)


    });
}

