import axios from "axios";
import { IP } from "../../../utils/Host";
import { getClients } from "actions/getClients";

export   const deleteClient = async (rowID,setClients,setClientsWyszukiwarka,setShowDeleteClientPane)=> {

    await axios
      .put(IP + "klient", {
        id: rowID.current.id,
      })
      .then((res) => {
        getClients(setClients,setClientsWyszukiwarka )
        setShowDeleteClientPane(false)
      });
  };