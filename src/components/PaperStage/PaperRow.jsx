import React, { useState, useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "./ChangePaper.module.css";
import style2 from "./TablePaperNazwa2.module.css";
import { AppContext } from "context/AppContext";



export default function PaperRow({row,inputElement,setSelectTable,setSelectRow}) {
      const modalcontext = useContext(ModalInsertContext);
      const appcontext = useContext(AppContext);
      const selectedElementROW = modalcontext.selectedElementROW;
      const setListaPapierowWyszukiwarka = appcontext.setListaPapierowWyszukiwarka;


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
          }}
          // onDoubleClick={() =>
          //   openEdit(row, rowID, setShowEdit)
          // }
        >
          <ID row={row} />
          {/* <Nazwa row={row} /> */}
          <Gramatura row={row} />
          <Wykonczenie row={row} />
          <Bulk row={row} />
          {/* <Grupa row={row} />  */}

          <Info row={row} />
        </tr>
      );


}
function Gramatura({ row, index }) {
  return <td>{row.gramatura}</td>;
}
function ID({ row,index}) {
  return <td>{index}</td>;
}
function EXPAND({ row,index}) {
  return <td>{row.isExpand}s</td>;
}

function Wykonczenie({ row }) {
  return <td>{row.wykonczenie}</td>;
}
function Bulk({ row }) {
  return <td>{row.bulk}</td>;
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

const color2 = (row) => {

  if (row.select) {
    return style2.tr_select;
  }
  if (row.delete) {
    return style2.tr_delete;
  }
  if (row.insert) {
    return style2.tr_insert;
  }
  if (row.update) {
    return style2.tr_update;
  }


  return style2.tr;
};