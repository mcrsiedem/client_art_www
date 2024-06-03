import { useContext } from "react";
import { TechnologyContext } from "context/TechnologyContext";
import { reg_int } from "utils/initialvalue";

export default   function RodzajArkusza ({row}) {
    const techContext = useContext(TechnologyContext)
    const handleUpdateRowArkusze = techContext.handleUpdateRowArkusze;
    return (
      <td>
        <input
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
      </td>
    );
  }