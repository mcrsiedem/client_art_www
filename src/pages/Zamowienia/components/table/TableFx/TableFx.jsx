import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import { 
  FileText, 
  ChevronDown, 
  ChevronUp,
  X,
  CirclePlus,
  KeySquare
} from "lucide-react";
import { AppContext } from "context/AppContext";
import { _etapy_produkcji, _stan_dokumentu, _status_dokumentu, _waluta } from "utils/initialvalue";
import { ModalInsertContext } from "context/ModalInsertContext";
import { TechnologyContext } from "context/TechnologyContext";
import DecodeToken from "pages/Login/DecodeToken";
import { onMouseDownTableRow } from "./onMouseDownTableRow";
import styles from "./TableFx.module.css"
import { useMenu } from "./useMenu";
import CellBtn from "./CelllBtn";



const STORAGE_KEYS = {
  COLUMNS: "table_css_mod_columns",
  WIDTHS: "table_css_mod_widths"
};

export default function TableFx({showSettings, setShowSettings}) {
  const contextApp = useContext(AppContext);
  const zamowieniaRaw = contextApp.zamowienia || [];
  const contextModal = useContext(ModalInsertContext);
  const setShowTabs = contextModal.setShowTabs;
  const setOpenModalInsert = contextModal.setOpenModalInsert;
  const setSelectedZamowienie = contextModal.setSelectedZamowienie;

    const zamowienia = contextApp.zamowienia
  const setZamowienia = contextApp.setZamowienia
  const selectedUser= contextApp.selectedUser;
  const selectedKlient= contextApp.selectedKlient;

      const {onMenuHandle} = useMenu()
  
  
  // --- DEFINICJA KOLUMN ---
  const allColumns = [
    { id: "nr", label: "Nr" , visible: true},
    { id: "rok", label: "Rok" , visible: false},
    { id: "technologia", label: "Karta", isIcon: true, noSort: true , visible: true},
    { id: "firma_nazwa", label: "Klient" , visible: true},
    { id: "tytul", label: "Praca", visible: true }, // Używamy tytul jako klucza danych
    { id: "kod_pracy", label: "Kod", visible: true }, // Używamy tytul jako klucza danych
    { id: "naklad", label: "Nakład" , visible: true},
    { id: "oprawa", label: "Oprawa" , visible: true},
    { id: "ilosc_stron", label: "Str." , visible: true},
    { id: "cena", label: "Cena" , visible: false},
    { id: "waluta_id", label: "Waluta" , visible: true},
    { id: "wartosc_zamowienia", label: "Wartosc zamówienia" , visible: false},
    { id: "data_materialow", label: "Data materiałów" , visible: false},
    { id: "data_przyjecia", label: "Data przyjęcia" , visible: true},
    { id: "data_spedycji", label: "Spedycja" , visible: true},
    { id: "utworzono", label: "Utworzono" , visible: false},
    { id: "nr_kalkulacji", label: "Kalkulacja" , visible: true},
    { id: "format_x", label: "Netto" , visible: true},
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
    return saved ? JSON.parse(saved) : { nr: 50, klient: 150,status_nazwa:85,stan: 95,ilosc_stron:30,rok:60,technologia:40 ,naklad:40,format_x:30,format_y:30,cena:60, nr_kalkulacji:100,data_spedycji:70};
  });


const didMouseMove = useRef(false);

const sortedItems = useMemo(() => {
  let sortableItems = [...zamowieniaRaw];


  const stanPriority = {
    3: 1,
    2: 2,
    1: 3,
    4: 4
  };

  sortableItems.sort((a, b) => {
    // 1. GŁÓWNY PRIORYTET: Sortowanie po 'stan' (3 -> 2 -> 1 -> 4)
    const pA = stanPriority[a.stan] || 99;
    const pB = stanPriority[b.stan] || 99;

    if (pA !== pB) {
      return pA - pB;
    }

    // 2. SORTOWANIE DODATKOWE: Tylko gdy stany są takie same
    let result = 0;

    if (sortConfig !== null) {
      const { key, direction } = sortConfig;
      let valA = a[key];
      let valB = b[key];

      // Obsługa specyficzna dla 'nr' (rok)
      if (key === 'nr') {
        const rokA = parseInt(a.rok) || 0;
        const rokB = parseInt(b.rok) || 0;
        if (rokA !== rokB) {
          result = direction === 'asc' ? rokA - rokB : rokB - rokA;
        }
      }

      // Sprawdź puste wartości
      if (result === 0) {
        const isEmpty = (v) => v === undefined || v === null || v === '';
        if (isEmpty(valA) && !isEmpty(valB)) result = 1;
        else if (!isEmpty(valA) && isEmpty(valB)) result = -1;
        else if (!isEmpty(valA) && !isEmpty(valB)) {
          
          // Obsługa dat
          const dateKeys = ['data_spedycji', 'data_przyjecia'];
          if (dateKeys.includes(key)) {
            const dA = new Date(valA);
            const dB = new Date(valB);
            if (!isNaN(dA) && !isNaN(dB)) {
              result = direction === 'asc' ? dA - dB : dB - dA;
            }
          }

          // Obsługa liczb
          if (result === 0) {
            const parseToNum = (v) => {
              if (typeof v === 'number') return v;
              const n = parseFloat(String(v).replace(',', '.').trim());
              return isNaN(n) ? null : n;
            };
            const nA = parseToNum(valA);
            const nB = parseToNum(valB);
            if (nA !== null && nB !== null) {
              result = direction === 'asc' ? nA - nB : nB - nA;
            }
          }

          // Obsługa stringów
          if (result === 0) {
            const sA = String(valA).toLowerCase();
            const sB = String(valB).toLowerCase();
            result = direction === 'asc' 
              ? sA.localeCompare(sB, 'pl') 
              : sB.localeCompare(sA, 'pl');
          }
        }
      }
    }

    return result;
  });

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


  const switchTdColor = (stan,select,styles) =>{

      if(select) return styles.td_select

      switch(stan){
        case 1 : return styles.td_szkic
        case 2 : return styles.td_do_przyjecia
        default: return styles.td
      }

  }

  return (
    <div className={styles.container}>


      {showSettings && (
        <div className={styles.settingsPanel}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "0.875rem" }}>
              Widoczne kolumny:
            </span>
            <X
              size={18}
              style={{ cursor: "pointer" }}
              onClick={() => setShowSettings(false)}
            />
          </div>
          <div className={styles.settingsGrid}>
            {allColumns.map((col) => (
              <label key={col.id} className={styles.settingsLabel}>
                <input
                  type="checkbox"
                  checked={visibleColumns.includes(col.id)}
                  onChange={() =>
                    setVisibleColumns((prev) =>
                      prev.includes(col.id)
                        ? prev.filter((c) => c !== col.id)
                        : [...prev, col.id],
                    )
                  }
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
              {allColumns
                .filter((c) => visibleColumns.includes(c.id))
                .map((col) => {
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
                          sortConfig.direction === "asc" ? (
                            <ChevronUp size={14} className={styles.sortIcon} />
                          ) : (
                            <ChevronDown
                              size={14}
                              className={styles.sortIcon}
                            />
                          )
                        ) : (
                          !col.noSort && (
                            <ChevronDown size={14} style={{ opacity: 0.2 }} />
                          )
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
            {sortedItems
              .filter((item) => {
                if (contextApp.selectedKlient == 0) {
                  return true;
                } else {
                  return item.klient_id == contextApp.selectedKlient;
                }
              })

              .filter((zam) => {
                if (contextApp.selectedUser == 0) {
                  return true;
                } else {
                  return zam.opiekun_id == contextApp.selectedUser;
                }
              })
              .map((row, i) => (
                // .filter( item => item.stan > 2 ).map((row,i) => (
                  <>
                <tr
                        key={row.id}
                        className={styles.tr}
                                onContextMenu={(event) => {
                        onMenuHandle(event,sortedItems,row);
        }}
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
                  {allColumns
                    .filter((c) => visibleColumns.includes(c.id))
                    .map((col) => (
                      <>
                      <td
                        key={`${row.id}-${col.id}`}
                    //     style={row.select?{background:'#81b3ff',WebkitTouchCallout: 'none',
                    // WebkitUserSelect: 'none',
                    // KhtmlUserSelect: 'none',
                    // MozUserSelect: 'none',
                    // msUserSelect: 'none',
                    // userSelect: 'none'}:{background:'#ffffff91'}}
                        className={switchTdColor(row.stan,row.select || false, styles)}
                         onMouseDown={(event)=> onMouseDownTableRow(event,row,zamowienia,setZamowienia,selectedUser,selectedKlient,i,sortedItems)}

                      >
                        <CellContent row={row} colId={col.id} />

                      </td>

                      </>
                    ))}



                  
                </tr>
      {row.show && (
        <>
          s
        </>
      )}
                </>
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
    case "format_x": return `${row.format_x}x${row.format_y} `;
    case "naklad": return <div style={{textAlign:'right', paddingRight:'5px'}}>{ row.naklad.toLocaleString()}</div>;
    case "ilosc_stron": return <div style={{textAlign:'right', paddingRight:'5px'}}>{ row.ilosc_stron}</div>;

    case "cena": return <span className={styles.price2}>{row.cena}</span>;
    case "waluta_id": return <span >{_waluta.filter((s) => s.id == row.waluta_id).map((x) => x.nazwa)}</span>;
    case "wartosc_zamowienia": return <span >{row.wartosc_zamowienia.replace('.', ',').trim()} </span>;
    case "status_nazwa": return <span className={row.status==3 ? styles.badgeRed :styles.badge}>{_status_dokumentu.filter((s) => s.id == row.status).map((x) => x.nazwa)}</span>;
    // case "technologia": return <FileText size={16} style={{color: '#94a3b8'}} />;
    // case "technologia": return    row.stan>2  &&  <ShowTechnmologiaBtn  row={row}/>;
    case "technologia": return      <CellBtn  row={row}/>;
    case "etap": return <span className={styles.stan}>{_etapy_produkcji.filter((s) => s.id == row.etap).map((x) => x.nazwa)}</span>;
    case "stan": return <span className={styles.stan}>{_stan_dokumentu.filter((s) => s.id == row.stan).map((x) => x.nazwa)}</span>;


    default: return row[colId] || "-";
  }
}


function CellBtn2({ row }) {

  if(row.open_stan == 1 ) return <BtnLock row={row}/>
  if( row.stan>2  && row.technologia_id == null)  return <BtnCirclePlus row={row}/>

  return row.stan>2  &&<BtnFile row={row}/>

}


// function ShowTechnmologiaBtn({
//   row,
// }) {
//   const techContext = useContext(TechnologyContext);
//   const contextApp = useContext(AppContext);
//   const fechparametryTechnologii = techContext.fechparametryTechnologii;
//   const setShowProcesy = techContext.setShowProcesy;
  
//   if ( row.open_stan==1  ) {
//   if (row.open_user_id != DecodeToken(sessionStorage.getItem("token")).id ) {

//     return (
     
//         <div>
//          <button style={{border:'none',background:'transparent'}}

//             alt="Procesy"
//           >
// <KeySquare size={16} style={{color: '#c61515'}} />


//           </button>
         
//         </div>
     
//     );


//   }
//   }

//   if (row.technologia_id == null ) {
//     return (
    
//         <div >
//       <button style={{color: '#94a3b8',border:'none',background:'transparent'}}
//             // className={styles.iconSettings}
//             // src={iconAdd}
//             onClick={() => {
//               if(DecodeToken(sessionStorage.getItem("token")).technologie_wszystkie == 1){
//               contextApp.setIsLoading(true);
//               techContext.fechparametry(row?.id);
//               // techContext.setShowTechnologyStage(true);
//               techContext.setRowZamowienia(row);
//               setShowProcesy(false)
//               }
        
//             }}
//             alt="Procesy"
//           >
// <CirclePlus size={16} style={{color: '#21ff03a7'}} />
            
//             </button>
         
//         </div>
     
//     );
//   } else {
//     return (
    
//         <div style={{color: '#94a3b8',border:'none',minWidth: '20px', whiteSpace: 'nowrap'}}>

//        <button style={{color: '#94a3b8',border:'none',background:'transparent'}}

//             onClick={() => {
//                            if(DecodeToken(sessionStorage.getItem("token")).technologie_wszystkie == 1){
//                                     contextApp.setIsLoading(true);
//                                             fechparametryTechnologii(row.id, row.technologia_id);
//                            }

            
//             }}
//             alt="Procesy"
//           >
// <FileText size={16} style={{color: '#94a3b8',border:'none'}} />

//           </button>
         
//         </div>
      
//     );
//   }
// }





function BtnLock({
  row,
}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const setShowProcesy = techContext.setShowProcesy;
  

  if (row.open_user_id != DecodeToken(sessionStorage.getItem("token")).id ) {

    return (
     
        <div>
         <button style={{border:'none',background:'transparent'}}
            alt="Procesy"
          >
          <KeySquare size={16} style={{color: '#c61515'}} />
          </button>
        </div>
    );
  }
  

}


function BtnCirclePlus({
  row,
}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const setShowProcesy = techContext.setShowProcesy;
  
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
  
}

function BtnFile({
  row,
}) {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const setShowProcesy = techContext.setShowProcesy;
  



    return (
    
        <div style={{color: '#94a3b8',border:'none',minWidth: '20px', whiteSpace: 'nowrap'}}>

       <button style={{color: '#94a3b8',border:'none',background:'transparent'}}

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