import React, { useState, useEffect, useRef,useContext } from "react";
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
     const { refreshRealizacjeZestawienie,refreshRealizacjeZestawienieGrupa,refreshRealizacjeZestawienieProcesory,refreshRealizacjeZestawienieKlienci } = useZestawienia();
  

  if(realizacjeZestawienieKlienci.length ==0){
    return(
       <div  className={style.odwiezContainer} >
       <button
       onClick={()=>{refreshRealizacjeZestawienieKlienci(dataOd, dataDo);}}
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
           <th className={style.col_klient}>Przeloty druku</th>
           <th className={style.col_klient}>Przeloty falcu</th>
           <th className={style.col_klient}>Przeloty uszlachetnianie</th>


           {/* <th className={style.col_alert}></th> */}
         </tr>
       </thead>
       <tbody className={style.tableZam}>




         {contextApp.realizacjeZestawienieKlienci
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

