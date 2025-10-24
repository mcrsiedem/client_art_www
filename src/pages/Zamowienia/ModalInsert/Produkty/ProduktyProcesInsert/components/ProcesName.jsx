import React, { useEffect, useState, useContext, useRef } from "react";
import style from "../ProcesProdukt.module.css";


import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";

import { _typ_elementu, reg_int } from "utils/initialvalue";

export default function  ProcesName ({ row }) {

    // rowProcesProduktTemporary

  const contexModal = useContext(ModalInsertContext);
  const CONTEXT_MODAL = useContext(ModalInsertContext);
  const contexApp = useContext(AppContext);
  // daneTechEdit = JSON.parse(JSON.stringify(daneTech))
  const procesListEdit = JSON.parse(JSON.stringify(contexApp.procesList))
  const procesList = contexApp.procesList;
  return (
    <td>
      <select
        className={style.select}
        value={row.nazwa_id}
        onChange={(e) => {
          // tutaj ma filtrować się lista wszystkich procesów która wyświetla się w Typie
          // nazwa_id powinna zmienić się chyba w Typie a nie tutaj
          let proc = procesList
            .filter((x) => x.nazwa_id == e.target.value)
            .map((x) => {
              return x;
            });

          CONTEXT_MODAL.setProcesyProduktowTemporary((prev) =>
            prev.map((proces) =>
              proces.id === row.id
                ? {
                    ...row,
                    ...proc[0],
                    nazwa_id: e.target.value,
                    proces_id: procesListEdit.filter(
                      (proces) => proces.nazwa_id == e.target.value
                    )[0].id,
                    update: true,
                    historia: false,
                    id: row.id,
                  }
                : proces
            )
          );

          // console.log("Proces1 NAME: "+procesListEdit.filter( proces => proces.nazwa_id == e.target.value)[0].id)
        }}
      >
      

        {
            // tylko procesy produktowe czyli produkt == 1 
        Array.from(new Set(contexApp.procesList.filter((x) => x.produkt == 1).map((option) => option.nazwa)))
          // 2. Mapujemy po każdej unikalnej nazwie
          .map((unikalnaNazwa) => {
            // 3. Znajdujemy pierwszy obiekt w oryginalnej liście  pasujący do tej unikalnej nazwy, aby pobrać jego ID.
            const opcja = contexApp.procesList.find((opt) => opt.nazwa === unikalnaNazwa );
            // 4. Renderujemy opcję używając ID pierwszego pasującego elementu
            return (
              <option key={opcja.id} value={opcja.id}>
                {opcja.nazwa}
              </option>
            );
          })
          
          }




      </select>
    </td>
  );
};


        // setUsers(prevUsers => 
        //     prevUsers.map(user => 
        //         user.id === userId 
        //             ? { ...user, [key]: finalValue }
        //             : user
        //     )
        // );

    //         const handleValueChange = (userId, key, value) => {
    //     const intValue = parseInt(value, 10);
    //     const finalValue = isNaN(intValue) ? 0 : intValue; 
        
    //     setUsers(prevUsers => 
    //         prevUsers.map(user => 
    //             user.id === userId 
    //                 ? { ...user, [key]: finalValue }
    //                 : user
    //         )
    //     );
    //     console.log(`[API UPDATE] Użytkownik ID ${userId}: Kolumna '${key}' zmieniona na wartość ${finalValue}`);
    // };