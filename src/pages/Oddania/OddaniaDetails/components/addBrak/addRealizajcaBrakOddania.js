import axios from "axios";
import { IP } from "utils/Host";
import { getClients } from "actions/getClients";
import { getMaxID } from "actions/getMaxID";
import { today_teraz } from "actions/today_teraz";

export const addRealizajcaBrakOddania= async (
  setShow,grup,value,oddaniaGrupy,setOddaniaGrupy,oddaniaWykonania, setOddaniaWykonania,typ
) => {
  let status, insertId,status_grupy,oddano;
  await axios
    .post(IP + "dodaj_realizacje_oddania/" + sessionStorage.getItem("token"), {
      ...grup,
      zrealizowano: value,
      typ: typ
    })
    .then((res) => {
      status = res.data.status;
      insertId = res.data.insertId || 0; 
      status_grupy = res.data.status_grupy  || 0;
      oddano = res.data.oddano  || 0;
      

      if (status == "OK") {
        const new_oddaniaWykonania = oddaniaWykonania.slice();
        if(typ==1){
                  new_oddaniaWykonania.push({
          ...grup,
          id: getMaxID(oddaniaWykonania),
          zrealizowano: value,
          global_id: insertId,
          utworzono: today_teraz(),
          grupa_id: grup.id,
          oddanie_global_id: grup.global_id,
          typ:1
        });
        }
        if(typ==2){
                  new_oddaniaWykonania.push({
          ...grup,
          id: getMaxID(oddaniaWykonania),
          zrealizowano: value,
          global_id: insertId,
          utworzono: today_teraz(),
          grupa_id: grup.id,
          oddanie_global_id: grup.global_id,
          typ:2
        });
        }

        setOddaniaWykonania(new_oddaniaWykonania);

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

      setShow(false);
    });
};
