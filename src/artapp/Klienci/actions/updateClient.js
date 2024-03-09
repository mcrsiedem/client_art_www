import axios from "axios";
import { ip } from "../../../Host";

export   const updateClient = async (daneKlienta,getClients,setShowEdit)=> {

    await axios
      .put(ip + "updateKlient", {
        id: daneKlienta.id,
        firma: daneKlienta.firma,
        adres: daneKlienta.adres,
        kod: daneKlienta.kod,
        nip: daneKlienta.nip,
        opiekun_id: daneKlienta.opiekun_id,
      })
      .then((res) => {
        getClients();
        setShowEdit(false)
      });
  };