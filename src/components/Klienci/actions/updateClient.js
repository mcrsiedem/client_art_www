import axios from "axios";
import { IP } from "../../../Host2";

export   const updateClient = async (daneKlienta,getClients,setShowEdit)=> {

    await axios
      .put(IP + "updateKlient", {
        id: daneKlienta.id,
        firma: daneKlienta.firma,
        adres: daneKlienta.adres,
        kod: daneKlienta.kod,
        nIP: daneKlienta.nIP,
        opiekun_id: daneKlienta.opiekun_id,
      })
      .then((res) => {
        getClients();
        setShowEdit(false)
      });
  };