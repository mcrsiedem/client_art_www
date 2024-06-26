import style from "./IntroligatorniaTech.module.css";
import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";

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

            {oprawaTech.map(row=>{


            })}
        </tbody>
      </table>
    </div>
  );
}


const OprawaRow = () => {

    
}