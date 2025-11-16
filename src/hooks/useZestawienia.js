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
    const res = await axios.get(
      IP + "zestawienie_user/"+dataOd+"/"+dataDo+"/"+kto+"/" + sessionStorage.getItem("token")
    );
    // contextApp.setZamowienia([...res.data]);
    // contextApp.setZamowieniaWyszukiwarka([...res.data]);
      setIsLoading(false)

  };




  return {refreshRealizacjeZestawienie};
}
