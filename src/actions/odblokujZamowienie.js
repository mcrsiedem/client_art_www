import axios from "axios";
import { IP } from "../utils/Host";

export function odblokujZamowienie(rowsToDelete,setShowMenu,refreshZamowienia,setZamowienia,zamowienia) {
  axios
  .delete(IP + "odblokuj_zamowienie", { data: { row: rowsToDelete } })
    .then((res) => {
    setShowMenu(false)
    refreshZamowienia(setZamowienia)
    setZamowienia(
      zamowienia.map((t) => {
  
          return {...t, select: false }
        
      })
    )
    });
}
