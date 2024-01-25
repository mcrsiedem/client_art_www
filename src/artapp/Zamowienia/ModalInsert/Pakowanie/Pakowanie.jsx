import style from "./Pakowanie.module.css";

export default function Pakowanie({ pakowanie,setPakowanie }) {
  
  return (
    
      <div className={style.container}>
        <div className={style.pakowanie}>
        <PakowanieHeader/>
        <PakowanieTable pakowanie={pakowanie} setPakowanie={setPakowanie}/>
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

function PakowanieTable({pakowanie,setPakowanie}) {
  return <div className={style.main}>
      
        <table className={style.table2}>
          <thead>
            <tr>
              <th className={style.col1}>Zam.</th>
              <th className={style.col2}>#</th>
              <th className={style.col3}>Nazwa</th>
              <th className={style.col10}>Ilość szt.</th>
              <th className={style.col10}>Sztuki w paczce</th>
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

                  <td>{row.id}</td>
                  <td>{row.nazwa}</td>
                  <td>{row.naklad}</td>
                  <td>{row.uwagi}</td>
                  <td>{row.uwagi}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

}