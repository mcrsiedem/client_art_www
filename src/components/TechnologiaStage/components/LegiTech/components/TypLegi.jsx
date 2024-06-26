import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { reg_int } from "utils/initialvalue";

export default   function TypLegi ({row}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowLegi = techContext.handleUpdateRowLegi;
    return (
      <td>
        <input
          value={row.rodzaj_legi}
          onChange={(e) =>

            {
              if (e.target.value === '' || reg_int.test(e.target.value)) {
                handleUpdateRowLegi({
              ...row,
              rodzaj_legi: e.target.value,
            }
            )}}

          }
        ></input>
      </td>
    );
  }