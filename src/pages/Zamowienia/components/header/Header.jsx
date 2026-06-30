import React, { useState, useEffect, useRef,useContext } from "react";
import style from "./Header.module.css";
import iconClose2 from "assets/x2.svg";
import iconAdd from "assets/addIcon2.svg";
import iconAdd2 from "assets/edit3.svg";
import iconCopy from "assets/edit2.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "context/AppContext";
import REFRESH_ZAMOWIENIA_BTN from "components/REFRESH_BTN/REFRESH_ZAMOWIENIA_BTN";
import DecodeToken from "pages/Login/DecodeToken";
// import { _etapy_produkcji } from "utils/initialvalue";
import BTN_INFO_ZAMOWIENIA from "./BTN_INFO_ZAMOWIENIA";
import { ModalInsertContext } from "context/ModalInsertContext";
import { zabezpiecz } from "actions/zabezpiecz";
import Szukaj from "./Szukaj";
import BTN_DIAGNOSTYKA from "./BTN_INSPEKCJA";
import BTN_INSPEKCJA from "./BTN_INSPEKCJA";
import { useZamowienia } from "hooks/useZamowienia";
import { _etapy_produkcji, _stan_dokumentu, _status_dokumentu, _waluta, initialDane } from "utils/initialvalue";

import { 
  Settings, 
  Columns2,
  FileText, 
  ChevronDown, 
  ChevronUp,
  X,
  Search,
  Filter,
  BetweenVerticalStart,
  StretchVertical,
  KeySquare,
  Menu,
  EllipsisVertical,
  SearchAlert,
  SearchIcon,
  Calendar,
  Calendar1,
  Calendar1Icon,
  CalendarCheck
} from "lucide-react";
import BTN_KOPIUJ_NEW from "./BTN_KOPIUJ";
import MenuHeaderZamowienia from "./menu_header_zamowienia/MenuHeaderZamowienia";
import { ZamowienieContext } from "context/ZamowieniaContext";

export default function Header({ dodaj_clikHandler,showSettings, setShowSettings,visibleColumns, setVisibleColumns,allColumns}) {
  const navigate = useNavigate();
  const effectRan = useRef(false);

  const contextApp = useContext(AppContext);
  const contexModal = useContext(ModalInsertContext);
  const setSelectedZamowienie = contexModal.setSelectedZamowienie;
  const contextModalInsert = useContext(ModalInsertContext);
  const {pagination,widok} = useContext(ZamowienieContext);
  const setShowTabs = contextModalInsert.setShowTabs
  const daneZamowienia = contextModalInsert.daneZamowienia
  const setDaneZamowienia = contextModalInsert.setDaneZamowienia
  const harmonogramRef = contextModalInsert.harmonogramRef
  const [showMenu, setShowMenu] = useState(false); // Stan do kontrolowania widoczności menu
const {setShowWyszukiwarka,showWyszukiwarka} = useContext(ZamowienieContext);




    const showLog = () => {
      console.log("--------")
      console.log("contextApp.sortowanieZamowienia.current : "+contextApp.sortowanieZamowienia.current)
      // console.log("contextApp.zestawZamowienia.current: "+contextApp.zestawZamowienia.current)
      // console.log("DecodeToken ",DecodeToken(sessionStorage.getItem("token")))
      // console.table(contextApp.zamowienia)
      console.table(pagination)
      console.table(widok)
    }

  return (
    <header onDoubleClick={()=>{  showLog()}} id="header" className={style.headerZamowieniaContainer}>
      <div className={style.leftHeaderContener}>
          <MenuHeaderZamowienia showMenu={showMenu} setShowMenu ={setShowMenu}/>
              
            <button onClick={()=>{setShowMenu(!showMenu) }} style={{background:'transparent', border:'none'}}> 
            < Menu size={22} style={{color:'yellowgreen',marginRight:'15px',marginLeft:'0px'}}/>
              </button>
              {/* <REFRESH_ZAMOWIENIA_BTN/> */}
              <p title={contextApp.zamowienia.filter((zam) => zam.stan==3).length+ " przyjętych"} className={style.title2}>Zamówienia </p>
          <SELECT_KLIENT_ZAMOWWIENIA />
          <SELECT_OPIEKUN_ZAMOWWIENIA />
      </div>

      <div className={style.centerHeaderContener}>
        {DecodeToken(sessionStorage.getItem("token")).zamowienie_zapis == 1 ?         <img
          title="Dodaj nowe zamówienie..."
          className={style.icon}
          src={iconAdd2}
          onClick={() => {
            setShowTabs( {parametry:false,koszty:false,historia:false,faktury:false,kreator: true})
            setSelectedZamowienie({id:1})
            dodaj_clikHandler();
            harmonogramRef.current = false

            // setDaneZamowienia({...daneZamowienia, etap:2})

          }}
          alt="React Logo"
        /> : <></>}


        {DecodeToken(sessionStorage.getItem("token")).zamowienie_zapis == 1 ?               <button 
          title="Dodaj do harmonogramu"
          style={{background:'transparent', border:'none', marginRight:'10px'}}
          onClick={() => {
                       setShowTabs( {parametry:false,koszty:false,historia:false,faktury:false,kreator: true})
            setSelectedZamowienie({id:1})
            dodaj_clikHandler();
            harmonogramRef.current = true
            // setDaneZamowienia({...initialDane, etap:1})

          
          }}
          >
          <CalendarCheck style={{color:'#95c912d4'}} size={27} />
      </button> : <></>}




      </div>
      <div className={style.rightHeaderContener}>


      <button 
          title="Pokaż kolumny"
          style={{background:'transparent', border:'none', marginRight:'10px'}}
          onClick={() => setShowSettings(!showSettings)}
          >
          <BetweenVerticalStart style={{color:'#95c912d4'}} size={25} />
      </button>



        <BTN_INSPEKCJA/>
        <BTN_INFO_ZAMOWIENIA/>
        {/* <BTN_KOPIUJ/> */}
        <BTN_KOPIUJ_NEW visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} allColumns={allColumns}/>
          
 

        <SORTOWANIE_ZAMOWIENIA_ETAP/>
        {/* <Szukaj/> */}
               <button onClick={()=>{setShowWyszukiwarka(true)}} style={{background:'transparent', border:'none'}}> 
            < SearchIcon size={22} style={{color:'yellowgreen',marginRight:'15px',marginLeft:'5px'}}/>
          </button>
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

  // stare do skasowania
  // const klienciEdit = JSON.parse(JSON.stringify(setClients));
  return (
<img
          title="Skopiuj zaznaczone..."
          className={style.icon}
          src={iconCopy}
          onClick={() => {
  
let mes='';


            for( let grupa of zamowienia.filter(x=> x.select == true)){
            // for( let grupa of zamowienia){
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




function SORTOWANIE_ZAMOWIENIA_ETAP() {
  const contextApp = useContext(AppContext);
  const sortowanieZamowieniaEtap= contextApp.sortowanieZamowieniaEtap;
  const setSortowanieZamowieniaEtap= contextApp.setSortowanieZamowieniaEtap;
  const zestawZamowienia= contextApp.zestawZamowienia;
  const setIsLoading= contextApp.setIsLoading;

  const navigate = useNavigate();
        const {updatePagination,updateWidok,setShowWyszukiwarka} = useContext(ZamowienieContext);

  
    return (
  
        <select
          className={sortowanieZamowieniaEtap ==2 ? style.szukajInputSortBlue :style.szukajInputSort}
          value={sortowanieZamowieniaEtap}
          onChange={(event) => {
                      if(event.target.value=="Znajdz zamówienie"){
            setSortowanieZamowieniaEtap(event.target.value)
            setShowWyszukiwarka(true)
 return

            }

            if(event.target.value=="Proofy"){
      navigate("/proofy");

            }
            else{
                    const promiseA = new Promise((resolve, reject) => {
            setIsLoading(true)
            setSortowanieZamowieniaEtap(event.target.value)
            zestawZamowienia.current= event.target.value
              updateWidok({widok: event.target.value})
            
  
                      resolve(777);
                    })

                            promiseA.then(res => {

      
     
        })
            }
    





          }}
        >
          {contextApp._sortowanieZamowienieEtap.map((option) => (
            <option key={option.id} value={option.nazwa}>
            {option.nazwa}
            </option>
          ))}
        </select>
    );
  }



  function SELECT_KLIENT_ZAMOWWIENIA() {
  const contextApp = useContext(AppContext);
  const selectedKlient = contextApp.selectedKlient;
  const setSelectedKlient = contextApp.setSelectedKlient;
  const selectedUser = contextApp.selectedUser;
  const {refreshZamowieniaProofy} = useZamowienia()
    const {updatePagination,updateWidok} = useContext(ZamowienieContext);


    return (
      <select
        className={style.szukajInputSort}
        value={selectedKlient}
        onChange={(event) => {
          setSelectedKlient(event.target.value);
          updateWidok({klientId:event.target.value})

        
        }}
      >
        {<option value="0">Wszyscy klienci</option>}

        {contextApp.clients?.filter(kl=>  {
          if(selectedUser==0){return true} else {return  kl.opiekun_id == selectedUser}
        }
         )
         .sort((a, b) => {
    // Sortowanie alfabetyczne po 'firma_nazwa'
    // Używamy localeCompare, aby poprawnie obsługiwać polskie znaki (ą, ć, ę, itd.)
    const nazwaA = a.firma_nazwa || "";
    const nazwaB = b.firma_nazwa || "";
    
    return nazwaA.localeCompare(nazwaB, 'pl', { sensitivity: 'base' });
  })
        .map((option) => (
          <option key={option.id} value={option.id}>
            {option.firma_nazwa} 
          </option>
        ))}
      </select>
    );
}


function SELECT_OPIEKUN_ZAMOWWIENIA() {
  const contextApp = useContext(AppContext);
  const selectedUser = contextApp.selectedUser;
  const setSelectedUser = contextApp.setSelectedUser;
  const setSelectedKlient = contextApp.setSelectedKlient;
        const {updatePagination,updateWidok} = useContext(ZamowienieContext);


  if (DecodeToken(sessionStorage.getItem("token")).zamowienia_wszystkie == 1) {
    return (
      <select
        className={style.szukajInputSort}
        value={selectedUser}
        onChange={(event) => {
          setSelectedUser(event.target.value);
          //    setSelectedKlient(0)

             updateWidok({opiekunId:event.target.value})

        }}
      >
        {<option value="0">Opiekun</option>}

        {contextApp.users?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.Imie} {option.Nazwisko}
          </option>
        ))}
      </select>
    );
  }else{
    return  <th className={style.col_firma}>Opiekun</th>
  }
}