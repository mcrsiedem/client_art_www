import axios from "axios";
import { useContext } from "react";
import { IP } from "../utils/Host";
import { AppContext } from "context/AppContext";
import DecodeToken from "pages/Login/DecodeToken";
export function useZestawienia() {
  const contextApp = useContext(AppContext);
  const tableZamowienia= contextApp.tableZamowienia;
  const setIsLoading= contextApp.setIsLoading;


  const refreshRealizacjeZestawienie = async (dataOd,dataDo,kto) => {
    setIsLoading(true)

    if(DecodeToken(sessionStorage.getItem("token")).zamowienia_wszystkie==1){
          const res = await axios.get(
      IP + "zestawienie_user/"+dataOd+"/"+dataDo+"/"+kto+"/" + sessionStorage.getItem("token")
    );
    contextApp.setRealizacjeZestawienie([...res.data]);
    contextApp.setRealizacjeZestawienieWyszukiwarka([...res.data]);
    }

      setIsLoading(false)

  };

  const refreshRealizacjeZestawienieGrupa = async (dataOd,dataDo,grupa) => {
    setIsLoading(true)
    if(DecodeToken(sessionStorage.getItem("token")).zamowienia_wszystkie==1){

    const res = await axios.get(
      IP + "zestawienie_grupa/"+dataOd+"/"+dataDo+"/"+grupa+"/" + sessionStorage.getItem("token")
    );
    contextApp.setRealizacjeZestawienieGrupy([...res.data]);
    // contextApp.setRealizacjeZestawienieWyszukiwarka([...res.data]);
  }
  setIsLoading(false)

  };


    const refreshRealizacjeZestawienieProcesory = async (dataOd,dataDo) => {
    setIsLoading(true)
    if(DecodeToken(sessionStorage.getItem("token")).zamowienia_wszystkie==1){

    const res = await axios.get(
      IP + "zestawienie_procesory/"+dataOd+"/"+dataDo+"/" + sessionStorage.getItem("token")
    );
    contextApp.setRealizacjeZestawienieProcesory([...res.data]);
    // contextApp.setRealizacjeZestawienieWyszukiwarka([...res.data]);
  }
      setIsLoading(false)

  };


      const refreshRealizacjeZestawienieKlienci= async (dataOd,dataDo) => {
    setIsLoading(true)
    if(DecodeToken(sessionStorage.getItem("token")).zamowienia_wszystkie==1){
    const res = await axios.get(
      IP + "zestawienie_klienci/"+dataOd+"/"+dataDo+"/" + sessionStorage.getItem("token")
    );
    contextApp.setRealizacjeZestawienieKlienci([...res.data]);
    // contextApp.setRealizacjeZestawienieWyszukiwarka([...res.data]);
  }
      setIsLoading(false)

  };


  return {refreshRealizacjeZestawienie,refreshRealizacjeZestawienieGrupa,refreshRealizacjeZestawienieProcesory,refreshRealizacjeZestawienieKlienci};
}
