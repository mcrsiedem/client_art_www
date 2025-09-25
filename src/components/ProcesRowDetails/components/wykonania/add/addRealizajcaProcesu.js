import axios from "axios";
import { IP } from "utils/Host";
import { getMaxID } from "actions/getMaxID";
import { today_teraz } from "actions/today_teraz";

export const addRealizajcaProcesu = async (
  setShow,
  wykonanie,
  value,
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
      IP + "dodaj_realizacje_procesu/" + sessionStorage.getItem("token"),
      {
        ...wykonanie,
        zrealizowano: value,
      }
    );

    const { status, insertId, status_wykonania, do_wykonania,status_grupy } = res.data;

    console.log("status :", status);
    console.log("insertId :", insertId);
    console.log("status_wykonania :", status_wykonania);
    console.log("do_wykonania :", do_wykonania);
    console.log("status_grupy :", status_grupy);
    // console.log("Dane z serwera:", res.data);
    // console.log("Status wykonania:", status_wykonania);
    // console.log("Do wykonania:", do_wykonania);
    // console.log("Do wykonanie.global_id:", wykonanie.global_id);

    if (status === "OK") {
      const new_realizacje = realizacje.slice();
      new_realizacje.push({
        ...wykonanie,
        id: getMaxID(realizacje),
        zrealizowano: value,
        global_id: insertId,
        utworzono: today_teraz(),
        wykonanie_global_id: wykonanie.global_id,
        typ:1
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