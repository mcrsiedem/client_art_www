import { useState, useContext, useEffect } from "react";
import style from "./SheetMaker.module.css";
import { AppContext } from "context/AppContext";
import { PreOrderContext } from "context/PreOrderContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { AddSheetFromCreator } from "../actions/AddSheetFromCreator";
export default function SheetMaker({
  setShowTemplate,
  setShowParametryZamowienia,
}) {
  const contextApp = useContext(AppContext);

  const [showElement, setShowElement] = useState(false);
  const [naklad, setNaklad] = useState(null);
  const [elements, setElements] = useState([
    { id: 1, nazwa: "Ulotka", strony: 2 },

  ]);
  const [netto, setNetto] = useState([{ x: null, y: null }]);
 

  return (
    <div className={style.container}>
        
        {/* <Naklad naklad={naklad} setNaklad={setNaklad} /> */}
        <div className={style.bindingContainer}>
          <CardNettoX netto={netto} setNetto={setNetto} />
          <CardNettoY netto={netto} setNetto={setNetto} />
        </div>



      <div className={style.bindingContainer}>
      <AddBtn setShowTemplate={setShowTemplate}  setShowParametryZamowienia={ setShowParametryZamowienia}/>
      </div>




    </div>
  );
}


const AddBtn = ({setShowTemplate,setShowParametryZamowienia}) => {

  const poc = useContext(PreOrderContext)
  const mic = useContext(ModalInsertContext)
   const contextModalInsert = useContext(ModalInsertContext);
const showTabs = contextModalInsert.showTabs
const setShowTabs = contextModalInsert.setShowTabs
  const produkty = contextModalInsert.produkty;

  const context = useContext(PreOrderContext);

  const isEmpty = () => {
    if (
      produkty[0].naklad == null ||
      produkty[0].naklad == "" ||
      produkty[0].naklad == 0 ||
      context.preOrder.szerokosc == null ||
      context.preOrder.szerokosc == ""
      ||
      context.preOrder.wysokosc == null ||
      context.preOrder.wysokosc == ""

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
        // setShowTemplate(false);
        // setShowParametryZamowienia(true);
        AddSheetFromCreator(mic,poc) // przekazane contexty do funkcjis
        // AddProductFromCreator(naklad,binding,elements);
        console.log("preorder", poc.preOrder)
        setShowTabs( {parametry:true,koszty:false,historia:false,faktury:false,kreator: false})
      }}
              className={isEmpty() ? style.btn_disabled : style.btn}
    >
      Dodaj
    </button>
    
  </div>
  );
};
const clikBindingHandler = ({ bind, binding, setBinding, setShowElement }) => {
  setShowElement(true);
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



const CardNettoX = ({ netto, setNetto }) => {
  const context = useContext(PreOrderContext)
  return (
    <div
      // onClick={() => clikBindingHandler({ bind, binding, setBinding })}
      className={style.cardNetto}
    >
 
      Szerokość
      <input
        className={style.cardInputNetto}
        value={context.preOrder.szerokosc}
        placeholder="..."
        type="text"
        onChange={(e) => {
          const re = /^\d{0,4}(?:\,\d{0,2}){0,1}$/;
          if (e.target.value === '' || re.test(e.target.value)) {
           context.setPreOrder({...context.preOrder, szerokosc: e.target.value}) 
        }
          } }
      ></input>{" "}
      mm.
    </div>
  );
};

const CardNettoY = ({ netto, setNetto }) => {
  const context = useContext(PreOrderContext)
  return (
    <div
      // onClick={() => clikBindingHandler({ bind, binding, setBinding })}
      className={style.cardNetto}
    >

      Wysokość
      <input
        className={style.cardInputNetto}
        value={context.preOrder.wysokosc}
        // defaultValue={netto.y}

        placeholder="..."
        type="text"
        onChange={(e) => {
          const re = /^\d{0,4}(?:\,\d{0,2}){0,1}$/;
          if (e.target.value === '' || re.test(e.target.value)) {
           context.setPreOrder({...context.preOrder, wysokosc: e.target.value}) 
        }
          } }
      ></input>{" "}
      mm.
    </div>
  );
};

  