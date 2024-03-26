import { useState, useContext, useEffect } from "react";
import style from "./BookMaker.module.css";
import { AppContext } from "context/AppContext";
export default function BookMaker({
  setShowTemplate,
  setShowParametryZamowienia,
}) {
  const contextApp = useContext(AppContext);

  const [showProduct, setShowProduct] = useState(false);
  const [naklad, setNaklad] = useState(null);
  const [binding, setBinding] = useState( contextApp.bindingType.map((bind) => ({ ...bind, isSelcted: false })) ); // dodaje do obiektu pole isSelected
  const [products, setProducts] = useState([
    { id: 1, nazwa: "Okładka", strony: 4 },
    { id: 2, nazwa: "Środek", strony: null },
  ]);
  const [netto, setNetto] = useState([{ x: null, y: null }]);
 

  return (
    <div className={style.container}>
      <div className={style.bindingContainer}>
        {binding
          .filter((bind1) => bind1.id !== 1) // oprawa id 1 n/d
          .map((bind) => (
            <CardBinding
              bind={bind}
              binding={binding}
              setBinding={setBinding}
              setShowProduct={setShowProduct}
            />
          ))}
      </div>

      {showProduct && (
          <Naklad naklad={naklad} setNaklad={setNaklad} />
      )}

      {showProduct && (
        <div className={style.bindingContainer}>
          {products.map((product) => (
            <CardProduct
              product={product}
              products={products}
              setProducts={setProducts}
            />
          ))}
        </div>
      )}

      {showProduct && (
        <div className={style.bindingContainer}>
          <CardNettoX netto={netto} setNetto={setNetto} />
          <CardNettoY netto={netto} setNetto={setNetto} />
        </div>
      )}

      {/* {showProduct &&    <row className={style.bindingContainer}>
      

  <BokOprawy bokOprawy={bokOprawy} setBokOprawy={setBokOprawy}/>
  <BokOprawy bokOprawy={bokOprawy} setBokOprawy={setBokOprawy}/>


        
            </row>} */}

      <div className={style.bindingContainer}>
        <button
          onClick={() => {
            setShowTemplate(false);
            setShowParametryZamowienia(true);
          }}
          className={style.btn}
        >
          Dodaj
        </button>
      </div>
    </div>
  );
}

const clikBindingHandler = ({ bind, binding, setBinding, setShowProduct }) => {
  setShowProduct(true);
  setBinding(
    binding.map((t) => {
      if (t.id === bind.id) {
        return { ...t, isSelcted: true };
      } else {
        return { ...t, isSelcted: false };
      }
    })
  );
};

const CardBinding = ({ bind, binding, setBinding, setShowProduct }) => {
  return (
    <div
      onClick={() =>
        clikBindingHandler({ bind, binding, setBinding, setShowProduct })
      }
      className={bind.isSelcted ? style.cardBindingSelected : style.cardBinding}
    >
      {bind.nazwa}
      {/* <input
            checked={bind.isSelcted}
            className={style.cardInput}
            type="checkbox"
            onChange={() => clikBindingHandler({ bind, binding, setBinding })}
          ></input> */}
    </div>
  );
};

const CardProduct = ({ product, products, setProducts }) => {
  const changeProductHandler = (product) => {
    setProducts(
      products.map((p) => {
        if (p.id === product.id) {
          return product;
        } else {
          return p;
        }
      })
    );
  };
  return (
    <div
      // onClick={() => clikBindingHandler({ bind, binding, setBinding })}
      className={style.cardProduct}
    >
      {product.nazwa}
      <input
        className={style.cardInput}
        defaultValue={product.strony}
        placeholder="..."
        type="text"
        onChange={(e) =>
          changeProductHandler({ ...product, strony: e.target.value })
        }
      ></input>{" "}
      str.
    </div>
  );
};

const CardNettoX = ({ netto, setNetto }) => {
  return (
    <div
      // onClick={() => clikBindingHandler({ bind, binding, setBinding })}
      className={style.cardNetto}
    >
      {/* {product.nazwa}  */}
      Szerokość
      <input
        className={style.cardInputNetto}
        defaultValue={netto.x}
        placeholder="..."
        type="text"
        onChange={(e) => setNetto({ ...netto, x: e.target.value })}
      ></input>{" "}
      mm.
    </div>
  );
};

const CardNettoY = ({ netto, setNetto }) => {
  return (
    <div
      // onClick={() => clikBindingHandler({ bind, binding, setBinding })}
      className={style.cardNetto}
    >
      {/* {product.nazwa}  */}
      Wysokość
      <input
        className={style.cardInputNetto}
        defaultValue={netto.y}
        placeholder="..."
        type="text"
        onChange={(e) => setNetto({ ...netto, y: e.target.value })}
      ></input>{" "}
      mm.
    </div>
  );
};

const BokOprawy = ({ bokOprawy, setBokOprawy }) => {
  return (
    <div
      // onClick={() => clikBindingHandler({ bind, binding, setBinding })}
      className={style.cardNetto}
    >
      {/* {product.nazwa}  */}
      Bok oprawy
      <input
        className={style.cardInputNetto}
        defaultValue={bokOprawy}
        placeholder="..."
        type="text"
        onChange={(e) => setBokOprawy(e.target.value)}
      ></input>{" "}
      mm.
    </div>
  );
};

const Naklad = ({ naklad, setNaklad }) => {
  return (
    <div className={style.bindingContainer}>
    <div
      // onClick={() => clikBindingHandler({ bind, binding, setBinding })}
      className={style.cardNaklad}
    >
      {/* {product.nazwa}  */}
      Nakład
      <input
        className={style.cardInputNaklad}
        defaultValue={naklad}
        placeholder="..."
        type="text"
        onChange={(e) => setNaklad(e.target.value)}
      ></input>{" "}
      szt.
    </div>
    </div>
  );
};

function AddProduktTemplate_okl_srd(
  preOrder,
  produkty,
  setProdukty,
  elementy,
  setElementy,
  fragmenty,
  setFragmenty,
  oprawa,
  setOprawa
) {
  // console.log(preOrder.naklad);
  setProdukty(
    produkty.map((t) => {
      return {
        ...t,
        naklad: preOrder.naklad,
        format_x: preOrder.format_x,
        format_y: preOrder.format_y,
        oprawa: preOrder.oprawa,
        ilosc_stron:
          parseInt(preOrder.strony_srd) + parseInt(preOrder.strony_okl),
      };
    })
  );

  setElementy(
    elementy.map((t) => {
      if (t.typ == 1) {
        return {
          ...t,
          naklad: preOrder.naklad,
          ilosc_stron: preOrder.strony_okl,
          format_x: preOrder.format_x,
          format_y: preOrder.format_y,
        };
      }
      if (t.typ == 2) {
        return {
          ...t,
          naklad: preOrder.naklad,
          ilosc_stron: preOrder.strony_srd,
          format_x: preOrder.format_x,
          format_y: preOrder.format_y,
        };
      }
    })
  );

  setFragmenty(
    fragmenty.map((t) => {
      return { ...t, naklad: preOrder.naklad };
    })
  );

  setOprawa(
    oprawa.map((t) => {
      return {
        ...t,
        naklad: preOrder.naklad,
        oprawa: preOrder.oprawa,

        bok_oprawy: preOrder.bok_oprawy,
      };
    })
  );
}
