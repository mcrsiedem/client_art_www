import { useContext, useEffect, useState } from "react";
import style from "./ProduktyNaklad.module.css";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useStatus } from "hooks/useStatus";
import { _typ_elementu, reg_int } from "utils/initialvalue";
import { useHistoria } from "hooks/useHistoria";

// --- Nowe funkcje formatowania (można przenieść do utils) ---
const formatNumber = (value) => {
  const rawValue = String(value).replace(/\s/g, "");
  
  if (rawValue === "" || isNaN(parseInt(rawValue))) {
    return "";
  }
  // pl-PL używa spacji jako separatora tysięcy
  return new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 }).format(rawValue);
};

const parseNumber = (formattedValue) => {
  // Usuń wszystkie spacje (separatory tysięcy)
  return String(formattedValue).replace(/\s/g, "");
};
// -----------------------------------------------------------


export default function ProduktyNaklad({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  const [setStatus] = useStatus();
  const [add] = useHistoria();
  const [valueIN, setValueIN] = useState(null);
  const daneZamowienia = contextModalInsert.daneZamowienia;

  // Używamy stanu lokalnego do przechowywania wartości wyświetlanej w polu,
  // co jest kluczowe, aby użytkownik mógł swobodnie wpisywać.
  // Inicjalizujemy go sformatowaną wartością z propa.
  const [displayValue, setDisplayValue] = useState(formatNumber(row?.naklad || ""));


  // Użyj efektu do synchronizacji stanu lokalnego z propem `row.naklad`
  // na wypadek, gdyby prop zmienił się z zewnątrz
  useEffect(() => {
    setDisplayValue(formatNumber(row?.naklad || ""));
  }, [row?.naklad]);


  const handleChange = (e) => {
    const inputValue = e.target.value;
    // Pokaż natychmiast, co użytkownik wpisuje, bez formatowania
    // (formatowanie nastąpi w onBlur)
    setDisplayValue(inputValue); 

    // Oczyść wartość z separatorów, aby sprawdzić, czy jest poprawną liczbą
    const cleanedValue = parseNumber(inputValue);

    // Walidacja: jeśli jest puste LUB jest poprawną liczbą całkowitą
    if (cleanedValue === "" || reg_int.test(cleanedValue)) {
      // Aktualizuj stan rodzica (lub ogólny stan aplikacji)
      // zawsze przekazując CZYSTĄ, nieformatowaną wartość
      handleUpdateRowProdukty({
        ...row,
        naklad: cleanedValue, // Zapisujemy czystą wartość!
        update: true,
      });
      setStatus(3);
    }
    // Jeśli walidacja nie przejdzie, setDisplayValue już zaktualizował pole,
    // ale handleUpdateRowProdukty nie zostanie wywołane.
  };

  const handleBlur = (e) => {
    const rawValue = row?.naklad; // Pobieramy czystą wartość, którą mamy zapisaną

    // 1. Ustaw sformatowaną wartość do wyświetlenia
    setDisplayValue(formatNumber(rawValue));

    // 2. Obsługa historii
    if (valueIN != rawValue) {
      add({
        kategoria: "Naklad",
        event:
          " Produkt - zmiana nakladu z " +
          formatNumber(valueIN) + // Formatujemy do logu
          " na " +
          formatNumber(rawValue) + // Formatujemy do logu
          " szt. ",
        zamowienie_id: daneZamowienia.id,
      });
    }
  };

  return (
    <div className={style.col_dane}>
      <label className={style.label}> Nakład </label>
      <input
        className={style.input}
        value={displayValue} // Wyświetlamy sformatowaną wartość
        onFocus={() => {
          // W onFocus, ustaw stan lokalny na czystą wartość, aby łatwo edytować
          setDisplayValue(row.naklad || ""); 
          // Ustaw wartość do porównania w onBlur
          setValueIN(row.naklad);
        }}
        onBlur={handleBlur} // Nowa funkcja onBlur
        onChange={handleChange} // Nowa funkcja onChange
      ></input>
    </div>
  );
}