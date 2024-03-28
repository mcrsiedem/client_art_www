
import style from "./BookMaker.module.css";
import { PreOrderContext } from "context/PreOrderContext";
import { useContext } from "react";
export default function CardBinding ({ bind, binding, setBinding, setShowElement })  {

  const context = useContext(PreOrderContext)
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

        context.setPreOrder({...context.preOrder, oprawa: bind.id})

 
      };

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

  