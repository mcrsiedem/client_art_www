import axios from "axios";
import { IP } from "utils/Host";
import { getClients } from "actions/getClients";
import { getMaxID } from "actions/getMaxID";
import { today_teraz } from "actions/today_teraz";

export const deleteRealizajcaOprawy = async (
  grup,wykonanie,
  wykonaniaOprawy,
  setWykonaniaOprawy,
  grupyOprawaAll,setGrupyOprawaAll
) => {
  let status,status_grupy;
  await axios
    .post(IP + "usun_realizacje_oprawy/" + sessionStorage.getItem("token"), {
      ...wykonanie,
      id_grupy: grup.id,
      global_id_grupy: grup.global_id,
    })
    .then((res) => {
      status = res.data.status;
      status_grupy = res.data.status_grupy;

      if (status == "OK") {

      setWykonaniaOprawy(wykonaniaOprawy.filter(x=>x.global_id != wykonanie.global_id));

      setGrupyOprawaAll(
      grupyOprawaAll.map((t, a) => {
      if (t.global_id == grup.global_id) {
        return {
          ...t,
          status: status_grupy,
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
