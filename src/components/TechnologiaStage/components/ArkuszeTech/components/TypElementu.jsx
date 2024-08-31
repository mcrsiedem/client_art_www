import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { reg_int } from "utils/initialvalue";
import { _typ_elementu } from "utils/initialvalue";
import style from "../ArkuszeTech.module.css";


export default   function TypElementu ({row}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
    return (
      <td className={style.col_typ_elementu}>

        {/* <div>{_typ_elementu.filter(x => x.id == row.typ_elementu)[0].nazwa} </div> */}
        <div> arkusz </div>


        {/* <input
          value={_typ_elementu.filter(x => x.id == row.typ_elementu)[0].nazwa}
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
                handleUpdateRowArkusze({
              ...row,
              typ_elementu: e.target.value,
            }
            )}}

          }
        ></input> */}
      </td>
    );
  }