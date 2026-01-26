import React, { useContext, useState } from "react";
import style from "./TABLE_ROW_ZAMOWIENIA.module.css";
import { AppContext } from "context/AppContext";

import Klient from "./Klient";
import Data from "./Data";
import Format from "./Format";
import Ilosc from "./Ilosc";
import Uwagi from "./Data copy";
import NrFaktury from "./NrFaktury";
import EditProof from "../../EditProofStage/EditProof";
import { ModalInsertContext } from "context/ModalInsertContext";

export default function TABLE_ROW_ZAMOWIENIA({ row }) {

    const [showEditProof, setShowEditProof] = useState(false);
        const modalContext = useContext(ModalInsertContext);
    
  const setProcesyProduktowTemporary = modalContext.setProcesyProduktowTemporary;
  

  return (
    <>
      <tr
        onContextMenu={() => {}}
        className={ row.select ? style.row_zamowienia_select : style.row_zamowienia        }
        key={row.id}
        onDoubleClick={() => {
        setProcesyProduktowTemporary([row])
        setShowEditProof(true)}}
      >
        <Data row={row} />
        <Klient row={row} />
        <Format row={row} />
        <Ilosc row={row} />
        <NrFaktury row={row} />
        <Uwagi row={row} />
        <FirmaZamowieniaTable row={row} />

        <td></td>
      </tr>
      <EditProof showEditProof={showEditProof} setShowEditProof={setShowEditProof}/>
    </>
  );
}

const FirmaZamowieniaTable = ({ row }) => {
  const appContext = useContext(AppContext);
  const _firma = appContext._firma;
  return (
    <td>
    <input
      title={row.klient}
      className={style.tytulfirma}
      value={_firma.filter((s) => s.id === row.firma_id).map((x) => x.nazwa_skrocona)}
      readOnly

    />
    </td>
  );
};
