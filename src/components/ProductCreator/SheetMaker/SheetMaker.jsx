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

const CardBinding = ({ bind, binding, setBinding, setShowElement }) => {
  return (
    <div
      onClick={() =>
        clikBindingHandler({ bind, binding, setBinding, setShowElement })
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

const CardProduct = ({ element, elements, setElements }) => {
  const changeProductHandler = (element) => {
    setElements(
      elements.map((e) => {
        if (e.id === element.id) {
          return element;
        } else {
          return e;
        }
      })
    );
  };
  return (
    <div
      // onClick={() => clikBindingHandler({ bind, binding, setBinding })}
      className={style.cardProduct}
    >
      {element.nazwa}
      <input
        className={style.cardInput}
        defaultValue={element.strony}
        placeholder="..."
        type="text"
        onChange={(e) =>
          changeProductHandler({ ...element, strony: e.target.value })
        }
      ></input>{" "}
      str.
    </div>
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
  const context = useContext(PreOrderContext)
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
        value={context.preOrder.naklad}
        placeholder="..."
        type="text"
        onChange={(e) => {
          const re = /^[0-9]+$/;
          if (e.target.value === '' || re.test(e.target.value)) {
           context.setPreOrder({...context.preOrder, naklad: e.target.value}) 
          }

          } }
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
