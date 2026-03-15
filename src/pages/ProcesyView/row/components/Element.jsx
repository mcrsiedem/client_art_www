import style from "../ProcesViewRow.module.css";

export default function Element({
  grup,
  selectedProces,
  procesList,
  typ_elementu,
  wykonaniaAll
}) {
  return (
    <td className={style.td_tableProcesy_nr_stary}>
{selectedProces == 3
  ? 

    //   ? grup.rodzaj_procesu +
    // " " +
    (procesList?.filter((x) => x.id == grup.oprawa_produktu)[0]?.typ.substring(0, 1) || "") + 
    " " +
    // Dodajemy nawiasy wokół logiki filtrowania i fallbacku
    (wykonaniaAll
      .filter(x => x.technologia_id == grup.technologia_id && x.grupa_id == grup.id)
      .sort((a, b) => a.nazwa_wykonania - b.nazwa_wykonania)[0]?.nazwa_wykonania || " ")
  : typ_elementu?.filter((x) => x.id == grup.typ_elementu)[0]?.skrot}
    </td>
  );
}
