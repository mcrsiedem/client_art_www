import { useState, useContext, useEffect } from "react";
import style from "./BookMaker.module.css";
import { AppContext } from "context/AppContext";
import { AddBookFromCreator } from "../actions/AddBookFromCreator";
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
  return (
    <div className={style.container}>
      <div className={style.bindingContainer}>
        {/* {binding
          .filter((bind1) => bind1.id !== 10) // oprawa id 1 n/d
          .map((bind) => (
            <CardBinding
              bind={bind}
              binding={binding}
              setBinding={setBinding}
              setShowElement={setShowElement}
            />
          ))} */}

          <Oprawa  
              binding={binding}
              setBinding={setBinding}
              setShowElement={setShowElement}
              />
      </div>

      {showElement && (
        <>
     
          <Naklad/>

          <div className={style.bindingContainer}>
            <Okladka/>
            <Srodek/>
          </div>
    

          <div className={style.bindingContainer}>
            <Szerokosc  />
            <Wysokosc  />
          </div>
          <Falc/>
          <AddBtn setShowTemplate={setShowTemplate}  setShowParametryZamowienia={ setShowParametryZamowienia}/>
      </>

        )}

    </div>
  );
}


const Oprawa =({  binding, setBinding, setShowElement}) => {
  const context = useContext(PreOrderContext)
  const contextModalInsert = useContext(ModalInsertContext);
const produkty = contextModalInsert.produkty;
const setProdukty = contextModalInsert.setProdukty;
const contextApp = useContext(AppContext);

  return (
 

      <select
        className={style.oprawa}
        defaultValue={binding.oprawa}
        onChange={(event) => {
          setShowElement(true)
          if(event.target.value==0){
            setShowElement(false)
          }else{

            context.setPreOrder({...context.preOrder, oprawa: event.target.value})


          }
        }}


      >
        <option key={1} value={0}> 
           wybierz oprawę...
          </option>
        {contextApp.bindingType.map((option) => (
          
          
          <option key={option.id} value={option.id}>
          {option.nazwa} 
          </option>
        ))}
      </select>

  );
}






const Szerokosc = () => {
  const context = useContext(PreOrderContext)
  return (
    <div className={style.cardNetto} >
 
      Szerokość
      <input
        className={style.cardInputNetto}
        value={context.preOrder.szerokosc}
        placeholder="..."
        type="text"
        onChange={(e) => 
          { 
            const re = /^\d{0,3}(?:\,\d{0,2}){0,1}$/;
            if (e.target.value === '' || re.test(e.target.value)) {
            context.setPreOrder({...context.preOrder, szerokosc: e.target.value}) 
            }
          } 
        }
  
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
        value={context.preOrder.wysokosc}
        placeholder="..."
        type="text"
        onChange={(e) => {
          const re = /^\d{0,3}(?:\,\d{0,2}){0,1}$/;
          if (e.target.value === '' || re.test(e.target.value)) {
           context.setPreOrder({...context.preOrder, wysokosc: e.target.value}) 
        }
          } }
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
        value={context.preOrder.naklad}
        placeholder="..."
        type="text"
        onChange={(e) => {
          const re = /^[0-9]+$/;
          if (e.target.value === '' || re.test(e.target.value)) {
           context.setPreOrder({...context.preOrder, naklad: e.target.value}) 
          }

          } }
      >  
      </input>
      szt.
    </div>
    </div>
  );
};

const Falc = () => {
  const context = useContext(PreOrderContext)
  return (
    <div className={style.bindingContainer}>
      <div className={style.cardNaklad} >

      Falcowanie
      <input
        className={style.cardInputNaklad}
        value={context.preOrder.naklad}
        placeholder="..."
        type="text"
        onChange={(e) => {
          const re = /^[0-9]+$/;
          if (e.target.value === '' || re.test(e.target.value)) {
           context.setPreOrder({...context.preOrder, naklad: e.target.value}) 
          }

          } }
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
      value={context.preOrder.strony_okl}
      placeholder="..."
      type="text"
      onChange={(e) => { 
        const re = /^[0-9]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
        context.setPreOrder({...context.preOrder, strony_okl: e.target.value})
        }
       } }
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
      value={context.preOrder.strony_srd}
      placeholder="..."
      type="text"
      onChange={(e) => { 
        const re = /^[0-9]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
        context.setPreOrder({...context.preOrder, strony_srd: e.target.value}) 
        }
      } }
    ></input>{" "}
    str.
  </div>
  );
};


const AddBtn = ({setShowTemplate,setShowParametryZamowienia}) => {

  const preOrderContext = useContext(PreOrderContext)
  const modalInsertContext = useContext(ModalInsertContext)
  return (
    <div className={style.bindingContainer}>
    <button
      onClick={() => {
        setShowTemplate(false);
        setShowParametryZamowienia(true);
        AddBookFromCreator(modalInsertContext,preOrderContext) // przekazane contexty do funkcjis
        // AddProductFromCreator(naklad,binding,elements);
        // console.log("preorder", poc.preOrder)
      }}
      className={style.btn}
    >
      Dodaj
    </button>
    
  </div>
  );
};

