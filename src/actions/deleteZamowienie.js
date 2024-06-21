import axios from "axios";

import { IP } from "../utils/Host";


export function deleteZamowienie(zamowienia,setZamowienia,rowsToDelete,setShowMenu) {



  axios
    .post(IP + "delete_zamowienie", rowsToDelete)
    .then((res) => {


    console.log(res)
    setZamowienia( zamowienia.filter(x => x.select !== true))
    setShowMenu(false)


    });
}
