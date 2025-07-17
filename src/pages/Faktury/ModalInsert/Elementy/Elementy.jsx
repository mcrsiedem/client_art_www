
import style from "./ElementTable.module.css";
import { useContext } from "react";
import {  useState } from "react";
import RowElement from "./RowElement";
import { ModalInsertContext } from "context/ModalInsertContext";

export default function Elementy({
  handleChangeCardElementy,
  handleChangeCardFragmenty,
  procesyElementow,
  setProcesyElementow,
  setShowElementyProcesyInsert,
    handleChangeCardFragmenty_i_Elementy,
    handleChangeCardFragmenty_i_Elementy_IloscStron,
    handleChangeCardFragmentyOprawaId
}) {
  return (
    <div className={style.container}>
    <div className={style.element}>
      <ElementyTable
        handleChangeCardElementy={handleChangeCardElementy}
        handleChangeCardFragmenty={handleChangeCardFragmenty}
        procesyElementow={procesyElementow}
        setProcesyElementow={setProcesyElementow}
        setShowElementyProcesyInsert={setShowElementyProcesyInsert}
        handleChangeCardFragmenty_i_Elementy={handleChangeCardFragmenty_i_Elementy}
        handleChangeCardFragmenty_i_Elementy_IloscStron={handleChangeCardFragmenty_i_Elementy_IloscStron}
        handleChangeCardFragmentyOprawaId={handleChangeCardFragmentyOprawaId}
      />
    </div>
    </div>
  );
}


function ElementyTable({
  handleChangeCardElementy,
  handleChangeCardFragmenty,
  procesyElementow,
  setProcesyElementow,
  setShowElementyProcesyInsert,
  handleChangeCardFragmenty_i_Elementy,
  handleChangeCardFragmenty_i_Elementy_IloscStron,
}) {
  const [expand, setExpand] = useState(false);
  const contextModalInsert = useContext(ModalInsertContext);
  const elementy = contextModalInsert.elementy;

  return (
    <div className={style.main_elementy}>
          {elementy
            .sort((a, b) => b.typ - a.typ)
            .filter((x) => x.delete != true)
            .map((row, i) => {
              return (
                  <RowElement
                    key={row.id}
                    i={i}
                    row={row}
                    handleChangeCardElementy={handleChangeCardElementy}
                    handleChangeCardFragmenty={handleChangeCardFragmenty}
                    procesyElementow={procesyElementow}
                    setProcesyElementow={setProcesyElementow}
                    setShowElementyProcesyInsert={setShowElementyProcesyInsert}
                    expand={expand}
                    setExpand={setExpand}
                    handleChangeCardFragmenty_i_Elementy={
                      handleChangeCardFragmenty_i_Elementy
                    }
                    handleChangeCardFragmenty_i_Elementy_IloscStron={
                      handleChangeCardFragmenty_i_Elementy_IloscStron
                    }
                  />
              );
            })}
      </div>
  );
}