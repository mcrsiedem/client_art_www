import React, { useState, useRef,useContext } from "react";
import style from "./TablePaperGrupa.module.css";
import { AppContext } from "context/AppContext";

export default function TablePaperGrupa({
  paperSelectView,setPaperSelectView,selectRow,
  setSelectRow,
  setBtnZapisz,
  setSelectTable
}) {
  const inputElement = useRef();
      const appcontext = useContext(AppContext);
      const listaPapierowGrupaWyszukiwarka = appcontext.listaPapierowGrupaWyszukiwarka;
      const setListaPapierowGrupaWyszukiwarka = appcontext.setListaPapierowGrupaWyszukiwarka;
      const listaPapierow = appcontext.listaPapierow;
      const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;

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

      if(paperSelectView[2].view == true){
  return (
    <div ref={inputElement} className={style.main}>
      <table  className={style.table2}>
        <thead>
          <tr>
            <th className={style.id}>#</th>
            <th className={style.info}>Grupa papieru</th>

          </tr>
        </thead>
        <tbody   className={style.center}>
          {listaPapierowGrupaWyszukiwarka?.map((row, index) => {
            return (
              <tr className={color(row)}
                key={row.id}
                onClick={()=>{
                  setSelectRow(row)
                  setSelectTable(inputElement)
                  setListaPapierowGrupaWyszukiwarka(
                    prev=>prev.map((t, a) => {
                      return {
                        ...t,
                        select: false
                      };
                  }).map((t, a) => {
                    if (t.id == row.id) {
                      return {
                        ...t,
                        select: true
                      };
                    } else {
                      return t;
                    }
                  })

                );
                }}

                onDoubleClick={
                  (x) => {
                    if(document.onkeydown = x.ctrlKey){
                 
                                          setPaperSelectView(
                      paperSelectView
                        .map((t) => {
                          return { ...t, view: false };
                        })
                        .map((t) => {
                          if (t.nazwa == "papier") {
                            return { ...t, view: true };
                          } else {
                            return t;
                          }
                        })
                    );
                    const m = [...listaPapierow];
                    setListaPapierowWyszukiwarka(
                      m.filter((k) =>
                        k.grupa_id == selectRow.id)
                    );

                    setSelectRow(null)
                    }

                  }
                }
              >
                <ID row={row} index={index + 1} />
                <Grupa row={row} setBtnZapisz={setBtnZapisz}/>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
}

function ID({ row,index}) {
  return <td>{index}</td>;
}
function Grupa({ row}) {
    const appcontext = useContext(AppContext);
    const setListaPapierowGrupaWyszukiwarka = appcontext.setListaPapierowGrupaWyszukiwarka;
    const listaPapierowGrupaWyszukiwarka = appcontext.listaPapierowGrupaWyszukiwarka;

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
                  update: true
        
                };
              } else {
                return t;
              }
            })
          );
          setBtnZapiszPapierDisabled(false)

          }
        }}
      >
      </input>
    </td>
  );
}