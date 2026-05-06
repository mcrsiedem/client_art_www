import axios from "axios";
import { useContext } from "react";
import { IP } from "../utils/Host";
import { AppContext } from "context/AppContext";
import DecodeToken from "pages/Login/DecodeToken";
export function useZamowienia() {
  const contextApp = useContext(AppContext);
  const tableZamowienia = contextApp.tableZamowienia;
  const setIsLoading = contextApp.setIsLoading;

  const {zamowienia} = useContext(AppContext);





  const refreshZamowienia = async () => {

    // .json({
    //         data: rows,
    //         pagination: {
    //             total: totalRecords,
    //             currentPage: page,
    //             totalPages: Math.ceil(totalRecords / size),
    //             pageSize: size
    //         }
    //     });
    setIsLoading(true);
    const res = await axios.get(
      IP +
        "zamowieniaPaginations/" +
        contextApp.sortowanieZamowienia.current +
        "/" +
        contextApp.zestawZamowienia.current +
        "/" +
        contextApp.selectedKlient +
        "/" +
         contextApp.selectedUser +
        "/" +
              contextApp.pagination.page +
        "/" +
              contextApp.pagination.size +
        "/" +
        sessionStorage.getItem("token"),
    );
    contextApp.setZamowienia([...res.data.data]);
    contextApp.setZamowieniaWyszukiwarka([...res.data.data]);
    contextApp.setPagination(res.data.pagination);
    console.log(res.data.pagination)
    setIsLoading(false);

    if (DecodeToken(sessionStorage.getItem("token")).id == 3) {
      scrollTable(tableZamowienia);
    }
  };











  return {
    refreshZamowienia,
  
  };
}
