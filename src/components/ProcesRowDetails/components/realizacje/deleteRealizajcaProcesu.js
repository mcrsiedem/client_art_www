import axios from "axios";
import { IP } from "utils/Host";

export const deleteRealizajcaProcesu = async ({
 wykonanie,realizacja,grup,wykonania ,setWykonania,realizacje,setRealizacje,grupyWykonanAll,setGrupWykonanAll
}) => {
 try {
  const res = await axios.post(
  `${IP}usun_realizacje_procesu/${sessionStorage.getItem("token")}`,
  {
   ...realizacja,
   id_grupy: grup.id,
   global_id_wykonania: wykonanie.global_id,
  }
  );

  const { status, status_grupy,status_wykonania,do_wykonania} = res.data;

  if (status === "OK") {
  setRealizacje(
   realizacje.filter((x) => x.global_id !== realizacja.global_id)
  );

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
 } catch (error) {
  console.error("Błąd podczas usuwania realizacji procesu:", error);
  alert(`Wystąpił błąd: ${error.message}`);
 }
};