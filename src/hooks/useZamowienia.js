import axios from "axios";
import { useContext } from "react";
import { IP } from "../utils/Host";
import { AppContext } from "context/AppContext";
export function useZamowienia() {
  const contextApp = useContext(AppContext);

  const refreshZamowienia = async () => {
    const res = await axios.get(
      IP + "zamowienia/" + sessionStorage.getItem("token")
    );
    contextApp.setZamowienia([...res.data]);
    contextApp.setZamowieniaWyszukiwarka([...res.data]);
  };

  function odblokujZamowienie(rowsToDelete
  ) {
    axios
      .delete(IP + "odblokuj_zamowienie", { data: { row: rowsToDelete } })
      .then((res) => {
        refreshZamowienia();
      });
  }





  return [refreshZamowienia,odblokujZamowienie];
}
