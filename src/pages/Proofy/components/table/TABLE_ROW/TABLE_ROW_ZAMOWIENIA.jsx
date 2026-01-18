import React, { useState, useContext } from "react";
import style from "./TABLE_ROW_ZAMOWIENIA.module.css";
import iconAdd from "assets/add2.svg";
import iconSettings from "assets/dots2.svg";
import iconFile from "assets/iconTechnologieDark.svg";
import iconError from "assets/error.svg";
import iconLockRed from "assets/lock2.svg";
import { AppContext } from "context/AppContext";
import { ModalInsertContext } from "context/ModalInsertContext";
import { TechnologyContext } from "context/TechnologyContext";
import {
  _etapy_produkcji,
  _stan_dokumentu,
  _status_dokumentu,
} from "utils/initialvalue";
import DecodeToken from "pages/Login/DecodeToken";
import { useZamowienia } from "hooks/useZamowienia";
import { sprawdzDostepZamowienia } from "actions/sprawdzDostepZamowienia";
import { useSortowanieZamowienia } from "hooks/useSortowanieZamowienia";
import Klient from "./Klient";
import Data from "./Data";
import Format from "./Format";
import Ilosc from "./Ilosc";
import Uwagi from "./Data copy";

export default function TABLE_ROW_ZAMOWIENIA({ row, open2, setRow,i }) {
  const techContext = useContext(TechnologyContext);
  const contextModalInsert = useContext(ModalInsertContext);
  const technology = techContext.technology; // technologie
  const fechparametryTechnologiiDetails = techContext.fechparametryTechnologiiDetails; // technologie
  const setSelectedZamowienie = contextModalInsert.setSelectedZamowienie;
  const [showKartaTechnologiczna, setShowKartaTechnologiczna] = useState(false);
  const contextApp = useContext(AppContext);
  
  const zamowienia = contextApp.zamowienia
  const setZamowienia = contextApp.setZamowienia
  const selectedUser= contextApp.selectedUser;
  const selectedKlient= contextApp.selectedKlient;
    const [sortWgEtapu] = useSortowanieZamowienia()

      const contextModal = useContext(ModalInsertContext);
  const setOpenModalInsert = contextModal.setOpenModalInsert;

  //  const contextModalInsert = useContext(ModalInsertContext);
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
    // tutaj pobrać procesy elementów z technologi
  }

  return (
    <>
      <tr
      onContextMenu={(event)=>{
    
        //  onMenuHandle2(event)
        }
       
        }
        title={"Zamówienie id: " + row.id + " utworzono: " + row.utworzono + " Zmodyfikowano: " +row.zmodyfikowano}
        className={row.select ? style.row_zamowienia_select: style.row_zamowienia}
        // className={ style.row_zamowienia}
        key={row.id}
        onMouseDown={(event) => {


          if (event.shiftKey) {
            let indeks_start = sessionStorage.getItem("indeks_start")
            let indeks_stop = i
                setZamowienia( zamowienia           .filter((zamowienie) => sprawdzDostepZamowienia(zamowienie))
                           .filter((zam) => {
                            if (selectedUser == 0) {
                              return true;
                            } else {
                             return  zam.opiekun_id == selectedUser;
                            }
                          })
                           .filter(z => z.stan ==3)
                           .filter((zam) => {
                            if (selectedKlient == 0) {
                              return true;
                            } else {
                             return  zam.klient_id == selectedKlient;
                            }
                          })
                          .filter((zamowienie) => sortWgEtapu({zamowienie}))
      .map(x => {return { ...x, select: false}})
      .map((t,indeks) => {
        if (indeks >= indeks_start && indeks<= indeks_stop ) {
          return { ...t, select: true};
        } else {
          return t;
        }
      })  );


          }else{


                                      setZamowienia(
      zamowienia
      .map(x => {return { ...x, select: false}})
      .map((t,indeks) => {
        if (t.id == row.id) {
          return { ...t, select: true};
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
      .map((t,indeks) => {
        if (t.id == row.id) {
          return { ...t, select: !t.select};
        } else {
          return t;
        }
      })
    );
         }


          sessionStorage.setItem("indeks_start",i)

          }




        }
        onClick={(node, e) => {
          setSelectedZamowienie({...row, i});






        }}
        onDoubleClick={(node, event) => {
       setShowTabs(   {parametry:true,koszty:false,historia:false,faktury:false,kreator: false})

setOpenModalInsert(true)
          // open2(row.id);
          // setRow({ id: row.id, prime_id: row.prime_id }); // tutaj pobrać z row zestaw_id ale napierw dodać takie pole w zamowieniach
        }}
      >
        {/* <IconErrorTable row={row} /> */}

        <Data row={row} />
        <Klient row={row} />
        <Format row={row} />
        <Ilosc row={row} />
        <Uwagi row={row} />
        <FirmaZamowieniaTable row={row} />

        <td></td>
      </tr>


      {showKartaTechnologiczna && (
        <>
          <tr>
            {technology
              ?.filter((x) => x.zamowienie_id == row.id)
              .map((l, i) => {
                return (
                  <tr draggable className={style.row5} key={l.id}>
                    <td className={style.input3}> fragment </td>
                  </tr>
                );
              })}
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <CreateTechnmologiaBtn row={row} />
            </td>
          </tr>
        </>
      )}
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
      className={style.nrInput}
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





const PracaTableZamowienia = ({ row,i }) => {
  return (
    <td>
    <input 
      //firma_nazwa to skrocona nazwa klienta
      title={row.Praca}
      className={style.tytulInput}
      value={DecodeToken(sessionStorage.getItem("token")).id==1 ? row.id +"   "+row.tytul : row.tytul}
      readOnly

    />
    </td>
  );
};






const StatuKosztow = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const appContext = useContext(AppContext);
  const daneTech = techContext.daneTech;
  const _status_koszty_dodatkowe = appContext._status_koszty_dodatkowe;

  
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
      className={selectColor(row.koszty_status) }
    >
      {_status_koszty_dodatkowe.filter((s) => s.id == row.koszty_status).map((x) => x.nazwa)}
    </td>
  );
};


const StatusFaktury = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const appContext = useContext(AppContext);
  const daneTech = techContext.daneTech;
  const _status_faktury = appContext._status_faktury;

  
  const selectColor = (status) =>{
    if (status==1) return style.td_status
    if (status==2) return style.td_status
    if (status==3) return style.td_status
    if (status==4) return style.td_status
    if (status==5) return style.td_status
    if (status==6) return style.td_status
    if (status==7) return style.td_status
     return style.td_status
  }
  return (
    <td
      className={selectColor(row.faktury_status) }
    >
      {_status_faktury.filter((s) => s.id == row.faktury_status).map((x) => x.nazwa)}
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

const NumerFaktury = ({ row }) => {
  const appContext = useContext(AppContext);
  const _firma = appContext._firma;
  return (
    <td>
    <input
      title={row.lista_faktur}
      className={style.tytulfaktura}
      value={row.lista_faktur}
      readOnly

    />
    </td>
  );
};

const NumerWZ = ({ row }) => {
  const appContext = useContext(AppContext);
  const _firma = appContext._firma;
  return (
    <td>
    <input
      title={row.lista_wz}
      className={style.tytulfaktura}
      value={row.lista_wz}
      readOnly

    />
    </td>
  );
};




function ShowTechnmologiaBtn({
  row
}) {
  const techContext = useContext(TechnologyContext);

  const fechparametryTechnologii = techContext.fechparametryTechnologii;
 
    const setShowProcesy = techContext.setShowProcesy;
  if (row.open_stan==1 ) {
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

  if (row.technologia_id == null ) {
    return (
      <td className={style.td_karta}>
        <div>
       <img
            className={style.iconSettings}
            src={iconAdd}
            onClick={() => {
            if(  DecodeToken(sessionStorage.getItem("token")).technologie_wszystkie == 1 ){
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
               if(  DecodeToken(sessionStorage.getItem("token")).technologie_wszystkie == 1 ){
                     techContext.fechparametry(row?.id);
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


function CreateTechnmologiaBtn({ row }) {
  const techContext = useContext(TechnologyContext);
  const updateDane = techContext.updateDane;
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <button
        className={style.btn_dodaj_karte}
        onClick={() => {
          techContext.setShowTechnologyStage(true);
          techContext.setRowZamowienia(row);
          techContext.fechparametry(row?.id);

          // techContext.setOpenTechnologia(true)
        }}
      >
        Dodaj kartę{" "}
      </button>
    </div>
  );
}

