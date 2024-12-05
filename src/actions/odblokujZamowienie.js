import axios from "axios";
import { IP } from "../utils/Host";

export function odblokujZamowienie(rowsToDelete,setShowMenu) {
  axios
  .delete(IP + "odblokuj_zamowienie", { data: { row: rowsToDelete } })
    .then((res) => {
    setShowMenu(false)
    });
}
