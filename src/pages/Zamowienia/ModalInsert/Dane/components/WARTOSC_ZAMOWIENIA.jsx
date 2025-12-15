import style from "../Dane.module.css";
import { useContext, useEffect, useState} from "react";

import { ModalInsertContext } from "context/ModalInsertContext";


// Funkcja pomocnicza do usuwania spacji (separatorów tysięcy)
const cleanValue = (value) => {
    // Usuwa spacje (separator tysięcy) i zamienia przecinek na kropkę
    return value.replace(/\s/g, '').replace(',', '.');
}

// Funkcja pomocnicza do formatowania (dodawanie separatora tysięcy)
const formatValue = (value) => {
    // 1. Upewnij się, że wartość jest stringiem
    const strValue = String(value);

    // 2. Podziel na część całkowitą i dziesiętną
    const parts = strValue.split(',');
    let integerPart = parts[0].replace(/\s/g, ''); // Usuwamy spacje z części całkowitej
    const decimalPart = parts.length > 1 ? ',' + parts[1] : '';

    // 3. Dodaj separator tysięcy do części całkowitej
    // Używamy wyrażenia regularnego do wstawiania spacji co 3 cyfry od końca
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    // 4. Połącz z powrotem
    return integerPart + decimalPart;
}


export default function WARTOSC_ZAMOWIENIA( ){
    const contextModalInsert = useContext(ModalInsertContext);
    const daneZamowienia = contextModalInsert.daneZamowienia;
    const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
    const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
    const ksiegowosc = contextModalInsert.ksiegowosc;

    const produkty = contextModalInsert.produkty;

    // Używamy stanu lokalnego do przechowywania sformatowanej wartości w polu input
    // Inicjalizujemy go na podstawie wartości z kontekstu, ale sformatowanej
    const [inputValue, setInputValue] = useState(() => 
        daneZamowienia.wartosc_zamowienia 
            ? formatValue(String(daneZamowienia.wartosc_zamowienia).replace('.', ','))
            : ''
    );

    // Używamy useEffect, aby zaktualizować stan lokalny, gdy kontekst się zmieni
    // np. po załadowaniu danych
    useEffect(() => {
        setInputValue(
            daneZamowienia.wartosc_zamowienia 
                ? formatValue(String(daneZamowienia.wartosc_zamowienia).replace('.', ','))
                : ''
        );
    }, [daneZamowienia.wartosc_zamowienia]);


    const handleValueChange = (event) => {
        const rawValue = event.target.value;
        
        // 1. Wartość czyszczona dla walidacji i obliczeń (bez spacji, z przecinkiem)
        const valueWithoutSpaces = rawValue.replace(/\s/g, ''); 

        // 2. Walidacja: Pozwalamy na do 10 cyfr całkowitych i do 2 dziesiętnych (separator to przecinek)
        const re = /^\d{0,10}(?:\,\d{0,2}){0,1}$/;
        
        if (rawValue === '' || re.test(valueWithoutSpaces)) {
            
            // Wartość do wyświetlenia (sformatowana)
            const formattedDisplayValue = formatValue(valueWithoutSpaces);

            // Wartość do obliczeń (czysta, z kropką jako separatorem dziesiętnym)
            const valueForCalculations = cleanValue(valueWithoutSpaces);
            
            const wartoscAsNumber = valueForCalculations ? parseFloat(valueForCalculations) : 0;
            
            let skonto =((parseFloat(daneZamowienia.skonto) || 0) / 100 )
            let wartosc_koncowa =(wartoscAsNumber || 0) + (parseFloat(ksiegowosc.koszty_wartosc) || 0)

            // Zaktualizuj stan lokalny pola input
            setInputValue(formattedDisplayValue);

            // Zaktualizuj kontekst (zapisujemy czystą wartość z kropką, aby była liczbą)
            setDaneZamowienia({
                ...daneZamowienia,
                // W kontekście globalnym warto zapisać czystą wartość, np. "1000.55"
                // Twoja logika zakładała, że jest to string
                // Zapisujemy czysty string z przecinkiem, aby zachować zgodność z Twoją logiką
                wartosc_zamowienia: valueWithoutSpaces, 
                // Zmieniamy również obliczenia na podstawie czystej, liczbowej wartości
                cena: (wartoscAsNumber / (produkty[0]?.naklad || 1) || 0).toFixed(2), 
                status: daneZamowienia.stan == 3 ? 3 : daneZamowienia.status,
                wartosc_koncowa: (wartosc_koncowa - (wartosc_koncowa * skonto)).toFixed(2),
                update: true,
            });
        }
    }

    return(
        <div className={style.col}>
        <label className={style.label}> Wartość </label>
        <input className={style.input} 
        title="Nakład * cena"
        // Używamy stanu lokalnego `inputValue` dla wartości pola
        value={inputValue}
        onChange={handleValueChange}
        ></input>
        </div>
    );
}