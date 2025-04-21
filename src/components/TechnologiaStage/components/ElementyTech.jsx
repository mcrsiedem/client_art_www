// import iconCopy from "../../../../../assets/copy.svg";
// import iconTrash from "../../../../../assets/trash2.svg";
import style from "./ElementTable.module.css";

import { useContext } from "react";
// import { _papiery } from "../api";
import { useState } from "react";
import RowTechElement from "./RowTechElement";
import { ModalInsertContext } from "context/ModalInsertContext";
import { TechnologyContext } from "context/TechnologyContext";
// import ElementTable from "./ElementTable";

export default function ElementyTech({}) {
  return (
    <div className={style.container}>
      <div className={style.element}>
        {/* <ElementyTableHeader /> */}
        <ElementyTable />
      </div>
    </div>
  );
}



function ElementyTable({}) {
  const [expand, setExpand] = useState(false);
  const contextModalInsert = useContext(ModalInsertContext);
  const techContext = useContext(TechnologyContext)
  const elementyTech = techContext.elementyTech;


  return (


        <div className={style.main_elementy}>
          {elementyTech
            .sort((a, b) => a.indeks - b.indeks)
            .map((row, indeks) => {
              return <RowTechElement key={row.id} indeks={indeks} row={row} />;
            })}
        </div>


  );
}
