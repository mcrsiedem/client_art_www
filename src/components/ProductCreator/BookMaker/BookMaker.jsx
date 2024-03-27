import { useState, useContext, useEffect } from "react";
import style from "./BookMaker.module.css";
import { AppContext } from "context/AppContext";
import { AddProductFromCreator } from "../actions/AddProductFromCreator";
import { ModalInsertContext } from "context/ModalInsertContext";
import CardBinding from "./CardBinding";

import { PreOrderContext } from "context/PreOrderContext";
export default function BookMaker({
  setShowTemplate,
  setShowParametryZamowienia,
}) {
  const contextApp = useContext(AppContext);
  const [showElement, setShowElement] = useState(false);


  const [binding, setBinding] = useState( contextApp.bindingType.map((bind) => ({ ...bind, isSelcted: false })) ); // dodaje do obiektu pole isSelected
  
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
     
          <Naklad />

          <div className={style.bindingContainer}>
            <Okladka/>
            <Srodek/>
          </div>
    

          <div className={style.bindingContainer}>
            <Szerokosc  />
            <Wysokosc  />
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



const Szerokosc = () => {
  const context = useContext(PreOrderContext)
  return (
    <div className={style.cardNetto} >
 
      Szerokość
      <input
        className={style.cardInputNetto}
        defaultValue={context.preOrder.szerokosc}
        placeholder="..."
        type="text"
        onChange={(e) => { context.setPreOrder({...context.preOrder, szerokosc: e.target.value}) } }
  
      ></input>
      mm.
    </div>
  );
};

const Wysokosc = () => {
  const context = useContext(PreOrderContext)
  return (
    <div className={style.cardNetto} >
    Wysokość
      <input
        className={style.cardInputNetto}
        defaultValue={context.preOrder.wysokosc}
        placeholder="..."
        type="text"
        onChange={(e) => { context.setPreOrder({...context.preOrder, wysokosc: e.target.value}) } }
      ></input>{" "}
      mm.
    </div>
  );
};

const Naklad = () => {
  const context = useContext(PreOrderContext)
  return (
    <div className={style.bindingContainer}>
      <div className={style.cardNaklad} >

      Nakład
      <input
        className={style.cardInputNaklad}
        defaultValue={context.preOrder.naklad}
        placeholder="..."
        type="text"
        onChange={(e) => { context.setPreOrder({...context.preOrder, naklad: e.target.value}) } }
      >  
      </input>
      szt.
    </div>
    </div>
  );
};

const Okladka = () => {
  const context = useContext(PreOrderContext)
  return (
    <div

    className={style.cardProduct}
  >
  Okładka
    <input
      className={style.cardInput}
      defaultValue={context.preOrder.strony_okl}
      placeholder="..."
      type="text"
      onChange={(e) => { context.setPreOrder({...context.preOrder, strony_okl: e.target.value}) } }
    ></input>{" "}
    str.
  </div>
  );
};

const Srodek = () => {
  const context = useContext(PreOrderContext)
  return (
    <div

    className={style.cardProduct}
  >
  Środek
    <input
      className={style.cardInput}
      defaultValue={context.preOrder.strony_srd}
      placeholder="..."
      type="text"
      onChange={(e) => { context.setPreOrder({...context.preOrder, strony_srd: e.target.value}) } }
    ></input>{" "}
    str.
  </div>
  );
};
