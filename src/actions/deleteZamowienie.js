import axios from "axios";

import { IP } from "../utils/Host";
import { refreshZamowienia } from "./refreshZamowienia";


export function deleteZamowienie(zamowienia,setZamowienia,rowsToDelete,setShowMenu) {



  axios
  .delete(IP + "delete_zamowienie", { data: { row: rowsToDelete } })
    .then((res) => {


    // console.log(res.status)
    // setZamowienia( zamowienia.filter(x => x.select !== true))
    refreshZamowienia(setZamowienia)
    setShowMenu(false)


    });
}
