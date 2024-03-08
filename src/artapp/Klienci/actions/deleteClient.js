import axios from "axios";
import { ip } from "../../../Host";

export   const deleteClient = async (rowID,getClients,setShowDeleteClientPane)=> {

    await axios
      .put(ip + "klient", {
        id: rowID.current,
      })
      .then((res2) => {
        getClients();
        setShowDeleteClientPane(false)
      });
  };