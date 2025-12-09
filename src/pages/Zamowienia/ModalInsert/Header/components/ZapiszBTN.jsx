import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../HeaderModal.module.css";
import { useZamowienieUpdate } from "hooks/useZamowienieUpdate";
import { useZamowienieInsert } from "hooks/useZamowienieInsert";

export default function ZapiszBTN({ setSaveAs,dialogBox }) {
  const contextModalInsert = useContext(ModalInsertContext);
  const isSaveButtonDisabled = contextModalInsert.isSaveButtonDisabled;
  const produkty = contextModalInsert.produkty;
  const daneZamowienia = contextModalInsert.daneZamowienia;

  const {updateZamowienie} = useZamowienieUpdate();
  const [zapiszZamowienie] = useZamowienieInsert();
  return (
    <button
      onClick={async () => {
        if (produkty[0].naklad != 0 && daneZamowienia.id == 1) {
          setSaveAs(false);
            zapiszZamowienie({dialogBox});
        }

        if (produkty[0].naklad != 0 && daneZamowienia.id != 1) {
           updateZamowienie({dialogBox});
          //  dialogBox.current.show();
        }
      }}
      className={isSaveButtonDisabled ? style.btn_disabled : style.btn}
      disabled={isSaveButtonDisabled}
    >
      Zapisz
    </button>
  );
}

