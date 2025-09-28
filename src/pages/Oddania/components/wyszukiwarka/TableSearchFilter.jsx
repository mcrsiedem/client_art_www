// TableSearchFilter.jsx
import React, { useState, useMemo, useEffect } from 'react';
import styles from './TableSearchFilter.module.css';

const TableSearchFilter = ({ 
    data, 
    setFilteredData, 
    searchFields = ['nr', 'klient', 'tytul'],
    placeholder = 'Wyszukaj po nr, kliencie lub tytule...'
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredResults = useMemo(() => {
        // GWARANCJA POWROTU DO STANU POCZĄTKOWEGO:
        // Jeśli searchTerm jest pusty lub brak danych, zwracamy całe dane.
        if (!data || searchTerm.trim() === '') {
             return data || []; 
        }

        const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

        return data.filter(item => {
            return searchFields.some(field => {
                const value = item[field];
                
                if (value !== null && value !== undefined) {
                    return String(value).toLowerCase().includes(lowerCaseSearchTerm);
                }
                return false;
            });
        });
    }, [data, searchTerm, searchFields]);

    // Używamy useEffect, aby P-O-W-I-A-D-O-M-I-Ć komponent nadrzędny o nowym stanie.
    // Dzieje się to po KAŻDEJ zmianie searchTerm, ponieważ zmienia się filteredResults.
    useEffect(() => {
        if (setFilteredData) {
            setFilteredData(filteredResults);
        }
    }, [filteredResults, setFilteredData]); 

    const handleSearchChange = (event) => {
        // Upewniamy się, że stan aktualizuje się natychmiast
        setSearchTerm(event.target.value);
    };

    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm} // KLUCZOWE: Łączy input ze stanem
                onChange={handleSearchChange} // KLUCZOWE: Aktualizuje stan przy każdym naciśnięciu klawisza
                className={styles.searchInput}
                aria-label="Wyszukiwarka tabeli"
            />
        </div>
    );
};

export default TableSearchFilter;