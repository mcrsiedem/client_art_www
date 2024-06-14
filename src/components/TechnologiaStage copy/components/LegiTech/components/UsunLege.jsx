import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../LegiTech.module.css"
import iconTrash from "assets/trash2.svg"
export default function UsunLege({ row }) {
    const techContext = useContext(TechnologyContext)
    const legi = techContext.legi;
    const setLegi = techContext.setLegi;

    const handleRemoveLega = (indeks,id,legi,setLegi) => {
      // id = id elementu
      if (legi.length !== 1) {
        setLegi(legi.filter((x) => x.indeks !== indeks));
        // setFragmenty(fragmenty.filter((x) => x.element_id !== id));
      }
    
      setLegi((prev) =>
        prev.map((t, a) => {
          if (t.indeks > indeks) {
            return {
              ...t,
              indeks: t.indeks--,
            };
          } else {
            return t;
          }
        })
      );
    };

    return (
      <td className={style.col_button}>
        <div>
          <img
            className={style.expand}
            src={iconTrash}
            onClick={() => {
              handleRemoveLega(row.indeks, row.id,legi,setLegi)
              // handleRemoveItem(row.indeks, row.id);
            }}
            alt="Procesy"
          />
        </div>
      </td>
    );
  }