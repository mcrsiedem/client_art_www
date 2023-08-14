import React from "react";
import style from '../Print/Row.module.css';
import axios from "axios";
import { ip } from "../../Host";

import { useState} from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';



function Row(props) {
    const [blachy, setBlachy] = useState('x');
    const [cookies, setCookie] = useCookies();
    const navigate = useNavigate();

    const status = props.status;
    const czas = props.czasDruku;

 const id = props.id;



    function ChceckStatus(status) {
        // ustawwia styl css w zależności od statusu
        // if (typ==='Przerwa' ) return style.ripzaswiecone;
        if (status === 'Wydrukowane' ^ status === 'Sfalcowane' ^ status === 'Falcowanie') return style.wydrukowane;
        if (status === 'RIP' ^ status === 'Zaświecone') return style.ripzaswiecone;
        if (status === 'Akcept') return style.akcept;
        if (status === 'Nowe') return style.nowe;
        if (status === 'Pliki') return style.pliki;
        return style.body;
    }

    function TimeFormatter(czas) {
        // zamienia czas podnay w minutach na hh:mm

        let minuty = czas % 60;
        let godziny = Math.round(czas / 60);

        if (godziny < 10) godziny = '0' + godziny;
        if (minuty < 10) minuty = '0' + minuty;

        return godziny + ':' + minuty;
    }

    function YearFormatter(czas) {
        // zamienia czas podnay w minutach na hh:mm

        return '20' + czas.substring(2)
    }


    const handleEditBlachy = () => {
        //  event.preventDefault();
        axios
          .put(ip + "updatenaswietlenieprimewww/",{ id: props.id, ilosc: blachy, blacha_id: sessionStorage.getItem("blacha_id") ,user_id:"1",token: cookies.token})
          .then((res) => {
           
            if (res.status === 201) {
                console.log(res.data);

             alert("OK");
               
              //    token.setToken(res.data);
              // localStorage.setItem('header', true)
            //   setCookie("token", res.data, { path: "/" });
            //   header.style.display = "grid";
            //   navigate("/ArtApp");
            } else {
             
               if(res.data.Error==="Wrong token"){
                navigate("/Login");
               }
               console.log("Błąd");
            }
            // console.log(res);
          });
      };




    return (

        <div id={props.id} className={ChceckStatus(status) + ' ' + style.body}>

            <div className={style.druk}>
                <div className={style.bold}>{props.poczatekDruku}</div>
                <div className={style.koniecdruku}>  {props.koniecDruku} {TimeFormatter(czas)}  </div>
            </div>


            <div className={style.nrzlecenia}>
                <div className={style.bold}>{props.nrZlecenia} </div>
                <div>{props.rokZlecenia} </div>
            </div>


            <div className={style.klient} >
                <div>
                    <div className={style.bold}>{props.title} </div>
                    <div>{props.body}</div>
                </div>
            </div>


            <div className={style.klient} >
                <div>
                    <div > {props.format} </div>
                </div>
            </div>
            <div className={style.klient} >
                <div>
                    <div > {props.spedycja} </div>
                </div>
            </div>
            <div className={style.blachy}>
                <input  
                defaultValue={props.blachy} 
                onChange={event => 
                    setBlachy(event.target.value)
                }
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                     console.log("Blachy: " +blachy)
                    handleEditBlachy();
                    //  console.log("XX: " +props.xx)
                    }
                  }}
                />

            </div>


            <div className={style.combo}>
                <div >{props.status} </div>
            </div>


            <div className={style.checbox} >
                <input className={style.checboxinput} type="checkbox" id="" name="" value="" />
            </div>

        </div>

    );
}

export default Row;