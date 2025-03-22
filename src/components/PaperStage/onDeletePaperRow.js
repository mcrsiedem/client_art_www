export function onDeletePaperRow(
  setBtnZapiszPapierDisabled,
  selectRow,
  setListaPapierowWyszukiwarka,
  listaPapierowWyszukiwarka,
  setListaPapierowNazwyWyszukiwarka,
  listaPapierowNazwyWyszukiwarka,
  setListaPapierowGrupaWyszukiwarka,
  listaPapierowGrupaWyszukiwarka
) {
  if (selectRow != null) {
    if (selectRow.typ_row == 1) {
      setListaPapierowWyszukiwarka(
        listaPapierowWyszukiwarka.map((t, a) => {
          if (t.id == selectRow.id) {
            return {
              ...t,
              delete: !t.delete,
            };
          } else {
            return t;
          }
        })
      );
    }

    if (selectRow.typ_row == 2) {
      setListaPapierowNazwyWyszukiwarka(
        listaPapierowNazwyWyszukiwarka.map((t, a) => {
          if (
            listaPapierowWyszukiwarka.filter((x) => x.nazwa_id == selectRow.id)
              .length == 0
          ) {
            if (t.id == selectRow.id) {
              return {
                ...t,
                delete: !t.delete,
              };
            } else {
              return t;
            }
          } else {
            return t;
          }
        })
      );
    }

    if (selectRow.typ_row == 3) {
      setListaPapierowGrupaWyszukiwarka(
        listaPapierowGrupaWyszukiwarka.map((t, a) => {
          if (
            listaPapierowNazwyWyszukiwarka.filter((x) => x.grupa_id == selectRow.id)
              .length == 0
          ) {
            if (t.id == selectRow.id) {
              return {
                ...t,
                delete: !t.delete,
              };
            } else {
              return t;
            }
          } else {
            return t;
          }
        })
      );
    }

    setBtnZapiszPapierDisabled(false);
  }
}
