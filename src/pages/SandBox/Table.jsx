// Importuj niezbędne hooki z Reacta
import React, { useState, useRef, useEffect, useCallback } from 'react';

// Główny komponent tabelki ze zmienną szerokością kolumn
const ResizableTable = ({ data, columns }) => {
    // Stan przechowujący szerokości kolumn. Kluczem jest 'accessor' kolumny, wartością jest szerokość w pikselach.
    const [columnWidths, setColumnWidths] = useState({});

    // Refy do przechowywania stanu przeciągania myszy i danych początkowych
    // useRef jest używany, ponieważ nie chcemy, aby te wartości wywoływały ponowne renderowanie komponentu
    const resizingColumn = useRef(null); // Przechowuje 'accessor' kolumny, która jest aktualnie zmieniana
    const startX = useRef(0); // Początkowa pozycja X kursora myszy podczas rozpoczęcia przeciągania
    const startWidth = useRef(0); // Początkowa szerokość kolumny, która jest zmieniana

    // Użyj efektu do inicjalizacji szerokości kolumn przy pierwszym renderowaniu komponentu.
    // Domyślna szerokość to 150px, chyba że kolumna ma zdefiniowane 'initialWidth'.
    useEffect(() => {
        const initialWidths = {};
        columns.forEach(col => {
            initialWidths[col.accessor] = col.initialWidth || 150;
        });
        setColumnWidths(initialWidths);
    }, [columns]); // Ten efekt uruchamia się tylko, gdy zmienią się definicje kolumn

    // Callback do obsługi zdarzenia naciśnięcia przycisku myszy na 'resizerze' (uchwycie do zmiany rozmiaru).
    // useCallback jest używany do memoizacji funkcji, co jest dobre dla wydajności.
    const handleMouseDown = useCallback((e, accessor) => {
        resizingColumn.current = accessor; // Ustawiamy, która kolumna jest zmieniana
        startX.current = e.clientX; // Zapisujemy początkową pozycję X myszy
        startWidth.current = columnWidths[accessor]; // Zapisujemy początkową szerokość kolumny

        // Dodajemy klasy do elementu <body>, aby zablokować zaznaczanie tekstu
        // i zmienić kursor na 'col-resize' podczas przeciągania.
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
    }, [columnWidths]); // Zależność od columnWidths, aby zawsze mieć aktualne szerokości

    // Callback do obsługi zdarzenia ruchu myszy.
    // Ta funkcja jest wywoływana globalnie (na dokumencie), aby śledzić ruch myszy nawet poza resizerem.
    const handleMouseMove = useCallback((e) => {
        if (resizingColumn.current) { // Sprawdzamy, czy jakaś kolumna jest aktualnie zmieniana
            const accessor = resizingColumn.current;
            // Obliczamy nową szerokość kolumny
            const newWidth = startWidth.current + (e.clientX - startX.current);
            // Aktualizujemy stan szerokości kolumn. Minimalna szerokość to 50px.
            setColumnWidths(prevWidths => ({
                ...prevWidths,
                [accessor]: Math.max(50, newWidth)
            }));
        }
    }, []); // Brak zależności, ponieważ używa refów do startX i startWidth

    // Callback do obsługi zdarzenia zwolnienia przycisku myszy.
    // Ta funkcja jest również wywoływana globalnie (na dokumencie).
    const handleMouseUp = useCallback(() => {
        resizingColumn.current = null; // Resetujemy zmienną, wskazując, że żadna kolumna nie jest zmieniana
        // Przywracamy domyślne style dla elementu <body>
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
    }, []);

    // Efekt do dodawania i usuwania globalnych słuchaczy zdarzeń 'mousemove' i 'mouseup'.
    // Słuchacze są dodawani przy montowaniu komponentu i usuwane przy odmontowywaniu,
    // aby zapobiec wyciekom pamięci.
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        // Funkcja czyszcząca, która uruchamia się, gdy komponent zostanie odmontowany
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]); // Zależności od memoizowanych funkcji callback

    return (
        <div className="table-container">
            <table className="resizable-table">
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th
                                key={col.accessor}
                                // Ustawiamy szerokość kolumny dynamicznie ze stanu
                                style={{ width: columnWidths[col.accessor] }}
                            >
                                {col.Header}
                                {/* Element 'resizer', który użytkownik przeciąga */}
                                <div
                                    className="resizer"
                                    onMouseDown={(e) => handleMouseDown(e, col.accessor)}
                                />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map(col => (
                                <td
                                    key={`${rowIndex}-${col.accessor}`}
                                    // Ustawiamy szerokość komórki na podstawie szerokości kolumny
                                    style={{ width: columnWidths[col.accessor] }}
                                >
                                    {row[col.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Komponent App do demonstracji użycia ResizableTable
const SandboxTable = () => {
    // Przykładowe dane do tabeli
    const data = [
        { id: 1, name: 'Jan Kowalski', age: 30, city: 'Warszawa', occupation: 'Programista' },
        { id: 2, name: 'Anna Nowak', age: 24, city: 'Kraków', occupation: 'Projektantka UX' },
        { id: 3, name: 'Piotr Wiśniewski', age: 35, city: 'Gdańsk', occupation: 'Menedżer Projektu' },
        { id: 4, name: 'Maria Dąbrowska', age: 29, city: 'Wrocław', occupation: 'Analityk Danych' },
        { id: 5, name: 'Krzysztof Zieliński', age: 42, city: 'Poznań', occupation: 'Inżynier Sieci' },
        { id: 6, name: 'Zofia Wójcik', age: 27, city: 'Łódź', occupation: 'Specjalista Marketingu' },
    ];

    // Definicja kolumn. Header to nagłówek wyświetlany, accessor to klucz do danych w obiekcie,
    // initialWidth to opcjonalna początkowa szerokość.
    const columns = [
        { Header: 'ID', accessor: 'id', initialWidth: 60 },
        { Header: 'Imię i Nazwisko', accessor: 'name', initialWidth: 200 },
        { Header: 'Wiek', accessor: 'age', initialWidth: 80 },
        { Header: 'Miasto', accessor: 'city', initialWidth: 150 },
        { Header: 'Zawód', accessor: 'occupation', initialWidth: 180 },
    ];

    return (
        <div className="app-container">
            <style>
                {`
                /* Globalne style dla body */
                body {
                    font-family: 'Inter', sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f3f4f6; /* Odpowiednik bg-gray-100 */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }

                /* Styl dla głównego kontenera aplikacji */
                .app-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 16px; /* Odpowiednik p-4 */
                    min-height: 100vh;
                    width: 100%; /* Upewnij się, że zajmuje całą dostępną szerokość */
                    box-sizing: border-box; /* Uwzględnij padding w szerokości */
                }

                /* Styl dla nagłówka */
                h1 {
                    font-size: 2rem; /* Odpowiednik text-3xl */
                    font-weight: 700; /* Odpowiednik font-bold */
                    color: #1f2937; /* Odpowiednik text-gray-800 */
                    margin-bottom: 24px; /* Odpowiednik mb-6 */
                    text-align: center;
                }

                /* Styl dla kontenera tabeli */
                .table-container {
                    overflow-x: auto; /* Pozwala na przewijanie tabeli, jeśli kolumny są zbyt szerokie */
                    padding: 16px; /* Odpowiednik p-4 */
                    border-radius: 8px; /* Odpowiednik rounded-lg */
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* Odpowiednik shadow-md */
                    background-color: #ffffff; /* Odpowiednik bg-white */
                    width: 100%;
                    max-width: 900px; /* Ogranicz maksymalną szerokość tabeli */
                }

                /* Styl dla tabeli */
                .resizable-table {
                    width: 100%;
                    border-collapse: collapse;
                    min-width: max-content; /* Aby tabela nie kurczyła się bardziej niż suma minimalnych szerokości kolumn */
                    border-radius: 8px; /* Odpowiednik rounded-lg */
                    overflow: hidden; /* Odpowiednik overflow-hidden */
                }

                /* Styl dla nagłówków tabeli */
                .resizable-table th {
                    position: relative; /* Ważne dla resizera */
                    padding: 12px 16px; /* Odpowiednik px-4 py-3 */
                    text-align: left;
                    font-size: 0.875rem; /* Odpowiednik text-sm */
                    font-weight: 600; /* Odpowiednik font-semibold */
                    color: #374151; /* Odpowiednik text-gray-700 */
                    border-bottom: 1px solid #e5e7eb; /* Odpowiednik border-b border-gray-200 */
                    background-color: #f9fafb; /* Odpowiednik bg-gray-100 */
                }

                /* Styl dla komórek tabeli */
                .resizable-table td {
                    padding: 12px 16px; /* Odpowiednik px-4 py-3 */
                    font-size: 0.875rem; /* Odpowiednik text-sm */
                    color: #374151; /* Odpowiednik text-gray-800 */
                    border-bottom: 1px solid #e5e7eb; /* Odpowiednik border-b border-gray-200 */
                }

                /* Styl dla wierszy parzystych */
                .resizable-table tbody tr:nth-child(even) {
                    background-color: #f9fafb; /* Odpowiednik even:bg-gray-50 */
                }

                /* Styl dla wierszy po najechaniu myszą */
                .resizable-table tbody tr:hover {
                    background-color: #f3f4f6; /* Odpowiednik hover:bg-gray-100 */
                }

                /* Styl dla resizera (uchwytu do zmiany rozmiaru) */
                .resizer {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    width: 8px; /* Odpowiednik w-2 */
                    background: transparent;
                    cursor: col-resize;
                    z-index: 1; /* Upewnij się, że resizer jest nad innymi elementami */
                    transition: background-color 150ms ease-in-out; /* Odpowiednik transition-colors duration-150 */
                }

                /* Styl resizera po najechaniu myszą */
                .resizer:hover {
                    background-color: #bfdbfe; /* Odpowiednik hover:bg-blue-200 */
                }

                /* Styl dla tekstu informacyjnego */
                .info-text {
                    margin-top: 32px; /* Odpowiednik mt-8 */
                    color: #4b5563; /* Odpowiednik text-gray-600 */
                    text-align: center;
                }
                `}
            </style>
            <h1 className="title">Tabelka ze Zmienną Szerokością Kolumn</h1>
            <ResizableTable data={data} columns={columns} />
            <p className="info-text">
                Przeciągnij krawędzie nagłówków kolumn, aby zmienić ich szerokość.
            </p>
        </div>
    );
};

export default SandboxTable;
