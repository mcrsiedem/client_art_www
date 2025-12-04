import style from "../Dane.module.css";
import { useContext} from "react";
import { _firma, _produkty, _klient, _zestawy, _elementy, _opiekun, _status_dokumentu,_stan_dokumentu,_vat,_waluta,_rodzaj,_fsc, _etapy_produkcji } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";


export default function  CenaZkosztami( ){
  const contextModalInsert = useContext(ModalInsertContext);
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const ksiegowosc = contextModalInsert.ksiegowosc;
  return(
      <div className={style.col}>
      <label className={style.label}> Cena z kosztami </label>
      <input className={style.input_naklad} type="text"
      title=" ( nakład * cena lub wartosc zamowienia + koszty dodatkowe) / nakład"
      disabled
      value={daneZamowienia.cena_z_kosztami}
      onChange={(event) => {
      //  const re = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;

      //  if ( event.target.value === '' || re.test(event.target.value)) {
      //   setDaneZamowienia({...daneZamowienia, cena_z_kosztami: event.target.value, status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
      //  }
      }}></input>
    </div>
  );
}

