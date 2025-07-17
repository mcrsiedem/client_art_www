import style from "./../Faktury.module.css";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useContext } from "react";
import StatusKosztow from "./StatusKosztow";
import DodajKoszty from "./DodajKoszty";
import KOSZT_UWAGI from "./faktura/KOSZT_UWAGI";
import KOSZT_ILOSC from "./faktura/KOSZT_ILOSC";
import KOSZT_CENA from "./faktura/KOSZT_CENA";
import UsunKoszt from "./UsunKoszt";
import FAKTURA_NAZWA2 from "./faktura/FAKTURA_NAZWA2";
export default function TableFaktury() {

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
                    key={koszt.id}
                  >
                    <Indeks row={koszt} i={i+1}/>
                    <FAKTURA_NAZWA2 koszt={koszt}/>
                    <KOSZT_ILOSC koszt={koszt} />
                    <KOSZT_CENA koszt={koszt} />

                    {/* <Cena row={koszt} /> */}
                    <Suma row={koszt} />
                    <KOSZT_UWAGI koszt={koszt} />
                    <UsunKoszt koszt={koszt} />

     
                  </tr>

                );
              })
              
              }

<tr> <td colSpan="6" ><DodajKoszty/>  </td>  <td></td></tr>
              {/* {kosztyDodatkoweZamowienia.length == 0 && ( <tr> <td colSpan="6" ><DodajKoszty/>  </td> </tr>)} */}

                    <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className={style.td_razem}>Razem:</td>
          
                    <td className={style.td_suma }> <p className={style.title_suma}>{ksiegowosc?.koszty_wartosc || 0} </p> </td>
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
      <td>{row.suma.toString().toLocaleString()}</td>
    );
  }
  function Info({ row }) {
    return (
      <td>{row.info}</td>
    );
  }
  
