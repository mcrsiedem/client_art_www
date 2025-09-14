import axios from "axios";
import { IP } from "utils/Host";
import { getClients } from "actions/getClients";
import { getMaxID } from "actions/getMaxID";
import { today_teraz } from "actions/today_teraz";

export const addRealizajcaProcesu = async (
 setShow,wykonanie,value,wykonania,setWykonania,realizacje,setRealizacje,grupyWykonanAll,setGrupWykonanAll,grup
) => {
  let status, insertId,status_grupy,zrealizowano;
  await axios
    .post(IP + "dodaj_realizacje_procesu/" + sessionStorage.getItem("token"), {
      ...wykonanie,
      zrealizowano: value,
    })
    .then((res) => {
      status = res.data.status;
      insertId = res.data.insertId;
      // status_grupy = res.data.status_grupy;
      // zrealizowano = res.data.zrealizowano;
      

      if (status == "OK") {
        const new_realizacje = realizacje.slice();

        new_realizacje.push({
          ...realizacje,
          id: getMaxID(realizacje),
          zrealizowano: value,
          global_id: insertId,
          utworzono: today_teraz(),
          wykonanie_global_id: wykonanie.global_id
        });

        setRealizacje(new_realizacje);

  //     setGrupWykonanAll(
  //     grupyWykonanAll.map((t, a) => {
  //     if (t.global_id == grup.global_id) {
  //       return {
  //         ...t,
  //         status: status_grupy,
  //         zrealizowano:zrealizowano
  //       };
  //     } else {
  //       return t;
  //     }
  //   })
  // );
        
      } else {
        alert(status.sqlMessage);
      }

      setShow(false);
    });
};
