import axios from "axios";
import { IP } from "utils/Host";
import { getClients } from "actions/getClients";
import { getMaxID } from "actions/getMaxID";
import { today_teraz } from "actions/today_teraz";
import DecodeToken from "pages/Login/DecodeToken";

export const addRealizajcaOprawy = async (
  setShow,
  grup,
  value,
  wykonaniaOprawy,
  setWykonaniaOprawy,
  grupyOprawaAll,setGrupyOprawaAll,setIsLoading
) => {

 setIsLoading(true);
  try{


    const res =   await axios
    .post(IP + "dodaj_realizacje_oprawy/" + sessionStorage.getItem("token"), {
      ...grup,
      naklad: value,
    })

 const { status, insertId,status_grupy,zrealizowano} = res.data;

      if (status == "OK") {
        const new_wykonaniaOprawy = wykonaniaOprawy.slice();

        new_wykonaniaOprawy.push({
          ...grup,
          id: getMaxID(wykonaniaOprawy),
          naklad: value,
          global_id: insertId,
          dodal_id: DecodeToken(sessionStorage.getItem("token")).id,
          utworzono: today_teraz(),
          grupa_id: grup.id
        });

        setWykonaniaOprawy(new_wykonaniaOprawy);

      setGrupyOprawaAll(
      grupyOprawaAll.map((t, a) => {
      if (t.global_id == grup.global_id) {
        return {
          ...t,
          status: status_grupy,
          zrealizowano:zrealizowano
        };
      } else {
        return t;
      }
    })
  );
        
      } else {
        alert(status.sqlMessage);
      }




  }catch (error) {
    console.error("Wystąpił błąd:", error);
    alert("Wystąpił błąd podczas dodawania realizacji procesu.");
  }finally {
        setIsLoading(false);
      }





      



      setShow(false);

};
