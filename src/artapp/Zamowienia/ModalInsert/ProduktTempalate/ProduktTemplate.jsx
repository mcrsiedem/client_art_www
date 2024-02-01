import style from "./ProduktTemplate.module.css";
import { _papiery, _typ_produktu } from "../api";

export default function ProduktTemplate({ preOrder,setPreOrder,setShowTemplate,setShowParametryZamowienia }) {
  return (
      <div className={style.container}>
            <div className={style.produkt}>
              <Header />
              <Table preOrder={preOrder} setPreOrder={setPreOrder} setShowTemplate={setShowTemplate} setShowParametryZamowienia={setShowParametryZamowienia} />
            </div>
    </div>
  );
}

//--------------------------



function Header() {
  return <div className={style.header}>Produkt</div>;
}

function Table({preOrder,setPreOrder,setShowTemplate,setShowParametryZamowienia}) {
  return <div className={style.main}>
      
        <table className={style.table}>
          <thead>
            <tr>

              <th className={style.col3}>Typ</th>
              <th className={style.col9}>Oprawa</th>
              <th className={style.col10}>Nakład</th>
              <th className={style.col4}>Nazwa</th>
              <th className={style.col6}>Ilość stron</th>
              <th className={style.col7}>Netto X</th>
              <th className={style.col8}>Netto Y</th>
              <th className={style.col8}>Uwagi</th>
              <th className={style.col8}></th>
            </tr>
          </thead>
          <tbody className={style.center}>

                <tr
                 
                >

                  <Typ
                    preOrder={preOrder} setPreOrder={setPreOrder}
                  />
                  <td>{preOrder.oprawa}</td>
                  <td>{preOrder.naklad}</td>

                  <Nazwa
                    preOrder={preOrder} setPreOrder={setPreOrder}
                  />
                  {/* <Wersja row={row} handleChangeCardProdukty={handleChangeCardProdukty}/> */}

                  {/* <td><input defaultValue={row.naklad} onChange={(e)=>setInfo(e.target.value)}></input></td>
                                            <td><input defaultValue={row.nazwa} onChange={(e)=>setInfo(e.target.value)}></input></td> */}
                  <td>{preOrder.ilosc_stron}</td>

                  <td>{preOrder.format_x}</td>
                  <td>{preOrder.format_y}</td>
                  <Uwagi
                    preOrder={preOrder} setPreOrder={setPreOrder}
                  />

                  <Dodaj setShowTemplate={setShowTemplate} setShowParametryZamowienia={setShowParametryZamowienia}/>

  
                </tr>
    
          </tbody>
        </table>
      </div>

}

function Typ({ preOrder, setPreOrder }) {
  return (
    <td>
      <select
        className={style.select}
        defaultValue={preOrder.typ}
        onChange={(e) => {
          setPreOrder({ ...preOrder, oprawa: e.target.value });
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

function Nazwa({  preOrder, setPreOrder }) {
  return (
    <td>
      <input
        className={style.in}
        defaultValue={preOrder.nazwa}
        onChange={(e) => {
          setPreOrder({ ...preOrder, nazwa: e.target.value });
        }}
      ></input>
    </td>
  );
}
function Uwagi({ preOrder, setPreOrder}) {
  return (
    <td>
      <input
        className={style.in}
        defaultValue={preOrder.uwagi}
        onChange={(e) => {
          setPreOrder({ ...preOrder, uwagi: e.target.value });
        }}
      ></input>
    </td>
  );
}
function Wersja({ preOrder, setPreOrder }) {
  return (
    <td>
      <input
        className={style.in}
        defaultValue={preOrder.wersja}
        onChange={(e) => {
          setPreOrder({ ...preOrder, wersja: e.target.value });
        }}
      ></input>
    </td>
  );
}


function Dodaj({setShowTemplate,setShowParametryZamowienia }){
  return(
      <div className={style.kontrolka}>
   
      <button className={style.btn} type="text"
    
    onClick={() => {
        setShowTemplate(false);
         setShowParametryZamowienia(true);
      }}> Dodaj</button>
    </div>
  );
}