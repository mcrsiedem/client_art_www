import React, { useState, useEffect, useRef, useContext } from "react";
import style from "./RowRealizacjeZestawienie.module.css";
import iconAdd from "assets/add2.svg";
import iconFile from "assets/iconTechnologieDark.svg";
import iconLockRed from "assets/lock2.svg";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { TechnologyContext } from "context/TechnologyContext";
import {
  _etapy_produkcji,
  _stan_dokumentu,
  _status_dokumentu,
  _status_etapu,
} from "utils/initialvalue";
import DecodeToken from "pages/Login/DecodeToken";
import { useZamowienia } from "hooks/useZamowienia";

import { sprawdzDostepZamowienia } from "actions/sprawdzDostepZamowienia";
import { useSortowanieZamowienia } from "hooks/useSortowanieZamowienia";


export default function RowRealizacjeZestawienie({ row, open2, setRow,i }) {
  const techContext = useContext(TechnologyContext);
  const contextModalInsert = useContext(ModalInsertContext);
  const fechparametryTechnologiiDetails = techContext.fechparametryTechnologiiDetails; // technologie
  const procesyElementowTech = techContext.procesyElementowTech; // technologie
  const setSelectedZamowienie = contextModalInsert.setSelectedZamowienie;
  const [showKartaTechnologiczna, setShowKartaTechnologiczna] = useState(false);
  const contextApp = useContext(AppContext);
  
  const zamowienia = contextApp.zamowienia
  const setZamowienia = contextApp.setZamowienia
  const zamowieniaPliki = contextApp.zamowieniaPliki
  const selectedUser= contextApp.selectedUser;
  const selectedKlient= contextApp.selectedKlient;
    const [sortWgEtapu] = useSortowanieZamowienia()
      const contextModal = useContext(ModalInsertContext);
  const setOpenModalInsert = contextModal.setOpenModalInsert;
const setShowTabs = contextModalInsert.setShowTabs

 const realizacjeZestawienie= contextApp.realizacjeZestawienie;
 const setRealizacjeZestawienie= contextApp.setRealizacjeZestawienie;


  const onMenuHandle2 = (event) =>{
    event.preventDefault();
    setRealizacjeZestawienie(
      realizacjeZestawienie
      .map(x => {return { ...x, select: false, show:false}})
      .map((t) => {
        if (t.global_id == row.global_id) {
          return { ...row, select: true,show:true};
        } else {
          return t;
        }
      })
    );

    // if(row.technologia_id != null ){
    //   fechparametryTechnologiiDetails(row.id,row.technologia_id)
    // }else{
    //   techContext.setProcesyElementowTech([])
    // }

  }

  return (
    <>
      <tr
        onContextMenu={(event) => {
          // onMenuHandle2(event);
        }}
        title={
          "Zamówienie id: " +
          row.id +
          " utworzono: " +
          row.utworzono +
          " Zmodyfikowano: " +
          row.zmodyfikowano
        }
        className={
          row.select ? style.row_zamowienia_select : style.row_zamowienia
        }
        // className={ style.row_zamowienia}
        key={row.id}
        onMouseDown={(event) => {
          // onMenuHandle2(event);

          if (event.shiftKey) {
            let indeks_start = sessionStorage.getItem("indeks_start");
            let indeks_stop = i;
            setRealizacjeZestawienie(
              realizacjeZestawienie
                // .filter((zamowienie) => sprawdzDostepZamowienia(zamowienie))
                // .filter((zam) => {
                //   if (selectedUser == 0) {
                //     return true;
                //   } else {
                //     return zam.opiekun_id == selectedUser;
                //   }
                // })
                // .filter((z) => z.stan == 3)
                // .filter((zam) => {
                //   if (selectedKlient == 0) {
                //     return true;
                //   } else {
                //     return zam.klient_id == selectedKlient;
                //   }
                // })
                // .filter((zamowienie) => sortWgEtapu({ zamowienie }))
                // .map((x) => {
                //   return { ...x, select: false };
                // })
                .map((t, indeks) => {
                  if (indeks >= indeks_start && indeks <= indeks_stop) {
                    return { ...t, select: true };
                  } else {
                    return t;
                  }
                })
            );
          } else {
            setRealizacjeZestawienie(
              realizacjeZestawienie
                .map((x) => {
                  return { ...x, select: false };
                })
                .map((t, indeks) => {
                  if (t.global_id == row.global_id) {
                    return { ...t, select: true };
                  } else {
                    return t;
                  }
                })
            );
          }

          if (event.ctrlKey) {
            setRealizacjeZestawienie(
              realizacjeZestawienie
                // .map(x => {return { ...x, select: false}})
                .map((t, indeks) => {
                  if (t.global_id == row.global_id) {
                    return { ...t, select: !t.select };
                  } else {
                    return t;
                  }
                })
            );
          }

          sessionStorage.setItem("indeks_start", i);
        }}
        onClick={(node, e) => {
          setSelectedZamowienie({ ...row, i });
        }}
        onDoubleClick={(node, event) => {
          setShowTabs({
            parametry: true,
            koszty: false,
            historia: false,
            faktury: false,
            kreator: false,
          });

          setOpenModalInsert(true);
        }}
      >
        <Indeks i={i} row={row} />
        <FirmaNazwa row={row} />
        <Druk row={row} />
        <Falc row={row} />
        <Uv row={row} />
      </tr>
    </>
  );
}



const Indeks = ({ row,i }) => {
  return <td className={style.indeks}> {i+1} </td>;
};


const FirmaNazwa = ({ row }) => {
  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.utworzono}
      className={style.input_utworzono}
      value={row.firma_nazwa}
      readOnly

    />
    </td>
   
  );
}


const Maszyna = ({ row }) => {
  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.utworzono}
      className={style.input_utworzono}
      value={row.NazwaProesora}
      readOnly

    />
    </td>
   
  );
}


const Druk = ({ row }) => {


  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.utworzono}
      className={style.input_przeloty}
      value={parseInt(row.druk_przeloty).toLocaleString()}
      readOnly

    />
    </td>
   
  );
};


const Falc = ({ row }) => {


  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.utworzono}
      className={style.input_przeloty}
       value={parseInt(row.falc_przeloty).toLocaleString()}
      readOnly

    />
    </td>
   
  );
};

const Uv = ({ row }) => {


  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.utworzono}
      className={style.input_przeloty}
       value={parseInt(row.uszlachetnienie_przeloty).toLocaleString()}
      readOnly

    />
    </td>
   
  );
};




const Narzady = ({ row }) => {


  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.utworzono}
      className={style.input_utworzono}
      value={row.LiczbaWpisow}
      readOnly

    />
    </td>
   
  );
};
const Przeloty = ({ row }) => {


  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.utworzono}
      className={style.input_przeloty}
      value={parseInt(row.SumaZrealizowano).toLocaleString()}
      readOnly

    />
    </td>
   
  );
};

