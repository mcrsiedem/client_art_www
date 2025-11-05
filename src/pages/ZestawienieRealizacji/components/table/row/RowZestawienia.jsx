import React, { useState, useEffect, useRef, useContext } from "react";
import style from "./RowZestawienia.module.css";
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


export default function RowZestawienia({ row, open2, setRow,i }) {
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

  const onMenuHandle2 = (event) =>{
    event.preventDefault();
    setZamowienia(
      zamowienia
      .map(x => {return { ...x, select: false, show:false}})
      .map((t) => {
        if (t.id == row.id) {
          return { ...row, select: true,show:true};
        } else {
          return t;
        }
      })
    );

    if(row.technologia_id != null ){
      fechparametryTechnologiiDetails(row.id,row.technologia_id)
    }else{
      techContext.setProcesyElementowTech([])
    }

  }

  return (
    <>
      <tr
        onContextMenu={(event) => {
          onMenuHandle2(event);
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
          if (event.shiftKey) {
            let indeks_start = sessionStorage.getItem("indeks_start");
            let indeks_stop = i;
            setZamowienia(
              zamowienia
                .filter((zamowienie) => sprawdzDostepZamowienia(zamowienie))
                .filter((zam) => {
                  if (selectedUser == 0) {
                    return true;
                  } else {
                    return zam.opiekun_id == selectedUser;
                  }
                })
                .filter((z) => z.stan == 3)
                .filter((zam) => {
                  if (selectedKlient == 0) {
                    return true;
                  } else {
                    return zam.klient_id == selectedKlient;
                  }
                })
                .filter((zamowienie) => sortWgEtapu({ zamowienie }))
                .map((x) => {
                  return { ...x, select: false };
                })
                .map((t, indeks) => {
                  if (indeks >= indeks_start && indeks <= indeks_stop) {
                    return { ...t, select: true };
                  } else {
                    return t;
                  }
                })
            );
          } else {
            setZamowienia(
              zamowienia
                .map((x) => {
                  return { ...x, select: false };
                })
                .map((t, indeks) => {
                  if (t.id == row.id) {
                    return { ...t, select: true };
                  } else {
                    return t;
                  }
                })
            );
          }

          if (event.ctrlKey) {
            setZamowienia(
              zamowienia
                // .map(x => {return { ...x, select: false}})
                .map((t, indeks) => {
                  if (t.id == row.id) {
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
        <DataPrzyjeciaTableZamowienia row={row} />
        <NrTableZamowienia row={row} />
        <KlientTableZamowienia row={row} />
        <PracaTableZamowienia row={row} i={i} />
        <NakladTableZamowienia row={row} />
        <SpedycjaTableZamowienia row={row} />
        <td>{row.format_x + "x" + row.format_y}</td>
      
        <OpiekunZamowieniaTable row={row} />
        <td></td>
      </tr>


    </>
  );
}

const OprawaTableZamowienia = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const contextApp = useContext(AppContext);

  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.oprawa}
      className={style.klientInput}
      value={row.oprawa}
      readOnly
    />
    </td>
   
  );
};

const NrTableZamowienia = ({ row }) => {
  if(row.nr != null){
    return (
    <td>
       <input
       disabled
      
      title={row.nr}
      className={style.input_nr}
      value={row.nr+" / "+row.rok.substring(2,4)}
      readOnly

    />
    </td>
   
  );
  }else{
    return(
          <td>
       <input
       disabled
      
      title={row.nr}
      className={style.nrInput}
      value={""}
      readOnly

    />
    </td>
    )
  }
  
};

const NakladTableZamowienia = ({ row }) => {
  return <td className={style.nakladInput}> {row.naklad.toLocaleString()} </td>;
};

const KlientTableZamowienia = ({ row }) => {
  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.klient}
      className={style.klientInput}
      value={row.firma_nazwa}
      readOnly

    />
    </td>
   
  );
};

const SpedycjaTableZamowienia = ({ row }) => {

    function isWeekend(dateString) {

  const date = new Date(dateString);

  // Metoda getDay() zwraca dzień tygodnia, gdzie:
  // 0 = Niedziela
  // 1 = Poniedziałek
  // ...
  // 5 = Piątek
  // 6 = Sobota
  const dayOfWeek = date.getDay();

  // Sprawdzamy, czy dzień tygodnia to sobota (6) lub niedziela (0).
  return dayOfWeek === 0 || dayOfWeek === 6;
  }

function getPolishDayName(dateString) {
  const date = new Date(dateString);
  
  // Tablica z polskimi nazwami dni tygodnia, gdzie indeks 0 to Niedziela (jak zwraca getDay()).
  const polishDays = [
    'Niedziela', // 0
    'Poniedziałek', // 1
    'Wtorek', // 2
    'Środa', // 3
    'Czwartek', // 4
    'Piątek', // 5
    'Sobota' // 6
  ];
  
  // getDay() zwraca liczbę (0-6), którą wykorzystujemy jako indeks tablicy.
  const dayIndex = date.getDay();
  
  return polishDays[dayIndex];
}


  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={getPolishDayName(row.data_spedycji)}
      className={isWeekend(row.data_spedycji)? style.spedycjaInput_red:style.spedycjaInput}
      value={row.data_spedycji}
      readOnly

    />
    </td>
   
  );
};
const DataPrzyjeciaTableZamowienia = ({ row }) => {

  function isWeekend(dateString) {
  // Tworzy obiekt Date. Konstruktor w formacie 'YYYY-MM-DD'
  // działa niezawodnie i interpretuje datę jako lokalną.
  const date = new Date(dateString);

  // Metoda getDay() zwraca dzień tygodnia, gdzie:
  // 0 = Niedziela
  // 1 = Poniedziałek
  // ...
  // 5 = Piątek
  // 6 = Sobota
  const dayOfWeek = date.getDay();

  // Sprawdzamy, czy dzień tygodnia to sobota (6) lub niedziela (0).
  return dayOfWeek === 0 || dayOfWeek === 6;
  }

  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.utworzono}
      className={style.input_utworzono}
      value={row.utworzono}
      readOnly

    />
    </td>
   
  );
};

const PracaTableZamowienia = ({ row,i }) => {

    const sprawdzKoszty = (row) => {
      if (row.etap == 16 && row.koszty_status == 1 && row.faktury_status != 3 && row.opiekun_id == DecodeToken(sessionStorage.getItem("token")).id) {
        return false;
      }
        return true;

    };


  return (
    <td>
    <input 
      //firma_nazwa to skrocona nazwa klienta
      title={sprawdzKoszty(row) ? row.Praca: "Praca oddana. Brak zamkniętych kosztów dodatkowych."}
      // className={style.tytulInput_alert}
      className={sprawdzKoszty(row) ? style.tytulInput : style.tytulInput_alert}
      // value={DecodeToken(sessionStorage.getItem("token")).id==1 ? row.id +"   "+row.tytul : row.tytul}
      value={ row.tytul}
      readOnly

    />
    </td>
  );


};

const UwagiTableZamowienia = ({ row }) => {
  return (
    <td>
    <input
      title={row.uwagi}
      className={style.tytulInput}
      value={row.uwagi}
      readOnly

    />
    </td>
  );
};

const StatusZamowieniaTable = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const daneTech = techContext.daneTech;
  const selectColor = (status) =>{
    if (status==1) return style.td_status
    if (status==2) return style.td_status
    if (status==3) return style.td_status_red
    if (status==4) return style.td_status_red
    if (status==5) return style.td_status
    if (status==6) return style.td_status_red
    if (status==7) return style.td_status_red
     return style.td_status
  }
  return (
    <td
      className={selectColor(row.status) }
    >
      {_status_dokumentu.filter((s) => s.id == row.status).map((x) => x.nazwa)}
    </td>
  );
};

const StanZamowieniaTable = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const daneTech = techContext.daneTech;
  const selectColor = (stan) =>{
    if (stan==1) return style.td_stan_blue
    if (stan==2) return style.td_stan_yellow
    if (stan==3) return style.td_stan
     return style.td_stan
  }

  return (
    <td
    className={selectColor(row.stan) }
      // className={row.stan == 2 ? style.td_stan_yellow :style.td_stan}
      >
    <input
      title={row.klient}
      className={style.inputStan}
      value={_stan_dokumentu.filter((s) => s.id == row.stan).map((x) => x.nazwa)}
      readOnly

    />
    </td>
  );
};

const EtapZamowieniaTable = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const daneTech = techContext.daneTech;
  // return(  <td>{row.stan}</td>
  return (
    <td>
    <input
      title={row.klient}
      className={style.tytulEtap}
      value={_etapy_produkcji.filter((s) => s.id == row.etap).map((x) => x.nazwa)}
      readOnly

    />
    </td>
  );
};




const OpiekunZamowieniaTable = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const daneTech = techContext.daneTech;
  return (
    <td>
    <input
      title={row.klient}
      className={style.tytulEtap}
      value={row.opiekun}
      readOnly

    />
    </td>
  );
};

const FirmaZamowieniaTable = ({ row }) => {
  const appContext = useContext(AppContext);
  const _firma = appContext._firma;
  return (
    <td>
    <input
      title={row.klient}
      className={style.tytulfirma}
      value={_firma.filter((s) => s.id == row.firma_id).map((x) => x.nazwa_skrocona)}
      readOnly

    />
    </td>
  );
};


function ShowTechnmologiaBtn({
  row,
  showKartaTechnologiczna,
  setShowKartaTechnologiczna,
}) {
  const techContext = useContext(TechnologyContext);
  const fechparametryTechnologii = techContext.fechparametryTechnologii;
  const setShowProcesy = techContext.setShowProcesy;
  if ( row.open_stan==1  ) {
  if (row.open_user_id != DecodeToken(sessionStorage.getItem("token")).id ) {

    return (
      <td className={style.td_karta}>
        <div>
         <img
            className={style.iconSettings}
            src={iconLockRed}
            alt="Procesy"
          />
         
        </div>
      </td>
    );


  }
  }

  if (row.technologia_id == null ) {
    return (
      <td className={style.td_karta}>
        <div>
      <img
            className={style.iconSettings}
            src={iconAdd}
            onClick={() => {
              if(DecodeToken(sessionStorage.getItem("token")).technologie_wszystkie == 1){
              techContext.fechparametry(row?.id);
              // techContext.setShowTechnologyStage(true);
              techContext.setRowZamowienia(row);
              setShowProcesy(false)
              }
        
            }}
            alt="Procesy"
          />
         
        </div>
      </td>
    );
  } else {
    return (
      <td className={style.td_karta}>
        <div>

       <img
            className={style.iconSettings}
            //  src={iconSettings}
            src={iconFile}
            onClick={() => {
                           if(DecodeToken(sessionStorage.getItem("token")).technologie_wszystkie == 1){
                                            fechparametryTechnologii(row.id, row.technologia_id);
                           }

            
            }}
            alt="Procesy"
          /> 
         
        </div>
      </td>
    );
  }
}

