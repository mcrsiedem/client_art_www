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
import { useHistoria } from "hooks/useHistoria";

export default function PakowanieZamowienie() {
  const [oprawa_row, setOprawa_row] = useState();
  const [showOprawaElementyStage, setShowOprawaElementyStage] = useState(false);
  const [expand, setExpand] = useState(true);


  return (
    <div className={style.container}>
      <div className={style.historia}>
        <PAKOWANIE_HEADER/>
        <PAKOWANIE_TABLE/>
      </div>
    </div>  
  );
}


const PAKOWANIE_HEADER = () => {
  return(
    <div className={style.header_container}>
      <p title={" Uwagi do pakowania"} className={style.header_title}>Uwagi do pakowania</p>
    </div>
  )
}
function PAKOWANIE_TABLE() {
  const contextModalInsert = useContext(ModalInsertContext);
  const pakowanie = contextModalInsert.pakowanie;

  return (
    <div className={style.main}>
      <table className={style.table_historia}>
        <thead className={style.glowka}>
          {/* <tr>
            <th className={style.col4}>Uwagi do pakowania</th>
          </tr> */}
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
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowPakowanie = contextModalInsert.handleUpdateRowPakowanie;
    const [setStatus] = useStatus()
    const [add] = useHistoria()
    const [valueIN,setValueIN] = useState(null)
    const daneZamowienia = contextModalInsert.daneZamowienia
  return(
      <td className={style.col}>
      <textarea className={style.input_textarea} rows="3" type="text"
      value={row.uwagi}
      onFocus={()=>{ setValueIN(row.uwagi)}}
      onBlur={(e)=>{
        if(valueIN != e.target.value){
               
        add(         {
          kategoria: "Pakowanie",
          event: " Nowe uwagi : "+e.target.value ,
          zamowienie_id: daneZamowienia.id
        })
        }
      }}
      onChange={(event) => {
        const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻŚĆŹ./-šž,!:]+$/;
        if ( event.target.value === '' || re.test(event.target.value)) {
      
          // setDaneZamowienia({...daneZamowienia, uwagi: event.target.value, status: daneZamowienia.stan ==3 ? 3:daneZamowienia.status,update: true});
          handleUpdateRowPakowanie({
            ...row,
            uwagi: event.target.value,
            update:true
          });
     }
     setStatus(3)

      }}></textarea>
    </td>
  );
}
