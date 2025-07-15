import { useContext } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../KosztyDodatkowe.module.css";
import { zapisKosztowDodatkowychZamowienia } from "actions/zapisKosztowDodatkowychZamowienia";

export default function StatusKosztow() {
    const contextApp = useContext(AppContext);
    const contextModalInsert = useContext(ModalInsertContext);
    // const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
    const ksiegowosc = contextModalInsert.ksiegowosc;
    const setKosztyDodatkoweZamowienia= contextModalInsert.setKosztyDodatkoweZamowienia;
      return (
        <div className={style.col}>
          <label className={style.status_label}> Status </label>
          <select
            className={style.status}
            value={ksiegowosc.koszty_status}
    
            onChange={(event) => {
              // console.log("koszty1 :" +kosztyDodatkoweZamowienia[0].id)
              // setKosztyDodatkoweZamowienia({...kosztyDodatkoweZamowienia, status: event.target.value});
              // zapisKosztowDodatkowychZamowienia(kosztyDodatkoweZamowienia,setKosztyDodatkoweZamowienia,event.target.value)
                
            //   setSaveButtonDisabled(false)
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