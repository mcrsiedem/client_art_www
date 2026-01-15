import { ModalInsertContext } from "context/ModalInsertContext";
import { useHistoria } from "hooks/useHistoria";
import { useContext } from "react";
import { _etap_plikow, _stan_wykonania, _status_wykonania, _typ_elementu } from "utils/initialvalue";
import style from "./TABLE_ROW_PROCESY.module.css";
import { usePliki } from "hooks/usePliki";
import { getNameOfElement } from "actions/getNameOfElement";
import { getNameOfEtapPliki } from "actions/getNameOfEtapPliki";
import DecodeToken from "pages/Login/DecodeToken";
import { AppContext } from "context/AppContext";


export default function TABLE_ROW_PROCESY({proces,row }) {
    //row - row element

    
    const contextModalInsert = useContext(ModalInsertContext);
    const elementy = contextModalInsert.elementy
    const daneZamowienia = contextModalInsert.daneZamowienia
    const [add] = useHistoria()

    return (
        <tr className={style.row_pliki_tr}>
        {/* <td></td> */}
        <td>     <Etap proces={proces} row={row}/>     </td>
        <td></td>
        {/* <td></td> */}
        <td>     <Element proces={proces} />     </td>
        <td>     <NazwaProcesu proces={proces} />     </td>

        {/* <td>     <IloscStron proces={proces} />     </td> */}

        {/* <td>     <NazwaElementu proces={proces} />     </td> */}

      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>

      </tr>
    );
  }


//   function Element({ proces}) {
//     return (
//         <select
//           className={style.select_element}
//           value={proces.typ_elementu}
         
// disabled
//           onChange={(e) => {

//           }}
//         >
//           {}
//           {_typ_elementu.map((option) => (
//             <option key={option.id} value={option.id}>
//               {option.nazwa}
//             </option>
//           ))}
//         </select>
//     );
//   }


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
    
    const contextModalInsert = useContext(ModalInsertContext);
    const [add,dodajDoZamowienia] = useHistoria()
    const [etapPlikowZamowienia,etapPlikowGrupyWykonan] = usePliki()
      const contextApp = useContext(AppContext);
    
     const _status_wykonania = contextApp._status_wykonania

      return (
        <select
          className={style.select_etap}
          value={proces.status}
         
disabled
          // onChange={(e) => {  
          //   etapPlikowZamowienia(e.target.value,proces)
          //   dodajDoZamowienia(         {
          //     kategoria: "Pliki",
          //     event: _typ_elementu.filter(x=> x.id == proces.typ)[0]?.nazwa+ " "+proces.nazwa+" - zmiana z "+getNameOfEtapPliki(proces.etap)+ " na "+getNameOfEtapPliki(e.target.value),
          //     zamowienie_id: proces.zamowienie_id,
          //     user_id: DecodeToken(sessionStorage.getItem("token")).id
          //   })

          // }}
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

  