import React, { useState, useEffect, useRef,useContext, useMemo } from "react";
import style from "./TableRealizacjeZestawienie.module.css";
import iconSettings from "assets/dots2.svg";
import iconFile from "assets/iconTechnologieDark.svg";
import { AppContext } from "context/AppContext";
import { sprawdzDostepZamowienia } from "actions/sprawdzDostepZamowienia";
import TABLE_ROW_ZAMOWIENIA from "./row/RowRealizacjeZestawienie";
import DecodeToken from "pages/Login/DecodeToken";
import { useSortowanieZamowienia } from "hooks/useSortowanieZamowienia";
import { useZamowienia } from "hooks/useZamowienia";
import LoadingMini from "components/Loading/LoadingMini";
import { useZestawienia } from "hooks/useZestawienia";
export default function TableRealizacjeZestawienie({open2,setRow,dataOd, dataDo}){
  const [showMenu, setShowMenu] = useState(false);
  const contextApp = useContext(AppContext);
  const realizacjeZestawienieKlienci = contextApp.realizacjeZestawienieKlienci

  
  const setZamowienia = contextApp.setZamowienia
  const selectedUser= contextApp.selectedUser;
  const selectedKlient= contextApp.selectedKlient;
  const [sortWgEtapu] = useSortowanieZamowienia()

   const inputElement = useRef();

  const tableZamowienia= contextApp.tableZamowienia;

  const valueZamowieniaWyszukiwarka = contextApp.valueZamowieniaWyszukiwarka;
  const showTabsRealizacje = contextApp.showTabsRealizacje
     const { refreshRealizacjeZestawienie,refreshRealizacjeZestawienieGrupa,refreshRealizacjeZestawienieProcesory,refreshRealizacjeZestawienieKlienci ,refreshRealizacjeZestawienieKlienciWartosc} = useZestawienia();
  

       const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
     
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };


    const sortedData = useMemo(() => {
      let sortableItems = [...realizacjeZestawienieKlienci];
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
    }, [realizacjeZestawienieKlienci, sortConfig]);

      const getSortIcon = (name) => {
    if (sortConfig.key !== name) return " ↕";
    return sortConfig.direction === 'asc' ? " ▲" : " ▼";
  };

  if(realizacjeZestawienieKlienci.length ==0 && DecodeToken(sessionStorage.getItem("token")).zestawienia==1){
    return(
       <div  className={style.odwiezContainer} >
       <button
      //  onClick={()=>{refreshRealizacjeZestawienieKlienci(dataOd, dataDo);}}
       onClick={()=>{refreshRealizacjeZestawienieKlienciWartosc(dataOd, dataDo);}}

       
       className={style.odwiezBtn}>Pobierz
       
       </button>
      
   </div>
      
      
      )
  } else{

     return (
   <div ref={tableZamowienia}  className={style.tableContainer} >
     <table className={style.tableZam}>
       <thead className={style.th_head}>
         <tr className={style.table_tr}>

           <th className={style.col_indeks}>#</th>
           <th className={style.col_klient}>Klient</th>
           <th className={style.col_klient} style={{ cursor: "pointer", userSelect: "none" }} onClick={() => requestSort('druk_przeloty')} >Przeloty druku</th>
           <th className={style.col_klient} style={{ cursor: "pointer", userSelect: "none" }} onClick={() => requestSort('falc_przeloty')} >Przeloty falcu</th>
           <th className={style.col_klient} style={{ cursor: "pointer", userSelect: "none" }} onClick={() => requestSort('uszlachetnienie_przeloty')} >Przeloty uszlachetnianie</th>
           <th className={style.col_klient} style={{ cursor: "pointer", userSelect: "none" }} onClick={() => requestSort('suma_waluta_1')} >PLN </th>
           <th className={style.col_klient} style={{ cursor: "pointer", userSelect: "none" }} onClick={() => requestSort('suma_waluta_2')} >EURO</th>
           <th className={style.col_klient} style={{ cursor: "pointer", userSelect: "none" }} onClick={() => requestSort('suma_waluta_3')} >USD</th>


           {/* <th className={style.col_alert}></th> */}
         </tr>
       </thead>
       <tbody className={style.tableZam}>

         {
        //  contextApp.realizacjeZestawienieKlienci
         sortedData
           .map((row,i) => {
             return (
               <TABLE_ROW_ZAMOWIENIA key={row.global_id} row={row} open2={open2} setRow={setRow} i={i} />
             );
           })}


       </tbody>
     </table>
   </div>
 );
  }



}

