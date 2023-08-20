import React, { Component, useEffect, useState, forwardRef, useImperativeHandle,useRef } from "react";
import Row from "./Row";
import style from './Print.module.css';
import axios from "axios";
import { ip } from "../../Host";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Dialog from "./Dialog";



const Jobs = forwardRef((props, ref) => {

  const statusList ={
    'Nowe': '1',
    'Pliki': '2',
    'Akcept': '3',
    'RIP': '4',
    'Zaświecone': '5',
    'Drukowanie': '6',
    'Wydrukowane': '7',
    'Falcowanie': '8',
    'Sfalcowane': '9',
    'Uszlachetnione': '10',
    'Oprawione': '11',
    'Oddane': '12',
    'Anulowane': '13',
    'Wstrzymane': '14',
    'Nieaktywne': '15',
  }

  const snackbarRef = useRef(null);
  const rowRef = useRef(null);


    const [blacha_id, setBlacha_id] = useState();
    const [notes, setNotes] = useState([]);
    const [sztuki, setSztuki] = useState();

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


    const handleEditBlachy = (sztuki,id) => {
        //  event.preventDefault();
        setSztuki(sztuki);
        axios
          .put(ip + "updatenaswietlenieprimewww/", {
            id: id,
            ilosc: sztuki,
            blacha_id: blacha_id,
            user_id: sessionStorage.getItem("id"),
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

          });
      };



      const handleEditStatus= (status,id,id_zlecenia) => {
        //  event.preventDefault();
        axios
          .put(ip + "updateStatusWWW/", {
            id: id,
            value: statusList[status],
            idzlecenia: id_zlecenia,
            user_id: sessionStorage.getItem("id"),
            token: cookies.token,
          })
          .then((res) => {
            if (res.status === 201) {
              // snackbarRef.current.show();
              rowRef.current.confirm();


            } else {
              if (res.data.Error === "Wrong token") {
                navigate("/Login");
              }
              console.log("Błąd");
            }
  
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
                            handleEditBlachy={(sztuki)=>handleEditBlachy(sztuki,row.id)}
                            klient={row.klient}
                            nrZlecenia={row.nrZlecenia}
                            rokZlecenia={row.rokZlecenia}
                            nazwa={row.nazwa}
                            typ={row.typ}
                            format={row.formatPapieru}
                            status={row.status}
                            spedycja={row.spedycja}
                            blachy={row.xl_ok}
                            id_zlecenia={row.id_zlecenia}
                            handleEditStatus={(status)=>handleEditStatus(status,row.id,row.id_zlecenia)}
                            ref={rowRef}
                        />
                        
                    );
                })}
              <Dialog  sztuki={sztuki} ref={snackbarRef}/>

            </div>
         
            
        </div>
    );
}
)
export default Jobs;