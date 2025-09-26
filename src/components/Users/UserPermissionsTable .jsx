import React, { useState, useEffect } from 'react';
import styles from './UserPermissionsTable.module.css'; // Importowanie stylów z modułu CSS

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

// Symulowane dane użytkowników (zgodne ze strukturą tabeli)
const MOCK_USERS_DATA = [
    { id: 1, Imie: 'Anna', Nazwisko: 'Kowalska', Login: 'anna.k', Dzial: 1, asystent1: 1, asystent2: 0, klienci_wszyscy: 1, zamowienia_wszystkie: 1, technologie_wszystkie: 1, technologia_zapis: 1, klienci_zapis: 1, papier_zapis: 0, procesor_domyslny: 0, harmonogram_przyjmij: 1, zamowienie_zapis: 1, zamowienie_przyjmij: 1, zamowienie_skasuj: 0, zamowienie_oddaj: 0, zamowienie_odblokuj: 0, klienci_usun: 0, papier_usun: 0, procesy_edycja: 0, wersja_max: 1, mini_druk: 1, mini_falc: 1, mini_oprawa: 1, mini_uv: 0, mini_inne: 0, manage_druk: 0, manage_falc: 0, manage_oprawa: 0, manage_inne: 0, uprawnienia_ustaw: 0, realizacje_dodaj: 1, realizacje_usun: 0, gant: 1, },
    { id: 2, Imie: 'Piotr', Nazwisko: 'Nowak', Login: 'piotr.n', Dzial: 2, asystent1: 0, asystent2: 1, klienci_wszyscy: 1, zamowienia_wszystkie: 1, technologie_wszystkie: 0, technologia_zapis: 0, klienci_zapis: 0, papier_zapis: 1, procesor_domyslny: 1, harmonogram_przyjmij: 0, zamowienie_zapis: 0, zamowienie_przyjmij: 0, zamowienie_skasuj: 1, zamowienie_oddaj: 1, zamowienie_odblokuj: 1, klienci_usun: 1, papier_usun: 1, procesy_edycja: 1, wersja_max: 0, mini_druk: 0, mini_falc: 0, mini_oprawa: 0, mini_uv: 1, mini_inne: 1, manage_druk: 1, manage_falc: 1, manage_oprawa: 1, manage_inne: 1, uprawnienia_ustaw: 1, realizacje_dodaj: 1, realizacje_usun: 1, gant: 0, },
];

/**
 * Komponent funkcyjny do wyświetlania tabeli z uprawnieniami użytkowników.
 */
const UserPermissionsTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Symulacja pobierania danych
    useEffect(() => {
        // W realnej aplikacji: fetch('api/users/permissions')...
        const fetchData = async () => {
            try {
                // Symulacja opóźnienia sieci
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

    // Widoki stanu ładowania/błędu
    if (loading) {
        return <div className={styles.loadingMessage}>Ładowanie uprawnień... ⏳</div>;
    }
    if (error) {
        return <div className={styles.errorMessage}>{error} ❌</div>;
    }
    if (users.length === 0) {
        return <div className={styles.noDataMessage}>Brak danych użytkowników do wyświetlenia.</div>;
    }

    // Funkcja pomocnicza do renderowania ikony (✅ dla 1, ❌ dla 0)
    const renderPermissionIcon = (value) => {
        return value === 1 ? (
            <span className={styles.permissionGranted} title="Przyznane">✅</span>
        ) : (
            <span className={styles.permissionDenied} title="Odmówione">❌</span>
        );
    };

    return (
        <div className={styles.permissionsContainer}>
            <h2>Tabela Uprawnień Użytkowników 🛡️</h2>
            <div className={styles.tableResponsive}>
                <table className={styles.permissionsTable}>
                    <thead>
                        <tr>
                            <th className={styles.stickyCol}>ID</th>
                            <th className={[styles.stickyCol, styles.stickyNameCol].join(' ')}>Imię i Nazwisko</th>
                            <th className={[styles.stickyCol, styles.stickyLoginCol].join(' ')}>Login</th>
                            {/* Renderowanie nagłówków dla uprawnień */}
                            {PERMISSION_KEYS.map((key) => (
                                <th key={key} title={key}>
                                    {/* Etykieta lub klucz, jeśli etykiety brakuje */}
                                    {PERMISSION_LABELS[key] || key.replace('_', ' ')}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className={styles.stickyCol}>{user.id}</td>
                                <td className={[styles.stickyCol, styles.stickyNameCol].join(' ')}>
                                    <strong>{user.Imie} {user.Nazwisko}</strong>
                                </td>
                                <td className={[styles.stickyCol, styles.stickyLoginCol].join(' ')}>{user.Login}</td>
                                {/* Renderowanie komórek z uprawnieniami */}
                                {PERMISSION_KEYS.map((key) => (
                                    <td key={key} className={styles.permissionCell}>
                                        {renderPermissionIcon(user[key])}
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