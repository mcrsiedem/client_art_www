import { Fragment } from "react";
import style from "./IntroligatorniaTable.module.css";
import logoExpand from "../../../../svg/expand.svg";
import { _oprawa } from "../api";
import {  useState } from "react";

export default function IntroligatorniaTable({
  zestawy,
  setZestwy,
  fragmenty,
  setFragmenty,
}) {

  const [expand,setExpand] =useState(true);
  return (
    <>
      <div className={style.oprawy}>
        <Oprawa zestawy={zestawy} fragmenty={fragmenty} expand={expand} setExpand={setExpand}>
          {" "}
        </Oprawa>
        {/* {zestawy.map((prod) => (

        
          ))}
        <Oprawa nr={1000}/> */}
      </div>
    </>
  );
}

function Oprawa({ nr, zestawy, fragmenty,expand,setExpand }) {
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
              <th className={style.col6}>Data</th>
              <th className={style.col7}>Uwagi</th>
              <th className={style.col7}>Fragmenty</th>
            

            </tr>
          </thead>
          <tbody>
            {zestawy.map((row) => {
              return (
                <>
                <tr
                  key={row.id}
                >
                  <td>{row.zamowienie_id}</td>
                  <td>{row.produkt_id}</td>
                  <td>{row.id}</td>
                  <td>{row.oprawa}</td>
                  <td>{row.naklad}</td>
                  <td>{row.typ}</td>
                  <td>{row.ilosc_stron}</td>
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
                    return <tr key={row.id}>{row.typ} {row.naklad}</tr>;
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
