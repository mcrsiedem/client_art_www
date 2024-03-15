import axios from "axios";
import { ip } from "../../../../Host";

export   const deleteClient = async (rowID,getClients,setShowDeleteClientPane)=> {

    await axios
      .put(ip + "klient", {
        id: rowID.current.id,
      })
      .then((res) => {
        getClients();
        setShowDeleteClientPane(false)
      });
  };