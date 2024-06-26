import style from "./IntroligatorniaTable.module.css";
import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { AppContext } from "context/AppContext";

export default function IntroligatorniaTable() {

    const techContext = useContext(TechnologyContext);
    const oprawaTech = techContext.oprawaTech;

  return (
    <div className={style.container}>
      <table>
        <thead className={style.table_th}>
          <tr>
            <th className={style.col7}></th>
            <th className={style.col3}>#</th>
            <th className={style.col4}>Oprawa</th>
            <th className={style.col4}>Ilość str</th>
            <th className={style.th_wersja}>Wersja</th>
            <th className={style.col_bok_oprawy}>Naklad</th>
            <th className={style.col_bok_oprawy}>Bok oprawy</th>
            <th className={style.col6}>Czystodruki</th>
            <th className={style.col6}>Data spedycji</th>
            <th className={style.col7}>Uwagi</th>
            <th className={style.col7}></th>
            <th className={style.col7}></th>
            <th className={style.col7}></th>
          </tr>
        </thead>

        <tbody>
            {oprawaTech.map(row=>  <OprawaRow row={row} /> )}
        </tbody>
      </table>
    </div>
  );
}


const OprawaRow = ({ row }) => {
  const techContext = useContext(TechnologyContext);
    const legiFragmenty = techContext.legiFragmenty;
  return (
    <>
    <tr key={row.id}>
      <td></td>
      <td></td>
      <RodzajOprawy row={row} />
      <td></td>
      <td></td>
      <td>{row.naklad}</td>
    </tr>
    {legiFragmenty.
    filter(f=> f.oprawa_id == row.id).
    map(row=>  <LegaFragmentRow row={row} /> )}
    </>
  );
};


const LegaFragmentRow = ({ row }) => {
  return (
    <tr key={row.id}>
      <td></td>
      <td>{row.indeks}</td>
      <td>{row.oprawa_id}</td>
      <td>{row.naklad}</td>
      <td></td>
      <td></td>
    </tr>
  );
};




function RodzajOprawy({ row, handleChangeCardOprawa }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const produkty = contextModalInsert.produkty;
  const setProdukty = contextModalInsert.setProdukty;
  const contextApp = useContext(AppContext);

  return (
    <td className={style.select}>
      <select
        className={style.input_oprawa}
        defaultValue={row.oprawa}
        onChange={(event) => {
          handleChangeCardOprawa({ ...row, oprawa: event.target.value });

          if (row.indeks == 0) {
            setProdukty(
              produkty.map((p) => {
                if (p.id === row.produkt_id) {
                  return { ...p, oprawa: event.target.value };
                } else {
                  return p;
                }
              })
            );
          }
        }}
      >
        {contextApp.bindingType.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </td>
  );}
