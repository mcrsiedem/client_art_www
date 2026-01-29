import { useContext } from "react";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../KosztyDodatkowe.module.css";
import { getNameStatus } from "actions/getNameStatus";
import { useHistoria } from "hooks/useHistoria";
import { _waluta } from "utils/initialvalue";

export default function KopiujKoszty() {
  const contextApp = useContext(AppContext);
  const contextModalInsert = useContext(ModalInsertContext);
  const ksiegowosc = contextModalInsert.ksiegowosc;
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setKsiegowosc = contextModalInsert.setKsiegowosc;
  const _status_koszty_dodatkowe = contextApp._status_koszty_dodatkowe;
  const kosztyDodatkoweZamowienia =
    contextModalInsert.kosztyDodatkoweZamowienia;

  const [add] = useHistoria();

  const copyToClipboard = () => {
    // let mes = "";
    let klient = daneZamowienia.klient;
    let tytul = daneZamowienia.tytul;
    let naklad = daneZamowienia.naklad;
    let waluta = _waluta.find(x=>x.id ==daneZamowienia.waluta_id).nazwa;
    let cena = daneZamowienia.cena;
    let sumaKosztow =  ksiegowosc.koszty_wartosc
   
  let mes = `DANE ZAMÓWIENIA\n`;
  mes += `Klient:\t${klient}\n`;
  mes += `Tytuł:\t${tytul}\n`;
  mes += `Nakład:\t${naklad}\n`;
  mes += `Cena jedn.:\t${cena} ${waluta}\n`;
  mes += `Suma kosztów dodatkowych:\t${sumaKosztow} ${waluta}\n`;
  mes += `\n`; // Odstęp przed tabelą

  // 2. Nagłówki tabeli kosztów
  mes += `KOSZTY DODATKOWE\n`;
  mes += `Nazwa\tIlość\tCena\tSuma\tUwagi\n`;
    for (let koszt of kosztyDodatkoweZamowienia.filter((x) => x.delete != true)) {
      mes += koszt.nazwa + "\t";
      mes += koszt.ilosc + "\t";
      mes += koszt.cena + "\t";
      mes += koszt.suma + "\t";
      mes += koszt.uwagi || "" + "\t";

      mes += "\n";
    }

    navigator.clipboard.writeText(mes);
  };


  return (
    <div className={style.dodaj_koszty_td}>
      <button
        className={style.btn_kopiuj_koszty}
        onClick={() => {
          copyToClipboard();
        }}
      >
        Kopiuj koszty
      </button>
    </div>
  );
}
