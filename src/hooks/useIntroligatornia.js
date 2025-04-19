import { useContext } from "react";
import axios from "axios";
import { IP } from "../utils/Host";
import { AppContext } from "context/AppContext";
import { useZamowienia } from "./useZamowienia";
export function useIntroligatornia() {
  const contextApp = useContext(AppContext);
  const setUzytkownicy = contextApp.setUzytkownicy;
  const setUzytkownicyGrupy = contextApp.setUzytkownicyGrupy;

  const [refreshZamowienia] = useZamowienia();


  const rozdzielOprawe = () => {
    console.log("intro")


  }

  return [rozdzielOprawe];
}
