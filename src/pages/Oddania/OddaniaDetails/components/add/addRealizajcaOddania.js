import axios from "axios";
import { IP } from "utils/Host";
import { getClients } from "actions/getClients";
import { getMaxID } from "actions/getMaxID";
import { today_teraz } from "actions/today_teraz";

export const addRealizajcaOddania= async (
  setShow,grup,value,oddaniaGrupy,setOddaniaGrupy,oddaniaWykonania, setOddaniaWykonania
) => {
  let status, insertId,status_grupy,zrealizowano;
  await axios
    .post(IP + "dodaj_realizacje_oddania/" + sessionStorage.getItem("token"), {
      ...grup,
      zrealizowano: value,
    })
    .then((res) => {
      status = res.data.status;
      insertId = res.data.insertId || 0; 
      status_grupy = res.data.status_grupy  || 0;
      zrealizowano = res.data.zrealizowano  || 0;
      

      if (status == "OK") {
        const new_oddaniaWykonania = oddaniaWykonania.slice();

        new_oddaniaWykonania.push({
          ...grup,
          id: getMaxID(oddaniaWykonania),
          naklad: value,
          global_id: insertId,
          utworzono: today_teraz(),
          grupa_id: grup.id
        });

        setOddaniaWykonania(new_oddaniaWykonania);

      setOddaniaGrupy(
      oddaniaGrupy.map((t, a) => {
      if (t.global_id == grup.global_id) {
        return {
          ...t,
          status: status_grupy,
          zrealizowano:zrealizowano
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
