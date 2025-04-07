import axios from "axios";
import { IP } from "../utils/Host";

export function odblokujZamowienie(rowsToDelete,setShowMenuZamowienia,refreshZamowienia,setZamowienia,setZamowieniaWyszukiwarka,zamowienia) {
  axios
  .delete(IP + "odblokuj_zamowienie", { data: { row: rowsToDelete } })
    .then((res) => {
      setShowMenuZamowienia(false)
    refreshZamowienia(setZamowienia,setZamowieniaWyszukiwarka)
    setZamowienia(
      zamowienia.map((t) => {
  
          return {...t, select: false }
        
      })
    )
    });
}
