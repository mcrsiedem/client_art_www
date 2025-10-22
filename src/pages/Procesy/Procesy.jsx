import React, { useState, useEffect, useContext } from 'react';
import styles from './Procesy.module.css';
import { AppContext } from 'context/AppContext';

// --- MOCKOWE DANE I PEŁNA KONFIGURACJA DLA view_procesy ---



// ------------------------------------


function Procesy() { 
          const appcontext = useContext(AppContext);
      const procesory = appcontext.procesory;
      const procesListName = appcontext.procesListName;
      const procesList = appcontext.procesList;
    const mockViewProcesy = [
    { 
        id: 1, nazwa_id: 10, nazwa: "Druk A3", typ: "Druk", rodzaj: "Cyfrowy", wykonczenie: "Brak", 
        obszar: "Graficzny", procesor_domyslny_nazwa: "Maszyna Drukowa K", procesor_domyslny: 101,
        predkosc: 1000, narzad: 30, mnoznik: 1.5, arkusz: 1, lega: 0, produkt: 0, komplet: 0, 
        ilosc_uzytkow: 1, info: "Kolor CMYK, druk jednostronny" 
    },
    { 
        id: 2, nazwa_id: 20, nazwa: "Lakierowanie UV", typ: "Wykonczenie", rodzaj: "UV", wykonczenie: "Połysk", 
        obszar: "Postpress", procesor_domyslny_nazwa: "Lakierka B", procesor_domyslny: 102,
        predkosc: 500, narzad: 15, mnoznik: 1.0, arkusz: 0, lega: 1, produkt: 0, komplet: 0, 
        ilosc_uzytkow: 2, info: "Lakier na okładkę" 
    },
];

const mockProcesory = [
    { id: 101, nazwa: "Maszyna Drukowa K", grupa: 1, mnoznik: 1.5, predkosc: 1500, narzad: 30 },
    { id: 102, nazwa: "Lakierka B", grupa: 2, mnoznik: 1.0, predkosc: 700, narzad: 15 },
];

const mockProcesyNazwa = [
    { id: 1, nazwa: "Druk offsetowy", utworzono: "2025-01-01", zmodyfikowano: "2025-10-12" },
    { id: 2, nazwa: "Szycie", utworzono: "2025-01-05", zmodyfikowano: "2025-10-12" },
];

const CONFIGURATIONS = {
    'view_procesy': {
        dane: procesList,
        naglowki: [
            'ID', 'Nazwa ID', 'Nazwa', 'Typ', 'Rodzaj', 'Wykończenie', 'Obszar', 
            'Domyślny Procesor', 'ID Proc.', 'Prędkość', 'Narzęd', 'Mnożnik', 
            'Arkusz', 'Lega', 'Produkt', 'Komplet', 'Użytki', 'Info'
        ],
        klucze: [
            'id', 'nazwa_id', 'nazwa', 'typ', 'rodzaj', 'wykonczenie', 'obszar', 
            'procesor_domyslny_nazwa', 'procesor_domyslny', 'predkosc', 
            'narzad', 'mnoznik', 'arkusz', 'lega', 'produkt', 'komplet', 
            'ilosc_uzytkow', 'info'
        ],
        nazwa: "Procesy"
    },
    'procesory': { dane: procesory, naglowki: ['ID', 'Nazwa Procesora', 'Grupa', 'Mnożnik', 'Prędkość', 'Narzęd'], klucze: ['id', 'nazwa', 'grupa', 'mnoznik', 'predkosc', 'narzad'], nazwa: "Procesory" },
    'procesy_nazwa': { dane: procesListName, naglowki: ['ID', 'Nazwa', 'Utworzono', 'Zmodyfikowano'], klucze: ['id', 'nazwa', 'utworzono', 'zmodyfikowano'], nazwa: "Grupy Procesów" }
};
    const [aktualnaTabela, setAktualnaTabela] = useState('view_procesy');
    const [dane, setDane] = useState([]);
    
    const config = CONFIGURATIONS[aktualnaTabela];
    const naglowki = config.naglowki;
    const klucze = config.klucze;
    const nazwaTabeli = config.nazwa;

    useEffect(() => {
        // PAMIĘTAJ: To jest miejsce na Twoje wywołanie API/fetch do backendu!
        setDane(config.dane); 
    }, [aktualnaTabela]); 

    const zmienTabele = (kluczTabeli) => {
        setAktualnaTabela(kluczTabeli);
    };





    return (
        <div className={styles.tabelaDanychKontener}> 
            
            <div className={styles.przelaczniki}> 
                {Object.keys(CONFIGURATIONS).map((klucz) => (
                    <button
                        key={klucz}
                        className={`${styles.przelaczniki} ${aktualnaTabela === klucz ? styles.aktywny : ''}`}
                        onClick={() => zmienTabele(klucz)}
                    >
                        {CONFIGURATIONS[klucz].nazwa}
                    </button>
                ))}
            </div>

            <hr/>

            {/* <h2>Aktualnie Wyświetlana Tabela: {nazwaTabeli}</h2> */}
            <h2> {nazwaTabeli}</h2>

            <div className={styles.tabelaKontener}> 
                {dane?.length === 0 ? (
                    <p>Brak danych do wyświetlenia.</p>
                ) : (
                    <table className={styles.glownaTabela}>
                        <thead>
                            <tr>
                                {naglowki.map((naglowek, index) => (
                                    <th key={index}>{naglowek}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dane?.map((wiersz, rowIndex) => (
                                // Używamy rowIndex jako klucza, jeśli wiersz.id jest potencjalnie puste
                                <tr key={wiersz.id || rowIndex}> 
                                    {klucze.map((kluczKolumny, colIndex) => (
                                        <td key={colIndex}>{wiersz[kluczKolumny]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Procesy;