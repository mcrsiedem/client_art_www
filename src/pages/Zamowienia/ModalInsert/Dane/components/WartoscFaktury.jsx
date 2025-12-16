import style from "../Dane.module.css";
import { useContext} from "react";
import { _firma, _produkty, _klient, _zestawy, _elementy, _opiekun, _status_dokumentu,_stan_dokumentu,_vat,_waluta,_rodzaj,_fsc, _etapy_produkcji } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";


export default function  WartoscFaktury( ){
const contextModalInsert = useContext(ModalInsertContext);
const ksiegowosc = contextModalInsert.ksiegowosc;

const formatujKwote = (kwota) => {
    // 1. Sprawdź, czy kwota to cokolwiek 'liczbopodobnego'
    if (kwota === null || kwota === undefined || kwota === '') {
        return '';
    }

    // 2. Zamień przecinek na kropkę, aby funkcja JavaScript poprawnie zinterpretowała
    const sformatowanaKwota = String(kwota).replace(',', '.');

    // 3. Spróbuj przekonwertować na liczbę
    const liczba = parseFloat(sformatowanaKwota);

    if (isNaN(liczba)) {
        return kwota; // Zwróć niezmienioną, jeśli nie jest to poprawna liczba
    }

    // 4. Użyj Intl.NumberFormat do formatowania
    // 'pl-PL' używa spacji jako separatora tysięcy i przecinka jako separatora dziesiętnego
    const formatter = new Intl.NumberFormat('pl-PL', {
        minimumFractionDigits: 2, // Upewnij się, że są dwa miejsca po przecinku
        maximumFractionDigits: 2,
    });

    return formatter.format(liczba);
};

  return(
      <div className={style.col}>
      <label className={style.label}> Faktury </label>
      <input className={style.input_naklad} type="text"
      value={formatujKwote(ksiegowosc.faktury_wartosc)}
      disabled
      onChange={(event) => {
 
        
      }}></input>
    </div>
  );
}
