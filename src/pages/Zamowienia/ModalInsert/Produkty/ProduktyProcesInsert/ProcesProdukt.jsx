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
  const procesyElementowTemporary = contexModal.procesyElementowTemporary;
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
            <th className={style.col_indeks}>#</th>
            <th className={style.col_indeks}>indeks</th>
            <th className={style.col_proces}>Proces</th>
            <th className={style.col_typ}>Typ</th>
            <th className={style.col_typ}>Ilość użytków</th>
            <th className={style.col_ilosc}>Front</th>
            <th className={style.col_ilosc}>Back</th>
            <th className={style.col_kolory}>Front kolory</th>
            <th className={style.col_kolory}>Back kolory</th>
            <th className={style.col_wersja}>Uwagi</th>
            <th className={style.col_wersja}>Uwagi</th>
          </tr>
        </thead>
        <tbody>
          {/* {procesyElementowTemporary.length !=0 && procesyElementowTemporary?.filter(x => x.oprawa_id == selectedOprawaRow.id) */}
          {procesyElementowTemporary.length !=0 && procesyElementowTemporary
   
          .sort((a, b) => a.indeks - b.indeks)
          .filter((x) => x.delete != true)
          .map((row, i) => {
            return (
              <tr key={row.id}>
                <td>{i+1}</td>
                <INDEKS row={row}/>
                {/* <ProcesName row={row}/>
                <ProcessTyp row={row}/>
                <IloscUzytkow row={row}/>
                <FrontIlosc row={row}/>
                <BackIlosc row={row}/>
                <FrontKolor row={row}/>
                <BackKolor row={row}/>
                <Info row={row}/>
                <Usun row={row}/> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={style.dodaj_proces_row}>
         <button className={style.btn_dodaj_proces} onClick={()=> addProcessProdukt()}>Dodaj nowy proces</button>
      </div>
     
    </div>
  );
}


const ProcesName = ({ row }) => {
  const contexModal = useContext(ModalInsertContext);
  const contexApp = useContext(AppContext);
  // daneTechEdit = JSON.parse(JSON.stringify(daneTech))
  const procesListEdit = JSON.parse(JSON.stringify(contexApp.procesList))
  const procesList = contexApp.procesList;
  return (
    <td>
      <select
        className={style.select}
        value={row.nazwa_id}
        onChange={(e) => {
          // tutaj ma filtrować się lista wszystkich procesów która wyświetla się w Typie
          // nazwa_id powinna zmienić się chyba w Typie a nie tutaj
          let proc = procesList.filter(x=> x.nazwa_id == e.target.value).map(x=>{return x})
          contexModal.handleUpdateRowProcesyElementow({
            ...row,
            ...proc[0],
            nazwa_id: e.target.value,
             proces_id: procesListEdit.filter( proces => proces.nazwa_id == e.target.value)[0].id,
            update: true,
            historia: false,
            id:row.id
          });

          // console.log("Proces1 NAME: "+procesListEdit.filter( proces => proces.nazwa_id == e.target.value)[0].id)
        }}
      >
        {}
        {contexApp.procesListName?.filter(x=>x.id !=6).map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </td>
  );
};

const ProcessTyp = ({ row }) => {
  const contexModal = useContext(ModalInsertContext);
  const contexApp = useContext(AppContext);
  const selectedElementROW = contexModal.selectedElementROW;
  const procesList = contexApp.procesList;

  return (
    <td>
      <select
        className={style.select}
        value={row.proces_id}
        onChange={(e) => {
          console.log(e.target.value)
          let proc = procesList.filter(x=> x.id == e.target.value).map(x=>{return x})
          contexModal.handleUpdateRowProcesyElementow({
            ...row,
            ...proc[0],
            proces_id: e.target.value,
            update: true,
            historia: false,
            id:row.id
          });
          console.log("Proces1 TYP: "+e.target.value)
        }}
      >
        {}
        {contexApp.procesList
        .filter(p=> p.nazwa_id == contexModal.procesyElementowTemporary.filter(x=> x.element_id == selectedElementROW.id && x.indeks == row.indeks)[0].nazwa_id)

               .map((option) => (
          <option key={option.id} value={option.id}>
            {option.typ} {option.rodzaj} {option.wykonczenie} {option.obszar}
          </option>
        ))}
      </select>
    </td>
  );
};

const BackKolor = ({ row }) => {
  const contexModal = useContext(ModalInsertContext);
  const handleUpdateRowProcesyElementow = contexModal.handleUpdateRowProcesyElementow;
  return (
    <td>
      <input
      className={style.select}
        value={row.back_kolor}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            handleUpdateRowProcesyElementow({
              ...row,
              back_kolor: e.target.value,
              update: true,
              historia: false
            });
          }
        }}
      ></input>
    </td>
  );
}

const FrontKolor = ({ row }) => {
  const contexModal = useContext(ModalInsertContext);
  const handleUpdateRowProcesyElementow = contexModal.handleUpdateRowProcesyElementow;
  return (
    <td>
      <input
       className={style.select}
        value={row.front_kolor}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            handleUpdateRowProcesyElementow({
              ...row,
              front_kolor: e.target.value,
              update: true,
              historia: false
            });
          }
        }}
      ></input>
    </td>
  );
}
const INDEKS = ({ row }) => {
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

const IloscUzytkow = ({ row }) => {
  const contexModal = useContext(ModalInsertContext);
  const handleUpdateRowProcesyElementow = contexModal.handleUpdateRowProcesyElementow;
  return (
    <td>
      <input
      className={style.select}
        value={row.ilosc_uzytkow}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowProcesyElementow({
              ...row,
              ilosc_uzytkow: e.target.value,
              update: true,
              historia: false
            });
          }
        }}
      ></input>
    </td>
  );
}

const FrontIlosc = ({ row }) => {
  const contexModal = useContext(ModalInsertContext);
  const handleUpdateRowProcesyElementow = contexModal.handleUpdateRowProcesyElementow;
  return (
    <td>
      <input
      className={style.select}
        value={row.front_ilosc}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowProcesyElementow({
              ...row,
              front_ilosc: e.target.value,
              update: true,
              historia: false
            });
          }
        }}
      ></input>
    </td>
  );
}

const BackIlosc = ({ row }) => {
  const contexModal = useContext(ModalInsertContext);
  const handleUpdateRowProcesyElementow = contexModal.handleUpdateRowProcesyElementow;
  return (
    <td>
      <input
      className={style.select}
        value={row.back_ilosc}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowProcesyElementow({
              ...row,
              back_ilosc: e.target.value,
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
  const contexModal = useContext(ModalInsertContext);
  const handleUpdateRowProcesyElementow = contexModal.handleUpdateRowProcesyElementow;
  return (
    <td>
      <input
      className={style.select}
        value={row.info}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            handleUpdateRowProcesyElementow({
              ...row,
              info: e.target.value,
              update: true,
              historia: false
            });
          }
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