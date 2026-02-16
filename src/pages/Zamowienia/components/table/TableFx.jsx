import React, { useState, useEffect, useRef, useContext, createContext, useMemo } from "react";
import { 
  Settings, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  X,
  Search,
  Filter
} from "lucide-react";
import { AppContext } from "context/AppContext";
import { _etapy_produkcji, _stan_dokumentu } from "utils/initialvalue";

/** * SYMULACJA STYLÓW CSS MODULES */
const styles = {
  container: "table-container",
  header: "table-header",
  searchWrapper: "search-wrapper",
  searchInput: "search-input",
  btnSettings: "btn-settings",
  btnSettingsActive: "btn-settings-active",
  settingsPanel: "settings-panel",
  settingsGrid: "settings-grid",
  settingsLabel: "settings-label",
  tableWrapper: "table-wrapper",
  table: "custom-table",
  thead: "custom-thead",
  th2: "custom-th",
  thContent: "th-content",
  resizer: "resizer",
  tbody: "custom-tbody",
  tr: "custom-tr",
  td: "custom-td",
  td_szkic: "custom-td_szkic",
  td_do_przyjecia: "custom_td_do_przyjecia",

  
  badge: "status-badge",
  price: "price-text",
  stan: "stan",
  sortIcon: "sort-icon"
};

const inlineStyles = `
  :root {
    --bg-main: #f8fafc;
    --bg-white: #ffffff;
    --border-color: #e2e8f0;
    --text-main: #1e293b;
    --text-muted: #000000be;
    --primary: #2563eb;
    --primary-hover: #1d4ed8;
  }

  .table-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--bg-main);
    font-family: sans-serif;
    overflow: auto;
  }

  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: var(--bg-white);
    border-bottom: 1px solid var(--border-color);
  }

  .search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-input {
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    background: #f1f5f9;
    border: none;
    border-radius: 9999px;
    font-size: 0.875rem;
    width: 250px;
    outline: none;
  }

  .btn-settings {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    background: var(--bg-white);
    color: var(--text-muted);
    border: 1px solid var(--border-color);
    transition: all 0.2s;
  }

  .btn-settings-active {
    background: var(--primary);
    color: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .settings-panel {
    margin: 0 1.5rem 1.5rem;
    background: var(--bg-white);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    padding: 1.25rem;
    animation: slideDown 0.3s ease-out;
  }

  .settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.75rem;
  }

  .settings-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-muted);
    cursor: pointer;
  }

  .table-wrapper {
    flex: 1;
    // margin: 0 1.5rem 1.5rem;
    background: var(--bg-white);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    overflow: auto;
    position: relative;
        // background: green;
  }

  .custom-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: fixed;
  }

  .custom-thead {
    position: sticky;
    top: 0;
    z-index: 10;
    background: #f8fafc;
    
  }

  .custom-th {
    position: relative;
    height: 2rem;
    padding: 0 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    cursor: pointer;
    user-select: none;
    
  }

  .custom-th:hover {
    background: #f1f5f9;
  }

  .th-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--text-muted);
    // text-transform: uppercase;
    letter-spacing: 0.05em;
    
  }

  .sort-icon {
    transition: transform 0.2s;
    color: var(--primary);
  }

  .resizer {
    position: absolute;
    right: 0;
    border:none;
    top: 0;
    height: 100%;
    width: 1px;
    
    cursor: col-resize;
    z-index: 5;
    background: #b4b4b4a1;
  }

  .resizer:hover {
    background: var(--primary);
    cursor: col-resize;
  }

  .custom-tr:hover {
    background: #f1f5f9;
  }

  .custom-td {
    // padding: 0.75rem 1rem;
    padding: 0.4rem 0.5rem;
    font-size: 0.875rem;
    color: var(--text-main);
    border-bottom: 1px solid #9e9e9e96;
    border-right: 1px solid #f1f5f9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    // background: #82f86a96;/
  }

    .custom-td_szkic{
    // padding: 0.75rem 1rem;
    padding: 0.4rem 0.5rem;
    font-size: 0.875rem;
    color: var(--text-main);
    border-bottom: 1px solid #9e9e9e96;
    border-right: 1px solid #f1f5f9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: #73737359;
  }

      .custom_td_do_przyjecia{
    // padding: 0.75rem 1rem;
    padding: 0.4rem 0.5rem;
    font-size: 0.875rem;
    color: var(--text-main);
    border-bottom: 1px solid #9e9e9e96;
    border-right: 1px solid #f1f5f9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    // background: #f8de6a96;
   background: rgb(246, 212, 45);

  }


  

  .status-badge {
    display: inline-flex;
    padding: 0.125rem 0.625rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    background: #dbeafe;
    color: #1e40af;
  }

  .price-text {
    color: #15803d;
    font-weight: 600;
  }

    .stan {
    color: #292929;
    font-weight: 600;
    //  text-transform: uppercase;

  }


  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

/** * SYMULACJA ŚRODOWISKA (MOCKI) */
// export const AppContext = createContext({
//   zamowienia: [
//     { id: 1, nr: "105/2024", tytul: "Katalog Produktowy", naklad: 1000, ilosc_stron: 48, stan: 3, status_nazwa: "W produkcji", netto: 4500 },
//     { id: 2, nr: "102/2024", tytul: "Ulotki A5", naklad: 5000, ilosc_stron: 2, stan: 4, status_nazwa: "Gotowe", netto: 1200 },
//     { id: 3, nr: "108/2024", tytul: "Plakaty B2", naklad: 200, ilosc_stron: 1, stan: 3, status_nazwa: "Oczekiwanie", netto: 800 },
//   ],
//   valueZamowieniaWyszukiwarka: "",
//   setIsLoading: () => {},
//   sortowanieZamowienia: { current: "" }
// });

  // const contextApp = useContext(AppContext);
  // const zamowienia = contextApp.zamowienia
const STORAGE_KEYS = {
  COLUMNS: "table_css_mod_columns",
  WIDTHS: "table_css_mod_widths"
};

export default function TableFx({showSettings, setShowSettings}) {
  const contextApp = useContext(AppContext);
  const zamowieniaRaw = contextApp.zamowienia || [];
  
  // --- DEFINICJA KOLUMN ---
  const allColumns = [
    { id: "nr", label: "Nr" , visible: true},
    { id: "rok", label: "Rok" , visible: false},
    { id: "technologia", label: "Karta", isIcon: true, noSort: true , visible: true},
    { id: "klient", label: "Klient" , visible: true},
    { id: "tytul", label: "Praca", visible: true }, // Używamy tytul jako klucza danych
    { id: "naklad", label: "Nakład" , visible: true},
    { id: "ilosc_stron", label: "Str." , visible: true},
    { id: "netto", label: "Netto" , visible: false},
    { id: "opiekun", label: "Opiekun", visible: true },
    { id: "data_spedycji", label: "Spedycja" , visible: true},
    { id: "utworzono", label: "Utworzono" , visible: false},
    { id: "nr_kalkulacji", label: "Kalkulacja" , visible: true},
    { id: "format_x", label: "Szer." , visible: true},
    { id: "format_y", label: "Wys." , visible: true},
    { id: "status_nazwa", label: "Status" , visible: false},
    { id: "stan", label: "Stan" , visible: true},
    { id: "etap", label: "Etap" , visible: true},
    
  ];

  // --- STATE: KONFIGURACJA SORTOWANIA ---
  const [sortConfig, setSortConfig] = useState({ key: 'nr', direction: 'asc' });

  // --- STATE: WIDOCZNOŚĆ I SZEROKOŚĆ ---
  const [visibleColumns, setVisibleColumns] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COLUMNS);
    return saved ? JSON.parse(saved) : allColumns.filter(col => col.visible == true).map(c => c.id);
  });

  const [columnWidths, setColumnWidths] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WIDTHS);
    return saved ? JSON.parse(saved) : { nr: 80, tytul: 340, klient: 150,stan: 95,ilosc_stron:50,rok:60,technologia:60 ,naklad:60,format_x:60,format_y:60,netto:80};
  });

  // const [showSettings, setShowSettings] = useState(false);

  // --- LOGIKA SORTOWANIA (Memoized) ---
  const sortedItems = useMemo(() => {
    let sortableItems = [...zamowieniaRaw];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];

        if (valA === undefined || valB === undefined) return 0;

        // Sortowanie numeryczne
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
        }

        // Sortowanie tekstowe (alfabetyczne)
        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();
        
        if (sortConfig.direction === 'asc') {
          return strA.localeCompare(strB);
        } else {
          return strB.localeCompare(strA);
        }
      });
    }
    return sortableItems;
  }, [zamowieniaRaw, sortConfig]);

  // Funkcja wyzwalająca zmianę sortowania
  const requestSort = (key, noSort) => {
    if (noSort) return;
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COLUMNS, JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WIDTHS, JSON.stringify(columnWidths));
  }, [columnWidths]);

  const handleMouseDown = (id, e) => {
    e.stopPropagation(); // Ważne, aby kliknięcie w resizer nie wyzwalało sortowania
    e.preventDefault();
    const startX = e.pageX;
    const startWidth = columnWidths[id] || 150;

    const onMouseMove = (moveEvent) => {
      const newWidth = Math.max(60, startWidth + (moveEvent.pageX - startX));
      setColumnWidths(prev => ({ ...prev, [id]: newWidth }));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };


  const switchTdColor = (stan,styles) =>{

      switch(stan){
        case 1 : return styles.td_szkic
        case 2 : return styles.td_do_przyjecia
        default: return styles.td
      }

  }

  return (
    <div className={styles.container}>
      <style>{inlineStyles}</style>
      
      {/* <div className={styles.header}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <h1 style={{fontSize: '1.25rem', fontWeight: 'bold'}}>Zamówienia</h1>
          <div className={styles.searchWrapper}>
            <Search size={16} style={{position: 'absolute', left: '0.75rem', color: '#94a3b8'}} />
            <input type="text" placeholder="Szukaj..." className={styles.searchInput} />
          </div>
        </div>

        <button 
          onClick={() => setShowSettings(!showSettings)}
          className={`${styles.btnSettings} ${showSettings ? styles.btnSettingsActive : ''}`}
        >
          <Settings size={18} />
          Kolumny
        </button>
      </div> */}

      {showSettings && (
        <div className={styles.settingsPanel}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
            <span style={{fontWeight: 'bold', fontSize: '0.875rem'}}>Widoczne kolumny:</span>
            <X size={18} style={{cursor: 'pointer'}} onClick={() => setShowSettings(false)} />
          </div>
          <div className={styles.settingsGrid}>
            {allColumns.map(col => (
              <label key={col.id} className={styles.settingsLabel}>
                <input 
                  type="checkbox" 
                  checked={visibleColumns.includes(col.id)}
                  onChange={() => setVisibleColumns(prev => 
                    prev.includes(col.id) ? prev.filter(c => c !== col.id) : [...prev, col.id]
                  )}
                />
                {col.label}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {allColumns.filter(c => visibleColumns.includes(c.id)).map((col) => {
                const isSorted = sortConfig.key === col.id;
                return (
                  <th 
                    key={col.id}
                    className={styles.th2}
                    style={{ width: columnWidths[col.id] || 150 }}
                    onClick={() => requestSort(col.id, col.noSort)}
                  >
                    <div className={styles.thContent}>
                      {col.isIcon ? <FileText size={16} /> : col.label}
                      
                      {isSorted ? (
                        sortConfig.direction === 'asc' ? 
                          <ChevronUp size={14} className={styles.sortIcon} /> : 
                          <ChevronDown size={14} className={styles.sortIcon} />
                      ) : (
                        !col.noSort && <ChevronDown size={14} style={{opacity: 0.2}} />
                      )}
                    </div>
                    <div 
                      className={styles.resizer}
                      onMouseDown={(e) => handleMouseDown(col.id, e)}
                    />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {sortedItems.filter( item => item.stan > 2 ).map((row) => (
              <tr key={row.id} className={styles.tr}>
                {allColumns.filter(c => visibleColumns.includes(c.id)).map((col) => (
                  <td key={`${row.id}-${col.id}`} className={styles.td}>
                    <CellContent row={row} colId={col.id} />
                  </td>
                ))}
              </tr>
            ))}



                        {sortedItems.filter( item => item.stan == 2 ).map((row) => (
              <tr key={row.id} className={styles.tr}>
                {allColumns.filter(c => visibleColumns.includes(c.id)).map((col) => (
                  // <td key={`${row.id}-${col.id}`} className={styles.td}>
                  <td key={`${row.id}-${col.id}`} className={switchTdColor(row.stan,styles)}>
                    <CellContent row={row} colId={col.id} />
                  </td>
                ))}
              </tr>
            ))}



                        {sortedItems.filter( item => item.stan == 1 ).map((row) => (
              <tr key={row.id} className={styles.tr}>
                {allColumns.filter(c => visibleColumns.includes(c.id)).map((col) => (
                  // <td key={`${row.id}-${col.id}`} className={styles.td}>
                  <td key={`${row.id}-${col.id}`} className={switchTdColor(row.stan,styles)}>
                    <CellContent row={row} colId={col.id} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CellContent({ row, colId }) {
  switch (colId) {
    case "nr": return <div style={{fontWeight: 'bold',paddingLeft:'10px', textAlign:'right'}}>{row.stan>2 ? row.nr+" / "+row.rok.substring(2,4): ""}</div>;
    case "tytul": return row.tytul;
    case "netto": return <span className={styles.price}>{row.cena} zł</span>;
    case "status_nazwa": return <span className={styles.badge}>{row.status_nazwa}</span>;
    case "technologia": return <FileText size={16} style={{color: '#94a3b8'}} />;
    case "etap": return <span className={styles.stan}>{_etapy_produkcji.filter((s) => s.id == row.etap).map((x) => x.nazwa)}</span>;
    case "stan": return <span className={styles.stan}>{_stan_dokumentu.filter((s) => s.id == row.stan).map((x) => x.nazwa)}</span>;

    default: return row[colId] || "-";
  }
}