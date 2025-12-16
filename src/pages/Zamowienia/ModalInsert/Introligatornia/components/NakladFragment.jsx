import style from "../Introligatornia.module.css";
import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
// import { _typ_elementu } from "utils/initialvalue"; // Niepotrzebne
// import { reg_int } from "utils/initialvalue"; // Możemy użyć prostszej reguły

import { useStatus } from "hooks/useStatus";

// Funkcje pomocnicze
const unformatNumber = (value) => {
  // Usuwa wszystkie spacje
  return value.replace(/\s/g, '');
};

const formatNumber = (value) => {
  if (!value) return '';
  // Konwertuje na liczbę, formatuje z polskim separatorem tysięcy (spacją)
  // Używamy Number.prototype.toLocaleString()
  const number = parseFloat(value);
  if (isNaN(number)) return value; // Zwraca niezmienioną wartość, jeśli nie jest liczbą
  
  return number.toLocaleString('pl-PL', {
    maximumFractionDigits: 0,
    useGrouping: true
  });
};

// Funkcja pomocnicza do walidacji - uproszczona, aby obsłużyć czysty ciąg liczbowy
const isInteger = (value) => {
    // Sprawdza, czy wartość jest pustym ciągiem LUB ciągiem samych cyfr
    return value === "" || /^\d*$/.test(value);
}


export default function NakladFragmentu({ row }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowFragmenty = contextModalInsert.handleUpdateRowFragmenty;
  const [setStatus] = useStatus()

  // Formatujemy wartość PRZED przekazaniem jej do inputa
  const formattedValue = formatNumber(row.naklad);

  return (
    <td className={style.tdNaklad}>
      <input
        className={style.input_naklad_fragment}
        // Używamy sformatowanej wartości do wyświetlenia
        value={formattedValue} 
        onChange={(e) => {
          const rawValue = e.target.value;
          
          // 1. Usuwamy spacje i bierzemy czystą wartość liczbową
          const unformattedValue = unformatNumber(rawValue); 

          // 2. Walidacja czystej wartości
          if (isInteger(unformattedValue)) {
            // Wartość do zapisania w stanie MUSI być niesformatowana
            handleUpdateRowFragmenty({
              ...row,
              naklad: unformattedValue, // Zapisujemy niesformatowaną wartość (np. "1000")
              update: true
            });
            setStatus(3)
          } 
          // Odrzucamy wprowadzenie, jeśli nie jest poprawną liczbą całkowitą
          // Uwaga: Możesz chcieć obsłużyć przypadek, gdy użytkownik usuwa cyfrę, a nie separator
        }}
        // Dodaj atrybut inputmode="numeric" dla lepszej klawiatury na urządzeniach mobilnych
        inputMode="numeric"
      ></input>
    </td>
  );
}