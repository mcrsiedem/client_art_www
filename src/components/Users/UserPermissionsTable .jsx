import React, { useState, useEffect, useMemo } from 'react';
import styles from './UserPermissionsTable.module.css';

// Lista uprawnień - klucze z Twojej tabeli, które chcemy wyświetlić
const PERMISSION_KEYS = [
    'asystent1', 'asystent2', 'klienci_wszyscy', 'zamowienia_wszystkie',
    'technologie_wszystkie', 'technologia_zapis', 'klienci_zapis',
    'papier_zapis', 'procesor_domyslny', 'harmonogram_przyjmij',
    'zamowienie_zapis', 'zamowienie_przyjmij', 'zamowienie_skasuj',
    'zamowienie_oddaj', 'zamowienie_odblokuj', 'klienci_usun',
    'papier_usun', 'procesy_edycja', 'wersja_max', 'mini_druk',
    'mini_falc', 'mini_oprawa', 'mini_uv', 'mini_inne',
    'manage_druk', 'manage_falc', 'manage_oprawa', 'manage_inne',
    'uprawnienia_ustaw', 'realizacje_dodaj', 'realizacje_usun', 'gant',
];

// Mapowanie kluczy uprawnień na bardziej czytelne polskie nazwy
const PERMISSION_LABELS = {
    asystent1: 'Asystent 1', asystent2: 'Asystent 2',
    klienci_wszyscy: 'Klienci (Widok)', zamowienia_wszystkie: 'Zamówienia (Widok)',
    technologie_wszystkie: 'Technologie (Widok)', technologia_zapis: 'Technologia (Zapis)',
    klienci_zapis: 'Klienci (Zapis)', papier_zapis: 'Papier (Zapis)',
    procesor_domyslny: 'Procesor Dom.', harmonogram_przyjmij: 'Harmonogram (Przyjmij)',
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

// Symulowane dane użytkowników
const MOCK_USERS_DATA = [
    { id: 1, Imie: 'Anna', Nazwisko: 'Kowalska', Login: 'anna.k', Dzial: 1, asystent1: 1, asystent2: 0, klienci_wszyscy: 1, zamowienia_wszystkie: 1, technologie_wszystkie: 1, technologia_zapis: 1, klienci_zapis: 1, papier_zapis: 0, procesor_domyslny: 0, harmonogram_przyjmij: 1, zamowienie_zapis: 1, zamowienie_przyjmij: 1, zamowienie_skasuj: 0, zamowienie_oddaj: 0, zamowienie_odblokuj: 0, klienci_usun: 0, papier_usun: 0, procesy_edycja: 0, wersja_max: 1, mini_druk: 1, mini_falc: 1, mini_oprawa: 1, mini_uv: 0, mini_inne: 0, manage_druk: 0, manage_falc: 0, manage_oprawa: 0, manage_inne: 0, uprawnienia_ustaw: 0, realizacje_dodaj: 1, realizacje_usun: 0, gant: 1, },
    { id: 2, Imie: 'Piotr', Nazwisko: 'Nowak', Login: 'piotr.n', Dzial: 2, asystent1: 0, asystent2: 1, klienci_wszyscy: 1, zamowienia_wszystkie: 1, technologie_wszystkie: 0, technologia_zapis: 0, klienci_zapis: 0, papier_zapis: 1, procesor_domyslny: 1, harmonogram_przyjmij: 0, zamowienie_zapis: 0, zamowienie_przyjmij: 0, zamowienie_skasuj: 1, zamowienie_oddaj: 1, zamowienie_odblokuj: 1, klienci_usun: 1, papier_usun: 1, procesy_edycja: 1, wersja_max: 0, mini_druk: 0, mini_falc: 0, mini_oprawa: 0, mini_uv: 1, mini_inne: 1, manage_druk: 1, manage_falc: 1, manage_oprawa: 1, manage_inne: 1, uprawnienia_ustaw: 1, realizacje_dodaj: 1, realizacje_usun: 1, gant: 0, },
    { id: 3, Imie: 'Jan', Nazwisko: 'Zieliński', Login: 'jan.z', Dzial: 1, asystent1: 1, asystent2: 1, klienci_wszyscy: 0, zamowienia_wszystkie: 1, technologie_wszystkie: 1, technologia_zapis: 0, klienci_zapis: 1, papier_zapis: 1, procesor_domyslny: 0, harmonogram_przyjmij: 0, zamowienie_zapis: 1, zamowienie_przyjmij: 0, zamowienie_skasuj: 0, zamowienie_oddaj: 1, zamowienie_odblokuj: 0, klienci_usun: 0, papier_usun: 0, procesy_edycja: 1, wersja_max: 0, mini_druk: 0, mini_falc: 1, mini_oprawa: 0, mini_uv: 1, mini_inne: 0, manage_druk: 1, manage_falc: 0, manage_oprawa: 1, manage_inne: 0, uprawnienia_ustaw: 0, realizacje_dodaj: 0, realizacje_usun: 0, gant: 1, },
];

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
    const [filterState, setFilterState] = useState(''); // '1' - przyznane, '0' - odebrane

    // Symulacja pobierania danych
    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500)); 
                setUsers(MOCK_USERS_DATA);
                setLoading(false);
            } catch (err) {
                setError("Błąd ładowania danych: " + err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // FUNKCJA ZMIANY UPRAWNIEŃ (edycja)
    const handlePermissionChange = (userId, permissionKey, isChecked) => {
        // 1. Aktualizacja stanu lokalnego
        setUsers(prevUsers => 
            prevUsers.map(user => 
                user.id === userId 
                    ? { ...user, [permissionKey]: isChecked ? 1 : 0 }
                    : user
            )
        );

        // 2. Wysłanie aktualizacji do API (symulacja)
        console.log(`[API UPDATE] Użytkownik ID ${userId}: Uprawnienie '${permissionKey}' zmieniono na ${isChecked ? 'Przyznane (1)' : 'Odebrane (0)'}`);
        // W REALNEJ APLIKACJI: 
        // fetch(`/api/users/${userId}/permissions`, { 
        //     method: 'PATCH', 
        //     body: JSON.stringify({ [permissionKey]: isChecked ? 1 : 0 }) 
        // });
    };

    // FUNKCJA SORTOWANIA
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
            direction = 'none'; // Dodaj stan 'none' do wyłączenia sortowania
        }
        setSortConfig({ key, direction });
    };

    // Obliczenia sortowania i filtrowania (użycie useMemo dla optymalizacji)
    const sortedAndFilteredUsers = useMemo(() => {
        let sortableUsers = [...users];

        // 1. FILTROWANIE
        if (filterText) {
            const lowercasedFilter = filterText.toLowerCase();
            sortableUsers = sortableUsers.filter(user => 
                user.Imie.toLowerCase().includes(lowercasedFilter) ||
                user.Nazwisko.toLowerCase().includes(lowercasedFilter) ||
                user.Login.toLowerCase().includes(lowercasedFilter)
            );
        }
        
        if (filterPermission && filterState !== '') {
            const expectedValue = parseInt(filterState);
            sortableUsers = sortableUsers.filter(user => 
                user[filterPermission] === expectedValue
            );
        }

        // 2. SORTOWANIE
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

    // Widoki stanu ładowania/błędu
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
                    placeholder="Filtruj po Imieniu/Nazwisku/Loginie"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    className={styles.filterInput}
                />
                
                <select 
                    value={filterPermission}
                    onChange={(e) => setFilterPermission(e.target.value)}
                    className={styles.filterSelect}
                >
                    <option value="">-- Filtruj wg. Uprawnienia --</option>
                    {PERMISSION_KEYS.map(key => (
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
                    <option value="">Stan uprawnienia</option>
                    <option value="1">Przyznane (✅)</option>
                    <option value="0">Odebrane (❌)</option>
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
                            {/* Nagłówki z sortowaniem */}
                            <th className={styles.stickyCol} onClick={() => requestSort('id')}>
                                ID {getSortIndicator('id')}
                            </th>
                            <th 
                                className={[styles.stickyCol, styles.stickyNameCol].join(' ')} 
                                onClick={() => requestSort('Nazwisko')}
                            >
                                Imię i Nazwisko {getSortIndicator('Nazwisko')}
                            </th>
                            <th 
                                className={[styles.stickyCol, styles.stickyLoginCol].join(' ')}
                                onClick={() => requestSort('Login')}
                            >
                                Login {getSortIndicator('Login')}
                            </th>
                            
                            {/* Renderowanie nagłówków dla uprawnień */}
                            {PERMISSION_KEYS.map((key) => (
                                <th key={key} title={key} onClick={() => requestSort(key)}>
                                    {PERMISSION_LABELS[key] || key.replace('_', ' ')}
                                    {getSortIndicator(key)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedAndFilteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td className={styles.stickyCol}>{user.id}</td>
                                <td className={[styles.stickyCol, styles.stickyNameCol].join(' ')}>
                                    <strong>{user.Imie} {user.Nazwisko}</strong>
                                </td>
                                <td className={[styles.stickyCol, styles.stickyLoginCol].join(' ')}>{user.Login}</td>
                                {/* Renderowanie komórek z uprawnieniami (przełączniki) */}
                                {PERMISSION_KEYS.map((key) => (
                                    <td key={key} className={styles.permissionCell}>
                                        <label className={styles.switch}>
                                            <input
                                                type="checkbox"
                                                checked={user[key] === 1}
                                                onChange={(e) => handlePermissionChange(user.id, key, e.target.checked)}
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