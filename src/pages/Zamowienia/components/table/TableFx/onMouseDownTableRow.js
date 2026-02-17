/**
 * Obsługuje zaznaczanie wierszy w tabeli (Single, Ctrl+Click, Shift+Click).
 * * @param {MouseEvent} event - Zdarzenie myszy
 * @param {Object} row - Obiekt wiersza, który został kliknięty
 * @param {Array} zamowienia - Aktualny stan zamówień
 * @param {Function} setZamowienia - Funkcja aktualizująca stan
 * @param {number|string} selectedUser - ID wybranego opiekuna (do filtrowania zakresu)
 * @param {number|string} selectedKlient - ID wybranego klienta (do filtrowania zakresu)
 * @param {number} i - Indeks wiersza w przefiltrowanej liście
 */
export function onMouseDownTableRow(event, row, zamowienia, setZamowienia, selectedUser, selectedKlient, i) {
    // Pobieramy indeks startowy dla operacji z Shiftem
    const lastIndex = parseInt(sessionStorage.getItem("indeks_start"));

    setZamowienia(prevZamowienia => {
        // 1. Najpierw identyfikujemy wiersze, które są aktualnie widoczne (przefiltrowane),
        // aby operacja Shift działała zgodnie z tym, co użytkownik widzi na ekranie.
        const visibleRows = prevZamowienia.filter(zam => {
            const userMatch = selectedUser == 0 || zam.opiekun_id == selectedUser;
            const klientMatch = selectedKlient == 0 || zam.klient_id == selectedKlient;
            const stanMatch = zam.stan == 3;
            return userMatch && klientMatch && stanMatch;
        });

        // 2. Obsługa CTRL + CLICK (Dodawanie/Usuwanie pojedynczego wiersza do istniejącego zaznaczenia)
        if (event.ctrlKey) {
            return prevZamowienia.map(t => 
                t.id === row.id ? { ...t, select: !t.select } : t
            );
        }

        // 3. Obsługa SHIFT + CLICK (Zaznaczanie zakresu)
        if (event.shiftKey && !isNaN(lastIndex)) {
            const start = Math.min(lastIndex, i);
            const end = Math.max(lastIndex, i);

            // Pobieramy ID wierszy, które znajdują się w widocznym zakresie
            const idsInRange = visibleRows
                .slice(start, end + 1)
                .map(r => r.id);

            return prevZamowienia.map(t => {
                if (idsInRange.includes(t.id)) {
                    return { ...t, select: true };
                }
                return t; // Reszta pozostaje bez zmian (lub zmień na select: false jeśli zakres ma resetować inne)
            });
        }

        // 4. ZWYKŁE KLIKNIĘCIE (Czyścimy wszystko i zaznaczamy tylko ten jeden)
        return prevZamowienia.map(t => ({
            ...t,
            select: t.id === row.id
        }));
    });

    // Zapisujemy indeks klikniętego elementu jako punkt odniesienia dla następnego Shifta
    sessionStorage.setItem("indeks_start", i.toString());
}