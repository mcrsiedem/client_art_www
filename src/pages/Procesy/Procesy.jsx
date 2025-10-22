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


const CONFIGURATIONS = {
    'view_procesy': {
        dane: procesList,
        naglowki: [
            'ID', 'Nazwa ID', 'Nazwa', 'Typ', 'Rodzaj', 'Wykończenie', 'Obszar', 
            'Domyślny Procesor', 'ID Proc.', 'Prędkość', 'Narząd', 'Mnożnik', 
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
    'procesory': { dane: procesory, naglowki: ['ID', 'Nazwa Procesora', 'Grupa', 'Mnożnik', 'Prędkość', 'Narząd'], klucze: ['id', 'nazwa', 'grupa', 'mnoznik', 'predkosc', 'narzad'], nazwa: "Procesory" },
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