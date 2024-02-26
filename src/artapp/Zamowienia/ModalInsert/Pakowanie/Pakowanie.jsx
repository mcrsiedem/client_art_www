import style from "./Pakowanie.module.css";

export default function Pakowanie({ pakowanie,setPakowanie,handleChangeCardPakowanie}) {
  
  return (
    
      <div className={style.container}>
        <div className={style.pakowanie}>
        <PakowanieHeader/>
        <PakowanieTable pakowanie={pakowanie} setPakowanie={setPakowanie} handleChangeCardPakowanie={handleChangeCardPakowanie}/>
        </div>
      
      </div>
  );
}



function PakowanieHeader() {
  return (
    <div className={style.header}>
      Pakowanie
    </div>
  );



}

function PakowanieTable({pakowanie,setPakowanie,handleChangeCardPakowanie}) {
  return <div className={style.main}>
      
        <table className={style.table2}>
          <thead>
            <tr>
              <th className={style.col1}>#Zamówienie</th>
              <th className={style.col1}>#Produkt</th>
              <th className={style.col2}>#</th>
              <th className={style.col3}>Nazwa</th>
              <th className={style.col10}>Ilość szt.</th>
              <th className={style.col10}>Sztuki w paczce</th>
              <th className={style.col10}>Rodzaj pakowania</th>
              <th className={style.col10}>Uwagi</th>

            </tr>
          </thead>
          <tbody className={style.center}>
            {pakowanie.map((row) => {
              return (
                <tr
                  key={row.id}
                >
                  <td>{row.zamowienie_id}</td>
                  <td>{row.produkt_id}</td>

                  <td>{row.id}</td>
                  <Nazwa row={row} handleChangeCardPakowanie={handleChangeCardPakowanie}/>
                  <Ilosc row={row} handleChangeCardPakowanie={handleChangeCardPakowanie}/>
                  <SztukiWpaczce row={row} handleChangeCardPakowanie={handleChangeCardPakowanie}/>
                  <RodzajPakowania row={row} handleChangeCardPakowanie={handleChangeCardPakowanie}/>
                  <Uwagi row={row} handleChangeCardPakowanie={handleChangeCardPakowanie}/>
             
    
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

}

function Nazwa({ row, handleChangeCardPakowanie }) {
  return (
    <td>
      <input
        className={style.in}
        defaultValue={row.nazwa}
        onChange={(e) =>
          handleChangeCardPakowanie({
            ...row,
            nazwa: e.target.value,
          })
        }
      ></input>
    </td>
  );
}

function Ilosc({ row, handleChangeCardPakowanie }) {
  return (
    <td>
      <input
        className={style.in}
        defaultValue={row.naklad}
        onChange={(e) => {

          const re = /^[0-9]+$/;
          if (e.target.value === '' || re.test(e.target.value)) {
          
          handleChangeCardPakowanie({
            ...row,
            naklad: e.target.value,
          })
        }
      }

          
        }
      ></input>
    </td>
  );
}

function SztukiWpaczce({ row, handleChangeCardPakowanie }) {
  return (
    <td>
      <input
        className={style.in}
        defaultValue={row.sztuki_w_paczce}
        onChange={(e) =>  {
          const re = /^[0-9]+$/;
          if (e.target.value === '' || re.test(e.target.value)) {
               handleChangeCardPakowanie({
            ...row,
            sztuki_w_paczce: e.target.value,
          })}
        }
     
        }
      ></input>
    </td>
  );
}

function RodzajPakowania({ row, handleChangeCardPakowanie }) {
  return (
    <td>
      <input
        className={style.in}
        defaultValue={row.rodzaj_pakowania}
        onChange={(e) =>
          handleChangeCardPakowanie({
            ...row,
            rodzaj_pakowania: e.target.value,
          })
        }
      ></input>
    </td>
  );
}

function Uwagi({ row, handleChangeCardPakowanie }) {
  return (
    <td>
      <input
        className={style.in}
        defaultValue={row.uwagi}
        onChange={(e) =>
          handleChangeCardPakowanie({
            ...row,
            uwagi: e.target.value,
          })
        }
      ></input>
    </td>
  );
}