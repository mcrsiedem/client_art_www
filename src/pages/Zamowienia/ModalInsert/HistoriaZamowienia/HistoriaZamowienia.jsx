import style from "./HistoriaZamowienia.module.css";
import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import { _typ_elementu } from "utils/initialvalue";

export default function HistoriaZamowienia() {
 const contextModalInsert = useContext(ModalInsertContext);
const showTabs = contextModalInsert.showTabs
const setShowTabs = contextModalInsert.setShowTabs

if(showTabs.historia){
    return (
    <div className={style.container}>
      <div className={style.historia}>
        <HISTORIA_TABLE/>
      </div>
    </div>
  );
}
}


function HISTORIA_TABLE() {
  const contextModalInsert = useContext(ModalInsertContext);
  const historiaZamowienia = contextModalInsert.historiaZamowienia;

  return (
    <div className={style.main}>
      <table className={style.table_historia}>
        <thead className={style.glowka}>
          <tr>
            <th className={style.th_data}>Data</th>
            <th className={style.th_kategoria}>Kategoria</th>
            <th className={style.col4}>Zdarzenie</th>
            <th className={style.th_kategoria}>Użytkownik</th>
          </tr>
        </thead>
        <tbody className={style.table_historia_body}>
          {historiaZamowienia.sort((a, b) => b.id - a.id)
          //  .filter((x) => x.delete != true)
          .map((row) => {
            return (
              <>
                <tr
                className={style.row_zamowienia}
                  key={row.id}
                >
                  <td>{row.data}</td>
                  <td>{row.kategoria}</td>
                  <td>{row.event}</td>
                  <td>{row.user}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
