import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../HeaderModal.module.css";
import { useZamowienieUpdate } from "hooks/useZamowienieUpdate";
import { useZamowienieInsert } from "hooks/useZamowienieInsert";
import DecodeToken from "pages/Login/DecodeToken";
import { useZamowienia } from "hooks/useZamowienia";

export default function OddajBTN({ setSaveAs,dialogBox }) {

  // tymczasowy guzik do wymuszania etap=16 czyli oddane
  // używany do porządkowania zleceń w których po oddaniu nadpisał się etap np oprawione

  const contextModalInsert = useContext(ModalInsertContext);
  const isSaveButtonDisabled = contextModalInsert.isSaveButtonDisabled;
  const produkty = contextModalInsert.produkty;
  const daneZamowienia = contextModalInsert.daneZamowienia;

  const {updateZamowienie} = useZamowienieUpdate();
  const [zapiszZamowienie] = useZamowienieInsert();
  const { zamowienieOddaj } = useZamowienia();


  if (DecodeToken(sessionStorage.getItem("token")).zamowienie_odblokuj == 1) {
      return (
    <button
      onClick={async () => {
        // if (produkty[0].naklad != 0 && daneZamowienia.id == 1) {
        //   setSaveAs(false);
        //     zapiszZamowienie({dialogBox});
        // }

        // if (produkty[0].naklad != 0 && daneZamowienia.id != 1) {
        //    updateZamowienie({dialogBox});
        //   //  dialogBox.current.show();
        // }


  if (window.confirm("Potwierdź usunięcie!")) {
    zamowienieOddaj(daneZamowienia.id)
  } else {
    alert("Anulowano.");
  }



      }}
      className={ style.btn}

    >
      Oddaj zamówienie
    </button>
  );
  }

}

