import React, { useState, useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "./PaperRow.module.css";
import { AppContext } from "context/AppContext";



export default function PaperRow({row,inputElement,setSelectTable,setSelectRow}) {
      const modalcontext = useContext(ModalInsertContext);
      const appcontext = useContext(AppContext);
      const selectedElementROW = modalcontext.selectedElementROW;
      const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
      const setListaPapierowNazwyWyszukiwarka = appcontext.setListaPapierowNazwyWyszukiwarka;

      return (
        <tr
          className={color2(row)}
          key={row.id}
          onClick={() => {
            setSelectTable(inputElement);
            setSelectRow(row);
            setListaPapierowWyszukiwarka((prev) =>
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
          // onDoubleClick={() =>
          //   openEdit(row, rowID, setShowEdit)
          // }
        >
          {/* <ID row={row} /> */}
          {/* <Nazwa row={row} /> */}
          <td></td>
          <td></td>
          <td className={ style.nazwa }>{row.nazwa}</td>
          <Gramatura row={row} />
          <Wykonczenie row={row} />
          <Bulk row={row} />
          {/* <td className={ style.nazwa }>{row.powleczenie}</td> */}
          <Powleczenie row={row} />

          {/* <Grupa row={row} />  */}

          <Info row={row} />
        </tr>
      );


}
// function Gramatura({ row, index }) {
//   return <td>{row.gramatura}</td>;
// }
function ID({ row,index}) {
  return <td>{index}</td>;
}
function EXPAND({ row,index}) {
  return <td>{row.isExpand}s</td>;
}

// function Wykonczenie({ row }) {
//   return <td>{row.wykonczenie}</td>;
// }
// function Bulk({ row }) {
//   return <td>{row.bulk}</td>;
// }

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
      className={style.uwagi}
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

const color2 = (row) => {

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



function Wykonczenie({ row }) {
  const appcontext = useContext(AppContext);
  const listaPapierowGrupa = appcontext.listaPapierowGrupa;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
const listaPapierowWykonczenia = appcontext.listaPapierowWykonczenia;
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
          {listaPapierowWykonczenia.map((option) => (
            <option key={option.id} value={option.id}>
              {option.wykonczenie}
            </option>
          ))}
        </select>
    </td>;
}



function Powleczenie({ row }) {
  const appcontext = useContext(AppContext);
  const listaPapierowGrupa = appcontext.listaPapierowGrupa;
  const listaPapierowWyszukiwarka = appcontext.listaPapierowWyszukiwarka;
  const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;
  const setBtnZapiszPapierDisabled = appcontext.setBtnZapiszPapierDisabled;
const listaPapierowPowleczenie = appcontext.listaPapierowPowleczenie;
  return <td>
            <select
          className={ style.select_papier_powleczenie }
          value={row.powleczenie_id}
          onChange={(e) => {
            setListaPapierowWyszukiwarka(
              listaPapierowWyszukiwarka.map((t, a) => {
              if (t.id == row.id) {
                return {
                  ...t,
                  powleczenie_id: e.target.value,
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
          {listaPapierowPowleczenie.map((option) => (
            <option key={option.id} value={option.id}>
              {option.powleczenie}
            </option>
          ))}
        </select>
    </td>;
}