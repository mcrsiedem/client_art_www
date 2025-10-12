import axios from "axios";
import { IP } from "utils/Host";
import { getMaxID } from "actions/getMaxID";
import { today_teraz } from "actions/today_teraz";
import DecodeToken from "pages/Login/DecodeToken";

export const addRealizacjaZakonczArkusz = async (
  setShow,
  wykonanie,
  value,
  wykonania,
  setWykonania,
  realizacje,
  setRealizacje,
  grupyWykonanAll,
  setGrupWykonanAll,
  grup,
  setIsLoading,
  socket
) => {
  setIsLoading(true)
  try {
    const res = await axios.post(
      IP + "dodaj_realizajce_zakoncz_arkusz/" + sessionStorage.getItem("token"),
      {
        ...wykonanie,
        zrealizowano: value,
      }
    );

    const { status, insertId, status_wykonania, do_wykonania,status_grupy,idRozjazdu,brakujace_przeloty } = res.data;

    // console.log("status :", status);
    // console.log("insertId :", insertId);
    // console.log("status_wykonania :", status_wykonania);
    // console.log("do_wykonania :", do_wykonania);
    // console.log("status_grupy :", status_grupy);
    // console.log("Dane z serwera:", res.data);
    // console.log("Status wykonania:", status_wykonania);
    // console.log("Do wykonania:", do_wykonania);
    // console.log("Do wykonanie.global_id:", wykonanie.global_id);

    if (status === "OK") {
      const new_realizacje = realizacje.slice();
      new_realizacje.push({
        ...wykonanie,
        id: getMaxID(realizacje),
        dodal_id: DecodeToken(sessionStorage.getItem("token")).id,
        zrealizowano: value,
        global_id: insertId,
        utworzono: today_teraz(),
        wykonanie_global_id: wykonanie.global_id,
        typ:1
      });

      if(brakujace_przeloty>0){
                    new_realizacje.push({
        ...wykonanie,
        id: getMaxID(realizacje),
        dodal_id: DecodeToken(sessionStorage.getItem("token")).id,

        zrealizowano: brakujace_przeloty,
        global_id: idRozjazdu,
        utworzono: today_teraz(),
        wykonanie_global_id: wykonanie.global_id,
        typ:3
      });
      }


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

      socket.emit("realizacja")
    } else {
      alert(status.sqlMessage);
    }
    
    // setShow(false); // Opcjonalnie, jeśli chcesz ukryć modal po operacji
  } catch (error) {
    console.error("Wystąpił błąd:", error);
    alert("Wystąpił błąd podczas dodawania realizacji procesu.");
  }finally {
        setIsLoading(false);
      }
};