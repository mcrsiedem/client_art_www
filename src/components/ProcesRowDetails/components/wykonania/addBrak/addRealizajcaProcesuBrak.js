import axios from "axios";
import { IP } from "utils/Host";
import { getMaxID } from "actions/getMaxID";
import { today_teraz } from "actions/today_teraz";

export const addRealizajcaProcesuBrak = async (
  setShow,
  wykonanie,
  wykonania,
  setWykonania,
  realizacje,
  setRealizacje,
  grupyWykonanAll,
  setGrupWykonanAll,
  grup
) => {
  try {
    const res = await axios.post(
      IP + "dodaj_realizacje_procesu_brak/" + sessionStorage.getItem("token"),
      {
        ...wykonanie,
      }
    );

    const { status, insertId, status_wykonania, do_wykonania,status_grupy,brakujace_przeloty } = res.data;

    // console.log("Dane z serwera:", res.data);
    // console.log("Status wykonania:", status_wykonania);
    // console.log("Do wykonania:", do_wykonania);
    // console.log("Do wykonanie.global_id:", wykonanie.global_id);

    if (status === "OK") {
      const new_realizacje = realizacje.slice();
      new_realizacje.push({
        ...wykonanie,
        id: getMaxID(realizacje),
        zrealizowano: brakujace_przeloty,
        global_id: insertId,
        utworzono: today_teraz(),
        wykonanie_global_id: wykonanie.global_id,
      });
      setRealizacje(new_realizacje);

      setWykonania(
        wykonania.map((t) => {
          // Użyj unikalnego ID, tak jak w oryginale
          if (t.global_id === wykonanie.global_id) {
            return {
              ...t,
              status: status_wykonania,
              do_wykonania: do_wykonania,
            };
          }
          return t;
        })
      );


      setGrupWykonanAll(
        grupyWykonanAll.map((t) => {
          // Użyj unikalnego ID, tak jak w oryginale
          if (t.global_id === grup.global_id) {
            return {
              ...t,
              status: status_grupy,
            
            };
          }
          return t;
        })
      );

    } else {
      alert(status.sqlMessage);
    }
    
    // setShow(false); // Opcjonalnie, jeśli chcesz ukryć modal po operacji
  } catch (error) {
    console.error("Wystąpił błąd:", error);
    alert("Wystąpił błąd podczas dodawania realizacji procesu.");
  }
};