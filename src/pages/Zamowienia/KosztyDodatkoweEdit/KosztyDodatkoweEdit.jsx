import React, { useEffect, useState, useContext, useRef } from "react";
import style from "./KosztyDodatkoweEdit.module.css";
import iconX from "assets/xDark.svg";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { addNewProcess } from "actions/addProcess";
export default function KosztyDodatkoweEdit() {


  return (
   <Window>
      <Header />
      <Table />
      <Footer />
   </Window>
  );
}


function Window({children}) {
  return (
    <div className={style.blurContainer}>
      <div className={style.window}>{children}</div>
    </div>
  );
}


function Header() {
  const modalContext = useContext(ModalInsertContext);

  const selectedKoszt = modalContext.selectedKosztyDodatkoweZamowienia;

  return (
    <div className={style.header}>
      <p className={style.title}>Koszty dodatkowe <p className={style.title2}> </p> </p> 
      <Zamknij/>
    </div>
  );
}
function Zamknij() {
  const modalContext = useContext(ModalInsertContext);


  return (
    <img
      className={style.zamknij_icon}
      src={iconX}
      onClick={() => {
        modalContext.setShowKosztyDodatkoweEdit(false);
 
      }}
      alt="Procesy"
    />
  );
}

function Footer() {
  const modalContext = useContext(ModalInsertContext);
  const setKosztyDodatkowe = modalContext.setKosztyDodatkowe;
  const kosztyDodatkoweTemporary = modalContext.kosztyDodatkoweTemporary;

  return (
    <div className={style.footer}>
      <button
        className={style.btn}
        onClick={() => {
          modalContext.setShowKosztyDodatkoweEdit(false);
          setKosztyDodatkowe(kosztyDodatkoweTemporary)
        }}
      >
        Zapisz
      </button>
    </div>
  );
}

function Table() {
  const modalContext = useContext(ModalInsertContext);

  // const procesyElementowTemporary = contexModal.procesyElementowTemporary;
  // const setProcesyElementowTemporary = contexModal.setProcesyElementowTemporary;
  // const selectedElementROW = contexModal.selectedElementROW;

const kosztyDodatkoweTemporary = modalContext.kosztyDodatkoweTemporary;
const setKosztyDodatkoweTemporary = modalContext.setKosztyDodatkoweTemporary;
const selectedKoszt = modalContext.selectedKosztyDodatkoweZamowienia;
const kosztyDodatkoweZamowienia = modalContext.kosztyDodatkoweZamowienia;
  return (
    <div className={style.main}>
      <table className={style.table}>
        <thead>
          <tr>
          <th className={style.col2}>#</th>
                <th className={style.col3}>Nazwa</th>
                <th className={style.col10}>Ilość</th>
                <th className={style.col10}>Cena</th>
                <th className={style.col10}>Suma</th>
                <th className={style.col10}>Uwagi</th>
          </tr>
        </thead>
        <tbody>
          {kosztyDodatkoweTemporary
          // .filter(x => x.element_id == selectedElementROW.id)
          // .sort((a, b) => a.indeks - b.indeks)
          .map((row, i) => {
            return (
              <tr
                    key={row.id}
                  >
                    <Indeks row={row}/>
                    <Nazwa row={row} />
                    <Ilosc row={row} />
                    <Cena row={row} />
                    <Suma row={row} />
                    <Info row={row} />

     
                  </tr>
            );
          })}

<tr
           
           >
             <td></td>
             <td></td>
             <td></td>
             <td className={style.td_razem}>Razem:</td>
   
             <td className={style.td_suma }> {kosztyDodatkoweZamowienia[0].suma}</td>
             <td></td>


           </tr>
        </tbody>
      </table>
      <div className={style.dodaj_proces_row}>
         {/* <button className={style.btn_dodaj_proces} onClick={()=>addNewProcess(selectedElementROW,procesyElementowTemporary,setProcesyElementowTemporary)}>Dodaj nowy proces</button> */}
      </div>
     
    </div>
  );
}


const ProcesName = ({ row }) => {
  const contexModal = useContext(ModalInsertContext);
  const contexApp = useContext(AppContext);

  return (
    <td>
      <select
        className={style.select}
        defaultValue={row.nazwa_id}
        onChange={(e) => {
          // tutaj ma filtrować się lista wszystkich procesów która wyświetla się w Typie
          // nazwa_id powinna zmienić się chyba w Typie a nie tutaj
          contexModal.handleUpdateRowProcesyElementow({
            ...row,
            nazwa_id: e.target.value,
          });
        }}
      >
        {}
        {contexApp.procesListName.map((option) => (
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

  return (
    <td>
      <select
        className={style.select}
        defaultValue={row.proces_id}
        onChange={(e) => {
          console.log(e.target.value)
          contexModal.handleUpdateRowProcesyElementow({
            ...row,
            proces_id: e.target.value,
          });
        }}
      >
        {}
        {contexApp.procesList
        // .filter(p=> p.nazwa_id == contexModal.procesyElementowTemporary.filter(x=> x.element_id == selectedElementROW.id )[0].nazwa_id)
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


function Indeks({ row }) {
  return (
    <td>{row.indeks}</td>
  );
}
function Nazwa({ row }) {
  return (
    <td>{row.nazwa}</td>
  );
}
function Ilosc({ row }) {
  return (
    <td>{row.ilosc}</td>
  );
}
function Cena({ row }) {
  return (
    <td>{row.cena}</td>
  );
}
function Suma({ row }) {
  return (
    <td>{row.cena}</td>
  );
}
function Info({ row }) {
  return (
    <td>{row.cena}</td>
  );
}