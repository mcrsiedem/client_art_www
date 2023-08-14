import React, { Component, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import Row from "./Row";
import style from './Print.module.css';
import axios from "axios";
import { ip } from "../../Host";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Jobs = forwardRef((props, ref) => {

    const [notes, setNotes] = useState([]);

    useImperativeHandle(ref, () => ({
        callChildFunction(maszyna) {
            fechDruk(maszyna);
        }
    }));

    const [cookies, setCookie] = useCookies();
    const navigate = useNavigate();
  

    async function fechDruk(maszyna) {
        switch (maszyna) {
          case "XL":
            sessionStorage.setItem("blacha_id", "2");
            break;
          case "H1":
            sessionStorage.setItem("blacha_id", "1");
            break;
          case "H3":
            sessionStorage.setItem("blacha_id", "1");
            break;
        }

        const res = await axios.get(ip + 'druk/' + maszyna + '/1');
        const job = [...res.data];
        // const notes =[...res.data].filter(row=> row.status !== "Wydrukowane")
        //                           .filter(row=> row.status !== "Nowe")
        setNotes(job);
      //  console.log('notes ' + job);
    };


    const handleEditBlachy2 = (id) => {
        //  event.preventDefault();
        axios
          .put(ip + "updatenaswietlenieprimewww/", {
            id: id,
            ilosc: sessionStorage.getItem("ilosc_blach"),
            blacha_id: sessionStorage.getItem("blacha_id"),
            user_id: "1",
            token: cookies.token,
          })
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
              if (res.data.Error === "Wrong token") {
                navigate("/Login");
              }
              console.log("Błąd");
            }
            // console.log(res);
          });
      };




    useEffect(() => {
        fechDruk('XL');
    }, []);

    return (
        <div id='jobs' className={style.center}>
            <div id='scroll-container' className={style.body}>
                {notes.map((row) => {
                    return (
                        <Row
                            key={row.id}
                            title={row.klient}
                            body={row.praca}
                            poczatekDruku={row.poczatekDruku}
                            czasDruku={row.czasDruku}
                            koniecDruku={row.koniecDruku}
                            id={row.id}
                             handleEditBlachy={()=>handleEditBlachy2(row.id)}
                            klient={row.klient}
                            nrZlecenia={row.nrZlecenia}
                            rokZlecenia={row.rokZlecenia}
                            nazwa={row.nazwa}
                            // updateDrukNiewydrukowane={()=>this.updateDrukNiewydrukowane(row.id)}
                            typ={row.typ}
                            format={row.formatPapieru}
                            status={row.status}
                            spedycja={row.spedycja}
                            blachy={row.xl_ok}
                        />
                        
                    );
                })}
            </div>
            <h1>alert</h1>
        </div>
    );
}
)
export default Jobs;