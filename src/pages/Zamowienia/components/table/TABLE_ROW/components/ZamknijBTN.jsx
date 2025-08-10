import style from "./ZamknijBTN.module.css";
import { _etapy_produkcji } from "utils/initialvalue";
import { useContext } from "react";
import { AppContext } from "context/AppContext";

export default function ZamknijBTN({row}) {
  
     const contextApp = useContext(AppContext);
   
   const zamowienia = contextApp.zamowienia
  const setZamowienia = contextApp.setZamowienia

  return (
            <button onClick={()=>{
              setZamowienia(
                zamowienia.map((t) => {
                  if (t.id == row.id) {
                    return { ...row, select: false,show:false};
                  } else {
                    return t;
                  }
                })
              );
          }}className={style.btn_zamowienia_menu_row} >Zamknij</button>
  );
 
  
}
