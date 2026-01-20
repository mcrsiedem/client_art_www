import React, {useContext } from "react";
import style from "../EditProof.module.css";


import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";


export default function  ProcesName ({ row }) {

    // rowProcesProduktTemporary

  const CONTEXT_MODAL = useContext(ModalInsertContext);
  const contexApp = useContext(AppContext);
  // daneTechEdit = JSON.parse(JSON.stringify(daneTech))
  const procesList = contexApp.procesList;
  return (
    <td>
      <select
        className={style.select_proces}
        value={row.nazwa_id}
        onChange={(e) => {
          // tutaj ma filtrować się lista wszystkich procesów która wyświetla się w Typie
          // nazwa_id powinna zmienić się chyba w Typie a nie tutaj
          let procesDomyslny = procesList.find((x) => x.nazwa_id === e.target.value)
            // .map((x) => {
            //   return x;
            // });

          CONTEXT_MODAL.setProcesyProduktowTemporary((prev) =>
            prev.map((proces) =>
              proces.id === row.id
                ? {
                    ...row,
                    ...procesDomyslny,
                    nazwa_id: e.target.value,
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
        Array.from(new Set(contexApp.procesList.filter((x) => x.produkt === 1).map((option) => option.nazwa)))
          // 2. Mapujemy po każdej unikalnej nazwie
          .map((unikalnaNazwa) => {
            // 3. Znajdujemy pierwszy obiekt w oryginalnej liście  pasujący do tej unikalnej nazwy, aby pobrać jego ID.
            const opcja = contexApp.procesList.find((opt) => opt.nazwa === unikalnaNazwa );
            // 4. Renderujemy opcję używając ID pierwszego pasującego elementu
            return (
              <option key={opcja.nazwa_id} value={opcja.nazwa_id}>
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