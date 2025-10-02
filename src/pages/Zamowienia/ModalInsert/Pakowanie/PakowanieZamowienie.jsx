import style from "./PakowanieZamowienie.module.css";
import { useContext, useRef } from "react";
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
    const textareaRef = useRef(null);

      const handlePrint = () => {
        // 1. Sprawdzenie, czy element istnieje
        if (!textareaRef.current) return;

        // 2. Pobieramy zawartość pola
        const contentToPrint = textareaRef.current.value;

        // 3. Otwieramy nowe, tymczasowe okno
        const printWindow = window.open('', '', 'height=600,width=800');
        
        // --- Manipulacja DOM w nowym oknie ---
        
        // 4. Tworzymy główny element dla treści (np. <pre>)
        const preElement = printWindow.document.createElement('pre');
        const preElement2 = printWindow.document.createElement('pre2');
        
        // Ustawiamy tekst z textarea. Tekst musi być w węźle tekstowym.
          const textNode = printWindow.document.createTextNode(daneZamowienia.nr+ " / "+daneZamowienia.rok+" "+ daneZamowienia.klient+" "+ daneZamowienia.tytul);
        preElement2.appendChild(textNode);

        const textNode2 = printWindow.document.createTextNode(" UWAGI DO PAKOWANIA: \n \n");
        preElement.appendChild(textNode2);
        
        const textNode3 = printWindow.document.createTextNode(contentToPrint);
        preElement.appendChild(textNode3);

        // 5. Opcjonalnie: Ustawiamy styl dla czytelności (CSS)
        preElement.style.fontFamily = 'Arial, sans-serif';
        preElement.style.whiteSpace = 'pre-wrap';
        preElement.style.margin = '20px';


         preElement2.style.fontFamily = 'Arial, sans-serif';
        preElement2.style.whiteSpace = 'pre-wrap';
        preElement2.style.margin = '40px';
        preElement2.style.fontWeight = 'bold';

        // 6. Czyścimy i dodajemy treść do <body>
        printWindow.document.body.innerHTML = '';
        printWindow.document.body.appendChild(preElement2);
        printWindow.document.body.appendChild(preElement);
        
        // 7. Ustawiamy tytuł
        printWindow.document.title = 'Wydruk zawartości pola';

        // --- Drukowanie ---

        // 8. Wywołujemy natychmiastowe drukowanie
        printWindow.print();
        
        // printWindow.close(); // Opcjonalnie: zamknięcie okna po wydruku
    };

  return(
      <td className={style.col}>
      <textarea  ref={textareaRef} className={style.input_textarea} rows="3" type="text"
      // onDoubleClick={()=>{handlePrint()

      // }}
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
        // const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻŚĆŹ./-šž,!:]+$/;
        if ( event.target.value === '' || reg_txt.test(event.target.value)) {
      
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
