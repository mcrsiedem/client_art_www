// import iconCopy from "../../../../../assets/copy.svg";
// import iconTrash from "../../../../../assets/trash2.svg";
import style from "./ElementTable.module.css";

import { useContext } from "react";
// import { _papiery } from "../api";
import { useState } from "react";
import RowTechElement from "./RowTechElement";
import RowFragment from "./RowFragment";
import { ModalInsertContext } from "context/ModalInsertContext";
import { TechnologyContext } from "context/TechnologyContext";
// import ElementTable from "./ElementTable";

export default function ElementyTech({}) {
  return (
    <div className={style.container}>
      <div className={style.element}>
        <ElementyTableHeader />
        <ElementyTable />
      </div>
    </div>
  );
}

function ElementyTableHeader() {
  return (
    <div className={style.header}>
      <div className={style.kropka}></div>
      <p className={style.naglowek}> Elementy </p>
    </div>
  );
}

function ElementyTable({}) {
  const [expand, setExpand] = useState(false);
  const contextModalInsert = useContext(ModalInsertContext);
  const techContext = useContext(TechnologyContext)
  const elementyTech = techContext.elementyTech;

  return (
    <div className={style.main}>
      <table className={style.table2}>
        <thead>
          <tr>
            <th className={style.col_button}> </th>
            {/* <th className={style.col1}>id</th> */}
            <th className={style.col1}>#</th>
            <th className={style.col_typ}>Typ</th>
            <th className={style.col_naklad}>Nakład</th>
            <th className={style.col_wersja}>Wersja</th>
            <th className={style.col_strony}>Strony</th>
            <th className={style.col_format} colSpan="2">
              Netto
            </th>

            <th className={style.col_papier}>Papier</th>
            <th className={style.col_gramatura}>g/m2</th>
            <th className={style.col_papierInfo}>Papier info</th>
            <th className={style.col_uszlachetnianie}>Procesy</th>
            <th className={style.col_arkusze} colSpan="2">Arkusz</th>
            {/* <th className={style.col_uszlachetnianie}>Uszlachetnianie tył</th> */}

            <th className={style.col_lega_falc}>Lega</th>
            <th className={style.col_lega_falc}>Ilość leg na ark </th>

            <th className={style.col_kolory}>Uwagi </th>
            {/* <th className={style.col_wersja}>Oprawa nr</th> */}
            <th className={style.col_button}> </th>
            <th className={style.col_button}> </th>
          </tr>
        </thead>
        <tbody>
          {elementyTech
            .sort((a, b) => a.indeks - b.indeks)
            .map((row, i) => {
              return <RowTechElement key={row.id} i={i} row={row} />;
            })}
        </tbody>
      </table>
    </div>
  );
}
