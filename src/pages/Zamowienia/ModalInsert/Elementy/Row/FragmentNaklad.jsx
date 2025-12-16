import style from "./ElementRow.module.css";
import { _typ_elementu } from "utils/initialvalue";
import { ifNoTextSetNull } from "actions/ifNoTextSetNull";
import { useStatus } from "hooks/useStatus";
import { useEffect, useState } from "react";


// Pomocnicza funkcja do formatowania liczby z separatorem tysięcy (spacją)
const formatNumberWithSpace = (value) => {
  // 1. Oczyść wartość: usuń spacje i zamień przecinki na kropki, jeśli używasz polskiego formatu
  const cleanValue = value.toString().replace(/\s/g, ''); // Usuń wszystkie spacje
  
  // 2. Sprawdź, czy to jest prawidłowa liczba
  const number = parseFloat(cleanValue);

  if (isNaN(number) || cleanValue === '') {
    return cleanValue; // Zwróć pusty ciąg lub nieprzetworzony nie-liczbowy ciąg
  }

  // Użyj Intl.NumberFormat do formatowania. 
  // 'pl-PL' używa spacji jako separatora tysięcy i przecinka jako separatora dziesiętnego.
  // Używamy opcji maximumFractionDigits: 0, aby nie wyświetlać części dziesiętnej
  return new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 }).format(number);
};

// Pomocnicza funkcja do czyszczenia wartości do zapisania w stanie
const cleanNumberForState = (value) => {
    return value.toString().replace(/\s/g, ''); // Usuń wszystkie spacje przed zapisaniem
};


export default function FragmentNaklad({ row, handleUpdateRowFragmenty }) {
  const [setStatus] = useStatus();

  // Stan lokalny do przechowywania sformatowanej wartości do wyświetlenia w polu input
  const [displayValue, setDisplayValue] = useState(row.naklad ? formatNumberWithSpace(row.naklad) : '');

  // Użyj useEffect, aby zsynchronizować stan wyświetlania, gdy zmieni się 'row.naklad'
  useEffect(() => {
      setDisplayValue(row.naklad ? formatNumberWithSpace(row.naklad) : '');
  }, [row.naklad]);


  const handleChange = (e) => {
    const inputValue = e.target.value;
    
    // 1. Usuń separatory z nowej wartości, aby uzyskać czystą liczbę do walidacji
    const cleanValue = cleanNumberForState(inputValue);

    // Opcjonalnie: upewnij się, że użytkownik wpisuje tylko cyfry
    if (cleanValue !== '' && !/^\d+$/.test(cleanValue)) {
      // Nie rób nic, jeśli to nie jest puste lub nie składa się z samych cyfr
      // Możesz tutaj wyświetlić błąd lub po prostu zignorować
      return; 
    }
    
    // 2. Sformatuj tę wartość dla pola input
    const formattedValue = formatNumberWithSpace(cleanValue);
    
    // Ustaw sformatowaną wartość do wyświetlenia
    setDisplayValue(formattedValue);

    // 3. Zaktualizuj stan z CZYSTĄ wartością (bez separatorów)
    // Musisz użyć oczyszczonej wartości, aby Twoja funkcja ifNoTextSetNull
    // i logikę aplikacji (np. obliczenia, baza danych) działały poprawnie.
    handleUpdateRowFragmenty({
      ...row,
      naklad: ifNoTextSetNull(cleanValue),
      update: true
    });

    setStatus(3);
  };

  return (
    // Pamiętaj, aby zaimportować useState i useEffect z 'react'
    <input
      className={style.rowFragmenty_naklad}
      // Użyj lokalnego stanu 'displayValue' do wyświetlenia sformatowanej wartości
      value={displayValue}
      onChange={handleChange}
    />
  );
}