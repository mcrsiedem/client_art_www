import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./TableMini.module.css";

import iconSettings from "assets/dots2.svg";
import iconFile from "assets/iconTechnologieDark.svg";
import iconAdd from "assets/add2.svg";

import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import { sprawdzDostepZamowienia } from "actions/sprawdzDostepZamowienia";
import { ModalInsertContext } from "context/ModalInsertContext";
import MenuZamowienia from "../menu/MenuZamowienia";
import TABLE_ROW_ZAMOWIENIA from "./TABLE_ROW_ZAMOWIENIA";
import { TechnologyContext } from "context/TechnologyContext";

export default function TableMini({open2,setRow}){
  const [showMenu, setShowMenu] = useState(false);
  const contextModalInsert = useContext(ModalInsertContext);
  const contextApp = useContext(AppContext);
  const zamowienia = contextApp.zamowienia
  const selectedUser= contextApp.selectedUser;

 return (
   <div className={style.tableContainer}>
     {/* <MenuZamowienia showMenu={showMenu} setShowMenu={setShowMenu} /> */}
     <table>
       <thead className={style.th_head}>
         <tr className={style.table_tr}>
           <th style={{ textAlign: "center" }}>!</th>

           <th className={style.col_nr}>Nr</th>
           <th className={style.col_rok}>Rok</th>
           <th title="Technologia" className={style.th_karta}>
             {" "}
             <img
               className={style.iconSettings}
               src={iconFile}
               onClick={() => {}}
               alt="Procesy"
             />
           </th>
           <th className={style.col_klient}>Klient</th>
           <th className={style.col_praca}>Praca</th>
           <th className={style.col_uwagi}>Uwagi</th>
           <th className={style.naklad}>Nakład</th>
           <th className={style.col_strony2}>Strony</th>
           <th className={style.col_spedycja}>Spedycja</th>
           <th className={style.col_szerokosc}>Netto</th>
           <th className={style.col_oprawa}>Oprawa</th>
           <th className={style.col_firma}>Firma</th>
           <th className={style.col_firma}>Stan</th>
           <th className={style.col_status}>Status</th>
           <th className={style.col_firma}>Etap</th>
           <th className={style.col_firma}>Opiekun</th>
           <th className={style.th_checkbox}>
             {/* <MenuBtn showMenu={showMenu} setShowMenu={setShowMenu} /> */}
           </th>
           <th style={{ textAlign: "center" }}></th>
         </tr>
       </thead>
       <tbody className={style.bodyContainer}>
         {zamowienia
           .filter((zamowienie) => sprawdzDostepZamowienia(zamowienie))
           .filter((zam) => {
             if (selectedUser == 0) {
               return true;
             } else {
              return  zam.opiekun_id == selectedUser;
             }
           })
           .filter((z) => z.stan != 3)
           .map((row) => {
             return (
               <TABLE_ROW_ZAMOWIENIA
                 key={row.id}
                 row={row}
                 open2={open2}
                 setRow={setRow}
               />
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
