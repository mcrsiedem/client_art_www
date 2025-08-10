import { useContext } from "react";
import { ModalInsertContext } from "context/ModalInsertContext";
import style from "../HeaderModal.module.css";

export default function ZapiszJakoBTN({ setShowSaveAs,setSaveAs,}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const isSaveButtonDisabled = contextModalInsert.isSaveButtonDisabled;
  const produkty= contextModalInsert.produkty;

  return (
    <button
      disabled={isSaveButtonDisabled}
      onClick={async () => {

        if(produkty[0].naklad){
        setShowSaveAs(true);
        setSaveAs(true);
        }
        
      }}
      className={isSaveButtonDisabled ? style.btn_disabled : style.btn}
    >
      Zapisz jako...
    </button>
  );
}