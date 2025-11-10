import { useContext } from "react";
import axios from "axios";
import { IP } from "../utils/Host";
import { AppContext } from "context/AppContext";
import { useZamowienia } from "./useZamowienia";
export function useUzytnownicy() {
  const contextApp = useContext(AppContext);
  const setUzytkownicy = contextApp.setUzytkownicy;
  const setUzytkownicyGrupy = contextApp.setUzytkownicyGrupy;

  const {refreshZamowienia} = useZamowienia();

  async function getUzytnownicy() {
    const res = await axios.get(
      IP + "uzytki/" + sessionStorage.getItem("token")
    );

    setUzytkownicy(res.data[0]);
    setUzytkownicyGrupy(res.data[1]);

    refreshZamowienia();
    setSaveButtonDisabled(true);
  }

  return [getUzytnownicy];
}
