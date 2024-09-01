import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { reg_int } from "utils/initialvalue";
import style from "../ArkuszeTech.module.css";

export default   function RodzajArkusza ({row}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
    return (
   
        <input
        className={style.input}
          value={row.rodzaj_arkusza}
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
                handleUpdateRowArkusze({
              ...row,
              rodzaj_arkusza: e.target.value,
            }
            )}}

          }
        ></input>
     
    );
  }