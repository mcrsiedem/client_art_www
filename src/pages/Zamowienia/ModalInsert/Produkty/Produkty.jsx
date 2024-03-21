import style from "./Produkty.module.css";
import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import { _papiery, _typ_produktu,_rodzaj_oprawy} from "../api";

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
              <th className={style.col6}>Ilość stron</th>
              <th className={style.col7}>x</th>
              <th className={style.col8}>y</th>
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
        {_typ_produktu.map((option) => (
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
        defaultValue={row.nazwa}
        onChange={(e) =>
          handleUpdateRowProdukty({
            ...row,
            nazwa: e.target.value,
          })
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
        defaultValue={row.naklad}
        onChange={(e) =>
          handleUpdateRowProdukty({
            ...row,
            naklad: e.target.value,
          })
          // handleChangeCardProdukty({
          //   ...row,
          //   naklad: e.target.value,
          // })
        }
      ></input>
    </td>
  );
}

function Oprawa({ row }) {
  return (
    <td>
{ _rodzaj_oprawy.map((t) => {
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
        defaultValue={row.uwagi}
        onChange={(e) =>
          handleUpdateRowProdukty({
            ...row,
            uwagi: e.target.value,
          })
        }
      ></input>
    </td>
  );
}
