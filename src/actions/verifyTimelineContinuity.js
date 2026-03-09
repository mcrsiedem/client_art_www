/**
 * Funkcja sprawdzająca ciągłość chronologiczną w tablicy operacji.
 * Zakłada, że obiekty mają strukturę: { global_id, poczatek, koniec, ... }
 * * @param {Array} data - Tablica obiektów do sprawdzenia
 * @returns {Object} Wynik walidacji z informacją o błędach
 */
export  function verifyTimelineContinuity(data) {
    if (!data || data.length < 2) {
        return { isValid: true, errors: [] };
    }

    // Kopiujemy i sortujemy dane po dacie początku, aby mieć pewność chronologii
    const sortedData = [...data].sort((a, b) => new Date(a.poczatek) - new Date(b.poczatek));
    const errors = [];

    for (let i = 1; i < sortedData.length; i++) {
        const prev = sortedData[i - 1];
        const curr = sortedData[i];

        const prevEnd = new Date(prev.koniec).getTime();
        const currStart = new Date(curr.poczatek).getTime();

        // Sprawdzamy czy czas zakończenia poprzedniego zadania zgadza się z początkiem obecnego
        if (prevEnd !== currStart) {
            const diffMinutes = (currStart - prevEnd) / (1000 * 60);
            
            errors.push({
                type: diffMinutes > 0 ? 'LUKA' : 'NACHODZENIE',
                gapMinutes: Math.abs(diffMinutes),
                afterGlobalId: prev.global_id,
                beforeGlobalId: curr.global_id,
                expectedStart: prev.koniec,
                actualStart: curr.poczatek
            });
        }
    }

    return {
        isValid: errors.length === 0,
        totalErrors: errors.length,
        errors: errors
    };
}

// Przykład użycia na Twoich danych:
const daneZlecenia = [
    { "global_id": 6259, "poczatek": "2026-03-06 07:50:43", "koniec": "2026-03-07 11:20:43" },
    { "global_id": 5666, "poczatek": "2026-03-07 08:45:43", "koniec": "2026-03-07 20:45:43" } // Tu jest luka
];

const raport = verifyTimelineContinuity(daneZlecenia);

if (!raport.isValid) {
    console.log(`Znaleziono błędy w ciągłości (${raport.totalErrors}):`);
    raport.errors.forEach(err => {
        console.error(`- Między ID ${err.afterGlobalId} a ${err.beforeGlobalId}: ${err.type} (${err.gapMinutes} min)`);
    });
} else {
    console.log("Ciągłość czasu jest zachowana.");
}