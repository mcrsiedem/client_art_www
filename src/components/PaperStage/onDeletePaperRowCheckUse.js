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
        // console.log(res.data)
      })
      .then((res) => {
        //  setBtnZapiszPapierDisabled(true)
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
  }
};
