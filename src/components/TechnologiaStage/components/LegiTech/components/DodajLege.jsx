import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../LegiTech.module.css";
import icon from "assets/copy.svg";
export default function DodajLege({ row }) {
  const techContext = useContext(TechnologyContext);
  const legi = techContext.legi;
  const setLegi = techContext.setLegi;

  const handleAddLega = (row, legi, setLegi) => {
    // id = id elementu
    const newLegi = legi.slice();


    newLegi.push({
      id: Math.max(...newLegi.map((f) => f.id)) + 1,
      indeks: Math.max(...newLegi.map((f) => f.indeks)) + 1,
      rodzaj_elementu: row.rodzaj_elementu,
      typ_legi:row.typ_legi,
      naklad: row.naklad,
      element_id: row.element_id,
      ilosc_stron: row.ilosc_stron,
    });

    setLegi(newLegi);
  };

  return (
    <td className={style.col_button}>
      <div>
        <img
          className={style.expand}
          src={icon}
          onClick={() => {
            handleAddLega(row, legi, setLegi);
            // handleRemoveItem(row.indeks, row.id);
          }}
          alt="Procesy"
        />
      </div>
    </td>
  );
}
