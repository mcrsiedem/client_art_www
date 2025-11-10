import axios from "axios";
import { useContext } from "react";
import { IP } from "../utils/Host";
import { AppContext } from "context/AppContext";
import DecodeToken from "pages/Login/DecodeToken";
export function useZamowienia() {
  const contextApp = useContext(AppContext);
  const tableZamowienia= contextApp.tableZamowienia;
  const setIsLoading= contextApp.setIsLoading;


   const scrollTable = (table) => {
  if(table.current != null) {
      table.current.scrollTo({ top: 20000, behavior: "auto" })
  }
  
};

  const refreshZamowienia = async () => {
    const res = await axios.get(
      IP + "zamowienia/"+contextApp.sortowanieZamowienia+"/"+contextApp.zestawZamowienia.current+"/" + sessionStorage.getItem("token")
    );
    contextApp.setZamowienia([...res.data]);
    contextApp.setZamowieniaWyszukiwarka([...res.data]);
      setIsLoading(false)

    
    // setIsLoading(false)

    // const res2 = await axios.get(
    //   IP + "zamowieniapliki/" + sessionStorage.getItem("token")
    // );
    // contextApp.setZamowieniaPliki([...res2.data]);

    // tylko dla Jarka
       if(DecodeToken(sessionStorage.getItem("token")).id==3){
scrollTable(tableZamowienia)
       }


  };





  const odblokujZamowienie = (rowsToDelete) =>{
    axios.delete(IP + "odblokuj_zamowienie/"+ sessionStorage.getItem("token"), { data: { row: rowsToDelete } })
      .then((res) => {
        refreshZamowienia();
      });
  }


  const deleteZamowienie = (rowsToDelete) => {
    axios.delete(IP + "delete_zamowienie/"+ sessionStorage.getItem("token"), { data: { row: rowsToDelete } })
      .then((res) => {
      refreshZamowienia()
      });
  }


      async function zmienEtapWydrukowane(techologie) {
       await axios.put(
          IP +
            "zmieni_etap_wydrukowane/" +
            sessionStorage.getItem("token"),
          
            techologie
          
        );

        refreshZamowienia()
      }





  return {refreshZamowienia,odblokujZamowienie,deleteZamowienie,zmienEtapWydrukowane};
}
