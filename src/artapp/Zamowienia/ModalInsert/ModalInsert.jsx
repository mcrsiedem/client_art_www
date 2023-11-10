import style from './ModalInsert.module.css';
import React, { useEffect,useState } from "react";

import Header from './components/Header';


import { useRef } from 'react';
import Dane from './components/Dane';
import Elementy from './components/Elementy';
import Produkty from './components/Produkty';
import {_firma,_produkty,_klient,_zestawy,_elementy,_papiery} from './components/api';
import Warianty from './components/Warianty';
import Introligatornia from './components/Introligatornia';
function ModalInsert({ openModalInsert, setOpenModalInsert }) {
    useEffect(()=>{
        // dragElement(document.getElementById("mydiv"));
        // dragElement(elmnt.current);
       },[])
// const elmnt = useRef(null);
const [selected_firma, setSelected_firma] = useState(_firma[0].id);
const [klient, setKlient] = useState(_klient[0].firma);
const [elementy, setElementy] = useState(_elementy);
const [produkty, setProdukty] = useState(_produkty);
const [zestawy, setZestawy] = useState(_zestawy);
const [fragmenty, setFragmenty] = useState([]);
const [selected_papier, setSelected_papier] = useState(_papiery[0].nazwa);


let index=0;

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
    return (
      <div className={style.container}>
        <Header
          openModalInsert={openModalInsert}
          setOpenModalInsert={setOpenModalInsert}
        />

        <Dane
          selected_firma={selected_firma}
          klient={klient}
          setSelected_firma={(firma) => setSelected_firma(firma)}
          setKlient={(kl) => setKlient(kl)}
        />

        <Produkty _produkty={_produkty} />

        <Elementy
          elementy={elementy}
          setElementy={setElementy}
          handleChangeCardElementy={handleChangeCardElementy}
          selected_papier={selected_papier}
          setSelected_papier={setSelected_papier}
        />

        <Introligatornia
          zestawy={zestawy}
          setZestawy={setZestawy}
          fragmenty={fragmenty}
          setFragmenty={setFragmenty}
        />
        <Warianty />

        {/* <Footer openModalInsert={openModalInsert} setOpenModalInsert={setOpenModalInsert}/> */}

        {/* <div id="mydiv" ref={elmnt} className={style.mydiv}>
            <div id="mydivheader" className={style.mydivheader}>Dodatkowe informacje</div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
          
          </div> */}
      </div>
    );
//----------------------------------

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