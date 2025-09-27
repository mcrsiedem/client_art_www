import axios from "axios";
import { IP } from "utils/Host";

export const addDostepnoscPapieru = async (
  setShow,
  value,
  grupyWykonanAll,
  setGrupWykonanAll,
  grup
) => {
  try {
    const res = await axios.put(
      IP + "dodaj_info_dostepnosc_papieru/" + sessionStorage.getItem("token"),
      {
        ...grup,
        papier_info: value,
      }
    );

    const { status } = res.data;

    // console.log("status :", status);

    if (status === "OK") {

      setGrupWykonanAll(
        grupyWykonanAll.map((t) => {
          if (t.global_id === grup.global_id) {
            return {
              ...t,
              papier_info: value,
            };
          }
          return t;
        })
      );

    } else {
      alert(status.sqlMessage);
    }
    
    setShow(false); // Opcjonalnie, jeśli chcesz ukryć modal po operacji
  } catch (error) {
    console.error("Wystąpił błąd:", error);
    alert("Wystąpił błąd podczas dodawania realizacji procesu.");
  }
};