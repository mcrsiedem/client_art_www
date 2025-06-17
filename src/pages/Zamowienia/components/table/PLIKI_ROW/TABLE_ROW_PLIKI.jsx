import { ModalInsertContext } from "context/ModalInsertContext";
import { useHistoria } from "hooks/useHistoria";
import { useContext } from "react";
import { _etap_plikow, _typ_elementu } from "utils/initialvalue";
import style from "./TABLE_ROW_PLIKI.module.css";
import { usePliki } from "hooks/usePliki";
import { getNameOfElement } from "actions/getNameOfElement";
import { getNameOfEtapPliki } from "actions/getNameOfEtapPliki";
import DecodeToken from "pages/Login/DecodeToken";


export default function TABLE_ROW_PLIKI({plikiRow,row }) {
    //row - row element

    
    const contextModalInsert = useContext(ModalInsertContext);
    const elementy = contextModalInsert.elementy
    const daneZamowienia = contextModalInsert.daneZamowienia
    const [add] = useHistoria()

    return (
        <tr className={style.row_pliki_tr}>
        <td></td>
        <td></td>
        {/* <td></td> */}
        <td>     <Element plikiRow={plikiRow} />     </td>
        <td>     <Nazwa plikiRow={plikiRow} />     </td>
      <td>  </td>

        {/* <td>      <p> {plikiRow.element_id}</p>       </td> */}
        <td>     <IloscStron plikiRow={plikiRow} />     </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>

      <td> </td>
      <td> </td>
      <td>Pliki </td>
        <td>     <Etap plikiRow={plikiRow} row={row}/>     </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>

      </tr>
    );
  }


  function Element({ plikiRow}) {
    return (
        <select
          className={style.select_element}
          value={plikiRow.typ}
         
disabled
          onChange={(e) => {

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


  function Nazwa({ plikiRow }) {
    return (
      <input
        className={style.select_element}
        value={plikiRow.nazwa}
        disabled
        onChange={(e) => {}}
      ></input>
    );
  }
  function IloscStron({ plikiRow }) {
    return (
      <td className={style.select_strony}>{plikiRow.ilosc_stron}</td>
    );
  }

  function Etap({ plikiRow,row}) {
    
    const contextModalInsert = useContext(ModalInsertContext);
    const [add,dodajDoZamowienia] = useHistoria()
    const [etapPlikowZamowienia,etapPlikowGrupyWykonan] = usePliki()
if(row.etap !=1){
      return (
        <select
          className={style.select_etap}
          value={plikiRow.etap}
         
// disabled
          onChange={(e) => {  
            etapPlikowZamowienia(e.target.value,plikiRow)
            dodajDoZamowienia(         {
              kategoria: "Pliki",
              event: _typ_elementu.filter(x=> x.id == plikiRow.typ)[0]?.nazwa+ " "+plikiRow.nazwa+" - zmiana z "+getNameOfEtapPliki(plikiRow.etap)+ " na "+getNameOfEtapPliki(e.target.value),
              zamowienie_id: plikiRow.zamowienie_id,
              user_id: DecodeToken(sessionStorage.getItem("token")).id
            })

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

  }