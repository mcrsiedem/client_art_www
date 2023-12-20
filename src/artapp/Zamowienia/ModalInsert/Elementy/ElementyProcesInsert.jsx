// import iconCopy from "../../../../../svg/copy.svg";
// import iconTrash from "../../../../../svg/trash2.svg";
import style from "./ElementyProcesInsert.module.css";
// import { _papiery } from "../../api";
// import ElementTableHeader from "./ElementTableHeader";
// import { useState } from "react";
// import Logo_ustawienia from "../../../../svg/settings.svg";



export default function ElementyProcesInsert({showElementyProcesyInsert,setShowElementyProcesyInsert}) {

  return (
    <div className={style.insertContainer}>
      
      <div className={style.header} > <p className={style.title}>Procesy</p></div>
      <div className={style.center} > 
      <table className={style.table2}>
        <thead>
          <tr>
            <th className={style.col1}>#</th>
            <th className={style.col_typ}>Proces</th>
            <th className={style.col_naklad}>Strona</th>
            <th className={style.col_wersja}>Nazwa</th>
            <th className={style.col_strony}>Info</th>

            <th className={style.col_kolory}>Dodatkowe informacje </th>
          </tr>
        </thead>
        <tbody>
        <tr >
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>



      </tr>
          {/* {elementy.map((row, i) => {
            return (
              <RowElement
                i={i}
                row={row}
                handleChangeCardElementy={handleChangeCardElementy}
                listaPapierow={listaPapierow}
                listaGramatur={listaGramatur}
                setListaGramatur={setListaGramatur}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                procesyElementow={procesyElementow}
                setProcesyElementow={setProcesyElementow}
                listaDostepnychProcesow={listaDostepnychProcesow}
                setShowElementyProcesyInsert={setShowElementyProcesyInsert}
              />
            );
          })} */}
        </tbody>
      </table>
      </div>
      <div className={style.row} > <button className={style.btn} onClick={() => { setShowElementyProcesyInsert(false) }} >Anuluj</button > <button className={style.btn}>OK</button></div>
    </div>
  );
}

