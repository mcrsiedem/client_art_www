import style from "./ProduktTemplate.module.css";
import { _papiery, _typ_produktu, _rodzaj_oprawy } from "../api";
// import { AddProduktTemplate } from "./AddProduktTemplate";

export default function ProduktTemplate({
  preOrder,
  setPreOrder,
  setShowTemplate,
  setShowParametryZamowienia,
  produkty,
  setProdukty,
  elementy,
  setElementy,
  fragmenty,
  setFragmenty,
  oprawa,
  setOprawa
}) {
  return (
    <div className={style.container}>
      <div className={style.produkt}>
        <Header />
        <Table
          preOrder={preOrder}
          setPreOrder={setPreOrder}
          setShowTemplate={setShowTemplate}
          setShowParametryZamowienia={setShowParametryZamowienia}
          produkty={produkty}
          setProdukty={setProdukty}
          elementy={elementy}
          setElementy={setElementy}
          fragmenty={fragmenty}
          setFragmenty={setFragmenty}
          oprawa={oprawa}
          setOprawa={setOprawa}

        />
      </div>
    </div>
  );
}

//--------------------------

function Header() {
  return <div className={style.header}>Produkt</div>;
}

function Table({
  preOrder,
  setPreOrder,
  setShowTemplate,
  setShowParametryZamowienia,
  produkty,
  setProdukty,
  elementy,
  setElementy,
  fragmenty,
  setFragmenty,
  oprawa,
  setOprawa
}) {
  return (
    <div className={style.main}>
      <table className={style.table}>
        <thead>
          <tr>
            <th className={style.col3}>Typ</th>
            <th className={style.col9}>Oprawa</th>
            <th className={style.col10}>Nakład</th>

            <th className={style.col4}>Strony okładka</th>
            <th className={style.col4}>Strony środek</th>

            <th className={style.col7}>Format x</th>
            <th className={style.col8}>Format y</th>
            <th className={style.col8}>Bok oprawy</th>
            <th className={style.col8}></th>
          </tr>
        </thead>
        <tbody className={style.center}>
          <tr>
            <Typ preOrder={preOrder} setPreOrder={setPreOrder} />
            <Oprawa preOrder={preOrder} setPreOrder={setPreOrder} />
            <Naklad preOrder={preOrder} setPreOrder={setPreOrder} />
            <Okladka preOrder={preOrder} setPreOrder={setPreOrder} />
            <Srodek preOrder={preOrder} setPreOrder={setPreOrder} />
            {/* <Wersja row={row} handleChangeCardProdukty={handleChangeCardProdukty}/> */}
            {/* <td><input defaultValue={row.naklad} onChange={(e)=>setInfo(e.target.value)}></input></td>
                                            <td><input defaultValue={row.nazwa} onChange={(e)=>setInfo(e.target.value)}></input></td> */}
            <Formatx preOrder={preOrder} setPreOrder={setPreOrder} />{" "}
            <Formaty preOrder={preOrder} setPreOrder={setPreOrder} />
            <BokOprawy preOrder={preOrder} setPreOrder={setPreOrder} />
            <Dodaj
              preOrder={preOrder}
              setShowTemplate={setShowTemplate}
              setShowParametryZamowienia={setShowParametryZamowienia}
              produkty={produkty}
              setProdukty={setProdukty}
              elementy={elementy}
              setElementy={setElementy}
              fragmenty={fragmenty}
              setFragmenty={setFragmenty}
              oprawa={oprawa}
              setOprawa={setOprawa}
    
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Typ({ preOrder, setPreOrder }) {
  return (
    <td>
      <select
        className={style.select}
        defaultValue={preOrder.typ}
        onChange={(e) => {
          setPreOrder({ ...preOrder, typ: e.target.value });
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

function Oprawa({ preOrder, setPreOrder }) {
  return (
    <td>
      <select
        className={style.select}
        defaultValue={preOrder.oprawa}
        onChange={(e) => {
          setPreOrder({ ...preOrder, oprawa: e.target.value });
        }}
      >
        {}
        {_rodzaj_oprawy.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nazwa}
          </option>
        ))}
      </select>
    </td>
  );
}

function Formatx({ preOrder, setPreOrder }) {
  return (
    <td>
      <input
        className={style.in}
        defaultValue={preOrder.format_x}
        onChange={(e) => {
          setPreOrder({ ...preOrder, format_x: e.target.value });
        }}
      ></input>
    </td>
  );
}

function Formaty({ preOrder, setPreOrder }) {
  return (
    <td>
      <input
        className={style.in}
        defaultValue={preOrder.format_y}
        onChange={(e) => {
          setPreOrder({ ...preOrder, format_y: e.target.value });
        }}
      ></input>
    </td>
  );
}
function Okladka({ preOrder, setPreOrder }) {
  return (
    <td>
      <input
        className={style.in}
        defaultValue={preOrder.strony_okl}
        onChange={(e) => {
          setPreOrder({ ...preOrder, strony_okl: e.target.value });
        }}
      ></input>
    </td>
  );
}
function Srodek({ preOrder, setPreOrder }) {
  return (
    <td>
      <input
        className={style.in}
        defaultValue={preOrder.strony_srd}
        onChange={(e) => {
          setPreOrder({ ...preOrder, strony_srd: e.target.value });
        }}
      ></input>
    </td>
  );
}
function Naklad({ preOrder, setPreOrder }) {
  return (
    <td className={style.td_naklad}>
      <input
        className={style.naklad}
        defaultValue={preOrder.naklad}
        onChange={(e) => {
          setPreOrder({ ...preOrder, naklad: e.target.value });
        }}
      ></input>
    </td>
  );
}

function BokOprawy({ preOrder, setPreOrder }) {
  return (
    <td>
      <input
        className={style.in}
        defaultValue={preOrder.bok_oprawy}
        onChange={(e) => {
          setPreOrder({ ...preOrder, bok_oprawy: e.target.value });
        }}
      ></input>
    </td>
  );
}

function Dodaj({
  preOrder,
  setShowTemplate,
  setShowParametryZamowienia,
  produkty,
  setProdukty,
  elementy,
  setElementy,
  fragmenty,
  setFragmenty,
  oprawa,
  setOprawa
}) {
  return (
    <div className={style.kontrolka}>
      <button
        className={style.btn}
        type="text"
        onClick={() => {
          setShowTemplate(false);
          setShowParametryZamowienia(true);
          AddProduktTemplate(preOrder,produkty,setProdukty,  elementy,
            setElementy,
            fragmenty,
            setFragmenty,
            oprawa,
            setOprawa);
        }}
      >
        {" "}
        Dodaj
      </button>
    </div>
  );
}

function AddProduktTemplate(preOrder,produkty,setProdukty,  elementy,
  setElementy,
  fragmenty,
  setFragmenty,
  oprawa,
  setOprawa) {
  // console.log(preOrder.naklad);
  setProdukty(
    produkty.map((t) => {
      return {...t,
        naklad: preOrder.naklad,
        format_x: preOrder.format_x,
        format_y: preOrder.format_y,
        oprawa: preOrder.oprawa,
      }
    })
  );
  setElementy(
    elementy.map((t) => {
      return {...t,
        naklad: preOrder.naklad}
    })
  );
  setFragmenty(
    fragmenty.map((t) => {
      return {...t,
        naklad: preOrder.naklad,
      }
    })
  );

  setOprawa(
    oprawa.map((t) => {
      return {...t,
        naklad: preOrder.naklad,
        oprawa: "PUR"}
    })
  );


}
