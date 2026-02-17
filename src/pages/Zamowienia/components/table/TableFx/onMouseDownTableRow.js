/**
 * Obsługuje zaznaczanie wierszy w tabeli (Single, Ctrl+Click, Shift+Click).
 * Uwzględnia aktualne sortowanie i filtrowanie.
 * * @param {MouseEvent} event - Zdarzenie myszy
 * @param {Object} row - Obiekt wiersza, który został kliknięty
 * @param {Function} setZamowienia - Funkcja aktualizująca stan globalny
 * @param {Array} sortedVisibleRows - LISTA WYŚWIETLANA: przefiltrowane i POSORTOWANE wiersze widoczne w UI
 * @param {number} i - Indeks klikniętego wiersza w liście sortedVisibleRows
 */
export function onMouseDownTableRow(event, row, setZamowienia, sortedVisibleRows, i) {
    // Pobieramy indeks startowy dla operacji z Shiftem
    const lastIndexStr = sessionStorage.getItem("indeks_start");
    const lastIndex = lastIndexStr !== null ? parseInt(lastIndexStr, 10) : null;

    setZamowienia(prevZamowienia => {
        // 1. Obsługa CTRL + CLICK (Przełączanie pojedynczego elementu bez resetowania reszty)
        if (event.ctrlKey) {
            return prevZamowienia.map(t => 
                t.id === row.id ? { ...t, select: !t.select } : t
            );
        }

        // 2. Obsługa SHIFT + CLICK (Zaznaczanie zakresu wg aktualnego widoku)
        if (event.shiftKey && lastIndex !== null) {
            const start = Math.min(lastIndex, i);
            const end = Math.max(lastIndex, i);

            // Pobieramy ID wszystkich wierszy, które znajdują się w widocznym zakresie (po sortowaniu)
            const idsInRange = new Set(
                sortedVisibleRows
                    .slice(start, end + 1)
                    .map(r => r.id)
            );

            return prevZamowienia.map(t => {
                if (idsInRange.has(t.id)) {
                    return { ...t, select: true };
                }
                return t;
            });
        }

        // 3. ZWYKŁE KLIKNIĘCIE (Reset zaznaczenia i wybór tylko jednego)
        return prevZamowienia.map(t => ({
            ...t,
            select: t.id === row.id
        }));
    });

    // Zawsze aktualizujemy punkt odniesienia dla Shifta po kliknięciu
    sessionStorage.setItem("indeks_start", i.toString());
}