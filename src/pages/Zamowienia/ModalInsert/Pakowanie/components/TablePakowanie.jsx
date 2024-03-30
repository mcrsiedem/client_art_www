import style from "./../Pakowanie.module.css";
import iconCopy from "../../../../../assets/copy.svg";
import iconTrash from "../../../../../assets/trash2.svg"
import { addNewPacking } from "../../../../../actions/addPacking";
import { deletePacking } from "../../../../../actions/deletePacking";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useContext } from "react";
import { reg_txt } from "utils/initialvalue";
export default function TablePakowanie({handleChangeCardPakowanie}) {

  const contextModal = useContext(ModalInsertContext );
  const contextModalInsert = useContext(ModalInsertContext);
  const pakowanie = contextModalInsert.pakowanie;
  const setPakowanie = contextModalInsert.setPakowanie;
    return <div className={style.main}>
        
          <table className={style.table2}>
            <thead>
              <tr>
                {/* <th className={style.col1}>#Zamówienie</th>
                <th className={style.col1}>#Produkt</th>
                <th className={style.col2}>i</th> */}
                <th className={style.col2}>#</th>
                <th className={style.col3}>Nazwa</th>
                <th className={style.col10}>Ilość szt.</th>
                <th className={style.col10}>Sztuki w paczce</th>
                <th className={style.col10}>Rodzaj pakowania</th>
                <th className={style.col10}>Uwagi</th>
                <th className={style.col10}></th>
                <th className={style.col10}></th>
     
  
              </tr>
            </thead>
            <tbody className={style.center}>
              {pakowanie.map((row) => {
                return (
                  <tr draggable={contextModal.lockDragDrop}
                    key={row.id}
                    onDragStart={()=>handleDragStart(row)} 
                    onDragOver={(handleDragOver)}
                    onDrop={()=>handleDrop(row,pakowanie,setPakowanie)}
                  >
                    {/* <ZamId row={row}/>
                    <ProduktId row={row}/>
                    <Id row={row}/> */}
                    <Indeks row={row}/>
                    <Nazwa row={row} handleChangeCardPakowanie={handleChangeCardPakowanie}/>
                    <Ilosc row={row} handleChangeCardPakowanie={handleChangeCardPakowanie}/>
                    <SztukiWpaczce row={row} handleChangeCardPakowanie={handleChangeCardPakowanie}/>
                    <RodzajPakowania row={row} handleChangeCardPakowanie={handleChangeCardPakowanie}/>
                    <Uwagi row={row} handleChangeCardPakowanie={handleChangeCardPakowanie}/>
                    <Dodaj row={row} />
                    <Usun row={row} />
   
               
  
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
  
  }
  
  function ZamId({ row }) {
    return (
      <td>{row.zamowienie_id}</td>
    );
  }
  
  function ProduktId({ row }) {
    return (
      <td>{row.produkt_id}</td>
    );
  }
  function Id({ row }) {
    return (
      <td>{row.id}</td>
    );
  }
  function Indeks({ row }) {
    return (
      <td>{row.indeks}</td>
    );
  }
  
  function Nazwa({ row, handleChangeCardPakowanie }) {
    return (
      <td>
        <input
          className={style.in}
          value={row.nazwa}
          onChange={(e) =>
            {
              if ( e.target.value === '' || reg_txt.test(e.target.value)) {
              handleChangeCardPakowanie({
              ...row,
              nazwa: e.target.value,
            })}}
          }
        ></input>
      </td>
    );
  }
  
  function Ilosc({ row, handleChangeCardPakowanie }) {
    return (
      <td>
        <input
          className={style.in}
          defaultValue={row.naklad}
          onChange={(e) => {
  
            const re = /^[0-9]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
            
            handleChangeCardPakowanie({
              ...row,
              naklad: e.target.value,
            })
          }
        }
  
            
          }
        ></input>
      </td>
    );
  }
  
  function SztukiWpaczce({ row, handleChangeCardPakowanie }) {
    return (
      <td>
        <input
          className={style.in}
          defaultValue={row.sztuki_w_paczce}
          onChange={(e) =>  {
            const re = /^[0-9]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                 handleChangeCardPakowanie({
              ...row,
              sztuki_w_paczce: e.target.value,
            })}
          }
       
          }
        ></input>
      </td>
    );
  }
  
  function RodzajPakowania({ row, handleChangeCardPakowanie }) {
    return (
      <td>
        <input
          className={style.in}
          value={row.rodzaj_pakowania}
          onChange={(e) =>
            {
              if ( e.target.value === '' || reg_txt.test(e.target.value)) {
              handleChangeCardPakowanie({
              ...row,
              rodzaj_pakowania: e.target.value,
            })}}
          }
        ></input>
      </td>
    );
  }
  
  function Uwagi({ row, handleChangeCardPakowanie }) {
    return (
      <td>
        <input
          className={style.in}
          value={row.uwagi}
          onChange={(e) =>
            {
              if ( e.target.value === '' || reg_txt.test(e.target.value)) {
              handleChangeCardPakowanie({
              ...row,
              uwagi: e.target.value,
            })}}
          }
        ></input>
      </td>
    );
  }
  
  function Dodaj({ row}) {
    const contextModalInsert = useContext(ModalInsertContext);
    const pakowanie = contextModalInsert.pakowanie;
    const setPakowanie = contextModalInsert.setPakowanie;
    return (
      <td className={style.col_button} >
              <img
           className={style.expand}
            src={iconCopy}
            onClick={() => {addNewPacking(row,pakowanie,setPakowanie)}}
            alt="Procesy"
          />
      </td>
    );
  }
  
  function Usun({ row}) {
    const contextModalInsert = useContext(ModalInsertContext);
    const pakowanie = contextModalInsert.pakowanie;
    const setPakowanie = contextModalInsert.setPakowanie;
    return (
      <td className={style.col_button}>
        <div >
                        <img
           className={style.expand}
            src={iconTrash}
            onClick={() => {deletePacking(row, pakowanie ,setPakowanie)}}
            alt="Procesy"
          />
        </div>
  
      </td>
    );
  }



  function handleDrop(row, pakowanie, setPakowanie) {
    let drop_indeks = row.indeks;
    let drag_indeks = sessionStorage.getItem("indeks_drag");
    let drag_id = sessionStorage.getItem("id_drag");
    let typ_drag = sessionStorage.getItem("typ_drag");
    if(typ_drag=="paczka"){

          const pakowanieEdit = pakowanie.slice();
// kasowanie miejsca po przenoszonym przedmiocie
    pakowanieEdit.map((p) => {
      if (p.indeks > drag_indeks) {
        p.indeks--;
      }
    });
// robienie miejsca na przenoszony przedmiot
    pakowanieEdit.map((p) => {
      if (p.indeks >= drop_indeks) {
        p.indeks++;
      }
    });

    // nadanie przenoszonemu przedmiotowi odpowiedniego indexu, czyli dostaje index miejsca w które zostało coś wrzucone
    pakowanieEdit.map((p) => {
      if (p.id == drag_id) {
        p.indeks = drop_indeks;
      }
    });

    pakowanieEdit.sort((a, b) => a.indeks - b.indeks);
    setPakowanie(pakowanieEdit);
    sessionStorage.setItem("indeks_drag", 0);
    sessionStorage.setItem("id_drag", 0);
    sessionStorage.setItem("typ_drag", 0);
    }


  }

  function handleDragOver(e){
     e.preventDefault()


  }

  function handleDragStart(row){
    sessionStorage.setItem("indeks_drag", row.indeks);
    sessionStorage.setItem("id_drag", row.id);
    sessionStorage.setItem("typ_drag", "paczka");
  }
