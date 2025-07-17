import { useContext } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../Faktury.module.css";
import { zapisKosztowDodatkowychZamowienia } from "actions/zapisKosztowDodatkowychZamowienia";

export default function StatusFaktury() {
    const contextApp = useContext(AppContext);
    const contextModalInsert = useContext(ModalInsertContext);
    // const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
    const ksiegowosc = contextModalInsert.ksiegowosc;
    const setKsiegowosc = contextModalInsert.setKsiegowosc;
    const setKosztyDodatkoweZamowienia= contextModalInsert.setKosztyDodatkoweZamowienia;
      return (
        <div className={style.col}>
          <label className={style.status_label}> Status </label>
          <select
            className={style.status}
            value={ksiegowosc.faktury_status}
    
            onChange={(event) => {
              setKsiegowosc({...ksiegowosc, faktury_status:parseInt( event.target.value), update:true})
              // console.log("koszty1 :" +kosztyDodatkoweZamowienia[0].id)
              // setKosztyDodatkoweZamowienia({...kosztyDodatkoweZamowienia, status: event.target.value});
              // zapisKosztowDodatkowychZamowienia(kosztyDodatkoweZamowienia,setKosztyDodatkoweZamowienia,event.target.value)
                
            //   setSaveButtonDisabled(false)
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