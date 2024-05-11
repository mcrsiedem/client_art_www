import { useContext } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../KosztyDodatkowe.module.css";

export default function StatusKosztow() {
    const contextApp = useContext(AppContext);
    const contextModalInsert = useContext(ModalInsertContext);
    // const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
    const kosztyDodatkoweZamowienia = contextModalInsert.kosztyDodatkoweZamowienia;
    const setKosztyDodatkoweZamowienia= contextModalInsert.setKosztyDodatkoweZamowienia;
      return (
        <div className={style.col}>
          <label className={style.status_label}> Status </label>
          <select
            className={style.status}
            value={kosztyDodatkoweZamowienia[0].status}
    
            onChange={(event) => {
                setKosztyDodatkoweZamowienia({...kosztyDodatkoweZamowienia, status: event.target.value});
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