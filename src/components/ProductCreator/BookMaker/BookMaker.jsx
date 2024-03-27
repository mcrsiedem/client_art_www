import { useState, useContext, useEffect } from "react";
import style from "./BookMaker.module.css";
import { AppContext } from "context/AppContext";
import { AddProductFromCreator } from "../actions/AddProductFromCreator";
import { ModalInsertContext } from "context/ModalInsertContext";
import CardBinding from "./CardBinding";
import CardProduct from "./CardProduct";
export default function BookMaker({
  setShowTemplate,
  setShowParametryZamowienia,
}) {
  const contextApp = useContext(AppContext);

  const [showElement, setShowElement] = useState(false);
  const [naklad, setNaklad] = useState(null);
  const [binding, setBinding] = useState( contextApp.bindingType.map((bind) => ({ ...bind, isSelcted: false })) ); // dodaje do obiektu pole isSelected
  const [elements, setElements] = useState([
    { id: 1, nazwa: "Okładka", strony: 4 },
    { id: 2, nazwa: "Środek", strony: null },
  ]);
  const [netto, setNetto] = useState([{ x: null, y: null }]);
  const mc = useContext(ModalInsertContext)

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
              setShowElement={setShowElement}
            />
          ))}
      </div>

      {showElement && (
        <>
     
          <Naklad  naklad={naklad} setNaklad={setNaklad} />

          <div className={style.bindingContainer}>
            {elements.map((element) => (
              <CardProduct element={element} elements={elements} setElements={setElements} />
            ))}
          </div>
    

          <div className={style.bindingContainer}>
            <CardNettoX netto={netto} setNetto={setNetto} />
            <CardNettoY netto={netto} setNetto={setNetto} />
          </div>
   
          <div className={style.bindingContainer}>
            <button
              onClick={() => {
                setShowTemplate(false);
                setShowParametryZamowienia(true);
                // AddProductFromCreator(naklad,binding,elements);
              }}
              className={style.btn}
            >
              Dodaj
            </button>
            
          </div>
      </>

        )}

    </div>
  );
}



const CardNettoX = ({ netto, setNetto }) => {
  return (
    <div
      // onClick={() => clikBindingHandler({ bind, binding, setBinding })}
      className={style.cardNetto}
    >
 
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
  const mc = useContext(ModalInsertContext)
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
        onChange={(e) => {
          mc.setProdukty([{...mc.produkty, naklad : e.target.value}])
          mc.setElementy(mc.elementy.map((t) => {
            if (t.typ == 1) {
              return {
                ...t,
                naklad: e.target.value
              };
            }
            if (t.typ == 2) {
              return {
                ...t,
                naklad: e.target.value
              };
            }
          }))

          mc.setFragmenty(mc.fragmenty.map((t) => {
            if (t.typ == 1) {
              return {
                ...t,
                naklad: e.target.value
              };
            }
            if (t.typ == 2) {
              return {
                ...t,
                naklad: e.target.value
              };
            }
          }))

          mc.setOprawa(mc.oprawa.map((t) => {
   
              return {
                ...t,
                naklad: e.target.value
              };
            

          }))

          setNaklad(e.target.value)}
        }
      ></input>{" "}
      szt.
    </div>
    </div>
  );
};

