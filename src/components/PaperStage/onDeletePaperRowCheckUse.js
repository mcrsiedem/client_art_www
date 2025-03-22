import axios from "axios";
import { IP } from "../../utils/Host";
import { onDeletePaperRow } from "./onDeletePaperRow";

export const onDeletePaperRowCheckUse = async (
  setBtnZapiszPapierDisabled,
  selectRow,
  setListaPapierowWyszukiwarka,
  listaPapierowWyszukiwarka,
  setListaPapierowNazwyWyszukiwarka,
  listaPapierowNazwyWyszukiwarka,
  setListaPapierowGrupaWyszukiwarka,
  listaPapierowGrupaWyszukiwarka
) => {
  if (selectRow.typ_row == 1) {
    await axios
      .get(
        IP +
          "sprawdzCzyPapierUzyty/" +
          selectRow.id +
          "/" +
          sessionStorage.getItem("token")
      )
      .then((res) => {
        if (res.data > 0) {
          alert("Nie można skasować tego papieru, ponieważ jest używany");
        } else {
          onDeletePaperRow(
            setBtnZapiszPapierDisabled,
            selectRow,
            setListaPapierowWyszukiwarka,
            listaPapierowWyszukiwarka,
            setListaPapierowNazwyWyszukiwarka,
            listaPapierowNazwyWyszukiwarka,
            setListaPapierowGrupaWyszukiwarka,
            listaPapierowGrupaWyszukiwarka
          );
        }
      })
      .then((res) => {
        setListaPapierowGrupaWyszukiwarka((prev) =>
          prev
            .map((t, a) => {
              return {
                ...t,
                select: false,
              };
            })
        );
    
        setListaPapierowWyszukiwarka((prev) =>
          prev
            .map((t, a) => {
              return {
                ...t,
                select: false,
              };
            })
        );
    
        setListaPapierowNazwyWyszukiwarka((prev) =>
          prev
            .map((t, a) => {
              return {
                ...t,
                select: false,
              };
            })
        );
      });
  } else {
    onDeletePaperRow(
      setBtnZapiszPapierDisabled,
      selectRow,
      setListaPapierowWyszukiwarka,
      listaPapierowWyszukiwarka,
      setListaPapierowNazwyWyszukiwarka,
      listaPapierowNazwyWyszukiwarka,
      setListaPapierowGrupaWyszukiwarka,
      listaPapierowGrupaWyszukiwarka
    );


    setListaPapierowGrupaWyszukiwarka((prev) =>
      prev
        .map((t, a) => {
          return {
            ...t,
            select: false,
          };
        })
    );

    setListaPapierowWyszukiwarka((prev) =>
      prev
        .map((t, a) => {
          return {
            ...t,
            select: false,
          };
        })
    );

    setListaPapierowNazwyWyszukiwarka((prev) =>
      prev
        .map((t, a) => {
          return {
            ...t,
            select: false,
          };
        })
    );



  }
};
