import style from "../Dane.module.css";
import { useContext} from "react";
import { _firma, _produkty, _klient, _zestawy, _elementy, _opiekun, _status_dokumentu,_stan_dokumentu,_vat,_waluta,_rodzaj,_fsc, _etapy_produkcji } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";


export default function  KOSZTY( ){
const contextModalInsert = useContext(ModalInsertContext);
const ksiegowosc = contextModalInsert.ksiegowosc;
  return(
      <div className={style.col}>
      <label className={style.label}> Koszty dodatkowe</label>
      <input className={style.input_naklad} type="text"
      value={ksiegowosc.koszty_wartosc}
      disabled
      onChange={(event) => {
 
      }}></input>
    </div>
  );
}
