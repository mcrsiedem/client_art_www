import { useContext } from "react";
import { _etap_plikow, _stan_wykonania, _status_wykonania, _typ_elementu } from "utils/initialvalue";
import style from "./TABLE_ROW_PROCESY.module.css";
import { AppContext } from "context/AppContext";


export default function TABLE_ROW_PROCESY({proces,row }) {
    //row - row element

    
    return (
        <tr className={style.row_pliki_tr}>
        <td></td>
        <td></td>
        {/* <td></td> */}
        <td>     <Element proces={proces} />     </td>
        <td>     <NazwaProcesu proces={proces} />     </td>
      <td> </td>

        {/* <td>      <p> {plikiRow.element_id}</p>       </td> */}
        <td>     <IloscStron proces={proces} />     </td>
      <td> </td>
      <td> </td>
        <td>     <NazwaElementu proces={proces} />     </td>
      <td> </td>
      <td> </td>

      <td> </td>
      <td> </td>
      <td> </td>
        <td>     <Etap proces={proces} row={row}/>     </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>

      </tr>
    );
  }




    function Element({ proces}) {
    return (
        <input
          className={style.input_element}
          value={_typ_elementu.filter(x=>x.id ==proces.typ_elementu)[0].nazwa}
disabled
        >
        </input>
    );
  }

  function NazwaProcesu({ proces }) {
    return (
      <input
        className={style.select_element}
        value={proces.nazwa}
        disabled
        onChange={(e) => {}}
      ></input>
    );
  }
    function NazwaElementu({ proces }) {
    return (
      <input
        className={style.select_element}
        value={proces.nazwa_elementu}
        disabled
        onChange={(e) => {}}
      ></input>
    );
  }
  function IloscStron({ proces }) {
    return (
      <td className={style.select_strony}>{proces.ilosc_stron}</td>
    );
  }

  function Etap({ proces,row}) {
    
      const contextApp = useContext(AppContext);
    
     const _status_wykonania = contextApp._status_wykonania

      return (
        <select
          className={style.select_etap}
          value={proces.status}
         
disabled

        >
          {}
          {_status_wykonania.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nazwa}
            </option>
          ))}
        </select>
    );
}

  