import axios from "axios";
import { IP } from "../../../Host2";

export   const deleteClient = async (rowID,getClients,setShowDeleteClientPane)=> {

    await axios
      .put(IP + "klient", {
        id: rowID.current.id,
      })
      .then((res) => {
        getClients();
        setShowDeleteClientPane(false)
      });
  };