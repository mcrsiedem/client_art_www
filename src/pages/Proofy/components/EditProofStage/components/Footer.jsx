
import style from "./Footer.module.css";
import { ModalInsertContext } from "context/ModalInsertContext";
import { useHistoria } from "hooks/useHistoria";
import { useStatus } from "hooks/useStatus";
import { useZamowienia } from "hooks/useZamowienia";
import { useContext } from "react";



export default function Footer() {
  const modalContext = useContext(ModalInsertContext);

    const contextModalInsert = useContext(ModalInsertContext);
    const procesyProduktowTemporary = contextModalInsert.procesyProduktowTemporary

   const {edytujProofa} = useZamowienia()




  return (
    <div className={style.footer}>
      <button
        className={style.btn}
        onClick={() => {


edytujProofa(procesyProduktowTemporary[0])


        }}
      >
        Zapisz
      </button>
    </div>
  );
}