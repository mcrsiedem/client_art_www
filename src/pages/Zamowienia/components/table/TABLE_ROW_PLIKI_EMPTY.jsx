import { ModalInsertContext } from "context/ModalInsertContext";
import { useHistoria } from "hooks/useHistoria";
import { useContext } from "react";
import { _etap_plikow, _typ_elementu } from "utils/initialvalue";
import style from "./TABLE_ROW_PLIKI.module.css";
import { usePliki } from "hooks/usePliki";


export default function TABLE_ROW_PLIKI_EMPTY({row }) {
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
        <td>     <Dodaj row={row} />     </td>
        {/* <td>      <p> {plikiRow.element_id}</p>       </td> */}
       
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
      <td> </td>

      </tr>
    );
  }


  function Dodaj({ row}) {
    //row - row element
    // const [setStatus] = useStatus()
    // const [valueIN,setValueIN] = useState(null)
    
    const contextModalInsert = useContext(ModalInsertContext);
    // const elementy = contextModalInsert.elementy
    // const daneZamowienia = contextModalInsert.daneZamowienia
    // const [add] = useHistoria()

    return (
<button>Dodaj</button>
    );
  }

