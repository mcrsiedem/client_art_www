import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { reg_int } from "utils/initialvalue";
import { _typ_elementu } from "utils/initialvalue";
import style from "../ArkuszeTech.module.css";


export default   function NrArkusza ({row}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
    return (
  

  
        // <div  className={style.input_ark}> arkusz {i}</div>


        <input
        className={style.input_ark_nr}
        
          // value={"arkusz " + i}
          value={row.nr_arkusza}
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
                handleUpdateRowArkusze({
              ...row,
              nr_arkusza: e.target.value,
            }
            )}}

          }
        ></input>

    );
  }