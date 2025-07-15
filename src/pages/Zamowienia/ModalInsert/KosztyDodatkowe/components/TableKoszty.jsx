import style from "./../KosztyDodatkowe.module.css";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useContext } from "react";
import StatusKosztow from "./StatusKosztow";
import DodajKoszty from "./DodajKoszty";
import KOSZT_NAZWA from "./koszt/KOSZT_NAZWA";
export default function TableKoszty() {

  const contextModal = useContext(ModalInsertContext );

  const kosztyDodatkoweZamowienia = contextModal.kosztyDodatkoweZamowienia;
  const setKosztyDodatkoweZamowienia = contextModal.setKosztyDodatkoweZamowienia;
  
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
              </tr>
            </thead>
            <tbody className={style.center}>

              
              
          {
          
          kosztyDodatkoweZamowienia.map((koszt,i) => {

                return (
       
                 
                  <tr
                    key={koszt.id}
                  >
                    <Indeks row={koszt} i={i+1}/>
                    <KOSZT_NAZWA koszt={koszt}/>
                    {/* <Nazwa row={koszt} /> */}
                    <Ilosc row={koszt} />
                    <Cena row={koszt} />
                    <Suma row={koszt} />
                    <Info row={koszt} />
     
                  </tr>

                );
              })
              
              }

              {kosztyDodatkoweZamowienia.length == 0 && ( <tr> <td colSpan="6" ><DodajKoszty/>  </td> </tr>)}

                    <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className={style.td_razem}>Razem:</td>
          
                    <td className={style.td_suma }> {kosztyDodatkoweZamowienia[0]?.suma || 0}</td>
                    <td></td>

     
                  </tr>
                
                  
            </tbody>
          </table>
                <div className={style.zestawienie_kosztow }>
              
                       <StatusKosztow/>
                </div>
        </div>
  
  }
  

  function Indeks({ row,i }) {
    return (
      <td>{i}</td>
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
      <td>{row.suma}</td>
    );
  }
  function Info({ row }) {
    return (
      <td>{row.info}</td>
    );
  }
  
