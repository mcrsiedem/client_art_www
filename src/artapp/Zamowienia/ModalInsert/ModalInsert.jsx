import style from "./ModalInsert.module.css";
import React, { useEffect, useState, useContext,useRef } from "react";
import { useCookies } from "react-cookie";
import Header from "./Header/Header";
import Dane from "./Dane/Dane";
import ProduktTemplate from "./ProduktTempalate/ProduktTemplate";


import {
  _firma,
  initialProdukty,
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
import { clear } from "@testing-library/user-event/dist/clear";



function ModalInsert({
  openModalInsert,
  setOpenModalInsert,
  user,
  setUser,
  listaPapierow,
  setListPapierow,
  listaGramatur,
  setListaGramatur,
}) {
  useEffect(() => {
    // dragElement(document.getElementById("mydiv"));
    // dragElement(elmnt.current);
  }, []);
  // const elmnt = useRef(null);
  const [cookies, setCookie] = useCookies();
  const context = useContext(TokenContext);
  const [nroprawy, setNroprawy] = useState();
  const dane=[{test:1}];
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
    
  ]);
  const [elementy, setElementy] = useState(initialElementy);
  const [fragmenty, setFragmenty] = useState(initialFragmenty);
  const [fragi, setFragi] = useState();


  const [oprawa, setOprawa] = useState([
    {
      id: 1,
      id_prev: "",
      id_fragmentow: "0",
      zamowienie_id: 1,
      produkt_id:1,

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
      naklad: "686",
      uwagi: ""
    },
    {
      id: 2,
      zamowienie_id: 1,
      produkt_id:1,
      nazwa: "Desa Unicum ul. Piękna 1 A",
      naklad: "124",
      uwagi: ""
    },
    {
      id: 3,
      zamowienie_id: 1,
      produkt_id:1,
      nazwa: "Cosmopolitan",
      naklad: "10",
      uwagi: ""
    },
    {
      id: 4,
      zamowienie_id: 1,
      produkt_id:1,
      nazwa: "Promenoria",
      naklad: "10",
      uwagi: ""
    },
    {
      id:5,
      zamowienie_id: 1,
      produkt_id:1,
      nazwa: "Comforty",
      naklad: "10",
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
  async function fechListy() {
    const res2 = await axios.get(ip + "lista-uszlachetnien");
    setListaUszlachetnien([...res2.data]);

    const res5 = await axios.get(ip + "lista-procesow");
    setListaDostepnychProcesow([...res5.data]);
  }

  useEffect(() => {
    fechListy();
  }, []);
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
  async function postZamowienieObj3(){

    console.clear();
    const produktyEdit = produkty.slice();
    const elementyEdit = elementy.slice();
    const fragmentyEdit = fragmenty.slice();
    const oprawaEdit = oprawa.slice();
    const user =  DecodeToken(cookies.token).id;

    console.log("user "+ user);

    let res = await axios.post(ip + "zamowienieobj", {user,daneZamowienia,produktyEdit,elementyEdit,fragmentyEdit,oprawaEdit});
    console.log(res)
  }

  //----------------------------------
  async function postZamowienieObj(){
   // najnowszy pomysł zeby zapisywać w oprawie wszystkie idki fragmentow
    const produktyEdit = produkty.slice();
    const elementyEdit = elementy.slice();
    const fragmentyEdit = fragmenty.slice();
    const oprawaEdit = oprawa.slice();
    
    
    
    console.clear();
              let res = await axios.post(ip + "zamowienie", {
                nr: daneZamowienia.nr,
                rok: daneZamowienia.rok,
                firma_id: daneZamowienia.firma_id,
                klient_id: daneZamowienia.klient_id,
                tytul: daneZamowienia.tytul,
                data_przyjecia: daneZamowienia.dataPrzyjecia,
                data_materialow: daneZamowienia.dataMaterialow,
                data_spedycji: daneZamowienia.dataSpedycji,
                opiekun: daneZamowienia.opiekun_id,
                user: DecodeToken(cookies.token).id,
                stan: daneZamowienia.stan,
                status: daneZamowienia.status,
                uwagi: daneZamowienia.uwagi,
              });
    
              const zamowienie_id = res.data.insertId;
                  
    
              
    
                     await produktyEdit.forEach(async (produkt, index) => {
                      
                        let res2 = await axios.post(ip + "produkty", {
                          nazwa: produkt.nazwa,
                          zamowienie_id: zamowienie_id,
                          typ: produkt.typ,
                          wersja: produkt.wersja,
                          uwagi: produkt.uwagi,
                        });
                        let produkt_id = res2.data.insertId;
    
     
                        
    
                              elementyEdit
                              .filter((el) => el.produkt_id === produkt.id)
                              .forEach(async (element, index_element) => {
                                let res3 = await axios.post(ip + "elementy", {
                                      zamowienie_id: zamowienie_id,
                                      produkt_id: produkt_id,
                                      nazwa: element.nazwa,
                                      typ: element.typ,
                                      naklad: element.naklad,
                                      strony: element.ilosc_stron,
                                      kolory: element.kolory,
                                      format_x: element.format_x,
                                      format_y: element.format_y,
                                      papier_id: element.papier_id,
                                      gramatura_id: element.gramatura_id,
                                      papier_info: element.papier_info,
                                      uwagi: element.uwagi,
                                      // wykonczenie:element.wykonczenie,
                                      });
                                  
                                    let element_id = res3.data.insertId;



                                  //--------------------------- fragmenty     
                                                fragmentyEdit
                                                              .filter((f) => f.element_id == element.id )
                                                              .forEach(async (fragment, index_f) => {
                                                                    // let oprawa_id_ok = oprawaEdit.find(f => f.id_prev == fragment.oprawa_id).id
                                                                    let oprawa_id_ok = fragment.oprawa_id
                                                                          let res4 = await axios.post(ip + "fragmenty", {
                                                                            naklad: fragment.naklad,
                                                                            info: fragment.info,
                                                                            index: fragment.index,
                                                                            zamowienie_id: zamowienie_id,
                                                                            element_id: element_id,
                                                                            produkt_id: produkt_id,
                                                                            typ: fragment.typ,
                                                                            oprawa_id: oprawa_id_ok
                                                                            // oprawa_id: oprawaEdit. filter((o) => o.id_prev == fragment.oprawa_id ).id,
                                                                          });
                                                                          let fragment_id = res4.data.insertId;
                              
                                                                          let indexof = fragmenty.indexOf(fragment);
                                                                          fragmentyEdit[indexof].id = fragment_id
                                                                          fragmentyEdit[indexof].zamowienie_id = zamowienie_id
                                                                          fragmentyEdit[indexof].produkt_id = produkt_id
                                                                          fragmentyEdit[indexof].element_id = element_id
                                                                          // let indexofoprawa = oprawaEdit.indexOf(f => f.id == fragment.oprawa_id);
                                                                          fragmentyEdit[indexof].oprawa_id = oprawa_id_ok
                                                                        
                                                                    oprawaEdit.forEach((t) => {
                                                                      if (t.id_prev == fragment.oprawa_id) {
                                                                
                                                                        oprawaEdit[t.index].id_fragmentow= oprawaEdit[t.index].id_fragmentow + " " +fragment_id
                                                                        dane.push({
                                                                          oprawa_index: t.index,
                                                                          id_fragmentow:fragment_id,
                                                                          oprawa_id:fragment.oprawa_id,test:100})
                                                                      }
                                                                    })
                                                  
                                                                          //dodany obiekt refresh do fragmentow bo nie chciał się odswiężać drugi obiekt
                                                                          setFragmenty(fragmentyEdit.map((t)=>{return {...t, refresh: "refreshqqqq"}}))
                                                                          // setFragmenty(fragmentyEdit)
                                                                          console.log("Koniec fragmentow")
                                                    });
                                          
                                        let indexof = elementy.indexOf(element);
                                        elementyEdit[indexof].id = element_id
                                        elementyEdit[indexof].zamowienie_id = zamowienie_id
                                        elementyEdit[indexof].produkt_id = produkt_id
                                        setElementy(elementyEdit)
                                    
                                    });
                                    //--------------------------- element end
                              
                      //--------------------------- oprawa
                               oprawaEdit
                              .forEach(async (opr, i) => {
                                let oprawa_id_przed  =opr.id ;
                                let res5 = await axios.post(ip + "oprawa", {
                                    zamowienie_id: zamowienie_id,
                                    produkt_id: produkt_id,
                                    oprawa: opr.oprawa,
                                    naklad: opr.naklad,
                                    uwagi: opr.uwagi,
                                    data_spedycji: opr.data_spedycji
                                  });
                                    let oprawa_id = res5.data.insertId;
                                      
                                    let indexof = oprawa.indexOf(opr);
                                    oprawaEdit[indexof].id = oprawa_id
                                    oprawaEdit[indexof].id_prev = oprawa_id_przed
                                    oprawaEdit[indexof].zamowienie_id = zamowienie_id
                                    oprawaEdit[indexof].produkt_id = produkt_id
                                                    // oprawaEdit[indexof].id_fragmentow= "";
                                                    // dane.push({oprawa_index: t.index, id_fragmentow:fragment_id, oprawa_id:fragment.oprawa_id})
                                                    // const oj = (element) => element == oprawa_id_przed
                                                    // dane[x=>x.findIndex(oj)].oprawa_id=oprawa_id;
                                                  //  dane.forEach((item) => {
                                                  //     if( dane[item].oprawa_index == indexof) {
                                                  //       dane[item].oprawa_id = oprawa_id
                                                  //     }
                                                  // })
                                  
                                                //    dane.forEach((item) => {
                                                //       item[0].test= 23;
                                                //  })

                                
                                                    setOprawa(oprawaEdit)
                                  //     setOprawa(oprawaEdit.map((t)=>{return {...t, refresh: "refreshqqqq"}}))
                                          // oprawaEdit.forEach((t) => {
                                          //         const xx = t.id_fragmentow.split(" ");
                                          //         console.log("t.id_fragmentow: "+t.id_fragmentow + " split : "+xx[1])
                                        
                                          //       })
                                          console.log("Koniec oprawy")
                                                //  dane.forEach((item) => {
                                                //       item[0].test= 23;
                                                //  })

                                      //   dane.map((item) => {
                                      //       return {...item, test:23}
                                      //  })
                                       dane[0].test = 23;
                                       console.log( dane)

                        });
    
                       //--------------------------- oprawa end
               
              
                              let indexof = produkty.indexOf(produkt);
                              produktyEdit[indexof].id = produkt_id
                              produktyEdit[indexof].zamowienie_id = zamowienie_id




                              setProdukty(produktyEdit);

                              
                      }); 

                              console.clear()
                             
                    
                   
      }
//------------
      function idki(){
        setOprawa(prev=>prev.map((t)=>{return {...t, refresh: "refreshqqqq"}}))
        const oprawaEdit = oprawa.slice();
        oprawaEdit.forEach((t) => {
          const xx = t.id_fragmentow.split(" ");
          console.log("t.id_fragmentow: "+t.id_fragmentow + " split : "+xx[1])

        })

      }
//------------
  async function postZamowienieObj2(){
   
const produktyEdit = produkty.slice();
const elementyEdit = elementy.slice();
const fragmentyEdit = fragmenty.slice();
const oprawaEdit = oprawa.slice();



console.clear();
          let res = await axios.post(ip + "zamowienie", {
            nr: daneZamowienia.nr,
            rok: daneZamowienia.rok,
            firma_id: daneZamowienia.firma,
            klient_id: daneZamowienia.klient,
            tytul: daneZamowienia.tytul,
            data_przyjecia: daneZamowienia.dataPrzyjecia,
            data_materialow: daneZamowienia.dataMaterialow,
            data_spedycji: daneZamowienia.dataSpedycji,
            opiekun: daneZamowienia.opiekun,
            user: DecodeToken(cookies.token).id,
            stan: daneZamowienia.stan,
            status: daneZamowienia.status,
            uwagi: daneZamowienia.uwagi,
          });

          const zamowienie_id = res.data.insertId;
              

          

                  produktyEdit.forEach(async (produkt, index) => {
                  
                    let res2 = await axios.post(ip + "produkty", {
                      nazwa: produkt.nazwa,
                      zamowienie_id: zamowienie_id,
                      typ: produkt.typ,
                      wersja: produkt.wersja,
                      uwagi: produkt.uwagi,
                    });
                    let produkt_id = res2.data.insertId;

                      oprawaEdit
                            .forEach(async (opr, i) => {
                              let oprawa_id_przed  =opr.id ;
                              let res5 = await axios.post(ip + "oprawa", {
                                zamowienie_id: zamowienie_id,
                                produkt_id: produkt_id,
                                oprawa: opr.oprawa,
                                naklad: opr.naklad,
                                uwagi: opr.uwagi,
                                data_spedycji: opr.data_spedycji
                              });
                              let oprawa_id = res5.data.insertId;
                                
                              let indexof = oprawa.indexOf(opr);
                              oprawaEdit[indexof].id = oprawa_id
                              oprawaEdit[indexof].id_prev = oprawa_id_przed
                              oprawaEdit[indexof].zamowienie_id = zamowienie_id
                              oprawaEdit[indexof].produkt_id = produkt_id
                              // setOprawa(oprawaEdit)
                              setOprawa(oprawaEdit)
        
                      });
                    

                          elementyEdit
                          .filter((el) => el.produkt_id === produkt.id)
                          .forEach(async (element, index_element) => {
                            let res3 = await axios.post(ip + "elementy", {
                              zamowienie_id: zamowienie_id,
                              produkt_id: produkt_id,
                              nazwa: element.nazwa,
                              typ: element.typ,
                              naklad: element.naklad,
                              strony: element.ilosc_stron,
                              kolory: element.kolory,
                              format_x: element.format_x,
                              format_y: element.format_y,
                              papier_id: element.papier_id,
                              gramatura_id: element.gramatura_id,
                              papier_info: element.papier_info,
                              uwagi: element.uwagi,
                              // wykonczenie:element.wykonczenie,
                            });
                         
                            let element_id = res3.data.insertId;

                              fragmentyEdit
                                          .filter((f) => f.element_id == element.id )
                                          
                                          .forEach(async (fragment, index_f) => {
                                      let oprawa_id_ok = oprawaEdit.find(f => f.id_prev == fragment.oprawa_id).id
                                            let res4 = await axios.post(ip + "fragmenty", {
                                              naklad: fragment.naklad,
                                              info: fragment.info,
                                              index: fragment.index,
                                              zamowienie_id: zamowienie_id,
                                              element_id: element_id,
                                              produkt_id: produkt_id,
                                              typ: fragment.typ,
                                              oprawa_id: oprawa_id_ok
                                              // oprawa_id: oprawaEdit. filter((o) => o.id_prev == fragment.oprawa_id ).id,
                                            });
                                            let fragment_id = res4.data.insertId;

                                            
                                            
                                            let indexof = fragmenty.indexOf(fragment);
                                            fragmentyEdit[indexof].id = fragment_id
                                            fragmentyEdit[indexof].zamowienie_id = zamowienie_id
                                            fragmentyEdit[indexof].produkt_id = produkt_id
                                            fragmentyEdit[indexof].element_id = element_id

                                            
                               
                                            fragmentyEdit[indexof].oprawa_id = oprawa_id_ok
                                            
                                      
                            

                                            //dodany obiekt refresh do fragmentow bo nie chciał się odswiężać drugi obiekt
                                            setFragmenty(fragmentyEdit.map((t)=>{return {...t, refresh: "refreshqqqq"}}))
                                            // setFragmenty(fragmentyEdit)
                                });
                                
                          let indexof = elementy.indexOf(element);
                          elementyEdit[indexof].id = element_id
                          elementyEdit[indexof].zamowienie_id = zamowienie_id
                          elementyEdit[indexof].produkt_id = produkt_id
                          setElementy(elementyEdit)
                           
                          });
                          

                   


                          let indexof = produkty.indexOf(produkt);
                          produktyEdit[indexof].id = produkt_id
                          produktyEdit[indexof].zamowienie_id = zamowienie_id
                          setProdukty(produktyEdit);
                          
                  }); 


                          // console.log(produktyEdit);
                          // console.log(elementyEdit);
                          // console.log(fragmentyEdit);
  }
  //----------------------------------

  // async function postZamowienie() {
  //   let res = await axios.post(ip + "zamowienie", {
  //     nr: daneZamowienia.nr,
  //     rok: daneZamowienia.rok,
  //     firma_id: daneZamowienia.firma,
  //     klient_id: daneZamowienia.klient,
  //     tytul: daneZamowienia.tytul,
  //     data_przyjecia: daneZamowienia.dataPrzyjecia,
  //     data_materialow: daneZamowienia.dataMaterialow,
  //     data_spedycji: daneZamowienia.dataSpedycji,
  //     opiekun: daneZamowienia.opiekun,
  //     user: DecodeToken(cookies.token).id,
  //     stan: daneZamowienia.stan,
  //     status: daneZamowienia.status,
  //     uwagi: daneZamowienia.uwagi,
  //   });

  //   const zamowienie_id = res.data.insertId;
  //   // setIdZamowienia(zamowienie_id);

  //   produkty.map(async (produkt, i) => {
  //     let res2 = await axios.post(ip + "produkty", {
  //       nazwa: produkt.nazwa,
  //       zamowienie_id: zamowienie_id,
  //       typ: produkt.typ,
  //       wersja: produkt.wersja,
  //       uwagi: produkt.uwagi,
  //     });
  //     let produkt_id = res2.data.insertId;

  //     setProdukty((prev) =>
  //       prev.map((t) => {
  //         if (t.index === i) {
  //           return { ...t, id: produkt_id, zamowienie_id: zamowienie_id };
  //         } else {
  //           return t;
  //         }
  //       })
  //     );



  //     // zapis oprawy - start

  //       // oprawa start



  //     elementy
  //       .filter((el) => el.produkt_id === produkt.id)
  //       .map(async (element, m) => {
  //         let res3 = await axios.post(ip + "elementy", {
  //           zamowienie_id: zamowienie_id,
  //           produkt_id: produkt_id,
  //           nazwa: element.nazwa,
  //           typ: element.typ,
  //           naklad: element.naklad,
  //           strony: element.ilosc_stron,
  //           kolory: element.kolory,
  //           format_x: element.format_x,
  //           format_y: element.format_y,
  //           papier_id: element.papier_id,
  //           gramatura_id: element.gramatura_id,
  //           papier_info: element.papier_info,
  //           uwagi: element.uwagi,
  //           // wykonczenie:element.wykonczenie,
  //         });
  //         let element_id = res3.data.insertId;

  //         setElementy((prev) =>
  //           prev.map((t, a) => {
  //             // if (t.index === a && t.index === element.index) {
  //               if (t.index ===  element.index) {
  //               return {
  //                 ...t,
  //                 id: element_id,
  //                 zamowienie_id: zamowienie_id,
  //                 produkt_id: produkt_id,
  //               };
  //             } else {
  //               return t;
  //             }
  //           })
  //         );
  //         //save fragmenty
  //         fragmenty
  //           .filter((frag) => frag.element_id === element.id)
  //           .map(async (fragment, m) => {
  //             let res4 = await axios.post(ip + "fragmenty", {
  //               naklad: fragment.naklad,
  //               info: fragment.info,
  //               index: fragment.index,
  //               zamowienie_id: zamowienie_id,
  //               element_id: element_id,
  //               produkt_id: produkt_id,
  //               typ: fragment.typ,
  //               oprawa_id: fragment.oprawa_id,
  //             });
  //             let fragment_id = res4.data.insertId;


  //             setFragmenty((prev) =>
  //               prev.map((t, a) => {
  //                 if (t.index === fragment.index) {
  //                   return {
  //                     ...t,
  //                     id: fragment_id,
  //                     zamowienie_id: zamowienie_id,
  //                     produkt_id: produkt_id,
  //                     element_id: element_id,
  //                      oprawa_id_prev: fragment.oprawa_id,
  //                   };
  //                 } else {
  //                   return t;
  //                 }
  //               })
  //             );
  //           }); 
  //           // setFragi(fragmenty);
  //           // console.log(fragi)

  //             // fragmenty end
  //       });       //elementy end


  //       oprawa.map(async (opr, i) => {
  //                 let oprawa_id_przed  =opr.id ;
  //                 let res5 = await axios.post(ip + "oprawa", {
  //                   zamowienie_id: zamowienie_id,
  //                   produkt_id: produkt_id,
  //                   oprawa: opr.oprawa,
  //                   naklad: opr.naklad,
  //                   uwagi: opr.uwagi,
  //                   data_spedycji: opr.data_spedycji
  //                 });
  //                 let oprawa_id = res5.data.insertId;



  //                 setOprawa((prev) =>
  //                   prev.map((t) => {
  //                     if (t.index == i) {
  //                       return { ...t, id: oprawa_id,
  //                         produkt_id: produkt_id,
  //                         zamowienie_id: zamowienie_id };
  //                     } else {
  //                       return t;
  //                     }
  //                   })
  //                 );
            
         
              

  //                          setFragmenty((prev) =>
  //                 prev.map((t, a) => {
  //                     // console.log(t.oprawa_id)
  //                   if (t.oprawa_id === opr.id ) {
  //                     return {
  //                       ...t,
  //                       oprawa_id:oprawa_id,
  //                     };
  //                   } else {
  //                     return t;
  //                   }
  //                 })
  //               );



                  
                

  //       }); 





  //   });           //produkty end



  // }



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

      //   setFragmenty((prev) =>

    //   prev.map((t, a) => {

    //       return {
    //         ...t,
    //         oprawa_id:oprawa_id,
    //       };
        
        
    //   })
    // );

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
    // console.log("Fragment id: "+idFragmentu);
    // console.log("Oprawa id: "+idOprawy);
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


