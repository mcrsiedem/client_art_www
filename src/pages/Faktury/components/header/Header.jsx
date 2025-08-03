import React, {  useEffect, useRef,useContext } from "react";
import style from "./Header.module.css";
import iconClose2 from "assets/x2.svg";
import iconCopy from "assets/edit2.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import REFRESH_ZAMOWIENIA_BTN from "components/REFRESH_BTN/REFRESH_ZAMOWIENIA_BTN";
import { _etapy_produkcji } from "utils/initialvalue";

export default function Header() {
  const navigate = useNavigate();
  const effectRan = useRef(false);

   const contextApp = useContext(AppContext);

  useEffect(() => {
    if (effectRan.current === true) {
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <header onDoubleClick={()=>{  
     }} id="header" className={style.headerZamowieniaContainer}>
      <div className={style.leftHeaderContener}>
        <REFRESH_ZAMOWIENIA_BTN/>
        <p title={contextApp.zamowienia.filter((zam) => zam.stan==3).length+ " przyjętych"} className={style.title2}>Faktury </p>
      </div>

      <div className={style.centerHeaderContener}>







               


      </div>
      <div className={style.rightHeaderContener}>
        <BTN_KOPIUJ/>
        <SORTOWANIE_ZAMOWIENIA_ETAP/>
        <Szukaj/>
        <img
          className={style.icon2}
          src={iconClose2}
          onClick={() => {
            navigate("/Panel");
          }}
          alt="React Logo"
        />
      </div>
    </header>
  );
}



function BTN_KOPIUJ() {
  const contextApp = useContext(AppContext);
  const zamowienia = contextApp.zamowienia;
  const setZamowienia = contextApp.setZamowienia;
  return (
<img
          title="Skopiuj zaznaczone..."
          className={style.icon}
          src={iconCopy}
          onClick={() => {
  
let mes='';


            for( let grupa of zamowienia.filter(x=> x.select == true)){
              mes += grupa.nr+"\t"
              mes +=  grupa.stary_nr || " "+"\t"
              mes += grupa.klient+"\t"
              mes += grupa.tytul+"\t"
              mes += grupa.naklad+"\t"
              mes += grupa.ilosc_stron+"\t"
              mes += grupa.data_przyjecia+"\t"
              mes += grupa.data_spedycji+"\t"
              mes += grupa.format_x+"x"+grupa.format_y+"\t"
              mes += grupa.oprawa+"\t"
              mes += _etapy_produkcji.filter((s) => s.id == grupa.etap).map((x) => x.nazwa)+"\t"
              mes += grupa.opiekun+"\t"
              // mes += grupa.przeloty+ " ark. \t"
              mes += "\n"

            }

            setZamowienia(
              zamowienia.map((t) => {
                  return { ...t, select: false};
              })
            );

            navigator.clipboard.writeText(mes);





          }}
          alt="React Logo"
        /> 
  );
}
function Szukaj() {
  const contextApp = useContext(AppContext);
  const zamowieniaWyszukiwarka = contextApp.zamowieniaWyszukiwarka;
  const setZamowienia = contextApp.setZamowienia;
  // const klienciEdit = JSON.parse(JSON.stringify(setClients));
  return (
    <input
      className={style.szukajInput}
      type="text"
      title="Znajdź tytuł pracy..."
      placeholder="Praca..."
      onChange={(event) => {

        let m = [...zamowieniaWyszukiwarka];
           m =  m.filter((k) =>
            // k.tytul.toLowerCase().includes(event.target.value.toLowerCase()) 
            k.tytul.concat(" ", k.nr ).concat(" ", k.nr_stary ).concat(" ", k.lista_faktur ).concat(" ", k.lista_wz ).toLowerCase().includes(event.target.value.toLowerCase()) 
          )

        setZamowienia(
         m
        );


      }}
    ></input>
  );
}


function SORTOWANIE_ZAMOWIENIA_ETAP() {
  const contextApp = useContext(AppContext);
  const sortowanieZamowieniaEtap= contextApp.sortowanieZamowieniaEtap;
  const setSortowanieZamowieniaFaktury= contextApp.setSortowanieZamowieniaFaktury;
  const sortowanieZamowieniaFaktury= contextApp.sortowanieZamowieniaFaktury;
  const _sortowanieZamowienieFaktury= contextApp._sortowanieZamowienieFaktury;
  
    return (
  
        <select
          className={sortowanieZamowieniaEtap ==2 ? style.szukajInputSortBlue :style.szukajInputSort}
          value={sortowanieZamowieniaFaktury}
          onChange={(event) => {
            // setSortowanieZamowieniaEtap(event.target.value)
            setSortowanieZamowieniaFaktury(event.target.value)
          }}
        >
          {contextApp._sortowanieZamowienieFaktury.map((option) => (
            <option key={option.id} value={option.id}>
            {option.nazwa}
            </option>
          ))}
        </select>
    );
  }



