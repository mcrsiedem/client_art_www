import React, { useState, useEffect, useRef, useContext } from "react";
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
import TABLE_ROW_PLIKI from "./TABLE_ROW_PLIKI";

export default function TABLE_ROW_ZAMOWIENIA({ row, open2, setRow }) {
  const techContext = useContext(TechnologyContext);
  const contextModalInsert = useContext(ModalInsertContext);
  const technology = techContext.technology; // technologie
  const setSelectedZamowienie = contextModalInsert.setSelectedZamowienie;
  const setShowMenuZamowienia = contextModalInsert.setShowMenuZamowienia;
  const [showKartaTechnologiczna, setShowKartaTechnologiczna] = useState(false);
  const contextApp = useContext(AppContext);
  
  const zamowienia = contextApp.zamowienia
  const setZamowienia = contextApp.setZamowienia
  const zamowieniaPliki = contextApp.zamowieniaPliki
  const [refreshZamowienia,odblokujZamowienie,deleteZamowienie] = useZamowienia();

  // const onMenuHandle = (event) =>{
  //   event.preventDefault();

  //   console.log(event)
  //   console.log(event.pageX)
  //   console.log(event.pageY)
  //   console.log(event.screenX)
  //   console.log(event.screenY)
  //   console.log(row.tytul)
  //   setZamowienia(
  //     zamowienia.map((t) => {
  //       if (t.id == row.id) {
  //         return { ...row, select: true };
  //       } else {
  //         return t;
  //       }
  //     })
  //   );
  //   setShowMenuZamowienia(true)
  // }

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
  }

  return (
    <>
      <tr
      onContextMenu={(event)=>{
    
         onMenuHandle2(event)
        }
       
        }
        title={"Zamówienie id: " + row.id + " utworzono: " + row.utworzono + " Zmodyfikowano: " +row.zmodyfikowano}
        className={row.select ? style.row_zamowienia_select: style.row_zamowienia}
        // className={ style.row_zamowienia}
        key={row.id}
        onMouseDown={(event) => {
          if (event.ctrlKey) {
            console.log("db");
          }
        }}
        onClick={(node, event) => {
          setSelectedZamowienie(row);

        }}
        onDoubleClick={(node, event) => {
          open2(row.id);
          setRow({ id: row.id, prime_id: row.prime_id }); // tutaj pobrać z row zestaw_id ale napierw dodać takie pole w zamowieniach
        }}
      >
        {/* <IconErrorTable row={row} /> */}
        <NrTableZamowienia row={row} />

        {/* <td>{row.rok} </td> */}
        <ShowTechnmologiaBtn
          row={row}
          setShowKartaTechnologiczna={setShowKartaTechnologiczna}
          showKartaTechnologiczna={showKartaTechnologiczna}
        />

        <KlientTableZamowienia row={row} />
        <PracaTableZamowienia row={row} />
     
        <NakladTableZamowienia row={row} />
        <td>{row.ilosc_stron}</td>
        <DataPrzyjeciaTableZamowienia row={row} />
        <SpedycjaTableZamowienia row={row} />
        <td>{row.format_x + "x" + row.format_y}</td>
        <OprawaTableZamowienia row={row} />
        <FirmaZamowieniaTable row={row} />
        <StanZamowieniaTable row={row} />
        <StatusZamowieniaTable row={row} />
        <EtapZamowieniaTable row={row} />
        <OpiekunZamowieniaTable row={row} />
           {/* <UwagiTableZamowienia row={row} /> */}
        <SelectBox row={row} />
        {/* <IconLockTable row={row} /> */}
        <td></td>
      </tr>

{row.show &&(

  <>
  {zamowieniaPliki.filter(x => x.zamowienie_id ==row.id).map(plikiRow=> (
  <TABLE_ROW_PLIKI plikiRow={plikiRow} row={row}/>
   )) }
      
    <tr >
    <td colSpan={18}>
      <div className={style.zamowienia_menu_row}>
      <button onClick={()=>{

      odblokujZamowienie([row])

          }}className={style.btn_zamowienia_menu_row_green} >Odblokuj</button>

        <button onClick={()=>{
              setZamowienia(
                zamowienia.map((t) => {
                  if (t.id == row.id) {
                    return { ...row, select: false,show:false};
                  } else {
                    return t;
                  }
                })
              );
          }}className={style.btn_zamowienia_menu_row} >Zamknij</button>


 {row.stan ==1 || row.stan==2 ? <button onClick={()=>{

deleteZamowienie([row])
        }}className={style.btn_zamowienia_menu_row_red} >Usuń</button>:<></>}
 
    
      </div>
          
    </td>


   </tr>
  </>


  
  

)}
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
  return <td> {row.naklad} </td>;
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
  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.data_spedycji}
      className={style.klientInput}
      value={row.data_spedycji}
      readOnly

    />
    </td>
   
  );
};
const DataPrzyjeciaTableZamowienia = ({ row }) => {
  return (
    <td>
       <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.data_przyjecia}
      className={style.klientInput}
      value={row.data_przyjecia}
      readOnly

    />
    </td>
   
  );
};

const PracaTableZamowienia = ({ row }) => {
  return (
    <td>
    <input
      //firma_nazwa to skrocona nazwa klienta
      title={row.Praca}
      className={style.tytulInput}
      value={row.tytul}
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
const IconErrorTable = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const daneTech = techContext.daneTech;
  if (row.status > 2) {
    return (
      <td style={{ width: "30px" }}>
        <img
          className={style.iconErrorTable}
          src={iconError}
          onClick={() => {}}
          alt="Procesy"
        />
      </td>
    );
  } else return <td></td>;
};
const IconLockTable = ({ row }) => {
  const techContext = useContext(TechnologyContext);
  const daneTech = techContext.daneTech;
  if (row.open_stan == 1) {
    return (
      <td style={{ width: "30px" }}>
        <img
          className={style.iconLockTable}
          src={iconLockRed}
          onClick={() => {}}
          alt="Procesy"
        />
      </td>
    );
  }
  return <td></td>;
};

function ShowTechnmologiaBtn({
  row,
  showKartaTechnologiczna,
  setShowKartaTechnologiczna,
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
        {DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1 ?  <img
            className={style.iconSettings}
            src={iconAdd}
            onClick={() => {
              techContext.setShowTechnologyStage(true);
              techContext.setRowZamowienia(row);
              techContext.fechparametry(row?.id);
              setShowProcesy(false)
            }}
            alt="Procesy"
          />:<></>}
         
        </div>
      </td>
    );
  } else {
    return (
      <td className={style.td_karta}>
        <div>

          {DecodeToken(sessionStorage.getItem("token")).technologia_zapis == 1 ? <img
            className={style.iconSettings}
            //  src={iconSettings}
            src={iconFile}
            onClick={() => {
             
                fechparametryTechnologii(row.id, row.technologia_id);
            
            }}
            alt="Procesy"
          /> :<></>

          }
         
        </div>
      </td>
    );
  }
}

function SelectBox({ row }) {
  const appContext = useContext(AppContext);
  const zamowienia = appContext.zamowienia;
  const setZamowienia = appContext.setZamowienia;

  return (
    <td className={style.td_checkbox3}>
      <div>
        <input
          type="checkbox"
          checked={row.select}
          onChange={(event) => {
            console.log(" select" + row.id + " " + event.target.checked);
            setZamowienia(
              zamowienia.map((t) => {
                if (t.id == row.id) {
                  return { ...row, select: event.target.checked };
                } else {
                  return t;
                }
              })
            );
          }}
        ></input>
      </div>
    </td>
  );
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

const MenuBtn = ({ showMenu, setShowMenu }) => {
  return (
    <img
      className={style.iconMenuBtn}
      src={iconSettings}
      onClick={() => {
        setShowMenu(!showMenu);
      }}
      alt="x"
    />
  );
};
