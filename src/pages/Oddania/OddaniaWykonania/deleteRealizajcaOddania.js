import axios from "axios";
import { IP } from "utils/Host";
import { getClients } from "actions/getClients";
import { getMaxID } from "actions/getMaxID";
import { today_teraz } from "actions/today_teraz";

export const deleteRealizajcaOddania = async (grup,wykonanie,oddaniaGrupy,setOddaniaGrupy,oddaniaWykonania,setOddaniaWykonania) => {
  let status,status_grupy,oddano;
  await axios
    .post(IP + "usun_realizacje_oddania/" + sessionStorage.getItem("token"), {
      ...wykonanie,
      id_grupy: grup.id,
      global_id_grupy: grup.global_id,
    })
    .then((res) => {
      status = res.data.status;
      status_grupy = res.data.status_grupy;
      oddano = res.data.oddano;
      // console.log("zrealizowano:" +zrealizowano)

      if (status == "OK") {

      setOddaniaWykonania(oddaniaWykonania.filter(x=>x.global_id != wykonanie.global_id));

      setOddaniaGrupy(
      oddaniaGrupy.map((t, a) => {
      if (t.global_id == grup.global_id) {
        return {
          ...t,
          status: status_grupy,
          oddano:oddano===null? "": oddano
        };
      } else {
        return t;
      }
    })
  );
        
      } else {
        alert(status.sqlMessage);
      }
    
    });
};
