import style from "./../KosztyDodatkowe.module.css";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useContext } from "react";
import StatusKosztow from "./StatusKosztow";
import EdytujKoszty from "./EdytujKoszty";
export default function TableKoszty() {

  const contextModal = useContext(ModalInsertContext );
  const kosztyDodatkowe = contextModal.kosztyDodatkowe;
  const setKosztyDodatkowe = contextModal.setKosztyDodatkowe;
  const kosztyDodatkoweZamowienia = contextModal.kosztyDodatkoweZamowienia;
  const setKosztyDodatkoweZamowienia = contextModal.setKosztyDodatkoweZamowienia;
  
    return <div className={style.main}>
        
          <table className={style.table2}>
            <thead>
              <tr>
                <th className={style.col2}>#</th>
                <th className={style.col3}>Nazwa</th>
                <th className={style.col10}>Ilość</th>
                <th className={style.col10}>Cena</th>
                <th className={style.col10}>Suma</th>
                <th className={style.col10}>Uwagi</th>
              </tr>
            </thead>
            <tbody className={style.center}>

              {kosztyDodatkowe.map((row) => {
                return (
                  <tr
                    key={row.id}
                  >
                    <Indeks row={row}/>
                    <Nazwa row={row} />
                    <Ilosc row={row} />
                    <Cena row={row} />
                    <Suma row={row} />
                    <Info row={row} />

     
                  </tr>
                );
              })}
            </tbody>
          </table>
                <div className={style.zestawienie_kosztow }>
                     <EdytujKoszty/>     <div className={style.suma_label }>Suma kosztów dodatkowych: {kosztyDodatkoweZamowienia[0].suma}</div> <StatusKosztow/>
                </div>
        </div>
  
  }
  

  function Indeks({ row }) {
    return (
      <td>{row.indeks}</td>
    );
  }
  function Nazwa({ row }) {
    return (
      <td>{row.nazwa}</td>
    );
  }
  function Ilosc({ row }) {
    return (
      <td>{row.ilosc}</td>
    );
  }
  function Cena({ row }) {
    return (
      <td>{row.cena}</td>
    );
  }
  function Suma({ row }) {
    return (
      <td>{row.cena}</td>
    );
  }
  function Info({ row }) {
    return (
      <td>{row.cena}</td>
    );
  }
  
