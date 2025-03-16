import React, { useState, useRef,useContext } from "react";
import style from "./TablePaper.module.css";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { _wykonczenie } from "utils/initialvalue";

export default function TablePaper({setSelectRow,
  paperSelectView,
  setBtnZapisz,
  setSelectTable

}) {

  const [showEdit, setShowEdit] = useState(false);

  const rowID = useRef();
  const inputElement = useRef();

      const appcontext = useContext(AppContext);
      const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
      const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;

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

if(paperSelectView[0].view == true){
  return (
    <div ref={inputElement} className={style.main}>
      <table  className={style.table2}>
        <thead>
          <tr>
            <th className={style.id}>#</th>
            <th className={style.nazwa}>Nazwa</th>
            <th className={style.gramatura}>g/m2</th>
            <th className={style.wykonczenie}></th>
            <th className={style.opiekun}>Bulk</th>
            <th className={style.grupa}>Grupa</th>
            <th className={style.info}>Opis</th>
          </tr>
        </thead>
        <tbody   className={style.center}>
          {listaPapierowWyszukiwarka?.map((row, index) => {
            return (
              // <tr className={row.insert ? style.tr_insert : style.tr}
              <tr className={color(row)}
                key={row.id}
                onClick={()=>{
                  setSelectTable(inputElement)
                  setSelectRow(row)
                  setListaPapierowWyszukiwarka(
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
                  () => openEdit(row, rowID, setShowEdit)
                }
              >
                <ID row={row} index={index + 1} />
                <Nazwa row={row} />
                <Gramatura row={row} />
                <Wykonczenie row={row} />
                <Bulk row={row} />
                <Grupa row={row} />
                <Info row={row} setBtnZapisz={setBtnZapisz}/>
              </tr>
            );
          })}
        </tbody>
      </table>
      
    </div>
  );
}

}
const openEdit = (row, rowID, setShowEdit) => {
  // otwiera edycję po dwukrotnym kliknięciu
  rowID.current = {
    id: row.id,
    firma: row.firma,
    adres: row.adres,
    kod: row.kod,
    nIP: row.nIP,
    opiekun_id: row.opiekun_id,
    utworzyl_user_id: row.utworzyl_user_id,
  };
  setShowEdit(true);
};

function Wykonczenie({ row }) {
  const appcontext = useContext(AppContext);
  const listaPapierowGrupa = appcontext.listaPapierowGrupa;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
  return <td>
            <select
          className={ style.select_papier_wykonczenie }
          value={row.wykonczenie_id}
          onChange={(e) => {
            setListaPapierowWyszukiwarka(
              listaPapierowWyszukiwarka.map((t, a) => {
              if (t.id == row.id) {
                return {
                  ...t,
                  wykonczenie_id: e.target.value,
                  update: true
        
                };
              } else {
                return t;
              }
            })
          );

          setBtnZapiszPapierDisabled(false)
          }}
        >
          {/* {   <option value = "0"  >
             wybierz papier
            </option>}
        */}
          {_wykonczenie.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nazwa}
            </option>
          ))}
        </select>
    </td>;
}

function Grupa({ row }) {
  const appcontext = useContext(AppContext);
  const listaPapierowGrupa = appcontext.listaPapierowGrupa;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
  return <td>
            <select
          
          className={ style.select_papier_grupa }
          value={row.grupa_id}
          onChange={(e) => {
            setListaPapierowWyszukiwarka(
              listaPapierowWyszukiwarka?.map((t, a) => {
              if (t.id == row.id) {
                return {
                  ...t,
                  grupa_id: e.target.value,
                  update: true
                };
              } else {
                return t;
              }
            })
          );

          setBtnZapiszPapierDisabled(false)
          }}
        >
          {/* {   <option value = "0"  >
             wybierz papier
            </option>}
        */}
          {listaPapierowGrupa.map((option) => (
            <option key={option.id} value={option.id}>
              {option.grupa}
            </option>
          ))}
        </select>
    </td>;
}

function Nazwa({ row }) {
  const appcontext = useContext(AppContext);
  const listaPapierowNazwy = appcontext.listaPapierowNazwy;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
  return <td>
            <select
          className={ style.select_papier }
          value={row.nazwa_id}
          onChange={(e) => {
            setListaPapierowWyszukiwarka(
              listaPapierowWyszukiwarka.map((t, a) => {
              if (t.id == row.id) {
                return {
                  ...t,
                  nazwa_id: e.target.value,
                  update: true
        
                };
              } else {
                return t;
              }
            })
          );

          setBtnZapiszPapierDisabled(false)
          }}
        >
          {   <option value = "0"  >
             wybierz papier
            </option>}
       
          {listaPapierowNazwy.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nazwa}
            </option>
          ))}
        </select>
    </td>;
}



function ID({ row,index}) {
  return <td>{index}</td>;
}



function Info2({ row }) {
  return <td>{row.info}</td>;
}
function Opiekun({ row }) {
  return <td>{row.opiekun_nazwa}</td>;
}


function Gramatura({ row}) {
  const appcontext = useContext(AppContext);
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
    const modalcontext = useContext(ModalInsertContext);
    // const isBtnZapiszPapierAvtive = modalcontext.isBtnZapiszPapierAvtive;
    const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
return (
  <td className={style.labelinput}>

    <input
    
      className={style.select_papier_gramatura}
      // type="text"
      value={row.gramatura}
      onChange={(event) => {
        const re = /^[0-9]+$/;
        const re2 = /^\d{0,6}(?:\,\d{0,2}){0,1}$/;
        if (event.target.value === "" || re.test(event.target.value)) {
          // setListaPapierowWyszukiwarka({ ...daneKlienta, firma: event.target.value });
         
          setListaPapierowWyszukiwarka(
            listaPapierowWyszukiwarka.map((t, a) => {
            // console.log("oprawa id" +prev)
            if (t.id == row.id) {
              return {
                ...t,
                gramatura: event.target.value,
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

function Bulk({ row}) {
  const appcontext = useContext(AppContext);
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
    const modalcontext = useContext(ModalInsertContext);
    // const isBtnZapiszPapierAvtive = modalcontext.isBtnZapiszPapierAvtive;
    const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
return (
  <td className={style.labelinput}>

    <input
    
      className={style.select_papier_bulk}
      // type="text"
      value={row.bulk}
      onChange={(event) => {
        // const re = /^[0-9]+$/;
        const re = /^\d{0,6}(?:\.\d{0,2}){0,1}$/;
        if (event.target.value === "" || re.test(event.target.value)) {
          // setListaPapierowWyszukiwarka({ ...daneKlienta, firma: event.target.value });
         
          setListaPapierowWyszukiwarka(
            listaPapierowWyszukiwarka.map((t, a) => {
            // console.log("oprawa id" +prev)
            if (t.id == row.id) {
              return {
                ...t,
                bulk: event.target.value,
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

function Info({ row}) {
    const appcontext = useContext(AppContext);
    const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
    const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
      const modalcontext = useContext(ModalInsertContext);
      // const isBtnZapiszPapierAvtive = modalcontext.isBtnZapiszPapierAvtive;
      const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
  return (
    <td className={style.labelinput}>

      <input
        className={style.select_papier_info}
        type="text"
        value={row.info}
        onChange={(event) => {
          const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ"-.]+$/;
          if (event.target.value === "" || re.test(event.target.value)) {
            // setListaPapierowWyszukiwarka({ ...daneKlienta, firma: event.target.value });
           
            setListaPapierowWyszukiwarka(
              listaPapierowWyszukiwarka.map((t, a) => {
              // console.log("oprawa id" +prev)
              if (t.id == row.id) {
                return {
                  ...t,
                  info: event.target.value,
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