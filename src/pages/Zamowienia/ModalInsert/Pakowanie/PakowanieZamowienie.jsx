import style from "./PakowanieZamowienie.module.css";
import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";

import { _typ_elementu } from "utils/initialvalue";
import { useState } from "react";
import iconCopy from "../../../../assets/copy.svg";
import iconTrash from "../../../../assets/trash2.svg";
import iconTable from "../../../../assets/settings.svg";



import { AppContext } from "context/AppContext";
import { reg_int, reg_txt } from "utils/initialvalue";
import { ifNoTextSetNull } from "actions/ifNoTextSetNull";
import { useStatus } from "hooks/useStatus";

export default function PakowanieZamowienie() {
  const [oprawa_row, setOprawa_row] = useState();
  const [showOprawaElementyStage, setShowOprawaElementyStage] = useState(false);
  const [expand, setExpand] = useState(true);


  return (
    <div className={style.container}>
      <div className={style.historia}>
        {/* <PAKOWANIE_HEADER/> */}
        <PAKOWANIE_TABLE/>
      </div>
    </div>
  );
}


const PAKOWANIE_HEADER = () => {
  return(
    <p title={" Uwagi do pakowania"} className={style.header_title}>Uwagi do pakowania</p>
  )
}
function PAKOWANIE_TABLE() {
  const contextModalInsert = useContext(ModalInsertContext);
  const pakowanie = contextModalInsert.pakowanie;

  return (
    <div className={style.main}>
      <table className={style.table_historia}>
        <thead className={style.glowka}>
          <tr>
            <th className={style.col4}>Uwagi do pakowania</th>
          </tr>
        </thead>
        <tbody className={style.table_historia_body}>
          {pakowanie.sort((a, b) => b.id - a.id)
          //  .filter((x) => x.delete != true)
          .map((row) => {
            return (
              <>
                <tr
                  key={row.id}
                >
                  {/* <td>{row.uwagi}</td> */}
                  <Uwagi row={row}/>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


function Uwagi( {row}){

  return(
      <td className={style.col}>
      <textarea className={style.input_textarea} rows="3" type="text"
      value={row.uwagi}
      onChange={(event) => {
        const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ./-]+$/;
        if ( event.target.value === '' || re.test(event.target.value)) {
 
          // setDaneZamowienia({...daneZamowienia, uwagi: event.target.value, status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
           
     }

      }}></textarea>
    </td>
  );
}
