import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./TableZamowienia.module.css";
import iconSettings from "assets/dots2.svg";
import iconFile from "assets/iconTechnologieDark.svg";
import { AppContext } from "context/AppContext";
import { sprawdzDostepZamowienia } from "actions/sprawdzDostepZamowienia";
import TABLE_ROW_ZAMOWIENIA from "./TABLE_ROW/TABLE_ROW_ZAMOWIENIA";
import DecodeToken from "pages/Login/DecodeToken";
import { useSortowanieZamowienia } from "hooks/useSortowanieZamowienia";
import { useZamowienia } from "hooks/useZamowienia";
export default function TableZamowienia({open2,setRow}){
  const [showMenu, setShowMenu] = useState(false);
  const contextApp = useContext(AppContext);
  const zamowienia = contextApp.zamowienia
  const setZamowienia = contextApp.setZamowienia
  const selectedUser= contextApp.selectedUser;
  const selectedKlient= contextApp.selectedKlient;
  const [sortWgEtapu,sortWgFaktur] = useSortowanieZamowienia()

   const inputElement = useRef();

  const tableZamowienia= contextApp.tableZamowienia;

 

const {refreshZamowienia} = useZamowienia()



 return (
   <div ref={tableZamowienia}  className={style.tableContainer} >
     <table className={style.tableZam}>
       <thead className={style.th_head}>
         <tr className={style.table_tr}>

           <th className={style.firma_nazwa}>Data zamówienia</th>
           {/* <th className={style.firma_nazwa}><SELECT_KLIENT_ZAMOWWIENIA/></th> */}
           <th className={style.firma_nazwa}>Klient</th>

           <th className={style.firma_nazwa}>Format</th>
           <th className={style.firma_nazwa}>Ilość</th>
           <th className={style.firma_nazwa}>Uwagi</th>
         

           <th className={style.firma_nazwa}>Firma</th>

      
         </tr>
       </thead>
       <tbody className={style.tableZam}>
         {zamowienia
          //  .filter((zamowienie) => sprawdzDostepZamowienia(zamowienie))
          //  .filter((zam) => {
          //   if (selectedUser == 0) {
          //     return true;
          //   } else {
          //    return  zam.opiekun_id == selectedUser;
          //   }
          // })
          //  .filter(z => z.stan ==3)
          //  .filter((zam) => {
          //   if (selectedKlient == 0) {
          //     return true;
          //   } else {
          //    return  zam.klient_id == selectedKlient;
          //   }
          // })
          // .filter((zamowienie) => sortWgFaktur({zamowienie}))

           .map((row,i) => {
             return (
               <TABLE_ROW_ZAMOWIENIA key={row.id} row={row} open2={open2} setRow={setRow} i={i} />
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