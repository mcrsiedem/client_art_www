

export function getGraniceMiesiaca() {
    // 1. Pobierz aktualną datę
    const dzisiaj = new Date();

    // 2. Oblicz pierwszy dzień aktualnego miesiąca
    // Ustawia dzień na 1, pozostawiając rok i miesiąc bez zmian
    const pierwszyDzienObiekt = new Date(dzisiaj.getFullYear(), dzisiaj.getMonth(), 1);

    // 3. Oblicz ostatni dzień aktualnego miesiąca
    // Ustawia miesiąc na następny (getMonth() + 1), a dzień na 0. 
    // Dzień 0 następnego miesiąca to ostatni dzień bieżącego miesiąca.
    const ostatniDzienObiekt = new Date(dzisiaj.getFullYear(), dzisiaj.getMonth() + 1, 0);

    // Funkcja pomocnicza do formatowania daty na YYYY-MM-DD
    const formatujDate = (data) => {
        const rok = data.getFullYear();
        // getMonth() jest indeksowane od 0, więc dodajemy 1. 
        // padStart(2, '0') zapewnia dwucyfrowy format (np. 01, 11)
        const miesiac = String(data.getMonth() + 1).padStart(2, '0');
        const dzien = String(data.getDate()).padStart(2, '0');
        
        return `${rok}-${miesiac}-${dzien}`;
    };

    // 4. Sformatuj daty i zwróć je
    return {
        pierwszyDzien: formatujDate(pierwszyDzienObiekt),
        ostatniDzien: formatujDate(ostatniDzienObiekt)
    };
}


// Przykładowe użycie:
// const granice = pobierzGraniceMiesiaca();
// console.log(`Pierwszy dzień: ${granice.pierwszyDzien}`); // Np. 2025-11-01
// console.log(`Ostatni dzień: ${granice.ostatniDzien}`);   // Np. 2025-1