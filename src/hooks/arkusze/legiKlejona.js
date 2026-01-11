
export function legiKlejona(ilosc_stron,glowna_skladka) {

  // oddaje tablice z legami
  
   let male_skladki;

switch (glowna_skladka) {

    case 2:
    male_skladki = [];
    break;

    case 4:
    male_skladki = [2];
    break;

    case 8:
    male_skladki = [4];
    break;

  case 12:
    male_skladki = [4, 2];
    break;

  case 16:
    male_skladki = [8, 4, 2];
    break;

  case 24:
    male_skladki = [12, 4, 2];
    break;
    
  case 32:
    male_skladki = [16, 8, 4, 2];
    break;

  default:
    console.log("Niedozwolona główna sładka");
    return [];
}



    let wynik = [];
    
    // 1. Obliczamy ile jest pełnych składek 16-stronicowych
    let pelnych_skladek = Math.floor(ilosc_stron / glowna_skladka);
    let reszta = ilosc_stron % glowna_skladka;
    
    // 2. Rozbijamy resztę na mniejsze części (2, 4, 8)
    let reszta_tablica = [];
    if (reszta > 0) {
        // Próbujemy dopasować największe możliwe mniejsze składki
        for (let rozmiar of male_skladki) {
            if (reszta >= rozmiar) {
                reszta_tablica.push(rozmiar);
                reszta -= rozmiar;
            }
        }
        // Twoje przykłady pokazują sortowanie reszty rosnąco (np. 2, 4, 8)
        reszta_tablica.sort((a, b) => a - b);
    }

    // 3. Składamy wynik w zależności od ilości pełnych składek
    if (pelnych_skladek === 0) {
        // Przypadek: ilosc_stron = 14 -> [2, 4, 8]
        wynik = reszta_tablica;
    } else {
        // Algorytm "przedostatniej 16-tki"
        // Wstawiamy wszystkie 16-tki oprócz jednej
        for (let i = 0; i < pelnych_skladek - 1; i++) {
            wynik.push(glowna_skladka);
        }
        
        // Wstawiamy rozbitą resztę (jeśli istnieje)
        wynik = wynik.concat(reszta_tablica);
        
        // Wstawiamy ostatnią 16-tkę
        wynik.push(glowna_skladka);
    }

    return wynik;
}


