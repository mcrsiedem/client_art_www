// import iconCopy from "../../../../../svg/copy.svg";
// import iconTrash from "../../../../../svg/trash2.svg";
import style from "./ElementTable.module.css";
import { _papiery } from "../../api";
import ElementTableHeader from "./ElementTableHeader";



export default function ElementTable({elementy,setElementy,handleChangeCardElementy,selected_papier,setSelected_papier,fragmenty,setFragmenty,info,setInfo,listaWykonczenia}) {
  //  const nakladHandler = (e,row) => { handleChangeCardElementy({ ...row, naklad: e.target.value }) }
  // const nazwaHandler = (e) => { handleChangeCardElementy({ ...card, nazwa: e.target.value }) }
  // const stronyHandler = (e) => { handleChangeCardElementy({ ...card, ilosc_stron: e.target.value }) }
  // const formatXHandler = (e) => { handleChangeCardElementy({ ...card, format_x: e.target.value }) }
  // const formatYHandler = (e) => { handleChangeCardElementy({ ...card, format_y: e.target.value }) }
  // const kolorFrontHandler = (e) => { handleChangeCardElementy({ ...card, kolor_front: e.target.value }) }
  // const kolorBackHandler = (e) => { handleChangeCardElementy({ ...card, kolor_back: e.target.value }) }
  // const papierkHandler = (e) => { handleChangeCardElementy({ ...card, papier_id: e.target.value }) }
  return (
    <div className={style.elementCard}>
        
      <ElementTableHeader
        // card={card}
        elementy={elementy}
        setElementy={setElementy}
        fragmenty={fragmenty}
        setFragmenty={setFragmenty}
      />

      <div className={style.main}>
  
<table className={style.table}>
<thead>
          <tr >
            <th className={style.col1}>Zam.</th>
            <th className={style.col2}>Prod.</th>
            <th className={style.col3}>#</th>
            <th className={style.col_typ}>Typ</th>
            <th className={style.col_naklad}>Nakład</th>
            <th className={style.col_nazwa}>Nazwa</th>
            <th className={style.col_strony}>Strony</th>
            <th className={style.col_kolory}>Kolory</th>
            <th className={style.col_format} colspan="2">Netto</th>
           
            <th className={style.col7}>Papier</th>
            <th className={style.col7}>Gramatura</th>
            <th className={style.col7}>Wykończenie</th>
            <th className={style.col7}>Lakier</th>
            <th className={style.col7}>OK</th>
          </tr>

        </thead>
        <tbody>

        {elementy.map((row) => {
                                return (
                                    <tr
                                    key={row.id}
                                    // onDoubleClick={(node, event) => {
                               
                                    //     setOpenModal(true);
                                    //     setRow({ id: row.id, user: row.user });
                                    // }}
                                    >
                                            <td>{row.zamowienie_id}</td>
                                            <td>{row.produkt_id}</td>
                                            <td>{row.id}</td>
                                            <td>{row.typ}</td>
                                            <td><input defaultValue={row.naklad} onChange={(e)=>handleChangeCardElementy({ ...row, naklad: e.target.value })}></input></td>
                                            <td><input defaultValue={row.nazwa} onChange={(e)=>handleChangeCardElementy({ ...row, nazwa: e.target.value })}></input></td>
                                            <td>{row.ilosc_stron}</td>
                                            <td>{row.kolor_front}</td>
                                            <td>{row.format_x}</td>
                                            <td>{row.format_y}</td>
                                            <td>{row.papier_id}</td>
                                            <td>{row.gramatura}</td>
                                            <td><select
                                                className={style.select}
                                                defaultValue={row.wykonczenie}
                                                 onChange={(e)=>handleChangeCardElementy({ ...row, wykonczenie: e.target.value })}
                                              >
                                                {listaWykonczenia.map((option) => (
                                                  <option key={option.id} value={option.id}>
                                                  {option.nazwa} 
                                                  </option>
                                                ))}
                                              </select>
                                              </td>
                                            <td>{row.uszlachetnianie_id}</td>
                                            <td><button onClick={()=> setInfo("OK")}>OK</button></td>
                                      
                                    </tr>
                                );
                                })}
    
        </tbody>
</table>

   
      </div>
      {/* <CardCenter
        card={card}
        setElementy={setElementy}
        handleChangeCardElementy={handleChangeCardElementy}
        selected_papier={selected_papier}
        setSelected_papier={setSelected_papier}
      /> */}

    </div>
  );
}


