import style from "./ProduktyTech.module.css";
import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import { TechnologyContext } from "context/TechnologyContext";
// import { _papiery, _typ_produktu,_rodzaj_oprawy} from "../api";
import { AppContext } from "context/AppContext";
import { reg_int, reg_txt } from "utils/initialvalue";

export default function ProduktyTech( ) {
  return (
      <div className={style.container}>
            <div className={style.produkt}>
              {/* <ProduktyTableHeader /> */}
              <ProduktyTable   />
            </div>
    </div>
  );
}

//--------------------------





function ProduktyTable() {
  const contextTech = useContext(TechnologyContext);
const produktyTech = contextTech.produktyTech;
  return <div className={style.main}>
      
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.col3}>Typ</th>
              <th className={style.col10}>Nakład</th>
              <th className={style.col9}>Oprawa</th>
              <th className={style.col4}>Nazwa</th>
              <th className={style.col6}>Strony</th>
              <th className={style.col7}>Szerokość</th>
              <th className={style.col8}>Wysokość</th>
              <th className={style.col8}>Uwagi</th>
            </tr>
          </thead>
          <tbody className={style.center}>
            {produktyTech?.map((row) => {
              return (
                <tr key={row.id}>
                  <Typ row={row} />
                  <Naklad row={row} />
                  <Oprawa row={row} />
                  <Nazwa row={row} />
                  <td>{row.ilosc_stron}</td>
                  <td>{row.format_x}</td>
                  <td>{row.format_y}</td>
                  <Uwagi row={row} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

}

function Typ({ row }) {
  const contextApp = useContext(AppContext);
  const techontext = useContext(TechnologyContext);
  const updateRowProduktyTech = techontext.updateRowProduktyTech;
  return (
    <td>
      <select
        className={style.select}
        defaultValue={row.typ}
        onChange={(e) => {
          updateRowProduktyTech({
            ...row,
            typ: e.target.value,
          });
        }}
      >
        {}
        {contextApp.productType.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </td>
  );
}

function Nazwa({ row }) {
  const techontext = useContext(TechnologyContext);
  const updateRowProduktyTech = techontext.updateRowProduktyTech;
  return (
    <td>
      <input
        className={style.in}
        value={row.nazwa}
        onChange={(e) =>
          {
            const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ.]+$/;
            if ( e.target.value === '' || re.test(e.target.value)) {
              updateRowProduktyTech({
            ...row,
            nazwa: e.target.value,
          })

          }
        }
    
        }
      ></input>
    </td>
  );
}

function Naklad({ row }) {
  const techontext = useContext(TechnologyContext);
  const updateRowProduktyTech = techontext.updateRowProduktyTech;

  return (
    <td>
      <input
        className={style.in}
        value={row.naklad}
        onChange={(e) =>{     

           const re = /^[0-9]+$/;

          //  updateRowProduktyTech({
          //   ...row,
          //   naklad: e.target.value,
          // })

          if (e.target.value === '' || re.test(e.target.value)) {
            updateRowProduktyTech({
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

function Oprawa({ row }) {
  const contextApp = useContext(AppContext);

  return (
    <td>
{ contextApp.bindingType.map((t) => {
        if (t.id == row.oprawa) {
          return t.nazwa;
        
        }
      })}

    </td>
  );
}
function Uwagi({ row }) {
  const techontext = useContext(TechnologyContext);
  const updateRowProduktyTech = techontext.updateRowProduktyTech;
  return (
    <td>
      <input
        className={style.in}
        value={row.uwagi}
        onChange={(e) =>
          { 
            const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
            if ( e.target.value === '' || re.test(e.target.value)) { 
              updateRowProduktyTech({
            ...row,
            uwagi: e.target.value,
          })
        
        }
          }
        }
      ></input>
    </td>
  );
}
