import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./TableZamowienia.module.css";
import iconSettings from "assets/dots2.svg";
import iconFile from "assets/iconTechnologieDark.svg";
import { AppContext } from "context/AppContext";
import { sprawdzDostepZamowienia } from "actions/sprawdzDostepZamowienia";
import TABLE_ROW_ZAMOWIENIA from "./TABLE_ROW_ZAMOWIENIA";
import DecodeToken from "pages/Login/DecodeToken";
import { useSortowanieZamowienia } from "hooks/useSortowanieZamowienia";
export default function TableZamowienia({open2,setRow}){
  const [showMenu, setShowMenu] = useState(false);
  const contextApp = useContext(AppContext);
  const zamowienia = contextApp.zamowienia
  const setZamowienia = contextApp.setZamowienia
  const selectedUser= contextApp.selectedUser;
  const selectedKlient= contextApp.selectedKlient;
  const [sortWgEtapu] = useSortowanieZamowienia()
 

 return (
   <div className={style.tableContainer} >
     <table className={style.tableZam}>
       <thead className={style.th_head}>
         <tr className={style.table_tr}>
           {/* <th className={style.col_alert}>!</th> */}
           <th className={style.col_nr}>Nr</th>
           <th className={style.col_rok}>Rok</th>
           <th title="Technologia" className={style.th_karta}>
             <img
               className={style.iconSettings}
               src={iconFile}
               onClick={() => {}}
               alt="Procesy"
             />
           </th>
           <th className={style.col_klient}><SELECT_KLIENT_ZAMOWWIENIA/></th>
           <th className={style.col_praca}>Praca</th>
           <th className={style.col_uwagi}>Uwagi</th>
           <th onClick={()=>{
            setZamowienia(zamowienia.sort((a, b) => a.naklad - b.naklad))
            }} className={style.col_strony}>Nakład</th>
           <th className={style.col_strony}>Strony</th>
           <th  className={style.col_spedycja}>Przyjęcie</th>
           <th  className={style.col_spedycja}>Spedycja</th>
           <th className={style.col_strony}>Netto</th>
           <th onClick={()=>{
            setZamowienia(zamowienia.sort((a, b) => a.oprawa_id - b.oprawa_id))
            }}className={style.col_netto}>Oprawa</th>
           <th className={style.col_firma2}>Firma</th>
           <th className={style.col_status}>Stan</th>
           <th className={style.col_status}>Status</th>
           <th className={style.col_etap}>Etap</th>
           <th className={style.col_firma}><SELECT_OPIEKUN_ZAMOWWIENIA/></th>
           <th className={style.col_checkbox}>
           </th>
           <th className={style.col_alert}></th>
         </tr>
       </thead>
       <tbody className={style.tableZam}>
         {zamowienia
           .filter((zamowienie) => sprawdzDostepZamowienia(zamowienie))
           .filter((zam) => {
            if (selectedUser == 0) {
              return true;
            } else {
             return  zam.opiekun_id == selectedUser;
            }
          })
           .filter(z => z.stan ==3)
           .filter((zam) => {
            if (selectedKlient == 0) {
              return true;
            } else {
             return  zam.klient_id == selectedKlient;
            }
          })
          .filter((zamowienie) => sortWgEtapu({zamowienie}))

           .map((row) => {
             return (
               <TABLE_ROW_ZAMOWIENIA key={row.id} row={row} open2={open2} setRow={setRow} />
             );
           })}
       </tbody>
     </table>
   </div>
 );
}

const MenuBtn = ({ showMenu, setShowMenu }) => {
  return (
    <img
              className={style.iconMenuBtn}
              src={iconSettings}
              onClick={() => {
                setShowMenu(!showMenu);
                
              }}
              alt="x"
            />
  )
}

function SELECT_OPIEKUN_ZAMOWWIENIA() {
  const contextApp = useContext(AppContext);
  const selectedUser = contextApp.selectedUser;
  const setSelectedUser = contextApp.setSelectedUser;
  const setSelectedKlient = contextApp.setSelectedKlient;
  if (DecodeToken(sessionStorage.getItem("token")).zamowienia_wszystkie == 1) {
    return (
      <select
        className={style.select_opiekun_zamowienia}
        value={selectedUser}
        onChange={(event) => {
          setSelectedUser(event.target.value);
             setSelectedKlient(0)
        }}
      >
        {<option value="0">Wszyscy</option>}

        {contextApp.users?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.Imie} {option.Nazwisko}
          </option>
        ))}
      </select>
    );
  }else{
    return  <th className={style.col_firma}>Opiekun</th>
  }
}

function SELECT_KLIENT_ZAMOWWIENIA() {
  const contextApp = useContext(AppContext);
  const selectedKlient = contextApp.selectedKlient;
  const setSelectedKlient = contextApp.setSelectedKlient;
  const selectedUser = contextApp.selectedUser;
    return (
      <select
        className={style.select_klient_zamowienia}
        value={selectedKlient}
        onChange={(event) => {
          setSelectedKlient(event.target.value);
        }}
      >
        {<option value="0">Klient</option>}

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