import style from "./ElementTable.module.css";
import Logo_ustawienia from "../../../../svg/settings.svg";
import logoExpand from "../../../../svg/expand.svg";
import iconCopy from "../../../../svg/copy.svg";
import iconTrash from "../../../../svg/trash2.svg";
import {  useState } from "react";
import { _typ_elementu} from "../api"
import RowFragment from "./RowFragment";
import RowElement from "./RowElement";
export default function ElementTable({
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

  const [expand,setExpand] =useState(true);
  return (
    <div className={style.main}>
      <table className={style.table2}>
        <thead>
          <tr>
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
            <th className={style.col_kolory}> </th>
            <th className={style.col_kolory}> </th>
            <th className={style.col_kolory}> </th>
          </tr>
        </thead>
        <tbody>
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






// function WykonczenieSelect({row,handleChangeCardElementy,listaGramatur,listaDostepnychWykonczen,setListaDostepnychWykonczen,isEdit,setIsEdit}){
//   return(
//     <td>
//     <select
//       className={style.select}
//       // defaultValue={isEdit ? row.wykonczenie : "n/d"}
//       defaultValue={row.wykonczenie}
//       onChange={(e) =>
//         handleChangeCardElementy({
//           ...row,
//           wykonczenie: e.target.value,
//         })
//       }
//     >
//       {listaDostepnychWykonczen

//         .map((el)=> el.wykonczenie)
//        .filter((currentValue, index, arr) => (
//           arr.indexOf(currentValue) === index
//         ))
//       .map((option) => (
//         <option
//           key={option.id}
//           value={option}
//         >
//           { option }
//         </option>
//       ))}
//     </select>
//   </td>
//   )
// }

// myArray.filter((value, index, array) => array.indexOf(value) === index);
