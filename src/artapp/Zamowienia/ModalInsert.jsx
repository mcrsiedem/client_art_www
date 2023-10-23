import style from '../Zamowienia/ModalInsert.module.css';
import React, { useEffect,useState } from "react";
import {_firma} from '../Zamowienia/_firma.jsx';
import {_klient} from '../Zamowienia/_klient.jsx';
import {_elementy} from '../Zamowienia/_elementy.jsx';
import {_produkty} from '../Zamowienia/_produkty.jsx';
import {_zestawy} from '../Zamowienia/_zestawy.jsx';

function ModalInsert({ openModalInsert, setOpenModalInsert }) {
    useEffect(()=>{
        dragElement(document.getElementById("mydiv"));
       },[])


      const handleChange_firna = event => {
        console.log(event.target.value);
        setSelected_firma(event.target.value);
      };
      const handleChange_klient = event => {
        console.log(event.target.value);
        setKlient(event.target.value);
      };
    
      const [selected_firma, setSelected_firma] = useState(_firma[0].nazwa);
      const [klient, setKlient] = useState(_klient[0].firma);
      const [elementy, setElementy] = useState(_elementy);
      const [produkty, setProdukty] = useState(_produkty);
      const [zestawy, setZestawy] = useState(_zestawy);


    return (
        <>
        <div className={style.container}>
          <div className={style.header}>
          </div>
          <div className={style.center}>


            <div className={style.row1}>

              <select value={selected_firma} onChange={handleChange_firna}>
                {_firma.map(option => (
                  <option key={option.id} value={option.nazwa}>
                    {option.nazwa}
                  </option>
                ))}
              </select>

              <select className={style.klient} value={klient} onChange={handleChange_klient}>
                {_klient.map(option => (
                  <option key={option.id} value={option.firma}>
                    {option.firma}
                  </option>
                ))}
              </select>

              <input className={style.tytul} value="Tytuł" type="text" />
              <input className={style.data} type="date"></input>
              <input className={style.data} type="date"></input>
            </div>

            <div className={style.row2}>
                <div className={style.produkty}>
produkty
                </div>
                <div className={style.elementy}>
elementy
                </div>
                <div className={style.zestawy}>
zestawy
                </div>
            </div>

            

          </div>


          <div className={style.footer}>
            <button onClick={() => setOpenModalInsert(false)} className={style.btn}>Anluj</button>
            <button className={style.btn}>Zapisz</button>
            <button className={style.btn}>Zapisz jako</button>
          </div>
          <div id="mydiv" className={style.mydiv}>
            {/* <div id="mydivheader" className={style.mydivheader}>Click here to move</div>
                    <p>Move</p>
                    <p>this</p>
                    <p>DIV</p> */}
          </div>
        </div>

        </>)
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