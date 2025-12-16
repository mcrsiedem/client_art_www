import style from "../Introligatornia.module.css";
import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
// import { _typ_elementu } from "utils/initialvalue"; // Nie jest używane
import { useState } from "react";
import { reg_int } from "utils/initialvalue";
import { ifNoTextSetNull } from "actions/ifNoTextSetNull";
import { useStatus } from "hooks/useStatus";
import { useHistoria } from "hooks/useHistoria";

// --- FUNKCJE POMOCNICZE (można przenieść do osobnego pliku) ---

const formatNumberWithSeparator = (value) => {
  if (value === null || value === undefined || value === "") {
    return "";
  }
  const number = parseFloat(String(value).replace(/\s/g, ''));
  if (isNaN(number)) {
    return String(value);
  }
  return new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 }).format(number);
};

const cleanNumberFormat = (formattedValue) => {
  if (formattedValue === null || formattedValue === undefined) {
    return null;
  }
  return String(formattedValue).replace(/\s/g, '');
};

// --- KOMPONENT ---

export default function NakladOprawa({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowOprawa = contextModalInsert.handleUpdateRowOprawa;
  const [setStatus] = useStatus();
  const [add] = useHistoria();
  // Zmieniamy, aby przechowywać CZYSTĄ wartość, którą porównujemy w onBlur
  const [valueIN, setValueIN] = useState(null);
  const daneZamowienia = contextModalInsert.daneZamowienia;

  // Wartość do wyświetlenia w input
  const displayValue = formatNumberWithSeparator(row.naklad);

  return (
    <td className={style.tdNaklad}>
      <input
        className={style.input_naklad}
        // Używamy sformatowanej wartości do wyświetlenia
        value={displayValue}
        onFocus={() => {
          // Zapisujemy CZYSTĄ wartość do porównania, aby nie mieszać formatów
          setValueIN(row.naklad);
        }}
        onBlur={(e) => {
          // Upewniamy się, że to czysta wartość jest porównywana
          const currentValue = cleanNumberFormat(e.target.value); 
          
          // Porównujemy CZYSTĄ wartość
          if (valueIN != currentValue && row.naklad != currentValue) {
            add({
              kategoria: "Naklad oprawy",
              // Formatujemy obie wartości tylko na potrzeby wiadomości w historii
              event:
                " Oprawa - zmiana nakladu z " +
                formatNumberWithSeparator(valueIN) + 
                " na " +
                formatNumberWithSeparator(currentValue) +
                " szt. ",
              zamowienie_id: daneZamowienia.id,
            });
          }
        }}
        onChange={(e) => {
          // Pobieramy wartość z inputa
          const inputValue = e.target.value;
          // Usuwamy formatowanie dla walidacji i zapisu
          const cleanValue = cleanNumberFormat(inputValue);

          // Sprawdzamy, czy input jest pusty LUB czy czysta wartość jest poprawną liczbą całkowitą
          if (inputValue === "" || reg_int.test(cleanValue)) {
            handleUpdateRowOprawa({
              ...row,
              // Zapisujemy CZYSTĄ wartość liczbową!
              naklad: ifNoTextSetNull(cleanValue),
              update: true,
            });
            setStatus(3);
          }
        }}
      ></input>
    </td>
  );
}