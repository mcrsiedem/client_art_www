
import style from "./AddRealizacjaOprawa.module.css";
import { addRealizajcaOprawy } from "./addRealizajcaOprawy";
export default function Zapisz({setShow,grup,value}) {
    return (
      <button
        className={style.btn}
        onClick={() => {
          //  addRealizajcaOprawy(setShow,grup,value)
          setShow(false)
          
          }}
      >
        Zapisz
      </button>
    );
  }