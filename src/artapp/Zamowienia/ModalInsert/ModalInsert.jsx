import style from "./ModalInsert.module.css";
import React, { useEffect, useState, useContext,useRef } from "react";
import { useCookies } from "react-cookie";
import Header from "./Header/Header";
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
import { ip } from "../../../Host";
import Elementy from "./Elementy/Elementy";
import Introligatornia from "./Introligatornia/Introligatornia";
import ElementyProcesInsert from "./Elementy/ElementyProcesInsert/ElementyProcesInsert";
import TokenContext from "../../Context/tokenContext";
import DecodeToken from "../../Login/DecodeToken";
import Produkty from "./Produkty/Produkty";
import Stany from "./Stany";
import { saveOrder } from "./Actions/Order";





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
  setOpen,
  row
}) {


  




  const [cookies, setCookie] = useCookies();
  const context = useContext(TokenContext);
  const [nroprawy, setNroprawy] = useState();
  const [preOrder, setPreOrder] = useState({
    typ: 1,
    oprawa: 1,
    naklad: "1000",
    strony_okl: "4",
    strony_srd: "4",
    format_x: "4",
    format_y: "4",
    bok_oprawy: "4"

  });

  const [daneZamowienia, setDaneZamowienia] = useState({
    id: 1,
    nr: "20",
    rok: "2024",
    firma_id: _firma[0].id,
    klient_id: _klient[0].id,
    opiekun_id: _opiekun[0].id,
    tytul: "Tytuł zamówienia",
    dataPrzyjecia: "2024-01-30",
    dataMaterialow: "2024-01-30",
    dataSpedycji: "2024-01-30",
    stan: _stan[0].id,
    status: _status[0].id,
    uwagi: "",
    cena:"za wysoka",
    terminPlatnosci: " 30",
    vat: " 23",
    przedplata: "tak"

  });

  
  const [produkty, setProdukty] = useState([
    {
      id: 1,
      zamowienie_id: 1,
      typ: 1,
      nazwa: "",
      wersja: "",
      ilosc_stron: "",
      format_x: "",
      format_y: "",
      oprawa: "PUR",
      naklad: "1000",
      index: 0,
      uwagi: "",
    }
    // ,
    // {
    //   id: 2,
    //   zamowienie_id: 1,
    //   typ: 1,
    //   nazwa: "",
    //   wersja: "",
    //   ilosc_stron: "",
    //   format_x: "",
    //   format_y: "",
    //   oprawa: "PUR",
    //   naklad: "1000",
    //   index: 1,
    //   uwagi: "",
    // }
    
  ]);
  const [elementy, setElementy] = useState(initialElementy);
  const [fragmenty, setFragmenty] = useState(initialFragmenty);
  const [oprawa, setOprawa] = useState([
    {
      id: 1,
      zamowienie_id: 1,
      produkt_id:1,
      oprawa: 1,
      bok_oprawy: "297",
      naklad: "500",
      uwagi: "",
      data_spedycji: "2024-01-30",
      index: 0,
    },

    // {
    //   id: 2,
    //   zamowienie_id: 1,
    //   produkt_id:1,
    //   oprawa: 1,
    //   bok_oprawy: "297",
    //   naklad: "1000",
    //   uwagi: "uwagi do oprawy",
    //   data_spedycji: "2024-01-30",
    //   index: 1,
    // },
    
  ]);

  const [pakowanie, setPakowanie] = useState([
    {
      id: 1,
      zamowienie_id: 1,
      produkt_id:1,
      nazwa: "Poczta Główna",
      naklad: 10,
      uwagi: ""
    },
    {
      id: 2,
      zamowienie_id: 1,
      produkt_id:1,
      nazwa: "Desa Unicum ul. Piękna 1 A",
      naklad: 124,
      uwagi: ""
    },
    {
      id: 3,
      zamowienie_id: 1,
      produkt_id:1,
      nazwa: "Cosmopolitan",
      naklad: 10,
      uwagi: ""
    },
    {
      id: 4,
      zamowienie_id: 1,
      produkt_id:1,
      nazwa: "Promenoria",
      naklad: 10,
      uwagi: ""
    },
    {
      id:5,
      zamowienie_id: 1,
      produkt_id:1,
      nazwa: "Comforty",
      naklad: 10,
      uwagi: ""
    },
    
  ]);
  const [uszlachetnienia, setUszlachetnienia] = useState();
  const [selected_papier, setSelected_papier] = useState(_papiery[0].nazwa);
  const [idZamowienie, setIdZamowienia] = useState();
  const [isTable, setIsTable] = useState(true);
  const [info, setInfo] = useState("napis");
  const [listaWykonczenia, setListaWykonczenia] = useState();
  const [listaUszlachetnien, setListaUszlachetnien] = useState();
  const [listaDostepnychProcesow, setListaDostepnychProcesow] = useState();
  const [procesyElementow, setProcesyElementow] = useState(initialProcesy);
  const [selected_wykonczenie, setSelected_wykonczenie] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isOK, setIsOK] = useState(false);
  const [showParametryZamowienia, setShowParametryZamowienia] = useState(false);
  const [showTemplate, setShowTemplate] = useState(true);

  const [showElementyProcesyInsert, setShowElementyProcesyInsert] =
    useState(false);
  
 

const [check_data_wejscia, setCheck_data_wejscia] = useState(false);
const [openModalStany, setOpenModalStany] = useState(false);


  // do zapisu
  let produktyEdit = produkty.slice();
  let elementyEdit = elementy.slice();
  let fragmentyEdit = fragmenty.slice();
  let oprawaEdit = oprawa.slice();
  //-------------------------------------

  async function fechListy() {
    const res2 = await axios.get(ip + "lista-uszlachetnien");
    setListaUszlachetnien([...res2.data]);

    const res5 = await axios.get(ip + "lista-procesow");
    setListaDostepnychProcesow([...res5.data]);
  }



  useEffect(() => {




 
          fechListy();

    if (open) {
      setShowParametryZamowienia(true)
      setShowTemplate(false)
      setOpen(false)
      fechparametry(row.id)
    }

    








  }, []);


  async function fechparametry(idZamowienia) {


           const res = await axios.get(ip + "parametry/"+idZamowienia);
           setDaneZamowienia(res.data[0])
           

  }

  return (
    <div className={style.container}>
      <Header
        openModalInsert={openModalInsert}
        setOpenModalInsert={setOpenModalInsert}
        // postZamowienie={postZamowienie}
        postZamowienieObj={postZamowienieObj}
        id={idZamowienie}
        isTable={isTable}
        setIsTable={setIsTable}
        info={info}
        setInfo={setInfo}
        isOK={isOK}
        setIsOK={setIsOK}
        sprawdzPoprawnoscZamowienia={sprawdzPoprawnoscZamowienia}
        check_data_wejscia={check_data_wejscia}
        elementy={elementy}
        openModalStany={openModalStany}
        setOpenModalStany={setOpenModalStany}
      />

      <Dane
        daneZamowienia={daneZamowienia}
        setDaneZamowienia={setDaneZamowienia}
      />

      <div className={style.main}>
        {showParametryZamowienia && (
          <div>
            <Produkty
              produkty={produkty}
              handleChangeCardProdukty={handleChangeCardProdukty}
              _typ_produktu={_typ_produktu}
              isTable={isTable}
            />

            <Elementy
              elementy={elementy}
              setElementy={setElementy}
              handleChangeCardElementy={handleChangeCardElementy}
              handleChangeCardFragmenty={handleChangeCardFragmenty}
              selected_papier={selected_papier}
              setSelected_papier={setSelected_papier}
              fragmenty={fragmenty}
              setFragmenty={setFragmenty}
              info={info}
              setInfo={setInfo}
              listaPapierow={listaPapierow}
              listaGramatur={listaGramatur}
              listaUszlachetnien={listaUszlachetnien}
              setListaUszlachetnien={setListaUszlachetnien}
              setListaGramatur={setListaGramatur}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              procesyElementow={procesyElementow}
              setProcesyElementow={setProcesyElementow}
              listaDostepnychProcesow={listaDostepnychProcesow}
              showElementyProcesyInsert={showElementyProcesyInsert}
              setShowElementyProcesyInsert={setShowElementyProcesyInsert}
              handleChangeCardFragmenty_i_Elementy={
                handleChangeCardFragmenty_i_Elementy
              }
              handleChangeCardFragmentyOprawaId={
                handleChangeCardFragmentyOprawaId
              }
            />

            <Introligatornia
              oprawa={oprawa}
              setOprawa={setOprawa}
              fragmenty={fragmenty}
              setFragmenty={setFragmenty}
              handleChangeCardOprawa={handleChangeCardOprawa}
              handleChangeCardFragmenty={handleChangeCardFragmenty}
              handleChangeCardFragmentyOprawaId={
                handleChangeCardFragmentyOprawaId
              }
            />

            <Pakowanie pakowanie={pakowanie} setPakowanie={setPakowanie} />
          </div>
        )}

        {showTemplate && (
          <div>
            <ProduktTemplate
              preOrder={preOrder}
              setPreOrder={setPreOrder}
              setShowTemplate={setShowTemplate}
              setShowParametryZamowienia={setShowParametryZamowienia}
              produkty={produkty}
              setProdukty={setProdukty}
              handleChangeCardProdukty={handleChangeCardProdukty}
              elementy={elementy}
              setElementy={setElementy}
              fragmenty={fragmenty}
              setFragmenty={setFragmenty}
              oprawa={oprawa}
              setOprawa={setOprawa}
            />
          </div>
        )}
      </div>

      {showElementyProcesyInsert && (
        <ElementyProcesInsert
          showElementyProcesyInsert={showElementyProcesyInsert}
          setShowElementyProcesyInsert={setShowElementyProcesyInsert}
          procesyElementow={procesyElementow}
          listaDostepnychProcesow={listaDostepnychProcesow}
        />
      )}

      {/* <Footer openModalInsert={openModalInsert} setOpenModalInsert={setOpenModalInsert}/> */}

      {/* <div id="mydiv" ref={elmnt} className={style.mydiv}>
            <div id="mydivheader" className={style.mydivheader}>Dodatkowe informacje</div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
          
          </div> */}
      {openModalStany && (
        <Stany
          handleChangeCardFragmenty={handleChangeCardFragmenty}
          openModalStany={openModalStany}
          setOpenModalStany={setOpenModalStany}
          fragmenty={fragmenty}
          elementy={elementy}
          produkty={produkty}
          oprawa={oprawa}
          pakowanie={pakowanie}
        
          
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

    saveOrder({daneZamowienia,produkty,elementy,fragmenty,oprawa,pakowanie,cookies,setProdukty,setElementy,setFragmenty,setOprawa,setPakowanie});
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

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      //   e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      //   e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }


  }

export default ModalInsert;


