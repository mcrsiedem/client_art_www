import style from "./ZamowienieStage.module.css";
import React, { useEffect, useState, useContext,useRef,useCallback } from "react";
import { useCookies } from "react-cookie";
import HeaderModal from "./Header/HeaderModal";
import Dane from "./Dane/Dane";
import Elementy from "./Elementy/Elementy";
import Produkty from "./Produkty/Produkty";
import Introligatornia from "./Introligatornia/Introligatornia";
import ProductCreator from "components/ProductCreator/ProductCreator";
import ClientStage from "components/Klienci/ClientStage";
import PaperStage from "components/PaperStage/PaperStage";
import ReadOnlyAlert from "./ReadOnlyAlert/ReadOnlyAlert";

import { initialProcesy } from "utils/initialvalue";
import {
  _firma,
  _klient,
  initialElementy,
  _papiery,
  initialFragmenty,
  _uszlachetnienia,
  _opiekun,
  _status,
  _stan,
  _typ_produktu,
  _rodzaj_oprawy,
} from "utils/initialvalue";

import axios from "axios";
import { IP } from "utils/Host";
import DecodeToken from "pages/Login/DecodeToken";
import { saveOrderNew } from "actions/saveOrderNew";

import { ModalInsertContext } from "context/ModalInsertContext";
import { PreOrderContext } from "context/PreOrderContext";
import { AppContext } from "context/AppContext";
import { initalPakowanie, initialDane, initialOprawa, initialProdukty } from "utils/initialvalue";

function ZamowienieStage({
  openModalInsert,
  setOpenModalInsert,
  open,
  row,
  refreshZamowienia
}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const contextPreOrder = useContext(PreOrderContext);
  const contextApp = useContext(AppContext);
  const showElementyProcesyInsert= contextModalInsert.showElementyProcesyInsert;
  const [isShowAddClientStage, showAddClientStage] = useState(false);
  const [stanOtwarciaZamowienia, setStanOtwarciaZamowienia] = useState({});
  const [readOnly,setReadOnly] = useState(false);
  const [readAlert,setReadAlert] = useState(false);
  const [cookies, setCookie] = useCookies();
  const [selected_papier, setSelected_papier] = useState(_papiery[0].nazwa);
  const [info, setInfo] = useState("napis");
  // const [procesyElementow, setProcesyElementow] = useState(initialProcesy);
  const [isOK, setIsOK] = useState(false);
  const [showParametryZamowienia, setShowParametryZamowienia] = useState(false);
  const [showTemplate, setShowTemplate] = useState(true);
  const [showSaveAs, setShowSaveAs] = useState(false);
  const [saveAs, setSaveAs] = useState(false);
const [check_data_wejscia, setCheck_data_wejscia] = useState(false);
const [openModalStany, setOpenModalStany] = useState(false);
const [klienci, setKlienci] = useState([]);
 const [klienciWyszukiwarka, setKlienciWyszukiwarka] = useState([]);
const setSaveButtonDisabled = contextModalInsert.setSaveButtonDisabled
const daneZamowienia = contextModalInsert.daneZamowienia;
const setDaneZamowienia= contextModalInsert.setDaneZamowienia;
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
const procesyElementow = contextModalInsert.procesyElementow;
const setProcesyElementow = contextModalInsert.setProcesyElementow;
const setKosztyDodatkoweZamowienia = contextModalInsert.setKosztyDodatkoweZamowienia;
const setKosztyDodatkowe = contextModalInsert.setKosztyDodatkowe;
const selectedZamowienie = contextModalInsert.selectedZamowienie;


  useEffect(() => {

    if (selectedZamowienie != null) {
      // otwarcie zamówienia
      
      // pokazanie parametrow
      setShowParametryZamowienia(true);

      // schowanie kreatora to tworzenia zamówienia
      setShowTemplate(false);

      // open.current = false;

      // pobranie szczegółów zamówienia
      fechparametry(selectedZamowienie.id,selectedZamowienie.prime_id,setSaveButtonDisabled);
      setSaveButtonDisabled(true)
      
    }else{
      //zerowanie stanów

      setDaneZamowienia({...initialDane, opiekun_id: DecodeToken(sessionStorage.getItem("token")).id})
      setProdukty(initialProdukty)
      setElementy(initialElementy)
      setFragmenty(initialFragmenty)
      setOprawa(initialOprawa)
      setPakowanie(initalPakowanie)
      setProcesyElementow(initialProcesy)
      setKosztyDodatkowe([])
      setKosztyDodatkoweZamowienia([])
      setSaveButtonDisabled(true)
    }




  }, []);





  async function fechparametry(idZamowienia,zamowienie_prime_id,setSaveButtonDisabled) {
          // sprawdza czy zamowienie jest już otwarte, jeśli tak to zwraca error i otwiera zamowienie tylko do odczytu
          // jeśli sprawdzane zamówienie nie jest aktualnie otwarte, zmienia open_stan na 1, czyli blokuje do normalnego otwarcia
          await axios
          .put(IP + "setOrderOpen", {
            id: idZamowienia,
            // zestaw_id: idZestawu,
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

           const res = await axios.get(IP + "parametry/"+idZamowienia+"/"+zamowienie_prime_id);

           setDaneZamowienia(res.data[0][0])
           setProdukty(res.data[1])
           setElementy(res.data[2])
           setFragmenty(res.data[3])
           setOprawa(res.data[4])
           setPakowanie(res.data[5].sort((a, b) => a.indeks - b.indeks))
           setProcesyElementow(res.data[6])
           setKosztyDodatkoweZamowienia(res.data[7])
           setKosztyDodatkowe(res.data[8])


  }

  return (
    <div className={style.container}>
      <HeaderModal stanOtwarciaZamowienia={stanOtwarciaZamowienia} readOnly={readOnly}/>
      <Dane showAddClientStage={showAddClientStage}/>
      <div className={style.main}>
        {showParametryZamowienia && (
          <div>
                  <Produkty />
                              <Elementy
                                handleChangeCardElementy={handleChangeCardElementy}
                                handleChangeCardFragmenty={handleChangeCardFragmenty}
                                selected_papier={selected_papier}
                                setSelected_papier={setSelected_papier}
                                info={info}
                                setInfo={setInfo}
                                // listaPapierow={listaPapierow}
                                // listaGramatur={listaGramatur}
                                // listaUszlachetnien={listaUszlachetnien}
                                // setListaUszlachetnien={setListaUszlachetnien}
                                // setListaGramatur={setListaGramatur}
                                procesyElementow={procesyElementow}
                                setProcesyElementow={setProcesyElementow}
                              
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
                  </div>
        )}

        </div>
                {showTemplate && (
                  <div>
        
        
                    {/* <ProduktTemplate
                      setShowTemplate={setShowTemplate}
                      setShowParametryZamowienia={setShowParametryZamowienia}
                      handleChangeCardProdukty={handleChangeCardProdukty}
                    /> */}
        
                    <ProductCreator setShowTemplate={setShowTemplate}
                      setShowParametryZamowienia={setShowParametryZamowienia}/>
        
                  </div>
                )}

        <ClientStage
        klienci={klienci}
        setKlienci={setKlienci}
        klienciWyszukiwarka={klienciWyszukiwarka}
         setKlienciWyszukiwarka={setKlienciWyszukiwarka}
        // getClients={getClients}
        setListaWykonczenia={setKlienci}
        isShowAddClientStage={isShowAddClientStage}
        showAddClientStage={showAddClientStage}
        daneZamowienia={daneZamowienia}
        setDaneZamowienia={setDaneZamowienia}
        />
{readAlert && (
        <ReadOnlyAlert
        // readOnly={readOnly}
        readAlert={readAlert}
        setReadAlert={setReadAlert}
          stanOtwarciaZamowienia={stanOtwarciaZamowienia}
        />
      )}

<PaperStage  />
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


    function postZamowienieObj() {

      saveOrderNew({
        daneZamowienia,
        setDaneZamowienia,
        produkty,
        elementy,
        fragmenty,
        oprawa,
        pakowanie,
        setProdukty,
        setElementy,
        setFragmenty,
        setOprawa,
        setPakowanie,
        saveAs,
        refreshZamowienia,
        setProcesyElementow,
        procesyElementow
      });




    }

    function postZamowienieObjSaveAs() {
      saveOrderNew({
        daneZamowienia,
        produkty,
        elementy,
        fragmenty,
        oprawa,
        pakowanie,
        cookies,
        setProdukty,
        setElementy,
        setFragmenty,
        setOprawa,
        setPakowanie,
        saveAs,
        refreshZamowienia,
        setProcesyElementow,
        procesyElementow
      });
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

export default ZamowienieStage;


