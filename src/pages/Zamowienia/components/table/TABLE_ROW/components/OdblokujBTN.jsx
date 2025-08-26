import style from "./OdblokujBTN.module.css";
import { _etapy_produkcji } from "utils/initialvalue";
import { useZamowienia } from "hooks/useZamowienia";
import DecodeToken from "pages/Login/DecodeToken";

export default function OdblokujBTN({row}) {
  
   const [refreshZamowienia,odblokujZamowienie,deleteZamowienie] = useZamowienia();
 
 if(DecodeToken(sessionStorage.getItem("token")).zamowienie_odblokuj   == 1 || row.open_user_id == DecodeToken(sessionStorage.getItem("token")).id){
  return (
            <button onClick={()=>{

      odblokujZamowienie([row])

          }}className={style.btn_zamowienia_menu_row_green} >Odblokuj</button>
  );
 }
  
}
