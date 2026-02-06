import { useContext } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../KosztyDodatkowe.module.css";
import { getNameStatus } from "actions/getNameStatus";
import { useHistoria } from "hooks/useHistoria";

export default function StatusKosztow() {
    const contextApp = useContext(AppContext);
    const contextModalInsert = useContext(ModalInsertContext);
    const ksiegowosc = contextModalInsert.ksiegowosc;
    const daneZamowienia = contextModalInsert.daneZamowienia;
    const setKsiegowosc = contextModalInsert.setKsiegowosc;
    const _status_koszty_dodatkowe = contextApp._status_koszty_dodatkowe;
    
    const [add] = useHistoria()
      return (
        <div className={style.col}>
          {/* <label className={style.status_label}> Status </label> */}
          <select
            className={style.status}
            value={ksiegowosc.koszty_status}
    
            onChange={(event) => {
              setKsiegowosc({...ksiegowosc, koszty_status:parseInt( event.target.value), update:true})
            add(         {
              kategoria: "Koszty dodatkowe",
              event: " Zmiana  z "+ getNameStatus( ksiegowosc.koszty_status,_status_koszty_dodatkowe )+ " na "+ getNameStatus( event.target.value,_status_koszty_dodatkowe ) ,
              zamowienie_id: daneZamowienia.id
            })
            }}
          >
            {contextApp._status_koszty_dodatkowe.map((option) => (
              <option key={option.id} value={option.id}>
              {option.nazwa}
              </option>
            ))}
          </select>
        </div>
      );
    }