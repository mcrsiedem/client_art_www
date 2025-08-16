import React, {useContext } from "react";
import style from "./ExpandOprawa.module.css";

import { TechnologyContext } from "context/TechnologyContext";

export default function ExpandOprawa({grup}) {
  const techContext = useContext(TechnologyContext);
  const setGrupyOprawaAll = techContext.setGrupyOprawaAll;
  const grupyOprawaAll = techContext.grupyOprawaAll;

if(grup.show)
  return (
    <tr className={style.container}>
      <td colSpan={16}>
        <div className={style.container}>
          <div className={style.stage}>
            <button
              className={style.btn_zamknij}
              onClick={() => {
                setGrupyOprawaAll(
                  grupyOprawaAll.map((t) => {
                    if (t.global_id == grup.global_id) {
                      return { ...t, show: false };
                    } else {
                      return t;
                    }
                  })
                );
              }}
            >
              Zamknij
            </button>
          </div>
        </div>
      </td>
    </tr>
  );


}


