import style from "../Dane.module.css";
import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";

// Funkcja pomocnicza do formatowania liczby
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

export default function WartoscKoncowa() {
    const contextModalInsert = useContext(ModalInsertContext);
    const daneZamowienia = contextModalInsert.daneZamowienia;

    return (
        <div className={style.col}>
            <label className={style.label}> Wartość końcowa</label>
            <input 
                className={style.input_naklad} 
                type="text"
                disabled // Zostawiamy 'disabled'
                title="Cena za szt * nakład lub wartość + koszty dodatkowe - Skonto"
                // Użyj funkcji formatującej
                value={formatujKwote(daneZamowienia.wartosc_koncowa)}
            />
        </div>
    );
}