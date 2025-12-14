import style from "./../KosztyDodatkowe.module.css";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useContext } from "react";
import StatusKosztow from "./StatusKosztow";
import DodajKoszty from "./DodajKoszty";
import KOSZT_NAZWA from "./koszt/KOSZT_NAZWA";
import KOSZT_UWAGI from "./koszt/KOSZT_UWAGI";
import KOSZT_ILOSC from "./koszt/KOSZT_ILOSC";
import KOSZT_CENA from "./koszt/KOSZT_CENA";
import UsunKoszt from "./UsunKoszt";
export default function TableKoszty() {

  const contextModal = useContext(ModalInsertContext );

  const kosztyDodatkoweZamowienia = contextModal.kosztyDodatkoweZamowienia;
  const setKosztyDodatkoweZamowienia = contextModal.setKosztyDodatkoweZamowienia;
  const ksiegowosc = contextModal.ksiegowosc;
  
    return <div className={style.main}>
        
          <table className={style.table2}>
            <thead>
              <tr>
                <th className={style.td_indeks}>#</th>
                <th className={style.col3}>Nazwa</th>
                <th className={style.col10}>Ilość</th>
                <th className={style.col10}>Cena</th>
                <th className={style.col10}>Wartość</th>
                <th className={style.col10}>Uwagi</th>
                <th className={style.col10}></th>
              </tr>
            </thead>
            <tbody className={style.center}>
          {
          
          kosztyDodatkoweZamowienia.filter(x=>x.delete != true).map((koszt,i) => {

                return (
                  <tr
                    key={koszt.global_id || i}
                  >
                    <Indeks row={koszt} i={i+1}/>
                    <KOSZT_NAZWA koszt={koszt}/>
                    <KOSZT_ILOSC koszt={koszt} />
                    <KOSZT_CENA koszt={koszt} />
                    <Suma row={koszt} />
                    <KOSZT_UWAGI koszt={koszt} />
                    <UsunKoszt koszt={koszt} />
                  </tr>
                );
              })
              }
                  
            </tbody>
          </table>
                <DodajKoszty/>   
                <div className={style.zestawienie_kosztow }>
                <StatusKosztow/>
                </div>
        </div>
  
  }
  

  function Indeks({ row,i }) {
    return (
      <td className={style.td_indeks }>{i}</td>
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
      <td>{row.suma.toString().toLocaleString()}</td>
    );
  }
  function Info({ row }) {
    return (
      <td>{row.info}</td>
    );
  }
  
