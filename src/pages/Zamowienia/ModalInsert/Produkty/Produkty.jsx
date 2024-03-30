import style from "./Produkty.module.css";
import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import { _papiery, _typ_produktu,_rodzaj_oprawy} from "../api";
import { AppContext } from "context/AppContext";

export default function Produkty( ) {
  return (
      <div className={style.container}>
            <div className={style.produkt}>
              <ProduktyTableHeader />
              <ProduktyTable   />
            </div>
    </div>
  );
}

//--------------------------



function ProduktyTableHeader() {
  return <div className={style.header}>Produkt</div>;
}

function ProduktyTable() {
  const contextModalInsert = useContext(ModalInsertContext);
const produkty = contextModalInsert.produkty;
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
            {produkty.map((row) => {
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
  const contextModalInsert = useContext(ModalInsertContext);
  const contextApp = useContext(AppContext);

  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  return (
    <td>
      <select
        className={style.select}
        defaultValue={row.typ}
        onChange={(e) => {
          handleUpdateRowProdukty({
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
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  return (
    <td>
      <input
        className={style.in}
        value={row.nazwa}
        onChange={(e) =>
          {
            const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
            if ( e.target.value === '' || re.test(e.target.value)) {
      handleUpdateRowProdukty({
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
const contextModalInsert = useContext(ModalInsertContext);
const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;

  return (
    <td>
      <input
        className={style.in}
        value={row.naklad}
        onChange={(e) =>{     

          const re = /^[0-9]+$/;
          if (e.target.value === '' || re.test(e.target.value)) {
           handleUpdateRowProdukty({
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
  const contextModalInsert = useContext(ModalInsertContext);
  const handleUpdateRowProdukty = contextModalInsert.handleUpdateRowProdukty;
  return (
    <td>
      <input
        className={style.in}
        value={row.uwagi}
        onChange={(e) =>
          { 
            const re = /^[a-zA-Z0-9_+\sąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
            if ( e.target.value === '' || re.test(e.target.value)) { 
              handleUpdateRowProdukty({
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
