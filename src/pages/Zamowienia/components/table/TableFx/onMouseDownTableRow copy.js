
export function onMouseDownTableRow(event,row,zamowienia,setZamowienia,selectedUser,selectedKlient,i) {

          if (event.shiftKey) {
            let indeks_start = sessionStorage.getItem("indeks_start");
            let indeks_stop = i;
            setZamowienia(
              zamowienia
                // .filter((zamowienie) => sprawdzDostepZamowienia(zamowienie))
                .filter((zam) => {
                  if (selectedUser == 0) {
                    return true;
                  } else {
                    return zam.opiekun_id == selectedUser;
                  }
                })
                .filter((z) => z.stan == 3)
                .filter((zam) => {
                  if (selectedKlient == 0) {
                    return true;
                  } else {
                    return zam.klient_id == selectedKlient;
                  }
                })
                // .filter((zamowienie) => sortWgEtapu({ zamowienie }))
                .map((x) => {
                  return { ...x, select: false };
                })
                .map((t, indeks) => {
                  if (indeks >= indeks_start && indeks <= indeks_stop) {
                    return { ...t, select: true };
                  } else {
                    return t;
                  }
                })
            );
          } else {
            setZamowienia(
              zamowienia
                .map((x) => {
                  return { ...x, select: false };
                })
                .map((t, indeks) => {
                  if (t.id == row.id) {
                    return { ...t, select: true };
                  } else {
                    return t;
                  }
                })
            );
          }

          if (event.ctrlKey) {
            setZamowienia(
              zamowienia
                // .map(x => {return { ...x, select: false}})
                .map((t, indeks) => {
                  if (t.id == row.id) {
                    return { ...t, select: !t.select };
                  } else {
                    return t;
                  }
                })
            );
          }

          sessionStorage.setItem("indeks_start", i);


}