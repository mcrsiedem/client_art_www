import { Fragment } from "react";
import style from "./IntroligatorniaTable.module.css";
import logoExpand from "../../../../svg/expand.svg";
import { _rodzaj_oprawy,_oprawa } from "../api";
import {  useState } from "react";

export default function IntroligatorniaTable({
  oprawa,
  setOprawa,
  fragmenty,
  setFragmenty,
}) {

  const [expand,setExpand] =useState(true);
  return (
    <>
      <div className={style.oprawy}>
        <Oprawa oprawa={oprawa} setOprawa={setOprawa}fragmenty={fragmenty} expand={expand} setExpand={setExpand}>
          {" "}
        </Oprawa>
        {/* {zestawy.map((prod) => (

        
          ))}
        <Oprawa nr={1000}/> */}
      </div>
    </>
  );
}

function Oprawa({ nr, oprawa, setOprawa,fragmenty,expand,setExpand }) {
  return (
    <div className={style.oprawaTable}>
      <Header nr={nr} />

      <div className={style.main}>
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.col1}>Zam.</th>
              <th className={style.col2}>Prod.</th>
              <th className={style.col3}>#</th>
              <th className={style.col4}>Oprawa</th>
              <th className={style.col5}>Nakład</th>
              <th className={style.col6}>Data spedycji</th>
              <th className={style.col7}>Uwagi</th>
              <th className={style.col7}>Fragmenty</th>
            

            </tr>
          </thead>
          <tbody>
            {_oprawa.map((row) => {
              return (
                <>
                <tr
                  key={row.id}
                >
                  <td>{row.zamowienie_id}</td>
                  <td>{row.produkt_id}</td>
                  <td>{row.id}</td>
                  <RodzajOprawy oprawa={oprawa} setOprawa={setOprawa}/>
                  <td>{row.naklad}</td>
                  <td>{row.data_spedycji}</td>
                
                  <td>{row.uwagi}</td>
                  <img
          className={style.icon}
          src={logoExpand}
          onClick={() => {setExpand(!expand)}}
          alt="Procesy"
        />

</tr>
                  {expand ? fragmenty
                  .filter((el) => el.oprawa_id === row.id)
                  .map((row) => {
                    return <tr key={row.id}>
                      <td></td><td></td><td></td>
                      <td>
                      {row.typ} 
                      </td>
                      <td>
                      {row.naklad}
                      </td>
                      <td></td><td></td><td></td>
                     </tr>;
                  }):<></>}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function Header({ nr }) {
  return <div className={style.header}>Oprawa {nr}</div>;
}

function DataSpedycji({daneZamowienia,setDaneZamowienia}){
  return(
      <div className={style.col}>
      <label className={style.label}> Data spedycji </label>
      <input className={style.data} type="date"
      defaultValue={daneZamowienia.dataSpedycji}
      onChange={(event) => {
        setDaneZamowienia({...daneZamowienia, dataSpedycji: event.target.value});
      }}></input>
    </div>
  );
}

function RodzajOprawy({ oprawa,setOprawa }) {
  return (
    <div className={style.col}>

      <select
        className={style.firma}
        value={oprawa.oprawa}
        onChange={(event) => {
          setOprawa({...oprawa, oprawa: event.target.value});
        }}
      >
        {_rodzaj_oprawy.map((option) => (
          <option key={option.id} value={option.id}>
          {option.nazwa} 
          </option>
        ))}
      </select>
    </div>
  );
}