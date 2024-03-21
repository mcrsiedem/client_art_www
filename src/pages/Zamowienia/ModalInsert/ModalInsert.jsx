import style from "./ModalInsert.module.css";
import React, { useEffect, useState, useContext,useRef,useCallback } from "react";
import { useCookies } from "react-cookie";
import HeaderModal from "./Header/HeaderModal";
import Dane from "./Dane/Dane";
import ProduktTemplate from "./ProduktTempalate/ProduktTemplate";


import {
  _firma,
  _klient,
  initialElementy,
  _papiery,
  initialFragmenty,
  _uszlachetnienia,
  initialProcesy,
  _opiekun,
  _status,
  _stan,
  _typ_produktu,
  _rodzaj_oprawy,
} from "./api";
import Pakowanie from "./Pakowanie/Pakowanie";

import axios from "axios";
import { IP } from "../../../utils/Host";
import Elementy from "./Elementy/Elementy";
import Introligatornia from "./Introligatornia/Introligatornia";
import ProcesElement from "./Elementy/ElementyProcesInsert/ProcesElement";
import DecodeToken from "../../Login/DecodeToken";
import Produkty from "./Produkty/Produkty";
import Stany from "./Stany";
import { saveOrder } from "../../../actions/saveOrder";
import SaveAs from "./SaveAs/SaveAs";
import { today } from "../../../actions/today";
import ClientStage from "../../../components/Klienci/ClientStage";
import ReadOnlyAlert from "./ReadOnlyAlert/ReadOnlyAlert";

import { ModalInsertContext } from "context/ModalInsertContext";
import { PreOrderContext } from "context/PreOrderContext";

function ModalInsert({
  openModalInsert,
  setOpenModalInsert,
  user,
  setUser,
  listaPapierow,
  setListPapierow,
  listaGramatur,
  setListaGramatur,
  open,
  // setOpen,
  row,
  refreshZamowienia
}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const contextPreOrder = useContext(PreOrderContext);

  const showElementyProcesyInsert= contextModalInsert.showElementyProcesyInsert;
  const [isShowAddClientStage, showAddClientStage] = useState(false);
  // const [isSaveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [stanOtwarciaZamowienia, setStanOtwarciaZamowienia] = useState({});
  const [readOnly,setReadOnly] = useState(false);
  const [readAlert,setReadAlert] = useState(false);
  const [cookies, setCookie] = useCookies();
  // const [nroprawy, setNroprawy] = useState();
  // const [uszlachetnienia, setUszlachetnienia] = useState();
  const [selected_papier, setSelected_papier] = useState(_papiery[0].nazwa);
  // const [idZamowienie, setIdZamowienia] = useState();
  const [info, setInfo] = useState("napis");
  // const [listaWykonczenia, setListaWykonczenia] = useState();
  const [listaUszlachetnien, setListaUszlachetnien] = useState();
  const [listaDostepnychProcesow, setListaDostepnychProcesow] = useState();
  const [procesyElementow, setProcesyElementow] = useState(initialProcesy);
  // const [selected_wykonczenie, setSelected_wykonczenie] = useState();
  // const [isEdit, setIsEdit] = useState(false);
  const [isOK, setIsOK] = useState(false);
  const [showParametryZamowienia, setShowParametryZamowienia] = useState(false);
  const [showTemplate, setShowTemplate] = useState(true);
  const [showSaveAs, setShowSaveAs] = useState(false);
  const [saveAs, setSaveAs] = useState(false);
 
const [check_data_wejscia, setCheck_data_wejscia] = useState(false);
const [openModalStany, setOpenModalStany] = useState(false);
const [klienci, setKlienci] = useState([]);
 const [klienciWyszukiwarka, setKlienciWyszukiwarka] = useState([]);


const daneZamowienia = contextPreOrder.daneZamowienia;
const setDaneZamowienia= contextPreOrder.setDaneZamowienia;

const produkty = contextModalInsert.produkty;
const setProdukty = contextModalInsert.setProdukty;

const elementy = contextModalInsert.elementy;
const setElementy = contextModalInsert.setElementy;

const fragmenty = contextModalInsert.fragmenty;
const setFragmenty = contextModalInsert.setFragmenty;

const oprawa = contextModalInsert.oprawa;
const setOprawa = contextModalInsert.setOprawa;

const pakowanie = contextModalInsert.pakowanie;
const setPakowanie = contextModalInsert.setPakowanie;
// const contextModalInsert = useContext(ModalInsertContext);
// const produkty = contextModalInsert.produkty;





async function getClients() {
  const res = await axios.get(IP + "lista-klientow");
   setKlienci([...res.data]);  
   setKlienciWyszukiwarka([...res.data]);

}

  async function fechListy() {
    const res2 = await axios.get(IP + "lista-uszlachetnien");
    setListaUszlachetnien([...res2.data]);

    const res5 = await axios.get(IP + "lista-procesow");
    setListaDostepnychProcesow([...res5.data]);
    getClients()

  }


  useEffect(() => {
    fechListy();

    if (open.current) {
      setShowParametryZamowienia(true);
      setShowTemplate(false);
      open.current = false;
      fechparametry(row.id);
    }


  }, []);



  useEffect(() => {
    getClients()
}, [isShowAddClientStage]);





  async function fechparametry(idZamowienia,setSaveButtonDisabled) {

          // sprawdza czy zamowienie jest już otwarte, jeśli tak to zwraca error i otwiera zamowienie tylko do odczytu
          // jeśli sprawdzane zamówienie nie jest aktualnie otwarte, zmienia open_stan na 1, czyli blokuje do normalnego otwarcia
          await axios
          .put(IP + "setOrderOpen", {
            id: idZamowienia,
            token: sessionStorage.getItem("token"),
            user: DecodeToken(sessionStorage.getItem("token")).id,
          })
          .then((res) => {

              if(res.data.stan == "error"){
              setSaveButtonDisabled(true)

               setReadOnly(true)   // zmien parametr
               setReadAlert(true) //pokaż okno alert read only
    
              }else{
                
              }

            
              setStanOtwarciaZamowienia({
                stan: res.data.stan,
                user: res.data.user,
                data: res.data.data
              })

          });


           const res = await axios.get(IP + "parametry/"+idZamowienia);

           setDaneZamowienia(res.data[0][0])
           setProdukty(res.data[1])
           setElementy(res.data[2])
           setFragmenty(res.data[3])
           setOprawa(res.data[4])
           setPakowanie(res.data[5].sort((a, b) => a.indeks - b.indeks))
        

  }

  return (
    <div className={style.container}>
      <HeaderModal
        openModalInsert={openModalInsert}
        setOpenModalInsert={setOpenModalInsert}
        postZamowienieObj={postZamowienieObj}
        info={info}
        setInfo={setInfo}
        isOK={isOK}
        setIsOK={setIsOK}
        sprawdzPoprawnoscZamowienia={sprawdzPoprawnoscZamowienia}
        check_data_wejscia={check_data_wejscia}
        openModalStany={openModalStany}
        setOpenModalStany={setOpenModalStany}
        setShowSaveAs={setShowSaveAs}
        saveAs={saveAs}
        setSaveAs={setSaveAs}
        stanOtwarciaZamowienia={stanOtwarciaZamowienia}
        row={row}
        readAlert={readAlert}
        setReadAlert={setReadAlert}
        readOnly={readOnly}
        setReadOnly={setReadOnly}
      />

      <Dane
      klienci={klienci}
        showAddClientStage={showAddClientStage}
      />

      <div className={style.main}>
        {showParametryZamowienia && (
          <div>
            <Produkty
              handleChangeCardProdukty={handleChangeCardProdukty}
              _typ_produktu={_typ_produktu}
            />

            <Elementy
              handleChangeCardElementy={handleChangeCardElementy}
              handleChangeCardFragmenty={handleChangeCardFragmenty}
              selected_papier={selected_papier}
              setSelected_papier={setSelected_papier}
              info={info}
              setInfo={setInfo}
              listaPapierow={listaPapierow}
              listaGramatur={listaGramatur}
              listaUszlachetnien={listaUszlachetnien}
              setListaUszlachetnien={setListaUszlachetnien}
              setListaGramatur={setListaGramatur}
              procesyElementow={procesyElementow}
              setProcesyElementow={setProcesyElementow}
              listaDostepnychProcesow={listaDostepnychProcesow}
              handleChangeCardFragmenty_i_Elementy={
                handleChangeCardFragmenty_i_Elementy
              }
              handleChangeCardFragmenty_i_Elementy_IloscStron={handleChangeCardFragmenty_i_Elementy_IloscStron}
              handleChangeCardFragmentyOprawaId={
                handleChangeCardFragmentyOprawaId
              }
            />

            <Introligatornia
              handleChangeCardProdukty={handleChangeCardProdukty} 
              handleChangeCardOprawa={handleChangeCardOprawa}
              handleChangeCardFragmenty={handleChangeCardFragmenty}
              handleChangeCardFragmentyOprawaId={
                handleChangeCardFragmentyOprawaId
              }
            />

            <Pakowanie  pakowanie={pakowanie} setPakowanie={setPakowanie} handleChangeCardPakowanie={handleChangeCardPakowanie}/>
          </div>
        )}

        {showTemplate && (
          <div>
            <ProduktTemplate
              setShowTemplate={setShowTemplate}
              setShowParametryZamowienia={setShowParametryZamowienia}
              handleChangeCardProdukty={handleChangeCardProdukty}
       
            />
          </div>
        )}
      </div>

      {showElementyProcesyInsert && (
        <ProcesElement
          procesyElementow={procesyElementow}
          listaDostepnychProcesow={listaDostepnychProcesow}

        />
      )}

      {openModalStany && (
        <Stany
          handleChangeCardFragmenty={handleChangeCardFragmenty}
          openModalStany={openModalStany}
          setOpenModalStany={setOpenModalStany}
        
          pakowanie={pakowanie}
          daneZamowienia={daneZamowienia}
        />
      )}

{showSaveAs && (
        <SaveAs
          showSaveAs={showSaveAs}
          setSaveAs={setSaveAs}
          setShowSaveAs={setShowSaveAs}
          daneZamowienia={daneZamowienia}
          setDaneZamowienia={setDaneZamowienia}
          postZamowienieObj={postZamowienieObj}
         
        
          
        />
      )}

{isShowAddClientStage && (
        <ClientStage
        klienci={klienci}
        setKlienci={setKlienci}
        klienciWyszukiwarka={klienciWyszukiwarka}
         setKlienciWyszukiwarka={setKlienciWyszukiwarka}

        getClients={getClients}
        setListaWykonczenia={setKlienci}
        isShowAddClientStage={isShowAddClientStage}
        showAddClientStage={showAddClientStage}
        daneZamowienia={daneZamowienia}
        setDaneZamowienia={setDaneZamowienia}

        
          
        />
      )}
{readAlert && (
        <ReadOnlyAlert
        // readOnly={readOnly}
        readAlert={readAlert}
        setReadAlert={setReadAlert}
          stanOtwarciaZamowienia={stanOtwarciaZamowienia}
        />
      )}
    </div>

    


  );
  //----------------------------------
  function sprawdzPoprawnoscZamowienia() {
    // daty przyjęcia zlecenia - data spodziewanych materiałów - data spedycji
    if (
      daneZamowienia.dataPrzyjecia &&
      daneZamowienia.dataMaterialow &&
      daneZamowienia.dataSpedycji !== ""
    ) {
      console.log("Daty poprawne!");
      setCheck_data_wejscia(true);
    }
  }



    function postZamowienieObj(){
    // await zapis();

    saveOrder({daneZamowienia,produkty,elementy,fragmenty,oprawa,pakowanie,cookies,setProdukty,setElementy,setFragmenty,setOprawa,setPakowanie,saveAs,refreshZamowienia});
      //  f1(f2);

  }




  



  function handleChangeCardFragmenty_i_Elementy(card) {
    // zmienia typ fragmentów gdy typ elementu jest zmieniany
    setElementy(
      elementy.map((t) => {
        if (t.id === card.id) {
          return card;
        } else {
          return t;
        }
      })
    );

    setFragmenty(
      fragmenty.map((t, a) => {
      // console.log("oprawa id" +prev)
      if (t.element_id === card.id) {
        return {
          ...t,
          typ: card.typ

        };
      } else {
        return t;
      }
    })
  );
  }

  function handleChangeCardFragmenty_i_Elementy_IloscStron(card) {
    // zmienia typ fragmentów gdy typ elementu jest zmieniany
    setElementy(
      elementy.map((t) => {
        if (t.id === card.id) {
          return card;
        } else {
          return t;
        }
      })
    );

    setFragmenty(
      fragmenty.map((t, a) => {
      // console.log("oprawa id" +prev)
      if (t.element_id === card.id) {
        return {
          ...t,
          ilosc_stron: card.ilosc_stron

        };
      } else {
        return t;
      }
    })
  );
  }



  function handleChangeCardFragmenty(card) {
    setFragmenty(
      fragmenty.map((t) => {
        if (t.id === card.id) {
          return card;
        } else {
          return t;
        }
      })
    );
    
  }

  function handleChangeCardFragmentyOprawaId(idFragmentu, idOprawy) {
    setFragmenty(
      fragmenty.map((t) => {
        if (t.id == idFragmentu) {
          return {...t,
            oprawa_id: idOprawy}
        } else {
          return t;
        }
      })
    );
  }

  function handleChangeCardElementy(card) {
    setElementy(
      elementy.map((t) => {
        if (t.id === card.id) {
          return card;
        } else {
          return t;
        }
      })
    );
  }
  function handleChangeCardProdukty(card) {
    setProdukty(
      produkty.map((t) => {
        if (t.id === card.id) {
          return card;
        } else {
          return t;
        }
      })
    );
  }

  function handleChangeCardOprawa(card) {
    setOprawa(
      oprawa.map((t) => {
        if (t.id === card.id) {
          return card;
        } else {
          return t;
        }
      })
    );
  }

  function handleChangeCardPakowanie(card) {
    setPakowanie(
      pakowanie.map((t) => {
        if (t.id === card.id) {
          return card;
        } else {
          return t;
        }
      })
    );
  }




  }

export default ModalInsert;


