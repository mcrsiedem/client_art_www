// import iconCopy from "../../../../../svg/copy.svg";
// import iconTrash from "../../../../../svg/trash2.svg";
import style from "./ElementTable.module.css";
import { _papiery } from "../api";
import {  useState } from "react";
import RowElement from "./RowElement";
import RowFragment from "./RowFragment";
// import ElementTable from "./ElementTable";



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
    <div className={style.container}>

   
    <div className={style.element}>
      <ElementyTableHeader
        // card={card}
        elementy={elementy}
        setElementy={setElementy}
        fragmenty={fragmenty}
        setFragmenty={setFragmenty}
      />
      <ElementyTable
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
    </div>
  );
}

function ElementyTableHeader() {
  return (
    <div className={style.header}>
      Elementy produktu

    </div>
  );



}


function ElementyTable({
  elementy,
  fragmenty,
  handleChangeCardElementy,
  handleChangeCardFragmenty,
  listaPapierow,
  listaGramatur,
  setListaGramatur,
  isEdit,
  setIsEdit,
  procesyElementow,
  setProcesyElementow,
  listaDostepnychProcesow,
  setShowElementyProcesyInsert,
  setFragmenty,
  setElementy
}) {

  const [expand,setExpand] =useState(false);
  return (
    <div className={style.main}>
      <table className={style.table2}>
        <thead>
          <tr>
            <th className={style.col1}>id</th>
            <th className={style.col1}>#</th>
            <th className={style.col_typ}>Typ</th>
            <th className={style.col_naklad}>Nakład</th>
            <th className={style.col_wersja}>Wersja</th>
            <th className={style.col_strony}>Strony</th>
            <th className={style.col_format} colspan="2">
              {" "}
              Netto{" "}
            </th>

            <th className={style.col_papier}>Papier</th>
            <th className={style.col_gramatura}>g/m2</th>
            <th className={style.col_papierInfo}>Uwagi do papieru</th>
   

            <th className={style.col_uszlachetnianie}>Procesy dodatkowe</th>
            {/* <th className={style.col_uszlachetnianie}>Uszlachetnianie tył</th> */}

            <th className={style.col_kolory}>Uwagi </th>
            <th className={style.col_button}> </th>
            <th className={style.col_button}> </th>
            <th className={style.col_button}> </th>
          </tr>
        </thead>
        <tbody >
          {elementy.map((row, i) => {
            return (
              <>
              <RowElement
                i={i}
                row={row}
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
                fragmenty={fragmenty}
                expand={expand}
                setExpand={setExpand}
                elementy={elementy}
                setFragmenty={setFragmenty}
                setElementy={setElementy}
              />

          
{/* rozwijane fragmenty do każdego elementy. Gdy środek trzeba podzielić na więcej części widać je poniżej jako fragmenty */}
{expand ? fragmenty
.filter((el) => el.element_id === row.id)
.map((row, i) => {
            return (
              <>


              <RowFragment
              i={i}
              row={row}
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
              fragmenty={fragmenty}
      
              
            />
            </>
            );
          }):<></>}
              
            </>
            );
          }) }
        </tbody>
      </table>
    </div>
  );
}