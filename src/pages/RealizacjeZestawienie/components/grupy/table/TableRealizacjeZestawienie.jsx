import React, { useState, useMemo, useContext, useRef } from "react";
import style from "./TableRealizacjeZestawienie.module.css";
import iconSettings from "assets/dots2.svg";
import { AppContext } from "context/AppContext";
import TABLE_ROW_ZAMOWIENIA from "./row/RowRealizacjeZestawienie";
import DecodeToken from "pages/Login/DecodeToken";

export default function TableRealizacjeZestawienie({ open2, setRow }) {
  const contextApp = useContext(AppContext);
  const realizacjeZestawienieGrupy = contextApp.realizacjeZestawienieGrupy || [];
  const tableZamowienia = contextApp.tableZamowienia;

  // Stan przechowywania konfiguracji sortowania
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Funkcja zmieniająca kolumnę/kierunek sortowania
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Logika sortowania danych
  const sortedData = useMemo(() => {
    let sortableItems = [...realizacjeZestawienieGrupy];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        // Obsługa wartości null/undefined, by nie wywalało błędu przy porównywaniu
        const aValue = parseInt(a[sortConfig.key], 10) || 0;
        const bValue = parseInt(b[sortConfig.key], 10) || 0

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [realizacjeZestawienieGrupy, sortConfig]);

  // Pomocniczy komponent do rysowania strzałek sortowania
  const getSortIcon = (name) => {
    if (sortConfig.key !== name) return " ↕";
    return sortConfig.direction === 'asc' ? " ▲" : " ▼";
  };

  return (
    <div ref={tableZamowienia} className={style.tableContainer}>
      <table className={style.tableZam}>
        <thead className={style.th_head}>
          <tr className={style.table_tr}>
            <th className={style.col_indeks}>#</th>
            <th className={style.col_utworzono}>Pracownik</th>
            
            <th 
              className={style.col_klient} 
              onClick={() => requestSort('LiczbaWpisow')} 
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              Narzady{getSortIcon('LiczbaWpisow')}
            </th>
            
            <th 
              className={style.col_praca} 
              onClick={() => requestSort('SumaZrealizowanoTyp1')} 
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              Przeloty{getSortIcon('SumaZrealizowanoTyp1')}
            </th>
          </tr>
        </thead>
        <tbody className={style.tableZam}>
          {sortedData.map((row, i) => {
            return (
              <TABLE_ROW_ZAMOWIENIA 
                key={row.global_id || i} 
                row={row} 
                open2={open2} 
                setRow={setRow} 
                i={i} 
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// Pozostałe komponenty pomocnicze (MenuBtn, SELECT_OPIEKUN, SELECT_KLIENT) 
// można zostawić poniżej bez zmian, jeśli są używane w innym miejscu pliku.