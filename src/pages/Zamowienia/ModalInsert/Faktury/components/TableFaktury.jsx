import style from "./../Faktury.module.css";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useContext } from "react";
import StatusKosztow from "./StatusFaktury";
import DodajKoszty from "./DodajFaktury";
import KOSZT_UWAGI from "./faktura/FAKTURA_UWAGI";
import KOSZT_ILOSC from "./faktura/FAKTURA_ILOSC";
import KOSZT_CENA from "./faktura/FAKTURA_CENA";
import UsunKoszt from "./USUN_FAKTURE";
import FAKTURA_NAZWA2 from "./faktura/FAKTURA_NAZWA2";
import DodajFaktury from "./DodajFaktury";
import FAKTURA_ILOSC from "./faktura/FAKTURA_ILOSC";
import FAKTURA_CENA from "./faktura/FAKTURA_CENA";
import FAKTURA_UWAGI from "./faktura/FAKTURA_UWAGI";
import USUN_FAKTURE from "./USUN_FAKTURE";
import FAKTURA_WZ from "./faktura/FAKTURA_WZ";
import FAKTURA_SUMA from "./faktura/FAKTURA_SUMA";
export default function TableFaktury() {

  const contextModal = useContext(ModalInsertContext );

  const kosztyDodatkoweZamowienia = contextModal.kosztyDodatkoweZamowienia;
  const setKosztyDodatkoweZamowienia = contextModal.setKosztyDodatkoweZamowienia;
  const ksiegowosc = contextModal.ksiegowosc;
  const faktury = contextModal.faktury;
  
  
    return <div className={style.main}>
        
          <table className={style.table2}>
            <thead>
              <tr>
                <th className={style.td_indeks}>#</th>
                <th className={style.td_utworzono}>Utworzono</th>
                <th className={style.col3}>Nr faktury</th>
                <th className={style.col10}>Ilość</th>
                <th className={style.col10}>Cena</th>
                <th className={style.col10}>Wartość</th>
                <th className={style.col10}>wz</th>
                <th className={style.col10}>Uwagi</th>
                <th className={style.col10}></th>
              </tr>
            </thead>
            <tbody className={style.center}>

              
              
          {
          
          faktury.filter(x=>x.delete != true).map((faktura,i) => {

                return (
       
                 
                  <tr
                    key={faktura.id}
                  >
                    <Indeks faktura={faktura} i={i+1}/>
                    <DataUtworzenia faktura={faktura}/>
                    <FAKTURA_NAZWA2 faktura={faktura}/>
                    <FAKTURA_ILOSC faktura={faktura} />
                    <FAKTURA_CENA faktura={faktura} />
                    <FAKTURA_SUMA faktura={faktura} />
                    <FAKTURA_WZ faktura={faktura} />
                    <FAKTURA_UWAGI faktura={faktura} />
                    <USUN_FAKTURE faktura={faktura} />

     
                  </tr>

                );
              })
              
              }



                
                  
            </tbody>
          </table>
          <DodajFaktury/> 
                <div className={style.zestawienie_kosztow }>
              
                       <StatusKosztow/>
                </div>
        </div>
  
  }
  

  function Indeks({ faktura,i }) {
    return (
      <td className={style.td_indeks }>{i}</td>
    );
  }
    function DataUtworzenia({ faktura,i }) {
    return (
      <td className={style.td_indeks }>{faktura.utworzono}</td>
    );
  }
  function Nazwa({ faktura }) {
    return (
      <td>{faktura.nazwa}</td>
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
  function Suma({ faktura }) {
    return (
      <td>{faktura.suma.toString().toLocaleString()}</td>
    );
  }
  function Info({ row }) {
    return (
      <td>{row.info}</td>
    );
  }
  
