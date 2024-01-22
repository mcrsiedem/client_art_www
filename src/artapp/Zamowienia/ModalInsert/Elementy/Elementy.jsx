// import iconCopy from "../../../../../svg/copy.svg";
// import iconTrash from "../../../../../svg/trash2.svg";
import style from "./ElementTable.module.css";
import { _papiery } from "../api";

import ElementTable from "./ElementTable";



export default function Elementy({
  elementy,
  setElementy,
  handleChangeCardElementy,
  handleChangeCardFragmenty,
  selected_papier,
  setSelected_papier,
  fragmenty,
  setFragmenty,
  info,
  setInfo,
  listaPapierow,
  listaGramatur,
  setListaGramatur,
  isEdit,
  setIsEdit,
  procesyElementow,
  setProcesyElementow,
  listaDostepnychProcesow,
  setShowElementyProcesyInsert
}) {
  return (
    <div className={style.elementCard}>
      <ElementTableHeader
        // card={card}
        elementy={elementy}
        setElementy={setElementy}
        fragmenty={fragmenty}
        setFragmenty={setFragmenty}
      />
      <ElementTable
        elementy={elementy}
        fragmenty={fragmenty}
        handleChangeCardElementy={handleChangeCardElementy}
        handleChangeCardFragmenty={handleChangeCardFragmenty}
        listaPapierow={listaPapierow}
        listaGramatur={listaGramatur}
        setListaGramatur={setListaGramatur}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        procesyElementow={procesyElementow}
        setProcesyElementow={setProcesyElementow}
        listaDostepnychProcesow={listaDostepnychProcesow}
        setShowElementyProcesyInsert={setShowElementyProcesyInsert}
        setElementy={setElementy}
        setFragmenty={setFragmenty}

      />
    </div>
  );
}

function ElementTableHeader() {
  return (
    <div className={style.header}>
      Elementy produktu

    </div>
  );



}