import React, { useState, useRef, useContext } from "react";
import style from "./TablePaperGrupa.module.css";
import { AppContext } from "context/AppContext";
import PaperNazwaRow from "./PaperNazwaRow";

export default function TablePaperGrupa({
  paperSelectView,
  setPaperSelectView,
  selectRow,
  setSelectRow,
  setBtnZapisz,
  setSelectTable,
}) {
  const inputElement = useRef();
  const appcontext = useContext(AppContext);
  const listaPapierowGrupaWyszukiwarka =
    appcontext.listaPapierowGrupaWyszukiwarka;
  const setListaPapierowGrupaWyszukiwarka =
    appcontext.setListaPapierowGrupaWyszukiwarka;
  const listaPapierow = appcontext.listaPapierow;
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const listaPapierowNazwyWyszukiwarka = appcontext.listaPapierowNazwyWyszukiwarka;
  const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;
  const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
  const lockDragDropPapier = appcontext.lockDragDropPapier;
  
  function handleDragOver(e) {
    if(lockDragDropPapier){
        e.preventDefault();
    }
  
  }
  function handleDrop(id) {


    console.log(id)
    // sprawdza czy upuszczamy właściwy obiekt
    if (sessionStorage.getItem("typ_drag") == "paper_row") {
      let id_drag_element = sessionStorage.getItem("id_element_drag"); // nazwa_id
      let id_drop_oprawa = id;


      setListaPapierowNazwyWyszukiwarka(
        listaPapierowNazwyWyszukiwarka.map((t) => {
          if (t.id == id_drag_element) {
            return {...t,
              grupa_id: id_drop_oprawa,
              update: true
            
            }
          } else {
            return t;
          }
        })
      );

     setBtnZapiszPapierDisabled(false)
      // handleChangeCardFragmentyOprawaId(id_drag_element, id_drop_oprawa);
    }

    

  }

  const color = (row) => {
    if (row.select) {
      return style.tr_select;
    }
    if (row.delete) {
      return style.tr_delete;
    }
    if (row.insert) {
      return style.tr_insert;
    }
    if (row.update) {
      return style.tr_update;
    }

    return style.tr;
  };

  if (paperSelectView[2].view == true) {
    return (
      <div ref={inputElement} className={style.main}>
        <table className={style.table2}>
          <thead>
            <tr>
              <th className={style.id}></th>
              <th className={style.id}>Grupa</th>
              <th className={style.id}></th>
              <th className={style.nazwa}>Nazwa papieru</th>
              <th className={style.gramatura}>Gramatura</th>
              <th className={style.wykonczenie}>Wykonczenie</th>
              <th className={style.bulk}>Bulk</th>
              <th className={style.powleczenie}>Powleczenie</th>
              <th className={style.info}>Uwagi</th>
              
            </tr>
          </thead>
          <tbody className={style.center}>
            {listaPapierowGrupaWyszukiwarka?.map((row, index) => {
              return (
                <>
                                <tr
                  className={color(row)}
                  key={row.id}
                  onDrop={() => handleDrop(row.id)}
                  onDragOver={handleDragOver}
                  onClick={() => {
                    setSelectRow(row);
                    setSelectTable(inputElement);
                    setListaPapierowGrupaWyszukiwarka((prev) =>
                      prev
                        .map((t, a) => {
                          return {
                            ...t,
                            select: false,
                          };
                        })
                        .map((t, a) => {
                          if (t.id == row.id) {
                            return {
                              ...t,
                              select: true,
                            };
                          } else {
                            return t;
                          }
                        })
                    );







                    setListaPapierowWyszukiwarka((prev) =>
                      prev
                        .map((t, a) => {
                          return {
                            ...t,
                            select: false,
                          };
                        })
      
                    );
        
                    setListaPapierowNazwyWyszukiwarka((prev) =>
                      prev
                        .map((t, a) => {
                          return {
                            ...t,
                            select: false,
                          };
                        })
                  
                    );


                  }}

                >
                  <td></td>

                  {/* <ID row={row} index={index + 1} /> */}
                  <Grupa row={row} setBtnZapisz={setBtnZapisz} />
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>

                </tr>

          {listaPapierowNazwyWyszukiwarka?.filter(x=> x.grupa_id == row.id).map((rowPapierNazwy, index) => {
            return (
              // <tr className={row.insert ? style.tr_insert : style.tr}
              <PaperNazwaRow  rowPapierNazwy={rowPapierNazwy} setPaperSelectView={setPaperSelectView} paperSelectView={paperSelectView} selectRow={selectRow} index={index} setBtnZapisz={setBtnZapisz} setSelectRow={setSelectRow} setSelectTable={setSelectTable} inputElement={inputElement}/>
            );
          })}


                </>

              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

function ID({ row, index }) {
  return <td>{index}</td>;
}
function Grupa({ row }) {
  const appcontext = useContext(AppContext);
  const setListaPapierowGrupaWyszukiwarka =
    appcontext.setListaPapierowGrupaWyszukiwarka;
  const listaPapierowGrupaWyszukiwarka =
    appcontext.listaPapierowGrupaWyszukiwarka;

  const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
  return (
    <td className={style.labelinput}>
      <input
        className={style.input_info}
        type="text"
        value={row.grupa}
        onChange={(event) => {
          const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ"-.]+$/;
          if (event.target.value === "" || re.test(event.target.value)) {
            setListaPapierowGrupaWyszukiwarka(
              listaPapierowGrupaWyszukiwarka.map((t, a) => {
                if (t.id == row.id) {
                  return {
                    ...t,
                    grupa: event.target.value,
                    update: true,
                  };
                } else {
                  return t;
                }
              })
            );
            setBtnZapiszPapierDisabled(false);
          }
        }}
      ></input>
    </td>
  );
}
