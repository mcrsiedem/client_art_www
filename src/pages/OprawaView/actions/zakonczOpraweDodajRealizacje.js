import axios from "axios";
import { IP } from "utils/Host";
import { getClients } from "actions/getClients";
import { getMaxID } from "actions/getMaxID";
import { today_teraz } from "actions/today_teraz";

export const zakonczOpraweDodajRealizacje = async (
  grup,
  wykonaniaOprawy,
  setWykonaniaOprawy,
  grupyOprawaAll,setGrupyOprawaAll
) => {
  let status, insertId,status_grupy,brakujacy_naklad;
  await axios
    .post(IP + "zakoncz_oprawe_dodaj_realizacje/" + sessionStorage.getItem("token"), {
      ...grup,
    })
    .then((res) => {
      status = res.data.status;
      insertId = res.data.insertId;
      status_grupy = res.data.status_grupy;
      brakujacy_naklad = res.data.brakujacy_naklad;

      if (status == "OK") {
        if(parseInt( insertId)>0){
                  const new_wykonaniaOprawy = wykonaniaOprawy.slice();

        new_wykonaniaOprawy.push({
          ...grup,
          id: getMaxID(wykonaniaOprawy),
          naklad: brakujacy_naklad,
          global_id: insertId,
          utworzono: today_teraz(),
          grupa_id:grup.id
        });

        setWykonaniaOprawy(new_wykonaniaOprawy);
        }


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

      // setShow(false);
    });
};
