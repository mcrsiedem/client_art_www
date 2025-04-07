import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import DecodeToken from "pages/Login/DecodeToken";
import axios from "axios";
import { IP } from "../utils/Host";
import { AppContext } from "context/AppContext";
import { refreshZamowienia } from "actions/refreshZamowienia";
export function useUzytnownicy() {
  const contextApp = useContext(AppContext);
  const setUzytkownicy = contextApp.setUzytkownicy;
  const setUzytkownicyGrupy = contextApp.setUzytkownicyGrupy;
  const setZamowieniaWyszukiwarka = contextApp.setZamowieniaWyszukiwarka;

  async function getUzytnownicy() {
    const res = await axios.get(
      IP + "uzytki/" + sessionStorage.getItem("token")
    );

    setUzytkownicy(res.data[0]);
    setUzytkownicyGrupy(res.data[1]);
    refreshZamowienia(setZamowienia,setZamowieniaWyszukiwarka);
    setSaveButtonDisabled(true);

    // let savedDane  = await save({daneZamowienia,produkty,elementy,fragmenty,oprawa,procesyElementow,technologieID,historiaZamowienia})
    // setDaneZamowienia(savedDane.daneZamowienia)
    // setProdukty(savedDane.produkty)
    // setElementy(savedDane.elementy)
    // setFragmenty(savedDane.fragmenty)
    // setOprawa(savedDane.oprawa)
    // setProcesyElementow(savedDane.procesyElementow)
    // setHistoriaZamowienia(savedDane.historiaZamowienia)
  }

  return [getUzytnownicy];
}
