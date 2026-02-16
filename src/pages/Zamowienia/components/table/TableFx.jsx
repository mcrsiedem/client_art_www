import React, { useState, useEffect, useRef, useContext, createContext, useMemo } from "react";
import { 
  Settings, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  X,
  Search,
  Filter,
  Plus,Lock,
  FileLock,
  CirclePlus,
  KeySquare
} from "lucide-react";
import { AppContext } from "context/AppContext";
import { _etapy_produkcji, _stan_dokumentu, _status_dokumentu } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";
import { TechnologyContext } from "context/TechnologyContext";
import DecodeToken from "pages/Login/DecodeToken";
import iconAdd from "assets/add2.svg";
import iconFile from "assets/iconTechnologieDark.svg";
import iconLockRed from "assets/lock2.svg";

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
  badgeRed: "status-badge-red",


  price: "price-text",
  stan: "stan",
  sortIcon: "sort-icon",
  select_opiekun_zamowienia:'select_opiekun'
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
    // margin: 1 1.5rem 1.5rem;
    margin:1rem;
    background: var(--bg-white);
    // background: rgb(255, 65, 141);
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
    padding: 0 0.5rem;
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
    font-size: 0.85rem;
    font-weight: 500;
    color: #292929;
  }
  .status-badge-red {
    display: inline-flex;
    padding: 0.125rem 0.625rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    background: #ff0000;
    // background: #dbeafe;
    color: #ffffff;
  }



  .price-text {
    color: #15803d;
    font-weight: 600;
  }

    .stan {
    color: #292929;
    // font-weight: 600;
    //  text-transform: uppercase;

  }

  .select_opiekun{
  width:300px;
  height:40px;
  border: 1px solid #68686896;
  border-radius: 10px;
  margin: 10px;
  padding: 5px;
  background: #c5c5c552;


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

        const contextModal = useContext(ModalInsertContext);
        const setShowTabs = contextModal.setShowTabs
  const setOpenModalInsert = contextModal.setOpenModalInsert;

  const setSelectedZamowienie = contextModal.setSelectedZamowienie;


  
  
  // --- DEFINICJA KOLUMN ---
  const allColumns = [
    { id: "nr", label: "Nr" , visible: true},
    { id: "rok", label: "Rok" , visible: false},
    { id: "technologia", label: "Karta", isIcon: true, noSort: true , visible: true},
    { id: "klient", label: "Klient" , visible: true},
    { id: "tytul", label: "Praca", visible: true }, // Używamy tytul jako klucza danych
    { id: "kod_pracy", label: "Kod", visible: true }, // Używamy tytul jako klucza danych
    { id: "naklad", label: "Nakład" , visible: true},
    { id: "oprawa", label: "Oprawa" , visible: true},
    { id: "ilosc_stron", label: "Str." , visible: true},
    { id: "cena", label: "Cena" , visible: false},
    { id: "wartosc_zamowienia", label: "Wartosc zamówienia" , visible: false},
    { id: "data_materialow", label: "Data materiałów" , visible: false},
    { id: "data_przyjecia", label: "Data przyjęcia" , visible: true},
    { id: "data_spedycji", label: "Spedycja" , visible: true},
    { id: "utworzono", label: "Utworzono" , visible: false},
    { id: "nr_kalkulacji", label: "Kalkulacja" , visible: true},
    { id: "format_x", label: "Szer." , visible: true},
    { id: "format_y", label: "Wys." , visible: true},
    { id: "opiekun", label: "Opiekun", visible: true },
    { id: "firma", label: "Firma", visible: true },
    { id: "status_nazwa", label: "Status" , visible: true},
    { id: "stan", label: "Stan" , visible: true},
    { id: "etap", label: "Etap zamówienia" , visible: true},
    
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
    return saved ? JSON.parse(saved) : { nr: 50, klient: 150,status_nazwa:85,stan: 95,ilosc_stron:30,rok:60,technologia:20 ,naklad:40,format_x:30,format_y:30,cena:60, nr_kalkulacji:100,data_spedycji:70};
  });





// const sortedItems = useMemo(() => {
//   let sortableItems = [...zamowieniaRaw];
//   if (sortConfig !== null) {
//     sortableItems.sort((a, b) => {
//       // --- NOWA LOGIKA: Sortowanie wstępne po roku dla kolumny 'nr' ---
//       if (sortConfig.key === 'nr') {
//         const rokA = parseInt(a.rok) || 0;
//         const rokB = parseInt(b.rok) || 0;

//         if (rokA !== rokB) {
//           // Zawsze sortujemy lata (np. rosnąco), niezależnie od kierunku 'nr'
//           // Lub dostosuj: sortConfig.direction === 'asc' ? rokA - rokB : rokB - rokA
//           return rokA - rokB; 
//         }
//       }

//       // --- RESZTA TWOJEJ ORYGINALNEJ LOGIKI ---
//       let valA = a[sortConfig.key];
//       let valB = b[sortConfig.key];

//       const isEmpty = (val) => val === undefined || val === null || val === '';
//       if (isEmpty(valA) && isEmpty(valB)) return 0;
//       if (isEmpty(valA)) return 1;
//       if (isEmpty(valB)) return -1;

//       const parseToNumber = (val) => {
//         if (typeof val === 'number') return val;
//         if (typeof val === 'string') {
//           const normalized = val.replace(',', '.').trim();
//           const parsed = parseFloat(normalized);
//           return isNaN(parsed) ? null : parsed;
//         }
//         return null;
//       };

//       const numA = parseToNumber(valA);
//       const numB = parseToNumber(valB);

//       if (numA !== null && numB !== null) {
//         return sortConfig.direction === 'asc' ? numA - numB : numB - numA;
//       } else {
//         const strA = String(valA).toLowerCase();
//         const strB = String(valB).toLowerCase();
//         return sortConfig.direction === 'asc' 
//           ? strA.localeCompare(strB) 
//           : strB.localeCompare(strA);
//       }
//     });
//   }
//   return sortableItems;
// }, [zamowieniaRaw, sortConfig]);

 const didMouseMove = useRef(false);

const sortedItems = useMemo(() => {
  let sortableItems = [...zamowieniaRaw];
  if (sortConfig !== null) {
    sortableItems.sort((a, b) => {
      // --- LOGIKA DLA 'nr' (Sortowanie po roku) ---
      if (sortConfig.key === 'nr') {
        const rokA = parseInt(a.rok) || 0;
        const rokB = parseInt(b.rok) || 0;
        if (rokA !== rokB) {
          return sortConfig.direction === 'asc' ? rokA - rokB : rokB - rokA;
        }
      }

      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];

      // Obsługa pustych wartości (zawsze na dole)
      const isEmpty = (val) => val === undefined || val === null || val === '';
      if (isEmpty(valA) && isEmpty(valB)) return 0;
      if (isEmpty(valA)) return 1;
      if (isEmpty(valB)) return -1;

      // --- NOWA LOGIKA: Obsługa dat (data_spedycji, data_przyjecia) ---
      const dateKeys = ['data_spedycji', 'data_przyjecia'];
      if (dateKeys.includes(sortConfig.key)) {
        const dateA = new Date(valA);
        const dateB = new Date(valB);

        // Sprawdzamy, czy daty są poprawne
        if (!isNaN(dateA) && !isNaN(dateB)) {
          return sortConfig.direction === 'asc' 
            ? dateA - dateB 
            : dateB - dateA;
        }
      }

      // --- LOGIKA DLA LICZB ---
      const parseToNumber = (val) => {
        if (typeof val === 'number') return val;
        if (typeof val === 'string') {
          const normalized = val.replace(',', '.').trim();
          const parsed = parseFloat(normalized);
          return isNaN(parsed) ? null : parsed;
        }
        return null;
      };

      const numA = parseToNumber(valA);
      const numB = parseToNumber(valB);

      if (numA !== null && numB !== null) {
        return sortConfig.direction === 'asc' ? numA - numB : numB - numA;
      } 
      
      // --- LOGIKA DLA STRINGÓW ---
      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();
      return sortConfig.direction === 'asc' 
        ? strA.localeCompare(strB) 
        : strB.localeCompare(strA);
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
    // e.preventDefault();
    didMouseMove.current = false;
    const startX = e.pageX;
    const startWidth = columnWidths[id] || 150;

    const onMouseMove = (moveEvent) => {
         const diff = Math.abs(moveEvent.pageX - startX);
      if (diff > 2) { // Mała tolerancja na drgnięcie ręki
        didMouseMove.current = true;
      }
      // const newWidth = Math.max(60, startWidth + (moveEvent.pageX - startX));
      const newWidth = Math.max(20, startWidth + (moveEvent.pageX - startX));
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
          <SELECT_KLIENT_ZAMOWWIENIA/>
          <SELECT_OPIEKUN_ZAMOWWIENIA/>
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
                             onClick={() => {
                        // Sortuj tylko jeśli nie było przesunięcia (prawdziwy resize)
                        if (!didMouseMove.current) {
                            requestSort(col.id, col.noSort);
                        }
                        // Resetujemy flagę po każdym kliknięciu
                        didMouseMove.current = false;
                    }}
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
            {/* {sortedItems.filter( item => item.klient_id == contextApp.selectedKlient ).filter( item => item.stan > 2 ).map((row,i) => ( */}
            {sortedItems.filter( item => {
          if(contextApp.selectedKlient==0){return true} else {return  item.klient_id == contextApp.selectedKlient}
        } )
        
                   .filter((zam) => {
            if (contextApp.selectedUser == 0) {
              return true;
            } else {
             return  zam.opiekun_id == contextApp.selectedUser;
            }
          })
        .filter( item => item.stan > 2 ).map((row,i) => (
              <tr key={row.id} className={styles.tr}
                     onClick={(node, e) => {
          setSelectedZamowienie({ ...row, i });
        }}
                      onDoubleClick={(node, event) => {
            contextApp.setIsLoading(true);
          setShowTabs({
            parametry: true,
            koszty: false,
            historia: false,
            faktury: false,
            kreator: false,
          });

          setOpenModalInsert(true);
        }}
              >
                {allColumns.filter(c => visibleColumns.includes(c.id)).map((col) => (
                  <td key={`${row.id}-${col.id}`} className={styles.td}>
                    <CellContent row={row} colId={col.id} />
                  </td>
                ))}
              </tr>
            ))}



                        {sortedItems.filter( item => item.klient_id == contextApp.selectedKlient ).filter( item => item.stan == 2 ).map((row) => (
              <tr key={row.id} className={styles.tr}>
                {allColumns.filter(c => visibleColumns.includes(c.id)).map((col) => (
                  // <td key={`${row.id}-${col.id}`} className={styles.td}>
                  <td key={`${row.id}-${col.id}`} className={switchTdColor(row.stan,styles)}>
                    <CellContent row={row} colId={col.id} />
                  </td>
                ))}
              </tr>
            ))}



                        {sortedItems.filter( item => item.klient_id == contextApp.selectedKlient ).filter( item => item.stan == 1 ).map((row) => (
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
    case "nr": return <div style={{fontWeight: 'bold', paddingRight:'5px',textAlign:'right'}}>{row.stan>2 ? row.nr+" / "+row.rok.substring(2,4): ""}</div>;
    case "tytul": return row.tytul;
    case "naklad": return <div style={{textAlign:'right', paddingRight:'5px'}}>{ row.naklad.toLocaleString()}</div>;
    case "ilosc_stron": return <div style={{textAlign:'right', paddingRight:'5px'}}>{ row.ilosc_stron}</div>;

    case "cena": return <span className={styles.price}>{row.cena} zł</span>;
    case "wartosc_zamowienia": return <span >{row.wartosc_zamowienia.replace('.', ',').trim()} </span>;
    case "status_nazwa": return <span className={row.status==3 ? styles.badgeRed :styles.badge}>{_status_dokumentu.filter((s) => s.id == row.status).map((x) => x.nazwa)}</span>;
    // case "technologia": return <FileText size={16} style={{color: '#94a3b8'}} />;
    case "technologia": return     row.stan>2 &&    <ShowTechnmologiaBtn          row={row}   />;
    case "etap": return <span className={styles.stan}>{_etapy_produkcji.filter((s) => s.id == row.etap).map((x) => x.nazwa)}</span>;
    case "stan": return <span className={styles.stan}>{_stan_dokumentu.filter((s) => s.id == row.stan).map((x) => x.nazwa)}</span>;


    default: return row[colId] || "-";
  }
}


function ShowTechnmologiaBtn({
  row,
}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const setShowProcesy = techContext.setShowProcesy;
  
  if ( row.open_stan==1  ) {
  if (row.open_user_id != DecodeToken(sessionStorage.getItem("token")).id ) {

    return (
     
        <div>
         <button style={{border:'none'}}

            alt="Procesy"
          >
<KeySquare size={16} style={{color: '#c61515'}} />


          </button>
         
        </div>
     
    );


  }
  }

  if (row.technologia_id == null ) {
    return (
    
        <div >
      <button style={{color: '#94a3b8',border:'none',background:'transparent'}}
            // className={styles.iconSettings}
            // src={iconAdd}
            onClick={() => {
              if(DecodeToken(sessionStorage.getItem("token")).technologie_wszystkie == 1){
              contextApp.setIsLoading(true);
              techContext.fechparametry(row?.id);
              // techContext.setShowTechnologyStage(true);
              techContext.setRowZamowienia(row);
              setShowProcesy(false)
              }
        
            }}
            alt="Procesy"
          >
<CirclePlus size={16} style={{color: '#21ff03a7'}} />
            
            </button>
         
        </div>
     
    );
  } else {
    return (
    
        <div style={{color: '#94a3b8',border:'none'}}>

       <button style={{color: '#94a3b8',border:'none'}}

            onClick={() => {
                           if(DecodeToken(sessionStorage.getItem("token")).technologie_wszystkie == 1){
                                    contextApp.setIsLoading(true);
                                            fechparametryTechnologii(row.id, row.technologia_id);
                           }

            
            }}
            alt="Procesy"
          >
<FileText size={16} style={{color: '#94a3b8',border:'none'}} />

          </button>
         
        </div>
      
    );
  }
}


function SELECT_KLIENT_ZAMOWWIENIA() {
  const contextApp = useContext(AppContext);
  const selectedKlient = contextApp.selectedKlient;
  const setSelectedKlient = contextApp.setSelectedKlient;
  const selectedUser = contextApp.selectedUser;
    return (
      <select
        className={styles.select_opiekun_zamowienia}
        value={selectedKlient}
        onChange={(event) => {
          setSelectedKlient(event.target.value);
        }}
      >
        {<option value="0">Wszyscy klienci</option>}

        {contextApp.clients?.filter(kl=>  {
          if(selectedUser==0){return true} else {return  kl.opiekun_id == selectedUser}
        }
         )
        .map((option) => (
          <option key={option.id} value={option.id}>
            {option.firma_nazwa} 
          </option>
        ))}
      </select>
    );
}


function SELECT_OPIEKUN_ZAMOWWIENIA() {
  const contextApp = useContext(AppContext);
  const selectedUser = contextApp.selectedUser;
  const setSelectedUser = contextApp.setSelectedUser;
  const setSelectedKlient = contextApp.setSelectedKlient;
  if (DecodeToken(sessionStorage.getItem("token")).zamowienia_wszystkie == 1) {
    return (
      <select
        className={styles.select_opiekun_zamowienia}
        value={selectedUser}
        onChange={(event) => {
          setSelectedUser(event.target.value);
             setSelectedKlient(0)
        }}
      >
        {<option value="0">Opiekun</option>}

        {contextApp.users?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.Imie} {option.Nazwisko}
          </option>
        ))}
      </select>
    );
  }else{
    return  <th className={styles.col_firma}>Opiekun</th>
  }
}