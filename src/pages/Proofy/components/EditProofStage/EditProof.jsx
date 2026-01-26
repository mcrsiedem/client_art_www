import React, { useEffect, useState, useContext, useRef } from "react";
import style from "./EditProof.module.css";

import { ModalInsertContext } from "context/ModalInsertContext";
import { _typ_elementu, reg_int } from "utils/initialvalue";

import Window from "./components/Window";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useProcessProdukt } from "./actions/useProcessProdukt";
import ProcesName from "./components/ProcesName";
import ProcessTyp from "./components/ProcesTyp";
import IloscUzytkow from "./components/IloscUzytkow";
import Naklad from "./components/Naklad";
import Info from "./components/Info";
import Indeks from "./components/Indeks";
import Usun from "./components/Usun";
import { AppContext } from "context/AppContext";
export default function EditProof({showEditProof,setShowEditProof}) {

    const modalContext = useContext(ModalInsertContext);
  const showProcesyProduktow = modalContext.showProcesyProduktow;

if(showEditProof){
    return (
   <Window>
      <Header setShowEditProof={setShowEditProof}/>
      <Table />
      <Footer setShowEditProof={setShowEditProof}/>
   </Window>
  );
}

}

function Table() {
  const contexModal = useContext(ModalInsertContext);
  const procesyProduktowTemporary = contexModal.procesyProduktowTemporary;
  const {addProcessProdukt} = useProcessProdukt();
  return (
    <div className={style.main}>
      <table className={style.table}>
        <thead>
          <tr className={style.table_tr}>
            {/* <th className={style.expand}>ID</th> */}
            <th className={style.expand}>#</th>
            <th className={style.col_mala}>Data</th>
            <th className={style.expand2}>Klient</th>
            <th className={style.col_mala}>Format</th>
            <th className={style.col_mala}>Ilość</th>
            <th className={style.col_srednia}>Faktura</th>
            <th className={style.expand2}>Uwagi</th>
            {/* <th className={style.col_wersja}>Uwagi</th> */}
          </tr>
        </thead>
        <tbody>
          {/* {procesyProduktowTemporary?.sort((a, b) => a.indeks - b.indeks) */}
          {procesyProduktowTemporary
          ?.filter((x) => x.delete != true)
          .map((row, i) => {
            return (
              <tr key={row.id}>
                {/* <td className={style.select_indeks}>{row.id}</td> */}
                <Id row={row}/>
                 <Data row={row}/>
                 <Klient row={row}/>
                 <Format row={row}/>
                 <Ilosc row={row}/>
                 <NrFaktury row={row}/>
                 <Uwagi row={row}/>
                 
                 {/* <ProcessTyp row={row}/> 
                 <IloscUzytkow row={row}/>
                 <Naklad row={row}/>
                <Info row={row}/>
                <Usun row={row}/>  */}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div className={style.dodaj_proces_row}>
         <button className={style.btn_dodaj_proces} onClick={()=> addProcessProdukt()}>Nowy</button>
      </div> */}
     
    </div>
  );
}


function Id ({ row })  {
  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.klient}
      className={style.col_id}
      value={row.id}
      readOnly

    />
    </td>
   
  );
};
function Format ({ row })  {
      const contextModalInsert = useContext(ModalInsertContext);
  const procesyProduktowTemporary = contextModalInsert.procesyProduktowTemporary;
  const setProcesyProduktowTemporary = contextModalInsert.setProcesyProduktowTemporary;
  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.klient}
      className={style.col}
      value={row.format}
               onChange={(event) => {
          setProcesyProduktowTemporary(
      procesyProduktowTemporary.map((t) => {
        if (t.id == row.id) {
          return {...t,
            format: event.target.value,
            update: true
          }
        } else {
          return t;
        }
      })
    );
        
         }}

    />
    </td>
   
  );
};

function Klient ({ row })  {
    const contextModalInsert = useContext(ModalInsertContext);
  const procesyProduktowTemporary = contextModalInsert.procesyProduktowTemporary;
  const setProcesyProduktowTemporary = contextModalInsert.setProcesyProduktowTemporary;
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  const contextApp = useContext(AppContext);
  return (
    <td>
<select
        className={style.col_klient}
        value={row.klient_id}
        onChange={(event) => {
            // setProcesyProduktowTemporary([{...procesyProduktowTemporary, klient_id: event.target.value,update: true}]);


setProcesyProduktowTemporary(
      procesyProduktowTemporary.map((t) => {
        if (t.id == row.id) {
          return {...t,
            klient_id: event.target.value,
            update: true
          }
        } else {
          return t;
        }
      })
    );

        }}
      >
        <option key={1} value={"0"}> 
           wybierz...
          </option>
        {contextApp.clients

        .map((option) => (
          <option key={option.id} value={option.id}>
            {option.firma}
          </option>
        ))}
      </select>
    </td>
   
  );
};




function Ilosc ({ row })  {
  const contextModalInsert = useContext(ModalInsertContext);
  const procesyProduktowTemporary = contextModalInsert.procesyProduktowTemporary;
  const setProcesyProduktowTemporary = contextModalInsert.setProcesyProduktowTemporary;
  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.klient}
      className={style.col}
      value={row.ilosc}
                     onChange={(event) => {
          setProcesyProduktowTemporary(
      procesyProduktowTemporary.map((t) => {
        if (t.id == row.id) {
          return {...t,
            ilosc: event.target.value,
            update: true
          }
        } else {
          return t;
        }
      })
    );
        
         }}

    />
    </td>
   
  );
};
function Data({row}){
  const contextModalInsert = useContext(ModalInsertContext);
  const procesyProduktowTemporary = contextModalInsert.procesyProduktowTemporary;
  const setProcesyProduktowTemporary = contextModalInsert.setProcesyProduktowTemporary;
  const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled;
  return(
  <td>
      <input className={style.select} type="date"
         value={row.data_zamowienia}
        //  disabled
         onChange={(event) => {
          setProcesyProduktowTemporary(
      procesyProduktowTemporary.map((t) => {
        if (t.id == row.id) {
          return {...t,
            data_zamowienia: event.target.value,
            update: true
          }
        } else {
          return t;
        }
      })
    );
        
         }}></input>
         </td>
  
  );
}

function NrFaktury ({ row })  {
  const contextModalInsert = useContext(ModalInsertContext);
  const procesyProduktowTemporary = contextModalInsert.procesyProduktowTemporary;
  const setProcesyProduktowTemporary = contextModalInsert.setProcesyProduktowTemporary;
  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.klient}
      className={style.col}
      value={row.nr_faktury}
                     onChange={(event) => {
          setProcesyProduktowTemporary(
      procesyProduktowTemporary.map((t) => {
        if (t.id == row.id) {
          return {...t,
            nr_faktury: event.target.value,
            update: true
          }
        } else {
          return t;
        }
      })
    );
        
         }}

    />
    </td>
   
  );
};


function Uwagi ({ row })  {
  const contextModalInsert = useContext(ModalInsertContext);
  const procesyProduktowTemporary = contextModalInsert.procesyProduktowTemporary;
  const setProcesyProduktowTemporary = contextModalInsert.setProcesyProduktowTemporary;
  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.klient}
      className={style.col}
      value={row.uwagi}
                     onChange={(event) => {
          setProcesyProduktowTemporary(
      procesyProduktowTemporary.map((t) => {
        if (t.id == row.id) {
          return {...t,
            uwagi: event.target.value,
            update: true
          }
        } else {
          return t;
        }
      })
    );
        
         }}

    />
    </td>
   
  );
};