import { useState, useContext, useEffect } from "react";
import style from "./BookMaker.module.css";
import { AppContext } from "context/AppContext";
import { AddBookFromCreator } from "../actions/AddBookFromCreator";
import { ModalInsertContext } from "context/ModalInsertContext";
import CardBinding from "./CardBinding";

import { PreOrderContext } from "context/PreOrderContext";
import { useCreatorBook } from "hooks/useCreatorBook";
export default function BookMaker() {
   const contextModalInsert = useContext(ModalInsertContext);
const showTabs = contextModalInsert.showTabs
const setShowTabs = contextModalInsert.setShowTabs
  const contextApp = useContext(AppContext);
  const [showElement, setShowElement] = useState(false);
  // const [binding, setBinding] = useState( contextApp.bindingType.map((bind) => ({ ...bind, isSelcted: false })) ); // dodaje do obiektu pole isSelected
  return (
    <div className={style.container}>
      <div className={style.bindingContainer}>

          <Oprawa  
              // binding={binding}
              // setBinding={setBinding}
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
          
          <div className={style.bindingContainer}>
  
          <Falc/>
          </div>
       
          <AddBtn />
      </>

        )}

    </div>
  );
}


const Oprawa =({ setShowElement}) => {
  const context = useContext(PreOrderContext)
  const contextModalInsert = useContext(ModalInsertContext);
const produkty = contextModalInsert.produkty;
const setProdukty = contextModalInsert.setProdukty;
const contextApp = useContext(AppContext);
const procesList = contextApp.procesList;
const procesListName = contextApp.procesListName;


  return (
 

      <select
        className={style.oprawa}
        value={context.preOrder.oprawa}
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
        {contextApp.procesList.filter(x=>x.nazwa_id==6).map((option) => (
          
          
          <option key={option.id} value={option.id}>
          {option.typ} {option.rodzaj} 
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
            // context.setPreOrder({...context.preOrder, szerokosc: e.target.value}) 

            if(e.target.value > 140 && e.target.value <172){
              context.setPreOrder({...context.preOrder, szerokosc: e.target.value,falc_skladka: 31})
            }else{
              context.setPreOrder({...context.preOrder,szerokosc: e.target.value, falc_skladka: 29})
            }
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
  const contexApp = useContext(AppContext)

  return (
    <div className={style.bindingContainer_end}>
      <div className={style.falc_druk} >

      Falcowanie:
      <select
        className={style.select}
        value={context.preOrder.falc_skladka}
        onChange={(e) => {
          context.setPreOrder({...context.preOrder, falc_skladka: e.target.value}) 
        }}
      >
        {}
        {contexApp.procesList
        // .filter(p=> p.nazwa_id == contexModal.procesyElementowTemporary.filter(x=> x.element_id == selectedElementROW.id )[0].nazwa_id)
        .filter(p=> p.nazwa_id == 3)

               .map((option) => (
          <option key={option.id} value={option.id}>
         {option.rodzaj}   {option.typ} {option.wykonczenie} {option.obszar}
          </option>
        ))}
      </select>
 
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


const AddBtn = () => {
   const contextModalInsert = useContext(ModalInsertContext);
const showTabs = contextModalInsert.showTabs
const setShowTabs = contextModalInsert.setShowTabs
  const context = useContext(PreOrderContext);
  const [createBook] = useCreatorBook();
  const isEmpty = () => {
    if (
      context.preOrder.naklad == null ||
      context.preOrder.naklad == "" ||
      context.preOrder.szerokosc == null ||
      context.preOrder.szerokosc == ""
      ||
      context.preOrder.wysokosc == null ||
      context.preOrder.wysokosc == ""
      ||
      context.preOrder.strony_okl == null ||
      context.preOrder.strony_okl == ""
      ||
      context.preOrder.strony_srd == null ||
      context.preOrder.strony_srd == ""
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className={style.bindingContainer}>
      <button
        disabled={isEmpty()}
        onClick={() => {
setShowTabs( {parametry:true,koszty:false,historia:false,faktury:false,kreator: false})
         

          createBook();
        }}
        className={isEmpty() ? style.btn_disabled : style.btn}
      >
        Dodaj
      </button>
    </div>
  );
};

