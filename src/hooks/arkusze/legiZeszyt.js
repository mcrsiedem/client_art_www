
export function legiZeszyt(ilosc_stron,glowna_skladka) {

let male_skladki;

switch (glowna_skladka) {
  case 12:
    male_skladki = [4];
    break;

  case 16:
    male_skladki = [8, 4];
    break;

  case 24:
    male_skladki = [12, 4];
    break;
    
  case 32:
    male_skladki = [16, 8, 4];
    break;

  default:
    console.log("Niedozwolona główna składka");
    return [];
}

let wynik = [];

// 1. Obliczamy ile jest pełnych składek i resztę
let pelnych_skladek = Math.floor(ilosc_stron / glowna_skladka);
let reszta = ilosc_stron % glowna_skladka;

// 2. Rozbijamy resztę na mniejsze części
let reszta_tablica = [];
if (reszta > 0) {
    for (let rozmiar of male_skladki) {
        if (reszta >= rozmiar) {
            reszta_tablica.push(rozmiar);
            reszta -= rozmiar;
        }
    }
    // Sortujemy małe składki rosnąco (np. 4, 8)
    reszta_tablica.sort((a, b) => a - b);
}

// 3. SKŁADANIE WYNIKU: Najpierw małe, potem wszystkie pełne
// Najpierw dodajemy wszystkie małe składki z reszty
wynik = [...reszta_tablica]; 

// Potem dodajemy tyle pełnych składek, ile nam wyszło z obliczeń
for (let i = 0; i < pelnych_skladek; i++) {
    wynik.push(glowna_skladka);
}

return wynik
}