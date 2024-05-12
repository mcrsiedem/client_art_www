import React, { useEffect, useState, useContext, useRef } from "react";
import style from "./KosztyDodatkoweEdit.module.css";
import iconX from "assets/xDark.svg";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { addNewProcess } from "actions/addProcess";
import { reg_cena, reg_int, reg_txt } from "utils/initialvalue";

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
const handleUpdateKosztyDodatkoweTemporary = modalContext.handleUpdateKosztyDodatkoweTemporary;

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
                    <Nazwa row={row} handleUpdateKosztyDodatkoweTemporary={handleUpdateKosztyDodatkoweTemporary} />
                    <Ilosc row={row} handleUpdateKosztyDodatkoweTemporary={handleUpdateKosztyDodatkoweTemporary}/>
                    <Cena row={row} handleUpdateKosztyDodatkoweTemporary={handleUpdateKosztyDodatkoweTemporary}/>
                    <Suma row={row} handleUpdateKosztyDodatkoweTemporary={handleUpdateKosztyDodatkoweTemporary}/>
                    <Info row={row} handleUpdateKosztyDodatkoweTemporary={handleUpdateKosztyDodatkoweTemporary}/>

     
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


function Indeks({ row }) {
  return (
    <td  className={style.col_indeks}>{row.indeks}</td>
  );
}
function Nazwa({ row,handleUpdateKosztyDodatkoweTemporary }) {
  return (
    <td>
      <input
        className={style.in}
        value={row.nazwa}
        onChange={(e) =>
          {
            if ( e.target.value === '' || reg_txt.test(e.target.value)) {
              handleUpdateKosztyDodatkoweTemporary({
            ...row,
            nazwa: e.target.value,
          })}}
        }
      ></input>
    </td>
  );
}
function Ilosc({ row, handleUpdateKosztyDodatkoweTemporary }) {
  return (
    <td>
      <input
        className={style.in}
        value={row.ilosc}
      
        onChange={(e) => {

          const re = /^[0-9]+$/;
          if (e.target.value === '' || reg_int.test(e.target.value)) {
          
            handleUpdateKosztyDodatkoweTemporary({
            ...row,
            ilosc: e.target.value,
          })
        }
      }

          
        }
      ></input>
    </td>
  );
}
function Cena({ row, handleUpdateKosztyDodatkoweTemporary }) {
  return (
    <td>
      <input
        className={style.in}
        value={row.cena}
      
        onChange={(e) => {

   
          if ( e.target.value === '' || reg_cena.test(e.target.value)) {
          
            handleUpdateKosztyDodatkoweTemporary({
            ...row,
            cena: e.target.value,
          })
        }
      }

          
        }
      ></input>
    </td>
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