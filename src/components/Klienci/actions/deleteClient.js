import axios from "axios";
import { IP } from "../../../Host";

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