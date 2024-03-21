import React, {useContext } from "react";
import style from "./ProduktTemplate.module.css";
import { _papiery, _typ_produktu, _rodzaj_oprawy } from "../api";
import { ModalInsertContext } from "../../../../context/ModalInsertContext";
import { PreOrderContext } from "context/PreOrderContext";
// import { AddProduktTemplate } from "./AddProduktTemplate";

export default function ProduktTemplate({

  setShowTemplate,
  setShowParametryZamowienia,

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
    
          setShowTemplate={setShowTemplate}
          setShowParametryZamowienia={setShowParametryZamowienia}
    
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
  return <div className={style.header}>Product preset</div>;
}

function Table({

  setShowTemplate,
  setShowParametryZamowienia,

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
            <Typ />
            <Oprawa />
            <Naklad />
            <Okladka />
            <Srodek />
            {/* <Wersja row={row} handleChangeCardProdukty={handleChangeCardProdukty}/> */}
            {/* <td><input defaultValue={row.naklad} onChange={(e)=>setInfo(e.target.value)}></input></td>
                                            <td><input defaultValue={row.nazwa} onChange={(e)=>setInfo(e.target.value)}></input></td> */}
            <Formatx />{" "}
            <Formaty />
            <BokOprawy />
            <Dodaj
              
              setShowTemplate={setShowTemplate}
              setShowParametryZamowienia={setShowParametryZamowienia}
         
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

function Typ() {
  const contextPreOrder = useContext(PreOrderContext);
  return (
    <td>
      <select
        className={style.select}
        defaultValue={contextPreOrder.preOrder.typ}
        onChange={(e) => {
          contextPreOrder.setPreOrder({ ...contextPreOrder.preOrder, typ: e.target.value });
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

function Oprawa() {
  const contextPreOrder = useContext(PreOrderContext);
  return (
    <td>
      <select
        className={style.select}
        defaultValue={contextPreOrder.preOrder.oprawa}
        onChange={(e) => {
          contextPreOrder.setPreOrder({ ...contextPreOrder.preOrder, oprawa: e.target.value });
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

function Formatx() {
  const contextPreOrder = useContext(PreOrderContext);
  return (
    <td>
      <input
        className={style.in}
        defaultValue={contextPreOrder.preOrder.format_x}
        onChange={(e) => {
          contextPreOrder.setPreOrder({ ...contextPreOrder.preOrder, format_x: e.target.value });
        }}
      ></input>
    </td>
  );
}

function Formaty() {
  const contextPreOrder = useContext(PreOrderContext);
  return (
    <td>
      <input
        className={style.in}
        defaultValue={contextPreOrder.preOrder.format_y}
        onChange={(e) => {
          contextPreOrder.setPreOrder({ ...contextPreOrder.preOrder, format_y: e.target.value });
        }}
      ></input>
    </td>
  );
}
function Okladka() {
  const contextPreOrder = useContext(PreOrderContext);
  return (
    <td>
      <input
        className={style.in}
        defaultValue={contextPreOrder.preOrder.strony_okl}
        onChange={(e) => {
          contextPreOrder.setPreOrder({ ...contextPreOrder.preOrder, strony_okl: e.target.value });
        }}
      ></input>
    </td>
  );
}
function Srodek() {
  const contextPreOrder = useContext(PreOrderContext);
  return (
    <td>
      <input
        className={style.in}
        defaultValue={contextPreOrder.preOrder.strony_srd}
        onChange={(e) => {
          contextPreOrder.setPreOrder({ ...contextPreOrder.preOrder, strony_srd: e.target.value });
        }}
      ></input>
    </td>
  );
}
function Naklad() {
  const contextPreOrder = useContext(PreOrderContext);
  return (
    <td className={style.td_naklad}>
      <input
        className={style.naklad}
        defaultValue={contextPreOrder.preOrder.naklad}
        onChange={(e) => {
          contextPreOrder.setPreOrder({ ...contextPreOrder.preOrder, naklad: e.target.value });
        }}
      ></input>
    </td>
  );
}

function BokOprawy() {
  const contextPreOrder = useContext(PreOrderContext);
  return (
    <td>
      <input
        className={style.in}
        defaultValue={contextPreOrder.preOrder.bok_oprawy}
        onChange={(e) => {
          contextPreOrder.setPreOrder({ ...contextPreOrder.preOrder, bok_oprawy: e.target.value });
        }}
      ></input>
    </td>
  );
}

function Dodaj({

  setShowTemplate,
  setShowParametryZamowienia,

  elementy,
  setElementy,
  fragmenty,
  setFragmenty,
  oprawa,
  setOprawa
}) {
  const contextPreOrder = useContext(PreOrderContext);

  const preOrder = contextPreOrder.preOrder;

  const contextModalInsert = useContext(ModalInsertContext);
const produkty = contextModalInsert.produkty;
const setProdukty = contextModalInsert.setProdukty;
  return (
    <div className={style.kontrolka}>
      <button
        className={style.btn}
        type="text"
        onClick={() => {
          setShowTemplate(false);
          setShowParametryZamowienia(true);
          AddProduktTemplate_okl_srd(preOrder,produkty,setProdukty,  elementy,
            setElementy,
            fragmenty,
            setFragmenty,
            oprawa,
            setOprawa);
        }}
      >
        Dodaj
      </button>
    </div>
  );
}

function AddProduktTemplate_okl_srd(preOrder,produkty,setProdukty,  elementy,
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
        ilosc_stron: parseInt(preOrder.strony_srd) + parseInt(preOrder.strony_okl)
      }
    })
  );

  setElementy(
    elementy.map((t) => {
      if (t.typ == 1) {
       return  {...t,
          naklad: preOrder.naklad,
          ilosc_stron: preOrder.strony_okl,
          format_x: preOrder.format_x,
          format_y: preOrder.format_y,
        }
      }
      if (t.typ == 2) {
        return  {...t,
           naklad: preOrder.naklad,
           ilosc_stron: preOrder.strony_srd,
           format_x: preOrder.format_x,
           format_y: preOrder.format_y,
         }
       }
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
        oprawa: preOrder.oprawa,
      
        bok_oprawy:preOrder.bok_oprawy
      }
    })
  );


}
