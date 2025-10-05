import { useContext } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../Faktury.module.css";
import { useHistoria } from "hooks/useHistoria";
import { getNameStatus } from "actions/getNameStatus";

export default function StatusFaktury() {
    const contextApp = useContext(AppContext);
    const contextModalInsert = useContext(ModalInsertContext);
    // const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
    const ksiegowosc = contextModalInsert.ksiegowosc;
    const setKsiegowosc = contextModalInsert.setKsiegowosc;
    const daneZamowienia = contextModalInsert.daneZamowienia;

    const setKosztyDodatkoweZamowienia= contextModalInsert.setKosztyDodatkoweZamowienia;
        const _status_faktury = contextApp._status_faktury;
        const [add] = useHistoria()
      return (
        <div className={style.col}>
          <label className={style.status_label}> Status </label>
          <select
            className={style.status}
            value={ksiegowosc.faktury_status}
    
            onChange={(event) => {
              setKsiegowosc({...ksiegowosc, faktury_status:parseInt( event.target.value), update:true})

                          add(         {
                            kategoria: "Faktura",
                            event: " Zmiana  z "+ getNameStatus( ksiegowosc.faktury_status,_status_faktury )+ " na "+ getNameStatus( event.target.value,_status_faktury ) ,
                            zamowienie_id: daneZamowienia.id
                          })
            }}
          >
            {contextApp._status_faktury.map((option) => (
              <option key={option.id} value={option.id}>
              {option.nazwa}
              </option>
            ))}
          </select>
        </div>
      );
    }