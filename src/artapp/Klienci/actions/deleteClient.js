import axios from "axios";
import { ip } from "../../../Host";

export   const deleteKlient = async (rowID,getClients)=> {

    await axios
      .put(ip + "klient", {
        id: rowID.current,
      })
      .then((res2) => {
        getClients();
      });
  };