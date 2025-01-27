// import iconCopy from "../../../../../assets/copy.svg";
// import iconTrash from "../../../../../assets/trash2.svg";
import style from "./ElementTable.module.css";

import { useContext } from "react";
// import { _papiery } from "../api";
import {  useState } from "react";
import RowElement from "./RowElement";
import RowFragment from "./RowFragment";
import { ModalInsertContext } from "context/ModalInsertContext";
// import ElementTable from "./ElementTable";



export default function Elementy({

  handleChangeCardElementy,
  handleChangeCardFragmenty,
  // selected_papier,
  // setSelected_papier,
  // info,
  // setInfo,
  // listaPapierow,
  // listaGramatur,
  // setListaGramatur,
  // isEdit,
  // setIsEdit,
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
      {/* <ElementyTableHeader/> */}
      <ElementyTable2
  
        handleChangeCardElementy={handleChangeCardElementy}
        handleChangeCardFragmenty={handleChangeCardFragmenty}
        // listaPapierow={listaPapierow}
        // listaGramatur={listaGramatur}
        // setListaGramatur={setListaGramatur}
        // isEdit={isEdit}
        // setIsEdit={setIsEdit}
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

function ElementyTableHeader() {
  return (
    <div className={style.header}>
      Elementy produktu

    </div>
  );



}


function ElementyTable({

  handleChangeCardElementy,
  handleChangeCardFragmenty,
  listaPapierow,
  listaGramatur,
  setListaGramatur,
  // isEdit,
  // setIsEdit,
  procesyElementow,
  setProcesyElementow,

  setShowElementyProcesyInsert,


  handleChangeCardFragmenty_i_Elementy,
  handleChangeCardFragmenty_i_Elementy_IloscStron,
  handleChangeCardFragmentyOprawaId
}) {

  const [expand,setExpand] =useState(false);
  const contextModalInsert = useContext(ModalInsertContext);
  const elementy = contextModalInsert.elementy;
  const setElementy = contextModalInsert.setElementy;

  const fragmenty = contextModalInsert.fragmenty;
  const setFragmenty = contextModalInsert.setFragmenty;
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
            {/* <th className={style.col_uszlachetnianie}>Uszlachetnianie tył</th> */}

            <th className={style.col_kolory}>Uwagi </th>
            {/* <th className={style.col_wersja}>Oprawa nr</th> */}
            <th className={style.col_button}> </th>
            <th className={style.col_button}> </th>
            
          </tr>
        </thead>
        <tbody >
          {elementy
           .sort((a, b) => a.indeks - b.indeks)
          .map((row, i) => {
            return (
              <>
              <RowElement
              key={row.id}
                i={i}
                row={row}
                handleChangeCardElementy={handleChangeCardElementy}
                handleChangeCardFragmenty={handleChangeCardFragmenty}
                listaPapierow={listaPapierow}
                listaGramatur={listaGramatur}
                setListaGramatur={setListaGramatur}
                // isEdit={isEdit}
                // setIsEdit={setIsEdit}
                procesyElementow={procesyElementow}
                setProcesyElementow={setProcesyElementow}
         
                setShowElementyProcesyInsert={setShowElementyProcesyInsert}
            
                expand={expand}
                setExpand={setExpand}
             
          
          
                 handleChangeCardFragmenty_i_Elementy={handleChangeCardFragmenty_i_Elementy}
                 handleChangeCardFragmenty_i_Elementy_IloscStron={handleChangeCardFragmenty_i_Elementy_IloscStron}
              />

          
{/* rozwijane fragmenty do każdego elementy. Gdy środek trzeba podzielić na więcej części widać je poniżej jako fragmenty */}
{expand ? fragmenty
.filter((el) => el.element_id === row.id)
.map((row, i) => {
            return (
              <>


              <RowFragment
              key={row.id}
              i={i}
              row={row}
              handleChangeCardElementy={handleChangeCardElementy}
              handleChangeCardFragmenty={handleChangeCardFragmenty}
              listaPapierow={listaPapierow}
              listaGramatur={listaGramatur}
              setListaGramatur={setListaGramatur}
              // isEdit={isEdit}
              // setIsEdit={setIsEdit}
              procesyElementow={procesyElementow}
              setProcesyElementow={setProcesyElementow}
      
              setShowElementyProcesyInsert={setShowElementyProcesyInsert}
  
              elementy={elementy}
              handleChangeCardFragmenty_i_Elementy={handleChangeCardFragmenty_i_Elementy}
              handleChangeCardFragmentyOprawaId={handleChangeCardFragmentyOprawaId}
              
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


function ElementyTable2({
  handleChangeCardElementy,
  handleChangeCardFragmenty,
  // listaPapierow,
  // listaGramatur,
  // setListaGramatur,
  procesyElementow,
  setProcesyElementow,
  setShowElementyProcesyInsert,
  handleChangeCardFragmenty_i_Elementy,
  handleChangeCardFragmenty_i_Elementy_IloscStron,
}) {
  const [expand, setExpand] = useState(false);
  const contextModalInsert = useContext(ModalInsertContext);
  const elementy = contextModalInsert.elementy;
  const setElementy = contextModalInsert.setElementy;

  const fragmenty = contextModalInsert.fragmenty;
  const setFragmenty = contextModalInsert.setFragmenty;


  return (
    <div className={style.main_elementy}>


      
          {elementy
            .sort((a, b) => a.indeks - b.indeks)
            .map((row, i) => {
              return (
                <>
                  <RowElement
                    key={row.id}
                    i={i}
                    row={row}
                    handleChangeCardElementy={handleChangeCardElementy}
                    handleChangeCardFragmenty={handleChangeCardFragmenty}
                    // listaPapierow={listaPapierow}
                    // listaGramatur={listaGramatur}
                    // setListaGramatur={setListaGramatur}
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
                </>
              );
            })}
       {/* <hr></hr> */}
      </div>
      
   
  );
}