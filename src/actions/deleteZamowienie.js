import axios from "axios";

import { IP } from "../utils/Host";
import { refreshZamowienia } from "./refreshZamowienia";


export function deleteZamowienie(zamowienia,setZamowienia,setZamowieniaWyszukiwarka,rowsToDelete,setShowMenuZamowienia) {



  axios
  .delete(IP + "delete_zamowienie/"+ sessionStorage.getItem("token"), { data: { row: rowsToDelete } })
    .then((res) => {


    // console.log(res.status)
    // setZamowienia( zamowienia.filter(x => x.select !== true))
    refreshZamowienia(setZamowienia,setZamowieniaWyszukiwarka)
    setShowMenuZamowienia(false)


    });
}
