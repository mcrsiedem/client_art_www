import React, { useEffect, useState, useContext, useRef } from "react";
import style from "./ProcesElementTech.module.css";
import iconX from "assets/xDark.svg";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { addNewProcess } from "actions/addProcess";
import { TechnologyContext } from "context/TechnologyContext";
import { reg_txt } from "utils/initialvalue";
import { reg_int } from "utils/initialvalue";
import { addNewProcessTech } from "actions/addNewProcessTech";
export default function ProcesElementTech() {


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
  const techContext = useContext(TechnologyContext);
  const modalContext = useContext(ModalInsertContext);
  const appContext = useContext(AppContext);
  const rowElement = techContext.selectedElementTechROW;
  return (
    <div className={style.header}>
      <p className={style.title}>Procesy Technologia - <p className={style.title2}>{appContext.typ_elementu.filter(x => x.id == rowElement.typ)[0].nazwa} {rowElement.naklad} szt. {rowElement.nazwa}</p> </p> 
      <Zamknij/>
    </div>
  );
}
function Zamknij() {

  const techContext = useContext(TechnologyContext);

  return (
    <img
      className={style.zamknij_icon}
      src={iconX}
      onClick={() => {
        techContext.setShowElementyTechProcesyInsert(false);
 
      }}
      alt="Procesy"
    />
  );
}

function Footer() {
  const techContext = useContext(TechnologyContext);


  const setProcesyElementowTech = techContext.setProcesyElementowTech;
  const procesyElementowTechTemporary = techContext.procesyElementowTechTemporary;
  return (
    <div className={style.footer}>
      <button
        className={style.btn}
        onClick={() => {
        
    
          techContext.setShowElementyTechProcesyInsert(false);
          setProcesyElementowTech(procesyElementowTechTemporary)

        }}
      >
        Zapisz
      </button>
    </div>
  );
}

function Table() {
  const techContext = useContext(TechnologyContext);
  // const contexApp = useContext(AppContext);
  // const contexModal = useContext(ModalInsertContext);
  // const procesyElementow = contexModal.procesyElementow;
  const procesyElementowTechTemporary = techContext.procesyElementowTechTemporary;
  const procesyElementowTech = techContext.procesyElementowTech;
  const setProcesyElementowTechTemporary = techContext.setProcesyElementowTechTemporary;


  const selectedElementTechROW = techContext.selectedElementTechROW;

  return (
    <div className={style.main}>
      <table className={style.table}>
        <thead>
          <tr>
            <th className={style.col_indeks}>#</th>
            {/* <th className={style.col_indeks}>id</th>
            <th className={style.col_indeks}>zam</th>
            <th className={style.col_indeks}>prod</th>
            <th className={style.col_indeks}>element</th> */}
            <th className={style.col_proces}>Proces</th>
            <th className={style.col_typ}>Typ</th>
            <th className={style.col_ilosc}>Front</th>
            <th className={style.col_ilosc}>Back</th>
            <th className={style.col_kolory}>Front kolory</th>
            <th className={style.col_kolory}>Back kolory</th>
            <th className={style.col_wersja}>Uwagi</th>
          </tr>
        </thead>
        <tbody>
          {procesyElementowTechTemporary
          .filter(x => x.element_id == selectedElementTechROW.id)
          .sort((a, b) => a.indeks - b.indeks)
          .map((row, i) => { 
            return <ProcesTechRow row={row} i={i}/>
            })}
        </tbody>
      </table>
      <div className={style.dodaj_proces_row}>
         <button className={style.btn_dodaj_proces} onClick={
        ()=>addNewProcessTech(selectedElementTechROW,procesyElementowTechTemporary,setProcesyElementowTechTemporary)
// ()=>{
//   console.log("procesty temp",techContext.procesyElementowTechTemporary)
//   console.log("procesty ",techContext.procesyElementowTech)
// }
          }>Dodaj nowy proces</button>
      </div>
     
    </div>
  );
}

const ProcesTechRow =({row,i})=>{
  const [procesID, setProcesID] = useState(row.nazwa_id); 
  return(
    <tr key={row.id}>
    <td>{i+1}</td>
    <ProcesName row={row} setProcesID={setProcesID}/>
    <ProcessTyp row={row} procesID={procesID}/>
    <FrontIlosc row={row}/>
    <BackIlosc row={row}/>
    <FrontKolor row={row}/>
    <BackKolor row={row}/>
    <Info row={row}/>
  </tr>
  )
}

const ProcesName = ({ row,setProcesID }) => {
  const contexModal = useContext(ModalInsertContext);
  const contexApp = useContext(AppContext);
  const techContext = useContext(TechnologyContext);
  return (
    <td>
      <select
        className={style.select}
        defaultValue={row.nazwa_id}
        onChange={(e) => {
          // console.log("proces2 ",e.target.value)
          setProcesID(e.target.value)
          // tutaj ma filtrować się lista wszystkich procesów która wyświetla się w Typie
          // nazwa_id powinna zmienić się chyba w Typie a nie tutaj
          techContext.handleUpdateRowProcesyElementowTech({
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

const ProcessTyp = ({ row,procesID }) => {
  const contexModal = useContext(ModalInsertContext);
  const contexApp = useContext(AppContext);
  const techContext = useContext(TechnologyContext);
  const selectedElementTechROW = techContext.selectedElementTechROW;

  return (
    <td>
      <select
        className={style.select}
        defaultValue={row.proces_id}
        onChange={(e) => {
          console.log(e.target.value)
          techContext.handleUpdateRowProcesyElementowTech({
            ...row,
            proces_id: e.target.value,
          });
        }}
      >
        {}
        {contexApp.procesList
        // .filter(p=> p.nazwa_id == contexModal.procesyElementowTemporary.filter(x=> x.element_id == selectedElementROW.id )[0].nazwa_id)
        // .filter(p=> p.nazwa_id == techContext.procesyElementowTechTemporary.filter(x=> x.element_id == selectedElementTechROW.id && x.indeks == row.indeks)[0].nazwa_id)
        .filter(p=> p.nazwa_id == procesID)
     

               .map((option) => (
          <option key={option.id} value={option.id}>
            {option.typ} {option.rodzaj} {option.wykonczenie} {option.obszar}
          </option>
        ))}
      </select>
    </td>
  );
};

const Info = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowProcesyElementowTech = techContext.handleUpdateRowProcesyElementowTech;
  return (
    <td>
      <input
        defaultValue={row.info}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            handleUpdateRowProcesyElementowTech({
              ...row,
              info: e.target.value,
            });
          }
        }}
      ></input>
    </td>
  );
}

const BackKolor = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowProcesyElementowTech = techContext.handleUpdateRowProcesyElementowTech;
  return (
    <td>
      <input
        defaultValue={row.back_kolor}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            handleUpdateRowProcesyElementowTech({
              ...row,
              back_kolor: e.target.value,
            });
          }
        }}
      ></input>
    </td>
  );
}

const FrontKolor = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowProcesyElementowTech = techContext.handleUpdateRowProcesyElementowTech;
  return (
    <td>
      <input
        defaultValue={row.front_kolor}
        onChange={(e) => {
          if (e.target.value === "" || reg_txt.test(e.target.value)) {
            handleUpdateRowProcesyElementowTech({
              ...row,
              front_kolor: e.target.value,
            });
          }
        }}
      ></input>
    </td>
  );
}

const FrontIlosc = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowProcesyElementowTech = techContext.handleUpdateRowProcesyElementowTech;
  return (
    <td>
      <input
        defaultValue={row.front_ilosc}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowProcesyElementowTech({
              ...row,
              front_ilosc: e.target.value,
            });
          }
        }}
      ></input>
    </td>
  );
}

const BackIlosc = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const handleUpdateRowProcesyElementowTech = techContext.handleUpdateRowProcesyElementowTech;
  return (
    <td>
      <input
        defaultValue={row.back_ilosc}
        onChange={(e) => {
          if (e.target.value === "" || reg_int.test(e.target.value)) {
            handleUpdateRowProcesyElementowTech({
              ...row,
              back_ilosc: e.target.value,
            });
          }
        }}
      ></input>
    </td>
  );
}