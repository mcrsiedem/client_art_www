import React, { useEffect, useState,useContext,useRef} from "react";
import iconLock from "assets/lock2.svg";
import iconUnLock from "assets/unLock.svg";
import style from "./ZamowieniaInfo.module.css";
import iconClose2 from "assets/x2.svg";

import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";

import { useApiPapier, usePapier } from "hooks/useApiPapier";
import { getZamowieniaInfo } from "actions/getZamowieniaInfo";



export default function ZamowieniaInfo({parent}) {

  // parent oznacza pochodzenie komponentu - zamowienia / technologia
  const start = useRef();

    const modalcontext = useContext(ModalInsertContext);
    const appContext = useContext(AppContext);
    const zamowienia = appContext.zamowienia;
    const zamowieniaInfo = appContext.zamowieniaInfo;

    const [callForPaper] = useApiPapier();



const scrollTable = (table) => {
  if(table.current != null) {
      table.current.scrollTo({ top: 10000, behavior: "smooth" })
  }

};

  useEffect(() => {
      // callForPaper()

      }, []);


 if(appContext.showZamowieniaInfo){
  return (
    <div className={style.grayScaleBackground}>
      <div className={style.window}>
        <div className={style.header}>
          <p className={style.title}>Ilość przelotów </p>
          <img
            className={style.icon2}
            src={iconClose2}
            onClick={() => {
              appContext.setShowZamowieniaInfo(false);
            }}
            alt="React Logo"
          />
        </div>

            <div>
              <p className={style.title}>Zamówienia: {appContext.zamowienia.filter(x=>x.select == true).length} szt.</p>
              <p className={style.title}>Technologia: {appContext.zamowienia.filter(x=>x.select == true && x.technologia_id != null).length} szt.</p>
              <p className={style.title}>{zamowieniaInfo.przeloty_druk} szt.</p>
              <p className={style.title}>{zamowieniaInfo.przeloty_falc} szt.</p>
              <p className={style.title}>{zamowieniaInfo.przeloty_druk_zakonczone} szt.</p>
              <p className={style.title}>{zamowieniaInfo.przeloty_falc_zakonczone} szt.</p>
            </div>


      </div>
    </div>
  );
 }
}

