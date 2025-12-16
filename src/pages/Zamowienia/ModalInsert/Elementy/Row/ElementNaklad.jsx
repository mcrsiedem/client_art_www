import style from "./ElementRow.module.css";
import { useState, useContext } from "react";
import { _typ_elementu } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";
import { reg_int } from "utils/initialvalue";
import { ifNoTextSetNull } from "actions/ifNoTextSetNull";
import { useHistoria } from "hooks/useHistoria";
import { useStatus } from "hooks/useStatus";
import { getNameOfElement } from "actions/getNameOfElement";

// Funkcja pomocnicza do formatowania liczby z separatorem
// Używamy toLocaleString, który poprawnie obsługuje locale (np. 'pl-PL' użyje spacji dla tysięcy)
const formatNumber = (num) => {
  if (num === null || num === "" || isNaN(num)) {
    return "";
  }
  // Usuń wszystkie spacje (separatory), aby mieć czystą liczbę
  const cleanNumber = String(num).replace(/\s/g, '');
  
  // Przekształć na liczbę, a następnie formatuj
  return Number(cleanNumber).toLocaleString('pl-PL');
};

// Funkcja pomocnicza do czyszczenia liczby (usuwania separatorów)
const cleanNumber = (formattedValue) => {
  if (formattedValue === null || formattedValue === "") {
    return null;
  }
  // Usuwa spacje (separator tysięcy)
  const cleaned = formattedValue.replace(/\s/g, '');
  return cleaned === "" ? null : cleaned;
};

export default function ElementNaklad({ row }) {
    const [setStatus] = useStatus()
    const contextModalInsert = useContext(ModalInsertContext);
    const fragmenty = contextModalInsert.fragmenty
    const elementy = contextModalInsert.elementy
    const daneZamowienia = contextModalInsert.daneZamowienia
    const handleChangeCardFragmenty_i_Elementy_naklad = contextModalInsert.handleChangeCardFragmenty_i_Elementy_naklad
    const [add] = useHistoria()
    const [valueIN, setValueIN] = useState(null)
    
    // Używamy formatNumber do wyświetlenia wartości
    const displayedValue = formatNumber(row.naklad);

    const sprawdzSume = () => {
        let suma_nakladow = fragmenty
            .filter((x) => x.element_id == row.id)
            .map((x) => parseInt(x.naklad))
            .reduce((a, b) => a + b, 0);

        if (suma_nakladow == row.naklad) {
            return style.input;
        } else {
            return style.input_alert;
        }
    };

    const ilezostalo = () => {
        let suma_nakladow = fragmenty
            .filter((x) => x.element_id == row.id)
            .map((x) => parseInt(x.naklad))
            .reduce((a, b) => a + b, 0);
        if (parseInt(row.naklad) - suma_nakladow == 0) {
            return "Suma nakładów OK"
        } else {
            return "Brakuje " + (parseInt(row.naklad) - suma_nakladow) + " szt.";
        }
    };

    return (
        <input
            onDoubleClick={() => { console.log("db") }}
            className={sprawdzSume()}
            title={ilezostalo()}
            // Używamy sformatowanej wartości do wyświetlenia
            value={displayedValue} 
            onChange={(e) => {
                // Czyścimy wartość przed walidacją i zapisem
                const cleanedValue = cleanNumber(e.target.value);
                
                // Używamy wyczyszczonej wartości do walidacji i zapisu
                if (cleanedValue === null || cleanedValue === "" || reg_int.test(cleanedValue)) {
                    handleChangeCardFragmenty_i_Elementy_naklad({
                        ...row,
                        // Zapisujemy wyczyszczoną wartość
                        naklad: cleanedValue, 
                        update: true,
                    });
                    setStatus(3);
                }
            }}
            onFocus={() => { 
                // Zapisujemy czystą wartość przed edycją
                setValueIN(row.naklad) 
            }}
            onBlur={(e) => {
                // Wartość z inputu musi być wyczyszczona przed porównaniem
                const currentValue = cleanNumber(e.target.value);
                
                if (valueIN != currentValue) {
                    setStatus(3)
                    add({
                        kategoria: "Naklad",
                        event: getNameOfElement(row.id, elementy, _typ_elementu) + " " + row.nazwa + " - zmiana nakladu z " + formatNumber(valueIN) + " na " + formatNumber(currentValue) + " szt. ",
                        zamowienie_id: daneZamowienia.id
                    })
                }
            }}
        ></input>
    );
}