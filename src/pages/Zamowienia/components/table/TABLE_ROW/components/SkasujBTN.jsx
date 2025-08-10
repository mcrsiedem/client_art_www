import style from "./SkasujBTN.module.css";
import { _etapy_produkcji } from "utils/initialvalue";
import { useZamowienia } from "hooks/useZamowienia";
import DecodeToken from "pages/Login/DecodeToken";

export default function SkasujBTN({row}) {
  
   const [refreshZamowienia,odblokujZamowienie,deleteZamowienie] = useZamowienia();
 

//  if(DecodeToken(sessionStorage.getItem("token")).zamowienie_skasuj   == 1){
 if(row.stan ==1 || row.stan==2){
  return (
            <button onClick={()=>{

deleteZamowienie([row])
        }}className={style.btn_zamowienia_menu_row_red} >Usuń</button>
  );
 }
  
}
