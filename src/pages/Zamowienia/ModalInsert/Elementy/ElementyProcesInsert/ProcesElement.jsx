import React, { useEffect, useState, useContext, useRef } from "react";
import style from "./ProcesElement.module.css";
import iconX from "assets/xDark.svg";
import iconTrash from "assets/trash2.svg";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { addNewProcess } from "actions/addProcess";
import { _typ_elementu, reg_int } from "utils/initialvalue";
import { reg_txt } from "utils/initialvalue";
import { useHistoria } from "hooks/useHistoria";
import { getNameOfElement } from "actions/getNameOfElement";
export default function ProcesElement({showElementyProcesyInsert}) {

if(showElementyProcesyInsert){
    return (
   <Window>
      <Header />
      <Table />
      <Footer />
   </Window>
  );
}

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
  const appContext = useContext(AppContext);
  const rowElement = modalContext.selectedElementROW;
  return (
    <div className={style.header}>
      <p className={style.title}>Procesy - <p className={style.title2}>{appContext.typ_elementu?.filter(x => x.id == rowElement?.typ)[0]?.nazwa} {rowElement?.naklad} szt. {rowElement?.nazwa}</p> </p> 
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
        modalContext.setShowElementyProcesyInsert(false);
 
      }}
      alt="Procesy"
    />
  );
}

function Footer() {
  const modalContext = useContext(ModalInsertContext);
  const setProcesyElementow = modalContext.setProcesyElementow;
  const procesyElementowTemporary = modalContext.procesyElementowTemporary;
    const contextModalInsert = useContext(ModalInsertContext);
    const elementy = contextModalInsert.elementy
    const daneZamowienia = contextModalInsert.daneZamowienia
    const [add] = useHistoria()

  return (
    <div className={style.footer}>
      <button
        className={style.btn}
        onClick={() => {
          modalContext.setShowElementyProcesyInsert(false);
          setProcesyElementow(procesyElementowTemporary)


procesyElementowTemporary.filter(x=>x.delete== true).forEach(row => {
            add(         {
            kategoria: "Procesy",
            event: getNameOfElement(row.element_id,elementy,_typ_elementu)+ " - kasowanie procesu - "+row.nazwa+" "+row.rodzaj + " "+row.typ,
            zamowienie_id: daneZamowienia.id
          })
});

procesyElementowTemporary.filter(x=>x.insert== true).forEach(row => {
  add(         {
  kategoria: "Procesy",
  event: getNameOfElement(row.element_id,elementy,_typ_elementu)+ " - dodanie procesu - "+row.nazwa+" "+row.rodzaj + " "+row.typ,
  zamowienie_id: daneZamowienia.id
})
});

        }}
      >
        Zapisz
      </button>
    </div>
  );
}

function Table() {
  const contexApp = useContext(AppContext);
  const contexModal = useContext(ModalInsertContext);
  const procesyElementow = contexModal.procesyElementow;
  const procesyElementowTemporary = contexModal.procesyElementowTemporary;
  const setProcesyElementowTemporary = contexModal.setProcesyElementowTemporary;
  const procesList = contexApp.procesList;



  const selectedElementROW = contexModal.selectedElementROW;

  return (
    <div className={style.main}>
      <table className={style.table}>
        <thead>
          <tr>
            <th className={style.col_indeks}>#</th>
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
          {procesyElementowTemporary
          .filter(x => x.element_id == selectedElementROW.id)
          .sort((a, b) => a.indeks - b.indeks)
          .filter((x) => x.delete != true)
          .map((row, i) => {
            return (
              <tr key={row.id}>
                <td>{i+1}</td>
                <ProcesName row={row}/>
                <ProcessTyp row={row}/>
                <IloscUzytkow row={row}/>
                <FrontIlosc row={row}/>
                <BackIlosc row={row}/>
                <FrontKolor row={row}/>
                <BackKolor row={row}/>
                <Info row={row}/>
                <Usun row={row}/>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={style.dodaj_proces_row}>
         <button className={style.btn_dodaj_proces} onClick={()=>addNewProcess(selectedElementROW,procesyElementowTemporary,setProcesyElementowTemporary,procesList)}>Dodaj nowy proces</button>
      </div>
     
    </div>
  );
}


const ProcesName = ({ row }) => {
  const contexModal = useContext(ModalInsertContext);
  const contexApp = useContext(AppContext);
  // daneTechEdit = JSON.parse(JSON.stringify(daneTech))
  const procesListEdit = JSON.parse(JSON.stringify(contexApp.procesList))
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
             proces_id: procesListEdit.filter( proces => proces.nazwa_id == e.target.value)[0].id,
            update: true
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
        value={row.proces_id}
        onChange={(e) => {
          console.log(e.target.value)
          contexModal.handleUpdateRowProcesyElementow({
            ...row,
            proces_id: e.target.value,
            update: true
          });
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
              update: true
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
              update: true
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
              update: true
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
              update: true
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
              update: true
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
              update: true
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