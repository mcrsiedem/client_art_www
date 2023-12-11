import style from './ModalInsert.module.css';
import React, { useEffect,useState } from "react";

import Header from './Header/Header';


import { useRef } from 'react';
import Dane from './Dane/Dane';
import Elementy from './Elementy/Elementy';
import Produkty from './Produkty/Produkty';
import {_firma,initialProdukty,_klient,_zestawy,initialElementy,_papiery,initialFragmenty,_uszlachetnienia} from './api';
import Warianty from './Warianty/Warianty';
import Introligatornia from './Introligatornia/Introligatornia';
import axios from "axios";
import {ip} from "../../../Host"
import ElementyTable from './Elementy/ElementyTable';
import ProduktyTable from './Produkty/ProduktyTable';
import IntroligatorniaTable from './Introligatornia/IntroligatorniaTable';
function ModalInsert({ openModalInsert, setOpenModalInsert }) {
    useEffect(()=>{
        // dragElement(document.getElementById("mydiv"));
        // dragElement(elmnt.current);
       },[])
// const elmnt = useRef(null);
const [selected_firma, setSelected_firma] = useState(_firma[0].id);
const [klient, setKlient] = useState(_klient[0].id);
const [elementy, setElementy] = useState(initialElementy);
const [produkty, setProdukty] = useState(initialProdukty);
const [fragmenty, setFragmenty] = useState(initialFragmenty);
const [zestawy, setZestawy] = useState(_zestawy);
const [selected_papier, setSelected_papier] = useState(_papiery[0].nazwa);

const [uszlachetnienia, setUszlachetnienia] = useState(_uszlachetnienia[0].nazwa);

const [idZamowienie, setIdZamowienia] = useState();
const[isTable,setIsTable] =useState(true);
const[info,setInfo]= useState("napis")


const[listaWykonczenia,setListaWykonczenia]= useState();
const[listaUszlachetnien,setListaUszlachetnien]= useState();
const[listaPapierow,setListaPapierow]= useState();
const[listaGramatur,setListaGramatur]= useState();
const [selected_wykonczenie, setSelected_wykonczenie] = useState();

const[isEdit,setIsEdit]= useState(false);
// async function fechListaUszlachetnien() {

//   // const notes =[...res.data].filter(row=> row.status !== "Wydrukowane")
//   //                           .filter(row=> row.status !== "Nowe")
//   // setData(job);

//   // setData(zamowienia);

// };
async function fechListy() {

  // const res = await axios.get(ip + 'lista-wykonczen');
  // setListaWykonczenia([...res.data]);

  const res2 = await axios.get(ip + 'lista-uszlachetnien');
  setListaUszlachetnien([...res2.data]);

  const res3 = await axios.get(ip + 'lista-papierow');
  setListaPapierow([...res3.data]);

  const res4 = await axios.get(ip + 'lista-gramatur');
  setListaGramatur([...res4.data]);



};

useEffect(()=>{
  fechListy();
 },[])
    return (
      <div className={style.container}>
        <Header
          openModalInsert={openModalInsert}
          setOpenModalInsert={setOpenModalInsert}
          postZamowienie={postZamowienie}
          id={idZamowienie}
          isTable={isTable}
          setIsTable={setIsTable}
          info={info}
        />

        <Dane
          selected_firma={selected_firma}
          klient={klient}
          setSelected_firma={(firma) => setSelected_firma(firma)}
          setKlient={(kl) => setKlient(kl)}
        />

        <div>
          {isTable ? (
            <Produkty
              produkty={produkty}
              handleChangeCardProdukty={handleChangeCardProdukty}
            />
          ) : (
            <ProduktyTable
              produkty={produkty}
              handleChangeCardProdukty={handleChangeCardProdukty}
            />
          )}

          {isTable ? (
            <Elementy
              elementy={elementy}
              setElementy={setElementy}
              handleChangeCardElementy={handleChangeCardElementy}
              selected_papier={selected_papier}
              setSelected_papier={setSelected_papier}
              fragmenty={fragmenty}
              setFragmenty={setFragmenty}
            />
          ) : (
            <ElementyTable
              elementy={elementy}
              setElementy={setElementy}
              handleChangeCardElementy={handleChangeCardElementy}
              selected_papier={selected_papier}
              setSelected_papier={setSelected_papier}
              fragmenty={fragmenty}
              setFragmenty={setFragmenty}
              info={info}
              setInfo={setInfo}
              listaWykonczenia={listaWykonczenia}
              setListaWykonczenia={setListaWykonczenia}
              selected_wykonczenie={selected_wykonczenie}
              setSelected_wykonczenie={setSelected_wykonczenie}
              listaPapierow={listaPapierow}
              listaGramatur={listaGramatur}
              setListaGramatur={setListaGramatur}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          )}
        </div>
        {isTable ? 
        <Introligatornia
          zestawy={zestawy}
          setZestawy={setZestawy}
          fragmenty={fragmenty}
          setFragmenty={setFragmenty}
        /> :
        <IntroligatorniaTable
        zestawy={zestawy}
        setZestawy={setZestawy}
        fragmenty={fragmenty}
        setFragmenty={setFragmenty}
      />

}
        <Warianty />

        {/* <Footer openModalInsert={openModalInsert} setOpenModalInsert={setOpenModalInsert}/> */}

        {/* <div id="mydiv" ref={elmnt} className={style.mydiv}>
            <div id="mydivheader" className={style.mydivheader}>Dodatkowe informacje</div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
          
          </div> */}
      </div>
    );
//----------------------------------


      async function postZamowienie() {
        const res = await axios.post(ip + "zamowienie", {
          firma_id: selected_firma,
          klient_id: klient,
        });
    
        const zamowienie_id = res.data.insertId;
        setIdZamowienia(zamowienie_id);
    
        produkty.map(async (produkt, i) => {
                let res = await axios.post(ip + "produkty", {
                  tytul: produkt.tytul,
                  zamowienie_id: zamowienie_id,
                });
                let produkt_id = res.data.insertId;
    
                setProdukty((prev) =>
                  prev.map((t) => {
                    if (t.index === i) {
                      return { ...t, id: produkt_id, zamowienie_id: zamowienie_id };
                    } else {
                      return t;
                    }
                  })
                );
    
                elementy
                        .filter((el) => el.produkt_id === produkt.id)
                        .map(async (element, m) => {
                          let res = await axios.post(ip + "elementy", {
                            typ: element.typ,
                            nazwa: element.nazwa,
                            zamowienie_id: zamowienie_id,
                            produkt_id: produkt_id,
                            naklad: element.naklad,
                            strony:element.strony,
                            kolory:element.kolory,
                            format_x:element.format_x,
                            format_y:element.format_y,
                            papier_id:element.papier_id,
                             gramatura_id:element.gramatura_id,
                            // wykonczenie:element.wykonczenie,


                          });
                          let element_id = res.data.insertId;
    
                          setElementy((prev) =>
                            prev.map((t, a) => {
                              if (t.index === a && t.index === element.index) {
                                return {
                                  ...t,
                                  id: element_id,
                                  zamowienie_id: zamowienie_id,
                                  produkt_id: produkt_id,
                                };
                              } else {
                                return t;
                              }
                            })
                          );
    
                          //save fragmenty
                          fragmenty
                         .filter((frag) => frag.element_id === element.id)
                          .map(async (fragment, m) => {
                        
                          let res = await axios.post(ip + "fragmenty", {
                            naklad: fragment.naklad,
                            info: fragment.info,
                            index: fragment.index,
                            zamowienie_id: zamowienie_id,
                            element_id: element_id,
                            produkt_id: produkt_id,
                          });
                          let fragment_id = res.data.insertId;
    
    
                          setFragmenty((prev) =>
                          prev.map((t, a) => {
                             if (t.index === fragment.index  ) {
                              return {
                                ...t,
                                id: fragment_id,
                                zamowienie_id: zamowienie_id,
                                produkt_id: produkt_id,
                                element_id:element_id
                              };
                            } else {
                              return t;
                            }
                          })
                        );
    
                          // console.log("fragment produkt_id: "+fragment.produkt_id);
                          // console.log("fragment element id: "+fragment.element_id);
                          // console.log("zam: "+zamowienie_id);
                          // console.log("el: "+element_id);
                          // console.log("prod: "+produkt_id);
                          // console.log("---------------");
                         });
    
                  });
        });
      }
    
    
  //   function handleChangeCardElementy(card) {
  //     setElementy(
  //       elementy.map((tabl)=>{
  //         tabl.map((t) => {
  //       if (t.id === card.id) {
  //         return card;
  //       } else {
  //         return t;
  //       }
  //     })
  //   );
  // }
    
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

    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
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
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
    
      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
    
}



export default ModalInsert;