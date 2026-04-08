import React, { useContext, useState } from "react";
import style from "./Header.module.css";
import iconCopy from "assets/edit2.svg";
import { AppContext } from "context/AppContext";
import { _etapy_produkcji, _stan_dokumentu, _status_dokumentu, _waluta } from "utils/initialvalue";


export default function BTN_KOPIUJ_NEW({ allColumns, visibleColumns }) {
  const contextApp = useContext(AppContext);
  const zamowienia = contextApp.zamowienia;
  const setZamowienia = contextApp.setZamowienia;
    const _status_koszty_dodatkowe = contextApp._status_koszty_dodatkowe;
    const _status_faktury = contextApp._status_faktury;

    const [showToast, setShowToast] = useState(false);


  const handleCopy = () => {
    let mes = "";

    // 1. Pobierz tylko zaznaczone wiersze
    const selectedRows = zamowienia.filter((x) => x.select === true);

    if (selectedRows.length === 0) {
      alert("Najpierw zaznacz wiersze do skopiowania.");
      return;
    }

    // 2. Opcjonalnie: Dodaj nagłówki kolumn (tylko widocznych)
    const headers = allColumns
      .filter((col) => visibleColumns.includes(col.id))
      .map((col) => col.label)
      .join("\t");
    mes += headers + "\n";

    // 3. Iteruj po wierszach
    selectedRows.forEach((row) => {
      // 4. Iteruj TYLKO po widocznych kolumnach
      const rowData = allColumns
        .filter((col) => visibleColumns.includes(col.id))
        .map((col) => {
          // Specyficzna logika formatowania dla konkretnych ID (analogicznie do CellContent)
          switch (col.id) {
            case "nr":
              return row.stan > 2 ? `${row.nr} / ${row.rok.substring(2, 4)}` : "";
            case "format_x":
              return `${row.format_x}x${row.format_y}`;
            case "stan":
              return _stan_dokumentu.find((s) => s.id == row.stan)?.nazwa || "-";
            case "etap":
              return _etapy_produkcji.find((s) => s.id == row.etap)?.nazwa || "-";
            case "status_nazwa":
              return _status_dokumentu.find((s) => s.id == row.status)?.nazwa || "-";
              case "wartosc_zamowienia":
    // Pobieramy wartość, zamieniamy na string i podmieniamy kropkę na przecinek
    return row.wartosc_zamowienia ? String(row.wartosc_zamowienia).replace('.', ',') : "";
            case "waluta_id":
              return _waluta.find((s) => s.id == row.waluta_id)?.nazwa || "-";
    case "koszty_status": return _status_koszty_dodatkowe.find((s) => s.id == row.koszty_status).nazwa || "-";
    case "faktury_status": return _status_faktury.find((s) => s.id == row.faktury_status).nazwa || "-";

            default:
              return row[col.id] || "";
          }
        })
        .join("\t"); // Rozdzielacz tabulacji (idealny do Excela)

      mes += rowData + "\n";
    });

    // 5. Zapisz do schowka
    navigator.clipboard.writeText(mes).then(() => {

      // 1. Pokaż powiadomienie
      setShowToast(true);

      // 2. Schowaj powiadomienie po 2 sekundach
      setTimeout(() => {
        setShowToast(false);
      }, 2000);

      // Opcjonalnie: odznacz wiersze po skopiowaniu
      // setZamowienia(
      //   zamowienia.map((t) => ({ ...t, select: false }))
      // );
      console.log("Skopiowano do schowka");
    });
  };

  return (
<div className={style.toast_container}>
      <img
        title="Skopiuj do schowka... CTRL + C"
        className={style.icon3}
        src={iconCopy}
        onClick={handleCopy}
        alt="Ikona Kopiuj"
      /> 

      {/* Okienko potwierdzające (Toast) */}
      {showToast && (
        <div className={style.toast}>
          Skopiowano!
        </div>
      )}
    </div>

  );
}

