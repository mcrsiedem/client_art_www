import axios from "axios";

import { IP } from "../utils/Host";


export function deleteZamowienieKosz(zamowienia,setZamowienia,rowsToDelete,setShowMenu) {

  // przenieś do kosza


  axios
  // .put(IP + "delete_zamowienie_kosz", { data: { row: rowsToDelete } })

  .put(IP + "delete_zamowienie_kosz", {  rowsToDelete })
    .then((res) => {


    // console.log(res.status)
    setZamowienia( zamowienia.filter(x => x.select !== true))
    setShowMenu(false)


    });
}
