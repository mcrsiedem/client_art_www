import { Fragment } from "react";
import style from "./IntroligatorniaTable.module.css";
import { _oprawa } from "../api";

export default function IntroligatorniaTable({
  zestawy,
  setZestwy,
  fragmenty,
  setFragmenty,
}) {
  return (
    <>
      <div className={style.oprawy}>
        <Oprawa zestawy={zestawy} fragmenty={fragmenty}>
          {" "}
        </Oprawa>
        {/* {zestawy.map((prod) => (

        
          ))}
        <Oprawa nr={1000}/> */}
      </div>
    </>
  );
}

function Oprawa({ nr, zestawy, fragmenty }) {
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
              
              {/* tworzy tyle kolumn ile jest fragmentów */}
              {fragmenty.map((row) => {
                return <th key={row.id}>{row.naklad}</th>;
              })}

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
                  <td>{row.oprawa}</td>
                  <td>{row.naklad}</td>
                  <td>{row.typ}</td>
                  <td>{row.ilosc_stron}</td>

                  {fragmenty.map((row) => {
                    return <td key={row.id}>{row.naklad}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FragmentElementu({ nazwa }) {
  return (
    <>
      <div>{nazwa}</div>
      <div>XX</div>
    </>
  );
}
function Header({ nr }) {
  return <div className={style.header}>Oprawa {nr}</div>;
}
function RodzajOprawy({ zestawy, setZestwy }) {
  return (
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

function Naklad() {
  return <input></input>;
}
function Spedycja() {
  return (
    <>
      <input type="date"></input>
    </>
  );
}
