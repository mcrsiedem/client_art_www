import axios from "axios";
import { IP } from "utils/Host";
import { getClients } from "actions/getClients";
import { getMaxID } from "actions/getMaxID";
import { today_teraz } from "actions/today_teraz";

export const addRealizajcaOprawy = async (
  setShow,
  grup,
  value,
  wykonaniaOprawy,
  setWykonaniaOprawy,
  grupyOprawaAll,setGrupyOprawaAll
) => {
  let status, insertId,status_grupy;
  await axios
    .post(IP + "dodaj_realizacje_oprawy/" + sessionStorage.getItem("token"), {
      ...grup,
      naklad: value,
    })
    .then((res) => {
      status = res.data.status;
      insertId = res.data.insertId;
      status_grupy = res.data.status_grupy;

      if (status == "OK") {
        const new_wykonaniaOprawy = wykonaniaOprawy.slice();

        new_wykonaniaOprawy.push({
          ...grup,
          id: getMaxID(wykonaniaOprawy),
          naklad: value,
          global_id: insertId,
          utworzono: today_teraz(),
          grupa_id: grup.id
        });

        setWykonaniaOprawy(new_wykonaniaOprawy);

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

      setShow(false);
    });
};
