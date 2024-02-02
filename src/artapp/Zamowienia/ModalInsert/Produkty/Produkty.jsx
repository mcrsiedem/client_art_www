import style from "./Produkty.module.css";
import { _papiery, _typ_produktu,_rodzaj_oprawy} from "../api";

export default function Produkty({ produkty, handleChangeCardProdukty }) {
  return (
      <div className={style.container}>
            <div className={style.produkt}>
              <ProduktyTableHeader />
              <ProduktyTable produkty={produkty} handleChangeCardProdukty={handleChangeCardProdukty} />
            </div>
    </div>
  );
}

//--------------------------



function ProduktyTableHeader() {
  return <div className={style.header}>Produkt</div>;
}

function ProduktyTable({produkty,handleChangeCardProdukty}) {
  return <div className={style.main}>
      
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.col1}>Zam.</th>
              <th className={style.col2}>#</th>
              <th className={style.col3}>Typ</th>
              <th className={style.col10}>Nakład</th>
              <th className={style.col9}>Oprawa</th>
              <th className={style.col4}>Nazwa</th>
              <th className={style.col6}>Ilość stron</th>
              <th className={style.col7}>Netto X</th>
              <th className={style.col8}>Netto Y</th>
              <th className={style.col8}>Uwagi</th>
            </tr>
          </thead>
          <tbody className={style.center}>
            {produkty.map((row) => {
              return (
                <tr
                  key={row.id}
                  // onDoubleClick={(node, event) => {

                  //     setOpenModal(true);
                  //     setRow({ id: row.id, user: row.user });
                  // }}
                >
                  <td>{row.zamowienie_id}</td>

                  <td>{row.id}</td>
                  <Typ
                    row={row}
                    handleChangeCardProdukty={handleChangeCardProdukty}
                  />
                  <td>{row.naklad}</td>
                  <Oprawa row={row}/>

                  <Nazwa
                    row={row}
                    handleChangeCardProdukty={handleChangeCardProdukty}
                  />
                  {/* <Wersja row={row} handleChangeCardProdukty={handleChangeCardProdukty}/> */}

                  {/* <td><input defaultValue={row.naklad} onChange={(e)=>setInfo(e.target.value)}></input></td>
                                            <td><input defaultValue={row.nazwa} onChange={(e)=>setInfo(e.target.value)}></input></td> */}
                  <td>{row.ilosc_stron}</td>

                  <td>{row.format_x}</td>
                  <td>{row.format_y}</td>
                  <Uwagi
                    row={row}
                    handleChangeCardProdukty={handleChangeCardProdukty}
                  />

                  {/* <td><button onClick={()=> setInfo("OK")}>OK</button></td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

}

function Typ({ row, handleChangeCardProdukty }) {
  return (
    <td>
      <select
        className={style.select}
        defaultValue={row.typ}
        onChange={(e) => {
          handleChangeCardProdukty({
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

function Nazwa({ row, handleChangeCardProdukty }) {
  return (
    <td>
      <input
        className={style.in}
        defaultValue={row.nazwa}
        onChange={(e) =>
          handleChangeCardProdukty({
            ...row,
            nazwa: e.target.value,
          })
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
function Uwagi({ row, handleChangeCardProdukty }) {
  return (
    <td>
      <input
        className={style.in}
        defaultValue={row.uwagi}
        onChange={(e) =>
          handleChangeCardProdukty({
            ...row,
            uwagi: e.target.value,
          })
        }
      ></input>
    </td>
  );
}
function Wersja({ row, handleChangeCardProdukty }) {
  return (
    <td>
      <input
        className={style.in}
        defaultValue={row.wersja}
        onChange={(e) =>
          handleChangeCardProdukty({
            ...row,
            wersja: e.target.value,
          })
        }
      ></input>
    </td>
  );
}

