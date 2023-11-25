// import iconCopy from "../../../../../svg/copy.svg";
// import iconTrash from "../../../../../svg/trash2.svg";
import style from "./ElementTable.module.css";
import { _papiery } from "../../api";
import ElementTableHeader from "./ElementTableHeader";



export default function ElementTable({elementy,setElementy,handleChangeCardElementy,selected_papier,setSelected_papier,fragmenty,setFragmenty,info,setInfo}) {
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
            <th className={style.col4}>Typ</th>
            <th className={style.col5}>Nakład</th>
            <th className={style.col6}>Nazwa</th>
            <th className={style.col7}>Ilość stron</th>
            <th className={style.col7}>Kolor Front</th>
            <th className={style.col7}>Kolor Back</th>
            <th className={style.col7}>Netto X</th>
            <th className={style.col7}>Netto Y</th>
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
                                            <td><input defaultValue={row.naklad} onChange={(e)=>setInfo(e.target.value)}></input></td>
                                            <td><input defaultValue={row.nazwa} onChange={(e)=>setInfo(e.target.value)}></input></td>
                                            <td>{row.ilosc_stron}</td>
                                            <td>{row.kolor_front}</td>
                                            <td>{row.kolor_back}</td>
                                            <td>{row.format_x}</td>
                                            <td>{row.format_y}</td>
                                            <td>{row.papier_id}</td>
                                            <td>{row.gramatura}</td>
                                            <td>{row.wykonczenie}</td>
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


