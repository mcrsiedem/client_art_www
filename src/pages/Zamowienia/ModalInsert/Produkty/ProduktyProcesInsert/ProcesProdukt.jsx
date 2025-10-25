import React, { useEffect, useState, useContext, useRef } from "react";
import style from "./ProcesProdukt.module.css";

import iconTrash from "assets/trash2.svg";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { addNewProcess } from "actions/addProcess";
import { _typ_elementu, reg_int } from "utils/initialvalue";
import { reg_txt } from "utils/initialvalue";
import { useHistoria } from "hooks/useHistoria";

import Window from "./components/Window";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useProcessProdukt } from "./actions/useProcessProdukt";
import ProcesName from "./components/ProcesName";
import ProcessTyp from "./components/ProcesTyp";
import IloscUzytkow from "./components/IloscUzytkow";
import Naklad from "./components/Naklad";
export default function ProcesProdukt() {

    const modalContext = useContext(ModalInsertContext);
  // const appContext = useContext(AppContext);
  const showProcesyProduktow = modalContext.showProcesyProduktow;

if(showProcesyProduktow){
    return (
   <Window>
      <Header />
      <Table />
      <Footer />
   </Window>
  );
}

}

function Table() {
  const contexApp = useContext(AppContext);
  const contexModal = useContext(ModalInsertContext);
  const procesyElementow = contexModal.procesyElementow;
  const procesyProduktowTemporary = contexModal.procesyProduktowTemporary;
  const setProcesyElementowTemporary = contexModal.setProcesyElementowTemporary;
  const procesyProduktow = contexModal.procesyProduktow;
  const procesList = contexApp.procesList;
  const {addProcessProdukt} = useProcessProdukt();



  const selectedOprawaRow = contexModal.selectedOprawaRow;

  return (
    <div className={style.main}>
      <table className={style.table}>
        <thead>
          <tr>
            <th className={style.expand}>ID</th>
            <th className={style.expand}>#</th>
            <th className={style.col_proces}>Proces</th>
            <th className={style.col_proces}>Typ</th>
            <th className={style.col_ilosc_uzytkow}>Ilość użytków</th>
            <th className={style.col_naklad}>Naklad</th>

            <th className={style.col_wersja}>Opis</th>
            <th className={style.col_wersja}></th>
            {/* <th className={style.col_wersja}>Uwagi</th> */}
          </tr>
        </thead>
        <tbody>
          {/* {procesyElementowTemporary.length !=0 && procesyElementowTemporary?.filter(x => x.oprawa_id == selectedOprawaRow.id) */}
          {procesyProduktowTemporary?.sort((a, b) => a.indeks - b.indeks)
          .filter((x) => x.delete != true)
          .map((row, i) => {
            return (
              <tr key={row.id}>
                <td className={style.select_indeks}>{row.id}</td>
                <Indeks row={row}/>
                 <ProcesName row={row}/>
                 <ProcessTyp row={row}/> 
                 <IloscUzytkow row={row}/>
                 <Naklad row={row}/>
                 {/* <ProcessTyp row={row}/> */}
                {/* <ProcesName row={row}/>
                {/* <ProcessTyp row={row}/>
                <IloscUzytkow row={row}/>
                <FrontIlosc row={row}/>
                <BackIlosc row={row}/>
                <FrontKolor row={row}/>
                <BackKolor row={row}/> */}
                <Info row={row}/>
                <Usun row={row}/> 
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={style.dodaj_proces_row}>
         <button className={style.btn_dodaj_proces} onClick={()=> addProcessProdukt()}>Nowy</button>
      </div>
     
    </div>
  );
}


const Indeks = ({ row }) => {
  const contexModal = useContext(ModalInsertContext);
  const handleUpdateRowProcesyElementow = contexModal.handleUpdateRowProcesyElementow;
  return (
    <td>
      <input
      className={style.select_indeks}
        value={row.indeks}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowProcesyElementow({
              ...row,
              indeks: e.target.value,
              update: true,
              historia: false
            });
          }
        }}
      ></input>
    </td>
  );
}






const Info = ({ row }) => {
  // const contexModal = useContext(ModalInsertContext);
  // const handleUpdateRowProcesyElementow = contexModal.handleUpdateRowProcesyElementow;
    const CONTEXT_MODAL = useContext(ModalInsertContext);
  
  return (
    <td>
      <input
      className={style.input_opis}
        value={row.info}
        onChange={(e) => {
    
          CONTEXT_MODAL.setProcesyProduktowTemporary((prev) =>
            prev.map((proces) =>
              proces.id === row.id
                ? {
                    ...row,
                    info:e.target.value,
                    update: true,
                    historia: false,
                    id: row.id,
                  }
                : proces
            )
          );
        
        }}
      ></input>
    </td>
  );
}

function Usun({ row}) {
  const contexModal = useContext(ModalInsertContext);
  const procesyElementowTemporary = contexModal.procesyElementowTemporary;
  const setProcesyElementowTemporary = contexModal.setProcesyElementowTemporary;
  const elementy = contexModal.elementy;
  const daneZamowienia = contexModal.daneZamowienia;
    const [add] = useHistoria()
  return (
    <td className={style.col_button}>
      <div>
        <img
          className={style.expand}
          src={iconTrash}
          onClick={() => {

            if(row.zamowienie_id == 1){
              setProcesyElementowTemporary(procesyElementowTemporary.filter((p) => p.id !== row.id));

            }else{
           setProcesyElementowTemporary((prev) =>
              prev.map((t, a) => {
                if (t.id == row.id) {
                  return {
                    ...t,
                    delete: true
                  };
                } else {
                  return t;
                }
              })
            );

      

            }
          
 
      
          }}
          alt="Procesy"
        />
      </div>
    </td>
  );
}