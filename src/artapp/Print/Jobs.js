import React, { Component, useEffect, useState, forwardRef, useImperativeHandle,useRef } from "react";
import Row from "./Row";
import style from './Print.module.css';
import axios from "axios";
import { ip } from "../../Host";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Dialog from "./Dialog";



const Jobs = forwardRef((props, ref) => {

  const snackbarRef = useRef(null);

    const [blacha_id, setBlacha_id] = useState();
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
            setBlacha_id("2")
            break;
          case "H1":
            setBlacha_id("1")
            break;
          case "H3":
            setBlacha_id("1")
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
            blacha_id: blacha_id,
            user_id: "1",
            token: cookies.token,
          })
          .then((res) => {
            if (res.status === 201) {
              console.log(res.data);
    
              snackbarRef.current.show();
    
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
              <Dialog  ref={snackbarRef}/>

            </div>
         
            
        </div>
    );
}
)
export default Jobs;