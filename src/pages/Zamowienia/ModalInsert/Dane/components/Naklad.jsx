import style from "../Dane.module.css";
import { useContext, useState} from "react";
// Importy... (pozostałe importy są takie same)
import { _firma, _produkty, _klient, _zestawy, _elementy, _opiekun, _status_dokumentu,_stan_dokumentu,_vat,_waluta,_rodzaj,_fsc, _etapy_produkcji, reg_int } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useHistoria } from "hooks/useHistoria";
import { useStatus } from "hooks/useStatus";

// Funkcja pomocnicza do formatowania liczby separatorem tysięcy
const formatNumber = (value) => {
  if (!value) return "";
  // Usuń wszystkie niecyfrowe znaki przed formatowaniem
  const stringValue = String(value).replace(/\s/g, ''); 
  const numberValue = parseInt(stringValue, 10);

  // Wróć pusty string, jeśli to nie jest poprawna liczba
  if (isNaN(numberValue)) return "";

  // Użyj toLocaleString, aby sformatować liczbę separatorem tysięcy
  // 'pl-PL' używa spacji jako separatora tysięcy (zgodnie z Twoim życzeniem 3 000)
  return numberValue.toLocaleString('pl-PL');
};

// Funkcja pomocnicza do czyszczenia wartości z separatorów
const cleanNumber = (value) => {
    // Usuwa wszystkie spacje i inne niecyfrowe znaki
    return String(value).replace(/\D/g, ''); 
}


export default function NAKLAD() {
  const contextModalInsert = useContext(ModalInsertContext);
  const produkty = contextModalInsert.produkty;
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  const [setStatus] = useStatus();
  const daneZamowienia = contextModalInsert.daneZamowienia;
  const setDaneZamowienia = contextModalInsert.setDaneZamowienia;
  const [add] = useHistoria();
  const [valueIN, setValueIN] = useState(null);
  const ksiegowosc = contextModalInsert.ksiegowosc;

  // Wartość, która będzie wyświetlana w polu input
  const displayValue = formatNumber(produkty[0].naklad);
  
  const handleInputChange = (e) => {
    const rawValue = e.target.value;
    // 1. Oczyść wartość z wszelkich separatorów, aby uzyskać czysty ciąg cyfr
    const cleanedValue = cleanNumber(rawValue); 

    // Sprawdzamy czystą wartość
    if (rawValue === "" || reg_int.test(cleanedValue) || cleanedValue === '') {
        // Użyjemy czystej, nieformatowanej wartości jako liczby nakładu w stanie
        const nakladValueForState = cleanedValue === '' ? '' : cleanedValue; 

        // Reszta Twojej logiki aktualizacji stanu
        const wartoscAsNumber = daneZamowienia.cena
          ? parseFloat(daneZamowienia.cena.replace(",", "."))
          : 0;

        // Aktualizacja stanu produktów
        handleUpdateRowProdukty({
          ...produkty[0],
          naklad: nakladValueForState, // Zapisujemy nieformatowaną, czystą wartość
          update: true,
        });

        // Konwersja do liczby na potrzeby obliczeń
        const nakladForCalc = parseInt(nakladValueForState || 0, 10);

        let wartosc_zamowienia = (wartoscAsNumber * nakladForCalc).toFixed(2);
        let status = daneZamowienia.stan == 3 ? 3 : daneZamowienia.status;
        let cena_z_kosztami = (
          (nakladForCalc * wartoscAsNumber + (parseFloat(ksiegowosc.koszty_wartosc) || 0)) /
          nakladForCalc || 0
        ).toFixed(2);
        let skonto = (parseFloat(daneZamowienia.skonto) || 0) / 100;
        let wartosc_koncowa =
          (parseFloat(daneZamowienia.cena.replace(",", ".") || 0) * nakladForCalc || 0) +
          (parseFloat(ksiegowosc.koszty_wartosc) || 0);

        setDaneZamowienia({
          ...daneZamowienia,
          wartosc_zamowienia,
          cena_z_kosztami,
          wartosc_koncowa: (wartosc_koncowa - wartosc_koncowa * skonto).toFixed(2),
          status,
          update: true,
        });
    }
  };

  return (
    <div className={style.col}>
      <label className={style.label}> Nakład </label>
      <input
        className={style.input}
        type="text"
        // disabled
        title="Nakład dodaj w parametrach"
        // Używamy displayValue, które jest sformatowaną wartością.
        // W stanie 'produkty[0].naklad' powinna być zapisana czysta liczba (lub string cyfr).
        value={displayValue} 
        onFocus={() => {
          // Ustawiamy czystą wartość, żeby w trakcie edycji w input nie było separatorów
          // Można też ustawić tu czystą wartość, jeśli chcemy edytować bez spacji.
          // Jeśli `produkty[0].naklad` to string z cyframi, to wystarczy on.
          setValueIN(produkty[0].naklad); 
        }}
        onBlur={(e) => {
            // Zapisujemy czystą wartość po blur, do logiki historii, aby porównanie było poprawne
            const currentValue = cleanNumber(e.target.value); 
            if (valueIN != currentValue) {
                add({
                    kategoria: "Naklad",
                    event:
                        " Produkt - zmiana nakladu z " +
                        valueIN +
                        " na " +
                        currentValue +
                        " szt. ",
                    zamowienie_id: daneZamowienia.id,
                });
            }
        }}
        onChange={handleInputChange} // Używamy nowej funkcji obsługi
      ></input>
    </div>
  );
}