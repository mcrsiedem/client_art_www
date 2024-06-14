import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../WykonaniaTech.module.css"
import iconTrash from "assets/trash2.svg"
export default function UsunArkusz({ row }) {
    const techContext = useContext(TechnologyContext)
    const arkusze = techContext.arkusze;
    const setArkusze = techContext.setArkusze;

    const handleRemoveArkusz = (indeks,id,arkusze,setArkusze) => {
      // id = id elementu
      if (arkusze.length !== 1) {
        setArkusze(arkusze.filter((x) => x.indeks !== indeks));
        // setFragmenty(fragmenty.filter((x) => x.element_id !== id));
      }
    
      setArkusze((prev) =>
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
              handleRemoveArkusz(row.indeks, row.id,arkusze,setArkusze)
              // handleRemoveItem(row.indeks, row.id);
            }}
            alt="Procesy"
          />
        </div>
      </td>
    );
  }