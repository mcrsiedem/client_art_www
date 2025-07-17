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
          
          faktury.filter(x=>x.delete != true).map((faktura,i) => {

                return (
       
                 
                  <tr
                    key={faktura.id}
                  >
                    <Indeks faktura={faktura} i={i+1}/>
                    <FAKTURA_NAZWA2 faktura={faktura}/>
                    <FAKTURA_ILOSC faktura={faktura} />
                    <FAKTURA_CENA faktura={faktura} />

                    <Suma faktura={faktura} />
                    <FAKTURA_UWAGI faktura={faktura} />
                    <USUN_FAKTURE faktura={faktura} />

     
                  </tr>

                );
              })
              
              }

<tr> <td colSpan="6" ><DodajFaktury/>  </td>  <td></td></tr>
              {/* {kosztyDodatkoweZamowienia.length == 0 && ( <tr> <td colSpan="6" ><DodajKoszty/>  </td> </tr>)} */}

                    <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className={style.td_razem}>Razem:</td>
          
                    <td className={style.td_suma }> <p className={style.title_suma}>{ksiegowosc?.faktury_wartosc || 0} </p> </td>
                    <td></td>
                    <td></td>

     
                  </tr>
                
                  
            </tbody>
          </table>
                <div className={style.zestawienie_kosztow }>
              
                       <StatusKosztow/>
                </div>
        </div>
  
  }
  

  function Indeks({ faktura,i }) {
    return (
      <td>{i}</td>
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
  
