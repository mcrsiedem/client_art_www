import axios from "axios";
import { IP } from "utils/Host";

import { useState,useEffect,useRef } from "react";

export const useArkuszeAuto = () =>{


    

    const autoArk = () => {

      let legi, ilosc_stron

      let rodzaje_glownych_leg_k = [2,4,8,12,16,24,32]


       ilosc_stron = 80
       legi = [16,16,16,16,16]

       ilosc_stron = 46
       legi = [16,2,4,8,16]

       ilosc_stron = 78
       legi = [16,16,16,2,4,8,16]

       ilosc_stron = 30
       legi = [2,4,8,16]

       ilosc_stron = 14
       legi = [2,4,8]

      console.log(legi)

        }




    return {autoArk}

}
//ss

function obliczLegi(ilosc_stron) {
    // Dostępne mniejsze składki do rozbijania reszty (bez 12, bo przykład 14 pokazał 2,4,8)
    const male_skladki = [8, 4, 2]; 
    const glowna_skladka = 16;
    
    let wynik = [];
    
    // 1. Obliczamy ile jest pełnych składek 16-stronicowych
    let pelnych_16 = Math.floor(ilosc_stron / glowna_skladka);
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
    if (pelnych_16 === 0) {
        // Przypadek: ilosc_stron = 14 -> [2, 4, 8]
        wynik = reszta_tablica;
    } else {
        // Algorytm "przedostatniej 16-tki"
        // Wstawiamy wszystkie 16-tki oprócz jednej
        for (let i = 0; i < pelnych_16 - 1; i++) {
            wynik.push(glowna_skladka);
        }
        
        // Wstawiamy rozbitą resztę (jeśli istnieje)
        wynik = wynik.concat(reszta_tablica);
        
        // Wstawiamy ostatnią 16-tkę
        wynik.push(glowna_skladka);
    }

    return wynik;
}
