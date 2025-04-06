import axios from "axios";
import { IP } from "../../../utils/Host";
import { getClients } from "actions/getClients";

export   const updateClient = async (daneKlienta,setClients,setClientsWyszukiwarka,setShowEdit)=> {

    await axios
      .put(IP + "updateKlient", {
        id: daneKlienta.id,
        firma: daneKlienta.firma,
        firma_nazwa: daneKlienta.firma_nazwa,
        adres: daneKlienta.adres,
        kod: daneKlienta.kod,
        nip: daneKlienta.nip,
        opiekun_id: daneKlienta.opiekun_id,
      })
      .then((res) => {
        getClients(setClients,setClientsWyszukiwarka )
        setShowEdit(false)
      });
  };