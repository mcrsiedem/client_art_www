import React, {  useContext } from "react";
import style from "../EditProof.module.css";


import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";


export default function  ProcessTyp ({ row }) {

    // rowProcesProduktTemporary

  const CONTEXT_MODAL = useContext(ModalInsertContext);
  const contexApp = useContext(AppContext);
  // daneTechEdit = JSON.parse(JSON.stringify(daneTech))
  const procesList = contexApp.procesList;
  return (
    <td>
      <select
        className={style.select}
        value={row.proces_id}
        onChange={(e) => {
          // tutaj ma filtrować się lista wszystkich procesów która wyświetla się w Typie
          // nazwa_id powinna zmienić się chyba w Typie a nie tutaj
          let procesDomyslny = procesList.find((x) => x.id === e.target.value)
            // .map((x) => {
            //   return x;
            // });

          CONTEXT_MODAL.setProcesyProduktowTemporary((prev) =>
            prev.map((proces) =>
              proces.id === row.id
                ? {
                    ...row,
                    ...procesDomyslny,
                    proces_id:procesDomyslny.id,
                    update: true,
                    historia: false,
                    id: row.id,
                  }
                : proces
            )
          );

        }}
      >
      

        {
            // tylko procesy produktowe czyli produkt == 1 
procesList
        .filter(p=> p.produkt===1 && p.nazwa_id === procesList.find(x=> x.id === row.proces_id)?.nazwa_id)
        // .filter(p=> p.produkt==1 && p.nazwa_id == 18)

               .map((option) => (
          <option key={option.id} value={option.id}>
            {option.typ} {option.rodzaj} {option.wykonczenie} {option.obszar}
          </option>
        ))
          
          }




      </select>
    </td>
  );
};


