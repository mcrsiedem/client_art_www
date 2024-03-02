import style from "./../Pakowanie.module.css";
import iconCopy from "../../../../../svg/copy.svg";
import iconTrash from "../../../../../svg/trash2.svg"
import { addNewPacking } from "../../../../Actions/Packing/addNewPacking";
import { deletePacking } from "../../../../Actions/Packing/deletePacking";
export default function Table({pakowanie,setPakowanie,handleChangeCardPakowanie}) {
    return <div className={style.main}>
        
          <table className={style.table2}>
            <thead>
              <tr>
                <th className={style.col1}>#Zamówienie</th>
                <th className={style.col1}>#Produkt</th>
                <th className={style.col2}>#</th>
                <th className={style.col2}>i</th>
                <th className={style.col3}>Nazwa</th>
                <th className={style.col10}>Ilość szt.</th>
                <th className={style.col10}>Sztuki w paczce</th>
                <th className={style.col10}>Rodzaj pakowania</th>
                <th className={style.col10}>Uwagi</th>
                <th className={style.col10}>+</th>
                <th className={style.col10}>-</th>
  
              </tr>
            </thead>
            <tbody className={style.center}>
              {pakowanie.map((row) => {
                return (
                  <tr draggable
                    key={row.id}
                    onDragStart={()=>handleDragStart(row)} 
                    onDragOver={(handleDragOver)}
                    onDrop={()=>handleDrop(row,pakowanie,setPakowanie)}
                  >
                    <ZamowienieId row={row}/>
                    <ProduktId row={row}/>
                    <Id row={row}/>
                    <Indeks row={row}/>
                    <Nazwa row={row} handleChangeCardPakowanie={handleChangeCardPakowanie}/>
                    <Ilosc row={row} handleChangeCardPakowanie={handleChangeCardPakowanie}/>
                    <SztukiWpaczce row={row} handleChangeCardPakowanie={handleChangeCardPakowanie}/>
                    <RodzajPakowania row={row} handleChangeCardPakowanie={handleChangeCardPakowanie}/>
                    <Uwagi row={row} handleChangeCardPakowanie={handleChangeCardPakowanie}/>
                    <Dodaj row={row} pakowanie={pakowanie} setPakowanie={setPakowanie}/>
                    <Usun row={row} pakowanie={pakowanie} setPakowanie={setPakowanie}/>
               
  
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
  
  }
  
  function ZamowienieId({ row }) {
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
          defaultValue={row.nazwa}
          onChange={(e) =>
            handleChangeCardPakowanie({
              ...row,
              nazwa: e.target.value,
            })
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
          defaultValue={row.rodzaj_pakowania}
          onChange={(e) =>
            handleChangeCardPakowanie({
              ...row,
              rodzaj_pakowania: e.target.value,
            })
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
          defaultValue={row.uwagi}
          onChange={(e) =>
            handleChangeCardPakowanie({
              ...row,
              uwagi: e.target.value,
            })
          }
        ></input>
      </td>
    );
  }
  
  function Dodaj({ row, pakowanie ,setPakowanie}) {
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
  
  function Usun({ row, pakowanie ,setPakowanie}) {
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



  function handleDrop(row,pakowanie,setPakowanie){
    let drop_indeks = row.indeks
    let drag_indeks = sessionStorage.getItem("indeks_paczka_drag")
    let drag_id= sessionStorage.getItem("id_paczka_drag")


     const pakowanieEdit = pakowanie.slice();

     pakowanieEdit.map((p) => {
      if (p.indeks > drag_indeks) {
        p.indeks--
      }
    });

    pakowanieEdit.map((p) => {
      if (p.indeks >= drop_indeks) {
        p.indeks++
      }
    });
    pakowanieEdit.map((p) => {
      if (p.id == drag_id) {
        p.indeks =drop_indeks
      }
    });


      pakowanieEdit.sort((a, b) => a.indeks - b.indeks);
      setPakowanie(pakowanieEdit);
  }

  function handleDragOver(e){
     e.preventDefault()


  }

  function handleDragStart(row){

    sessionStorage.setItem("indeks_paczka_drag", row.indeks);
    sessionStorage.setItem("id_paczka_drag", row.id);
    // console.log("drag_indeks "+indeks)

  }
