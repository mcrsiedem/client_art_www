import React, { useState, useEffect, useMemo } from 'react';
import styles from './UserPermissionsTable.module.css';
  import axios from "axios";
import { IP } from "utils/Host";
// === ZDEFINIOWANE KLUCZE KOLUMN ===
// 1. Klucze podstawowych informacji o użytkowniku (STICKY, INPUT NUMBER)
const USER_INFO_KEYS = ['asystent1', 'asystent2', 'procesor_domyslny'];

// 2. Klucze dla przewijanych uprawnień (SWITCH/BOOLEAN)
const PERMISSION_KEYS = [
    'klienci_wszyscy', 'zamowienia_wszystkie',
    'technologie_wszystkie', 'technologia_zapis', 'klienci_zapis',
    'papier_zapis', 'harmonogram_przyjmij',
    'zamowienie_zapis', 'zamowienie_przyjmij', 'zamowienie_skasuj',
    'zamowienie_oddaj', 'zamowienie_odblokuj', 'klienci_usun',
    'papier_usun', 'procesy_edycja', 'wersja_max', 'mini_druk',
    'mini_falc', 'mini_oprawa', 'mini_uv', 'mini_inne',
    'manage_druk', 'manage_falc', 'manage_oprawa', 'manage_inne',
    'uprawnienia_ustaw', 'realizacje_dodaj', 'realizacje_usun', 'gant',
];

// Mapowanie kluczy na bardziej czytelne polskie nazwy
const PERMISSION_LABELS = {
    asystent1: 'Asystent 1', asystent2: 'Asystent 2',
    procesor_domyslny: 'Procesor Dom.',
    klienci_wszyscy: 'Klienci (Widok)', zamowienia_wszystkie: 'Zamówienia (Widok)',
    technologie_wszystkie: 'Technologie (Widok)', technologia_zapis: 'Technologia (Zapis)',
    klienci_zapis: 'Klienci (Zapis)', papier_zapis: 'Papier (Zapis)',
    harmonogram_przyjmij: 'Harmonogram (Przyjmij)',
    zamowienie_zapis: 'Zamówienie (Zapis)', zamowienie_przyjmij: 'Zamówienie (Przyjmij)',
    zamowienie_skasuj: 'Zamówienie (Skasuj)', zamowienie_oddaj: 'Zamówienie (Oddaj)',
    zamowienie_odblokuj: 'Zamówienie (Odblokuj)', klienci_usun: 'Klienci (Usuń)',
    papier_usun: 'Papier (Usuń)', procesy_edycja: 'Procesy (Edycja)',
    wersja_max: 'Wersja Max', mini_druk: 'Mini Druk',
    mini_falc: 'Mini Falc', mini_oprawa: 'Mini Oprawa',
    mini_uv: 'Mini UV', mini_inne: 'Mini Inne',
    manage_druk: 'Manage Druk', manage_falc: 'Manage Falc',
    manage_oprawa: 'Manage Oprawa', manage_inne: 'Manage Inne',
    uprawnienia_ustaw: 'Uprawnienia (Ustaw)', realizacje_dodaj: 'Realizacje (Dodaj)',
    realizacje_usun: 'Realizacje (Usuń)', gant: 'Gantt',
};

// Symulowane dane użytkowników (z wartościami INT dla Asystent/Procesor)



/**
 * Komponent funkcyjny do wyświetlania tabeli z uprawnieniami użytkowników.
 */
const UserPermissionsTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // === Stany dla Sortowania ===
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    
    // === Stany dla Filtrowania ===
    const [filterText, setFilterText] = useState('');
    const [filterPermission, setFilterPermission] = useState('');
    const [filterState, setFilterState] = useState('');

    // Symulacja pobierania danych
    useEffect(() => {
        const fetchData = async () => {
            try {
                // await new Promise(resolve => setTimeout(resolve, 500)); 
                const res = await axios.get(IP + "all_users/" + sessionStorage.getItem("token"))
                setUsers([...res.data]);
                setLoading(false);
            } catch (err) {
                setError("Błąd ładowania danych: " + err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // FUNKCJA ZMIANY UPRAWNIEŃ (dla switchy 0/1)
    const handleBooleanPermissionChange = (userId, permissionKey, isChecked) => {
        setUsers(prevUsers => 
            prevUsers.map(user => 
                user.id === userId 
                    ? { ...user, [permissionKey]: isChecked ? 1 : 0 }
                    : user
            )
        );
        console.log(`[API UPDATE] Użytkownik ID ${userId}: Uprawnienie '${permissionKey}' zmieniono na ${isChecked ? 'Przyznane (1)' : 'Odebrane (0)'}`);
    };

    // FUNKCJA ZMIANY WARTOŚCI (dla pól number)
    const handleValueChange = (userId, key, value) => {
        const intValue = parseInt(value, 10);
        const finalValue = isNaN(intValue) ? 0 : intValue; 
        
        setUsers(prevUsers => 
            prevUsers.map(user => 
                user.id === userId 
                    ? { ...user, [key]: finalValue }
                    : user
            )
        );
        console.log(`[API UPDATE] Użytkownik ID ${userId}: Kolumna '${key}' zmieniona na wartość ${finalValue}`);
    };
    
    // FUNKCJA SORTOWANIA
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
            direction = 'none';
        }
        setSortConfig({ key, direction });
    };

    // Obliczenia sortowania i filtrowania (użycie useMemo dla optymalizacji)
    const sortedAndFilteredUsers = useMemo(() => {
        let sortableUsers = [...users];

        // 1. FILTROWANIE TEKSTOWE (POPRAWIONE: Zabezpieczenie przed null/undefined)
        if (filterText) {
            const lowercasedFilter = filterText.toLowerCase();
            sortableUsers = sortableUsers.filter(user => 
                // Zabezpieczenie (user.Pole || '') przed błędem 'toLowerCase' na null
                (user.Imie || '').toLowerCase().includes(lowercasedFilter) ||
                (user.Nazwisko || '').toLowerCase().includes(lowercasedFilter) ||
                (user.Login || '').toLowerCase().includes(lowercasedFilter) ||
                // Wyszukiwanie również w polach INT
                USER_INFO_KEYS.some(key => 
                    String(user[key]).includes(lowercasedFilter)
                )
            );
        }
        
        // 2. FILTROWANIE WG. UPRAWNIEŃ (Stan 0/1 lub 0/>0)
        if (filterPermission && filterState !== '') {
            
            // Sprawdzamy, CZY DANE UPRAWNIENIE JEST W GRUPIE PÓL LICZBOWYCH.
            const isInfoKey = USER_INFO_KEYS.includes(filterPermission);
            
            const filterValue = parseInt(filterState);
            
            if (!isInfoKey) { // Uprawnienie logiczne (Boolean, switch 0/1)
                sortableUsers = sortableUsers.filter(user => 
                    user[filterPermission] === filterValue
                );
            } else { // Kolumna liczbowa (INT, input number)
                // Dla kolumn INT (asystent1, asystent2, procesor_domyslny): 0 dla brak, >0 dla aktywny
                if (filterValue === 1) { // Filtruj na Przyznane / >0
                     sortableUsers = sortableUsers.filter(user => user[filterPermission] > 0);
                } else if (filterValue === 0) { // Filtruj na Odebrane / =0
                    sortableUsers = sortableUsers.filter(user => user[filterPermission] === 0);
                }
            }
        }

        // 3. SORTOWANIE
        if (sortConfig.direction !== 'none') {
            sortableUsers.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                
                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        
        return sortableUsers;
    }, [users, sortConfig, filterText, filterPermission, filterState]);

    // Renderowanie strzałki sortowania
    const getSortIndicator = (key) => {
        if (sortConfig.key !== key || sortConfig.direction === 'none') {
            return null;
        }
        return sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽';
    };

    if (loading) {
        return <div className={styles.loadingMessage}>Ładowanie uprawnień... ⏳</div>;
    }
    if (error) {
        return <div className={styles.errorMessage}>{error} ❌</div>;
    }

    return (
        <div className={styles.permissionsContainer}>
            <h2>Tabela Uprawnień Użytkowników 🛡️</h2>

            {/* === Panel Filtrowania === */}
            <div className={styles.filterPanel}>
                <input 
                    type="text" 
                    placeholder="Filtruj po Imieniu/Loginie/Wartościach"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    className={styles.filterInput}
                />
                
                <select 
                    value={filterPermission}
                    onChange={(e) => setFilterPermission(e.target.value)}
                    className={styles.filterSelect}
                >
                    <option value="">-- Filtruj wg. Kolumny --</option>
                    {[...USER_INFO_KEYS, ...PERMISSION_KEYS].map(key => (
                        <option key={key} value={key}>
                            {PERMISSION_LABELS[key]}
                        </option>
                    ))}
                </select>

                <select 
                    value={filterState}
                    onChange={(e) => setFilterState(e.target.value)}
                    disabled={!filterPermission}
                    className={styles.filterSelect}
                >
                    <option value="">Status</option>
                    <option value="1">Przyznane / &gt;0</option> 
                    <option value="0">Odebrane / =0</option>
                </select>

                <button 
                    onClick={() => { setFilterText(''); setFilterPermission(''); setFilterState(''); setSortConfig({ key: 'id', direction: 'ascending' }); }}
                    className={styles.resetButton}
                >
                    Resetuj filtry
                </button>
            </div>
            
            {sortedAndFilteredUsers.length === 0 && (
                <div className={styles.noDataMessage}>Brak użytkowników spełniających kryteria filtrowania.</div>
            )}

            {/* === Tabela Uprawnień === */}
            <div className={styles.tableResponsive}>
                <table className={styles.permissionsTable}>
                    <thead>
                        <tr>
                            {/* KOLUMNY PODSTAWOWYCH DANYCH (STICKY) */}
                            <th className={styles.stickyHeader} onClick={() => requestSort('id')}>
                                ID {getSortIndicator('id')}
                            </th>
                            <th 
                                className={[styles.stickyHeader, styles.stickyNameCol].join(' ')} 
                                onClick={() => requestSort('Nazwisko')}
                            >
                                Imię i Nazwisko {getSortIndicator('Nazwisko')}
                            </th>
                            <th 
                                className={[styles.stickyHeader, styles.stickyLoginCol].join(' ')}
                                onClick={() => requestSort('Login')}
                            >
                                Login {getSortIndicator('Login')}
                            </th>
                            
                            {/* KOLUMNY EDYTOWALNE LICZBOWO (STICKY) */}
                            {USER_INFO_KEYS.map((key, index) => (
                                <th 
                                    key={key} 
                                    title={key} 
                                    onClick={() => requestSort(key)}
                                    className={[styles.stickyHeader, styles.stickyInfoCol, styles[`stickyCol${index + 4}`]].join(' ')}
                                >
                                    {PERMISSION_LABELS[key]}
                                    {getSortIndicator(key)}
                                </th>
                            ))}
                            
                            {/* KOLUMNY PRZEWIJANYCH UPRAWNIEŃ (BOOLEAN) */}
                            {PERMISSION_KEYS.map((key) => (
                                <th 
                                    key={key} 
                                    title={key} 
                                    onClick={() => requestSort(key)}
                                    className={styles.stickyHeader}
                                >
                                    {PERMISSION_LABELS[key] || key.replace('_', ' ')}
                                    {getSortIndicator(key)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedAndFilteredUsers.map((user) => (
                            <tr key={user.id}>
                                {/* KOMÓRKI PODSTAWOWYCH DANYCH (STICKY) */}
                                <td className={styles.stickyCol}>{user.id}</td>
                                <td className={[styles.stickyCol, styles.stickyNameCol].join(' ')}>
                                    <strong>{user.Imie} {user.Nazwisko}</strong>
                                </td>
                                <td className={[styles.stickyCol, styles.stickyLoginCol].join(' ')}>{user.Login}</td>

                                {/* NOWE KOMÓRKI EDYTOWALNE LICZBOWO (STICKY) */}
                                {USER_INFO_KEYS.map((key, index) => (
                                    <td 
                                        key={key} 
                                        className={[styles.stickyCol, styles.stickyInfoCol, styles[`stickyCol${index + 4}`]].join(' ')}
                                    >
                                        <input
                                            type="number"
                                            value={user[key] || 0}
                                            onChange={(e) => handleValueChange(user.id, key, e.target.value)}
                                            className={styles.numberInput}
                                            min="0"
                                        />
                                    </td>
                                ))}
                                
                                {/* KOMÓRKI PRZEWIJANYCH UPRAWNIEŃ (SWITCH) */}
                                {PERMISSION_KEYS.map((key) => (
                                    <td key={key} className={styles.permissionCell}>
                                        <label className={styles.switch}>
                                            <input
                                                type="checkbox"
                                                checked={user[key] === 1}
                                                onChange={(e) => handleBooleanPermissionChange(user.id, key, e.target.checked)}
                                            />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserPermissionsTable;