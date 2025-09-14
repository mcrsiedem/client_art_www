import axios from "axios";
import { IP } from "utils/Host";
import { getClients } from "actions/getClients";
import { getMaxID } from "actions/getMaxID";
import { today_teraz } from "actions/today_teraz";

export const addRealizajcaProcesu = async (
 setShow,wykonanie,value,wykonania,setWykonania,realizacje,setRealizacje,grupyWykonanAll,setGrupWykonanAll,grup
) => {
  let status, insertId,status_wykonania,do_wykonania;
  await axios
    .post(IP + "dodaj_realizacje_procesu/" + sessionStorage.getItem("token"), {
      ...wykonanie,
      zrealizowano: value,
    })
    .then((res) => {
      status = res.data.status;
      insertId = res.data.insertId;
      status_wykonania = res.data.status_wykonania;
      do_wykonania = res.data.do_wykonania;
      

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

        // console.log(wykonanie.global_id)
              setWykonania(
      wykonania.map((t, a) => {
      if (t.global_id === wykonanie.global_id) {
        return {
          ...t,
          status: status_wykonania,
          do_wykonania:do_wykonania
        };
      } else {
        return t;
      }
    })
  );


        // setShow(false)
      } else {
        alert(status.sqlMessage);
      }

    })
};
