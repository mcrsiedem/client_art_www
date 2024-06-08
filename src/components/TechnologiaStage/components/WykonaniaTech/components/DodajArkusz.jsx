import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import style from "../ArkuszeTech.module.css";
import icon from "assets/copy.svg";
export default function DodajArkusz({ row }) {
  const techContext = useContext(TechnologyContext);
  const arkusze = techContext.arkusze;
  const setArkusze = techContext.setArkusze;

  const handleAddArkusz = (row, arkusze, setArkusze) => {
    // id = id elementu
    const newArkusze = arkusze.slice();


    newArkusze.push({
      id: Math.max(...newArkusze.map((f) => f.id)) + 1,
      indeks: Math.max(...newArkusze.map((f) => f.indeks)) + 1,
      typ_elementu: row.typ_elementu,
      rodzaj_arkusza:row.rodzaj_arkusza,
      naklad: row.naklad,
      element_id: row.id,
      ilosc_stron: row.ilosc_stron,
    });

    setArkusze(newArkusze);
  };

  return (
    <td className={style.col_dodaj2}>
      <div>
        <img
          className={style.expand}
          src={icon}
          onClick={() => {
            handleAddArkusz(row, arkusze, setArkusze);
            // handleRemoveItem(row.indeks, row.id);
          }}
          alt="Procesy"
        />
      </div>
    </td>
  );
}
