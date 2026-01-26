import axios from "axios";
import { useContext } from "react";
import { IP } from "../utils/Host";
import { AppContext } from "context/AppContext";
import DecodeToken from "pages/Login/DecodeToken";
export function useZamowienia() {
  const contextApp = useContext(AppContext);
  const tableZamowienia = contextApp.tableZamowienia;
  const setIsLoading = contextApp.setIsLoading;

  const scrollTable = (table) => {
    if (table.current != null) {
      table.current.scrollTo({ top: 20000, behavior: "auto" });
    }
  };

  const refreshZamowienia = async () => {
    setIsLoading(true);
    const res = await axios.get(
      IP +
        "zamowienia/" +
        contextApp.sortowanieZamowienia.current +
        "/" +
        contextApp.zestawZamowienia.current +
        "/" +
        sessionStorage.getItem("token"),
    );
    contextApp.setZamowienia([...res.data]);
    contextApp.setZamowieniaWyszukiwarka([...res.data]);
    setIsLoading(false);

    if (DecodeToken(sessionStorage.getItem("token")).id == 3) {
      scrollTable(tableZamowienia);
    }
  };

  const refreshZamowieniaNiezamknieteKoszty = async () => {
    setIsLoading(true);
    const res = await axios.get(
      IP +
        "zamowienia/" +
        contextApp.sortowanieZamowienia.current +
        "/" +
        contextApp.zestawZamowienia.current +
        "/" +
        sessionStorage.getItem("token"),
    );
    contextApp.setZamowienia([
      ...res.data.filter(
        (row) =>
          row.etap == 16 &&
          row.koszty_status == 1 &&
          row.faktury_status != 3 &&
          row.opiekun_id == DecodeToken(sessionStorage.getItem("token")).id,
      ),
    ]);
    contextApp.setZamowieniaWyszukiwarka([
      ...res.data.filter(
        (row) =>
          row.etap == 16 && row.koszty_status == 1 && row.faktury_status != 3,
      ),
    ]);
    setIsLoading(false);

    scrollTable(tableZamowienia);
  };

  const refreshZamowieniaFaktury = async () => {
    setIsLoading(true);
    const res = await axios.get(
      IP +
        "zamowienia/" +
        contextApp.sortowanieZamowienia.current +
        "/" +
        contextApp.zestawFaktury.current +
        "/" +
        sessionStorage.getItem("token"),
    );
    contextApp.setZamowienia([...res.data]);
    contextApp.setZamowieniaWyszukiwarka([...res.data]);
    setIsLoading(false);

    // tylko dla Jarka
    if (DecodeToken(sessionStorage.getItem("token")).id == 3) {
      scrollTable(tableZamowienia);
    }
  };

  const refreshZamowieniaProofy = async () => {
    setIsLoading(true);
    const res = await axios.get(
      IP + "zamowienia_proofy/" + sessionStorage.getItem("token"),
    );
    contextApp.setZamowienia([...res.data]);
    contextApp.setZamowieniaWyszukiwarka([...res.data]);
    setIsLoading(false);
  };

  const odblokujZamowienie = (rowsToDelete) => {
    axios
      .delete(IP + "odblokuj_zamowienie/" + sessionStorage.getItem("token"), {
        data: { row: rowsToDelete },
      })
      .then((res) => {
        refreshZamowienia();
      });
  };

  const deleteZamowienie = (rowsToDelete) => {
    axios
      .delete(IP + "delete_zamowienie/" + sessionStorage.getItem("token"), {
        data: { row: rowsToDelete },
      })
      .then((res) => {
        refreshZamowienia();
      });
  };

  async function zmienEtapWydrukowane(techologie) {
    await axios.put(
      IP + "zmieni_etap_wydrukowane/" + sessionStorage.getItem("token"),

      techologie,
    );

    refreshZamowienia();
  }



    async function edytujProofa(row) {

      console.log(row)
    // await axios.put(
    //   IP + "edytuj_proofa/" + sessionStorage.getItem("token"),
    //   row,
    // );

    // refreshZamowienia();
  }

  return {
    refreshZamowienia,
    odblokujZamowienie,
    deleteZamowienie,
    zmienEtapWydrukowane,
    refreshZamowieniaFaktury,
    refreshZamowieniaNiezamknieteKoszty,
    refreshZamowieniaProofy,
    edytujProofa
  };
}
