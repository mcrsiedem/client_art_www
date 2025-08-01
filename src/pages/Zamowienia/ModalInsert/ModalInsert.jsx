import style from "./ModalInsert.module.css";
import React, { useEffect, useState, useContext,useRef,useCallback } from "react";
import { useCookies } from "react-cookie";
import HeaderModal from "./Header/HeaderModal";
import Dane from "./Dane/Dane";

import { initialKsiegowosc, initialProcesy } from "utils/initialvalue";
import {

  initialElementy,
  initialFragmenty,
  _uszlachetnienia,
  _opiekun,
  _status,
  _stan,
  _typ_produktu,

} from "utils/initialvalue";

import axios from "axios";
import { IP } from "../../../utils/Host";
import Elementy from "./Elementy/Elementy";
import Introligatornia from "./Introligatornia/Introligatornia";
import ProcesElement from "./Elementy/ElementyProcesInsert/ProcesElement";
import DecodeToken from "../../Login/DecodeToken";
import Produkty from "./Produkty/Produkty";
import Stany from "./Stany";
import SaveAs from "./SaveAs/SaveAs";
import ClientStage from "../../../components/Klienci/ClientStage";
import ReadOnlyAlert from "./ReadOnlyAlert/ReadOnlyAlert";

import { ModalInsertContext } from "context/ModalInsertContext";
import { PreOrderContext } from "context/PreOrderContext";
import { AppContext } from "context/AppContext";
import { initalPakowanie, initialDane, initialOprawa, initialProdukty } from "utils/initialvalue";
import ProductCreator from "components/ProductCreator/ProductCreator";
import PaperStage from "components/PaperStage/PaperStage";
import HistoriaZamowienia from "./HistoriaZamowienia/HistoriaZamowienia";
import DialogZapis from "components/Dialog/DialogZapis";
import PakowanieZamowienie from "./Pakowanie/PakowanieZamowienie";
import KosztyDodatkowe from "./KosztyDodatkowe/KosztyDodatkowe";
import Parametery from "./Parametry/Parametry";
import Faktury from "./Faktury/Faktury";

function ModalInsert({
  
}) {
  const contextModalInsert = useContext(ModalInsertContext);
  const contextPreOrder = useContext(PreOrderContext);
  const contextApp = useContext(AppContext);
  const showElementyProcesyInsert= contextModalInsert.showElementyProcesyInsert;
  const [stanOtwarciaZamowienia, setStanOtwarciaZamowienia] = useState({});
  const [readOnly,setReadOnly] = useState(false);
  const [readAlert,setReadAlert] = useState(false);
  const [cookies, setCookie] = useCookies();
  const [selected_papier, setSelected_papier] = useState();
  const [info, setInfo] = useState("napis");
  // const [procesyElementow, setProcesyElementow] = useState(initialProcesy);
  const [isOK, setIsOK] = useState(false);
  const [showParametryZamowienia, setShowParametryZamowienia] = useState(false);
  const [showKosztyZamowienia, setShowKosztyZamowienia] = useState(false);
  const [showTemplate, setShowTemplate] = useState(true);

const [check_data_wejscia, setCheck_data_wejscia] = useState(false);
const [openModalStany, setOpenModalStany] = useState(false);

const showTabs = contextModalInsert.showTabs
const setShowTabs = contextModalInsert.setShowTabs
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
const technologieID = contextModalInsert.technologieID;
const setTechnologieID = contextModalInsert.setTechnologieID;
const setProcesyElementow = contextModalInsert.setProcesyElementow;
const setKosztyDodatkoweZamowienia = contextModalInsert.setKosztyDodatkoweZamowienia;
const isShowAddClientStage = contextModalInsert.isShowAddClientStage;
const showAddClientStage = contextModalInsert.showAddClientStage;
const setHistoriaZamowienia= contextModalInsert.setHistoriaZamowienia;
const selectedZamowienie= contextModalInsert.selectedZamowienie;
const openModalInsert= contextModalInsert.openModalInsert;
const setOpenModalInsert= contextModalInsert.setOpenModalInsert;
const ksiegowosc= contextModalInsert.ksiegowosc;
const setKsiegowosc= contextModalInsert.setKsiegowosc;
const setFaktury= contextModalInsert.setFaktury;


  useEffect(() => {

    // if (open.current) {
    if (selectedZamowienie.id !=1) {
      // setShowParametryZamowienia(true);
      // setShowTemplate(false);
      // open.current = false;
      fechparametry(selectedZamowienie.id,setSaveButtonDisabled);
      setSaveButtonDisabled(true)
    }else{
      setDaneZamowienia({...initialDane, opiekun_id: DecodeToken(sessionStorage.getItem("token")).id})
      setProdukty(initialProdukty)
      setElementy(initialElementy)
      setFragmenty(initialFragmenty)
      setOprawa(initialOprawa)
      setPakowanie(initalPakowanie)
      setProcesyElementow(initialProcesy)
      setKosztyDodatkoweZamowienia([])
      setSaveButtonDisabled(true)
      setHistoriaZamowienia([])
      setKsiegowosc(initialKsiegowosc)
    }

  // }, [open]);
  }, []);

  useEffect(() => {
    contextApp.updateClients()
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

           const res = await axios.get(IP + "parametry/"+idZamowienia+"/"+ sessionStorage.getItem("token"));
           setDaneZamowienia([])
           setProdukty([])
           setElementy([])
           setFragmenty([])
           setOprawa([])
           setProcesyElementow([])
           setTechnologieID([])
           setHistoriaZamowienia([])
           setPakowanie([])
           setDaneZamowienia(res.data[0][0])
           setProdukty(res.data[1])
           setElementy(res.data[2])
           setFragmenty(res.data[3])
           setOprawa(res.data[4])
           setProcesyElementow(res.data[5])
           setTechnologieID(res.data[6])
           setHistoriaZamowienia(res.data[7])
           setPakowanie(res.data[8])
           setKosztyDodatkoweZamowienia(res.data[9])
           setKsiegowosc(res.data[10][0])
           setFaktury(res.data[11])

           

  }


  return (
    <div
      className={style.container}
      tabIndex="0"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          contextModalInsert.setShowElementyProcesyInsert(false);

          // props.handleEditBlachy(event.target.value);
          // document.activeElement.blur();
        }
      }}
    >
      <HeaderModal
        openModalInsert={openModalInsert}
        setOpenModalInsert={setOpenModalInsert}
        info={info}
        setInfo={setInfo}
        isOK={isOK}
        setIsOK={setIsOK}
        sprawdzPoprawnoscZamowienia={sprawdzPoprawnoscZamowienia}
        check_data_wejscia={check_data_wejscia}
        openModalStany={openModalStany}
        setOpenModalStany={setOpenModalStany}
        stanOtwarciaZamowienia={stanOtwarciaZamowienia}
        readAlert={readAlert}
        setReadAlert={setReadAlert}
        readOnly={readOnly}
        setReadOnly={setReadOnly}
      />

      <Dane showAddClientStage={showAddClientStage} setShowParametryZamowienia={setShowParametryZamowienia} setShowKosztyZamowienia={setShowKosztyZamowienia} />
        <Parametery/>


      <div className={style.main}>
        {showTabs.parametry && (
          <div>
            <Produkty />
            <Elementy
              handleChangeCardElementy={handleChangeCardElementy}
              handleChangeCardFragmenty={handleChangeCardFragmenty}
              selected_papier={selected_papier}
              setSelected_papier={setSelected_papier}
              info={info}
              setInfo={setInfo}
              procesyElementow={procesyElementow}
              setProcesyElementow={setProcesyElementow}
              handleChangeCardFragmenty_i_Elementy={
                handleChangeCardFragmenty_i_Elementy
              }
              handleChangeCardFragmenty_i_Elementy_IloscStron={
                handleChangeCardFragmenty_i_Elementy_IloscStron
              }
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
            <PakowanieZamowienie />
           

         
          </div>
        )}

    <KosztyDodatkowe  />
    <HistoriaZamowienia  />
    <Faktury/>


        <ProductCreator        />
      </div>
      <ProcesElement showElementyProcesyInsert={showElementyProcesyInsert} />
      <Stany
        handleChangeCardFragmenty={handleChangeCardFragmenty}
        openModalStany={openModalStany}
        setOpenModalStany={setOpenModalStany}
        daneZamowienia={daneZamowienia}
      />

      <ClientStage parent={"modalinsert"} />
      <ReadOnlyAlert
        readAlert={readAlert}
        setReadAlert={setReadAlert}
        stanOtwarciaZamowienia={stanOtwarciaZamowienia}
        setOpenModalInsert={setOpenModalInsert}
      />
      <PaperStage parent={"zamowienia"} />
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




    function postZamowienieObjSaveAs() {

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
          typ: card.typ,
          update: true

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
          ilosc_stron: card.ilosc_stron,
          update:true

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
            oprawa_id: idOprawy,
            update: true
          }
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


