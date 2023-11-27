import { Fragment } from "react";
import style from "./IntroligatorniaTable.module.css";
import {  _oprawa } from "../api";

export default function IntroligatorniaTable({ zestawy,setZestwy,fragmenty,setFragmenty }) {
  
  return (
    <>
      <div className={style.oprawy}>

            <Oprawa zestawy ={zestawy}></Oprawa> 
        {/* {zestawy.map((prod) => (

        
          ))}
        <Oprawa nr={1000}/> */}
      
      </div>
    </>
  );
}

function Oprawa({ nr,zestawy }) {



  return (
    <div className={style.oprawaCard}>
      <Header nr={nr} />

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

        {zestawy.map((row) => {
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
                                            <td>{row.typ}</td>
                                            <td>{row.typ}</td>
                                            {/* <td><input defaultValue={row.naklad} onChange={(e)=>setInfo(e.target.value)}></input></td>
                                            <td><input defaultValue={row.nazwa} onChange={(e)=>setInfo(e.target.value)}></input></td> */}
                                            <td>{row.ilosc_stron}</td>
                                            <td>{row.kolor_front}</td>
                                            <td>{row.kolor_back}</td>
                                            <td>{row.format_x}</td>
                                            <td>{row.format_y}</td>
                                            <td>{row.papier_id}</td>
                                            <td>{row.gramatura}</td>
                                            <td>{row.wykonczenie}</td>
                                            <td>{row.uszlachetnianie_id}</td>
                                            <td>{row.uszlachetnianie_id}</td>
                                            {/* <td><button onClick={()=> setInfo("OK")}>OK</button></td> */}
                                      
                                    </tr>
                                );
                                })}
    
        </tbody>
</table>
      </div>
    

    </div>
  );
}


function FragmentElementu({nazwa}){
  return(<>
  <div>{nazwa}</div>
  <div>XX</div>
  </>)
}
function Header({nr}){
return(    <div className={style.header}>
  Oprawa  {nr}
</div>)
}
function RodzajOprawy({zestawy,setZestwy}){
  return(
    <select 
    className={style.select}
    valueDefault={zestawy}
    onChange={setZestwy}
  >
    {_oprawa.map((option) => (
      <option key={option.id} value={option.id}>
      {option.nazwa} 
      </option>
    ))}
  </select>
  );
}

function Naklad(){
  return(<input></input>);
}
function Spedycja(){
  return(
  <>
  <input type="date"></input>
  </>
  );
}