import axios from "axios";
import { IP } from "utils/Host";
import { getClients } from "actions/getClients";
import { getMaxID } from "actions/getMaxID";
import { today_teraz } from "actions/today_teraz";

export const zakonczOddanieDodajWykoananie = async (
  grup,
  oddaniaGrupy,setOddaniaGrupy,oddaniaWykonania,setOddaniaWykonania
) => {
  let status, insertId,status_grupy,brakujacy_naklad,oddano;
  await axios
    .post(IP + "zakoncz_oddanie_dodaj_wykonanie/" + sessionStorage.getItem("token"), {
      ...grup,
    })
    .then((res) => {
      status = res.data.status;
      insertId = res.data.insertId;
      status_grupy = res.data.status_grupy;
      brakujacy_naklad = res.data.brakujacy_naklad;
      oddano = res.data.oddano;


      if (status == "OK") {
        if(parseInt( insertId)>0){
                  const new_oddaniaWykonania = oddaniaWykonania.slice();

        new_oddaniaWykonania.push({
          ...grup,
          id: getMaxID(oddaniaWykonania),
          naklad: brakujacy_naklad,
          global_id: insertId,
          utworzono: today_teraz(),
          zrealizowano :oddano

        });

        setOddaniaWykonania(new_oddaniaWykonania);
        }


      setOddaniaGrupy(
      oddaniaGrupy.map((t, a) => {
      if (t.global_id == grup.global_id) {
        return {
          ...t,
          status: status_grupy,
          oddano:oddano

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
