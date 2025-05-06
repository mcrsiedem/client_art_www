import { ModalInsertContext } from "context/ModalInsertContext";
import { useHistoria } from "hooks/useHistoria";
import { useContext } from "react";
import { _etap_plikow, _typ_elementu } from "utils/initialvalue";
import style from "./TABLE_ROW_PLIKI.module.css";
import { usePliki } from "hooks/usePliki";


export default function TABLE_ROW_PLIKI({plikiRow }) {
    //row - row element

    
    const contextModalInsert = useContext(ModalInsertContext);
    const elementy = contextModalInsert.elementy
    const daneZamowienia = contextModalInsert.daneZamowienia
    const [add] = useHistoria()

    return (
        <tr className={style.row_pliki_tr}>
        <td></td>
        <td></td>
        <td></td>
        <td>     <Element plikiRow={plikiRow} />     </td>
        {/* <td>      <p> {plikiRow.element_id}</p>       </td> */}
        <td>     <Etap plikiRow={plikiRow} />     </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>

      </tr>
    );
  }


  function Element({ plikiRow}) {
    //row - row element
    // const [setStatus] = useStatus()
    // const [valueIN,setValueIN] = useState(null)
    
    const contextModalInsert = useContext(ModalInsertContext);
    // const elementy = contextModalInsert.elementy
    // const daneZamowienia = contextModalInsert.daneZamowienia
    // const [add] = useHistoria()

    return (
        <select
          className={style.select_element}
          value={plikiRow.element_id}
         
disabled
          onChange={(e) => {
            // console.log("e.target.value"+e.target.value)

            //     setStatus(3) 
            // add(         {
            //   kategoria: "Typ elementu",
            //   event: getNameOfElement(row.id,elementy,_typ_elementu)+ " "+row.nazwa+" - zmiana na  "+getNameOfElementTyp(e.target.value,_typ_elementu),
            //   zamowienie_id: daneZamowienia.id
            // })
            // handleChangeCardFragmenty_i_Elementy({
            //   ...row,
            //   typ: e.target.value,
            //   update: true
            // }
            // );
        
 // 


          }}
        >
          {}
          {_typ_elementu.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nazwa}
            </option>
          ))}
        </select>
    );
  }


  function Etap({ plikiRow}) {
    //row - row element
    // const [setStatus] = useStatus()
    // const [valueIN,setValueIN] = useState(null)
    
    const contextModalInsert = useContext(ModalInsertContext);
    // const elementy = contextModalInsert.elementy
    // const daneZamowienia = contextModalInsert.daneZamowienia
    // const [add] = useHistoria()
    const [etapPlikow] = usePliki()

    return (
        <select
          className={style.select_etap}
          value={plikiRow.etap}
         
// disabled
          onChange={(e) => {

            // console.log(plikiRow.zamowienie_id)
            etapPlikow(e.target.value,plikiRow.zamowienie_id,plikiRow.element_id)
            // console.log("e.target.value"+e.target.value)

            //     setStatus(3) 
            // add(         {
            //   kategoria: "Typ elementu",
            //   event: getNameOfElement(row.id,elementy,_typ_elementu)+ " "+row.nazwa+" - zmiana na  "+getNameOfElementTyp(e.target.value,_typ_elementu),
            //   zamowienie_id: daneZamowienia.id
            // })
            // handleChangeCardFragmenty_i_Elementy({
            //   ...row,
            //   typ: e.target.value,
            //   update: true
            // }
            // );
        
 // 


          }}
        >
          {}
          {_etap_plikow.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nazwa}
            </option>
          ))}
        </select>
    );
  }