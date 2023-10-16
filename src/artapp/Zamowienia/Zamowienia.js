import React, { useEffect,useState } from "react";


import ResizableTable from "./ResizableTable";

import axios from "axios";

import Table from 'react-bootstrap/Table';
import { ip } from "../../Host";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import Modal from '../Zamowienia/Modal';
import ModalInsert from '../Zamowienia/ModalInsert';

import style from '../Zamowienia/Zamowienia.module.css';
//import './Zamowienia.css';

function Zamowienia(){

    const zam =[
        {
        id: 1, 
        zamowienie_nr : "606103",
        klient_id: "1",
        produkt: " Katalog",
        data: "Katalog",
        user: "Katalog",
        kategoria: "Katalog",
        event: "Katalog"
        },
        {
            id: 2, 
            zamowienie_nr : "606103",
            klient_id: "1",
            produkt: " Katalog",
            data: "Katalog",
            user: "Katalog",
            kategoria: "Katalog",
            event: "Katalog"
            },
            {
                id: 3, 
                zamowienie_nr : "606103",
                klient_id: "1",
                produkt: " Katalog",
                data: "Katalog",
                user: "Katalog",
                kategoria: "Katalog",
                event: "Katalog"
                },
                {
                    id: 4, 
                    zamowienie_nr : "606103",
                    klient_id: "1",
                    produkt: " Katalog",
                    data: "Katalog",
                    user: "Katalog",
                    kategoria: "Katalog",
                    event: "Katalog"
                    },
                    {
                        id: 5, 
                        zamowienie_nr : "606103",
                        klient_id: "1",
                        produkt: " Katalog",
                        data: "Katalog",
                        user: "Katalog",
                        kategoria: "Katalog",
                        event: "Katalog"
                        },
                        {
                            id: 6, 
                            zamowienie_nr : "606103",
                            klient_id: "1",
                            produkt: " Katalog",
                            data: "Katalog",
                            user: "Katalog",
                            kategoria: "Katalog",
                            event: "Katalog"
                            },
                            {
                                id: 2, 
                                zamowienie_nr : "606103",
                                klient_id: "1",
                                produkt: " Katalog",
                                data: "Katalog",
                                user: "Katalog",
                                kategoria: "Katalog",
                                event: "Katalog"
                                },
                                {
                                    id: 2, 
                                    zamowienie_nr : "606103",
                                    klient_id: "1",
                                    produkt: " Katalog",
                                    data: "Katalog",
                                    user: "Katalog",
                                    kategoria: "Katalog",
                                    event: "Katalog"
                                    },
                                    {
                                        id: 2, 
                                        zamowienie_nr : "606103",
                                        klient_id: "1",
                                        produkt: " Katalog",
                                        data: "Katalog",
                                        user: "Katalog",
                                        kategoria: "Katalog",
                                        event: "Katalog"
                                        },
                                        {
                                            id: 2, 
                                            zamowienie_nr : "606103",
                                            klient_id: "1",
                                            produkt: " Katalog",
                                            data: "Katalog",
                                            user: "Katalog",
                                            kategoria: "Katalog",
                                            event: "Katalog"
                                            },
                                            {
                                                id: 2, 
                                                zamowienie_nr : "606103",
                                                klient_id: "1",
                                                produkt: " Katalog",
                                                data: "Katalog",
                                                user: "Katalog",
                                                kategoria: "Katalog",
                                                event: "Katalog"
                                                },
                                                {
                                                    id: 3, 
                                                    zamowienie_nr : "606103",
                                                    klient_id: "1",
                                                    produkt: " Katalog",
                                                    data: "Katalog",
                                                    user: "Katalog",
                                                    kategoria: "Katalog",
                                                    event: "Katalog"
                                                    },
                                                    
                                                    {
                                                        id: 3, 
                                                        zamowienie_nr : "606103",
                                                        klient_id: "1",
                                                        produkt: " Katalog",
                                                        data: "Katalog",
                                                        user: "Katalog",
                                                        kategoria: "Katalog",
                                                        event: "Katalog"
                                                        },
                                                        {
                                                            id: 3, 
                                                            zamowienie_nr : "606103",
                                                            klient_id: "1",
                                                            produkt: " Katalog",
                                                            data: "Katalog",
                                                            user: "Katalog",
                                                            kategoria: "Katalog",
                                                            event: "Katalog"
                                                            },
                                                            {
                                                                id: 2, 
                                                                zamowienie_nr : "606103",
                                                                klient_id: "1",
                                                                produkt: " Katalog",
                                                                data: "Katalog",
                                                                user: "Katalog",
                                                                kategoria: "Katalog",
                                                                event: "Katalog"
                                                                },
                                                                {
                                                                    id: 3, 
                                                                    zamowienie_nr : "606103",
                                                                    klient_id: "1",
                                                                    produkt: " Katalog",
                                                                    data: "Katalog",
                                                                    user: "Katalog",
                                                                    kategoria: "Katalog",
                                                                    event: "Katalog"
                                                                    },
                                                                    {
                                                                        id: 4, 
                                                                        zamowienie_nr : "606103",
                                                                        klient_id: "1",
                                                                        produkt: " Katalog",
                                                                        data: "Katalog",
                                                                        user: "Katalog",
                                                                        kategoria: "Katalog",
                                                                        event: "Katalog"
                                                                        },
                                                                        {
                                                                            id: 5, 
                                                                            zamowienie_nr : "606103",
                                                                            klient_id: "1",
                                                                            produkt: " Katalog",
                                                                            data: "Katalog",
                                                                            user: "Katalog",
                                                                            kategoria: "Katalog",
                                                                            event: "Katalog"
                                                                            },
                                                                            {
                                                                                id: 6, 
                                                                                zamowienie_nr : "606103",
                                                                                klient_id: "1",
                                                                                produkt: " Katalog",
                                                                                data: "Katalog",
                                                                                user: "Katalog",
                                                                                kategoria: "Katalog",
                                                                                event: "Katalog"
                                                                                },
                                                                                {
                                                                                    id: 2, 
                                                                                    zamowienie_nr : "606103",
                                                                                    klient_id: "1",
                                                                                    produkt: " Katalog",
                                                                                    data: "Katalog",
                                                                                    user: "Katalog",
                                                                                    kategoria: "Katalog",
                                                                                    event: "Katalog"
                                                                                    },
                                                                                    {
                                                                                        id: 2, 
                                                                                        zamowienie_nr : "606103",
                                                                                        klient_id: "1",
                                                                                        produkt: " Katalog",
                                                                                        data: "Katalog",
                                                                                        user: "Katalog",
                                                                                        kategoria: "Katalog",
                                                                                        event: "Katalog"
                                                                                        },
                                                                                        {
                                                                                            id: 2, 
                                                                                            zamowienie_nr : "606103",
                                                                                            klient_id: "1",
                                                                                            produkt: " Katalog",
                                                                                            data: "Katalog",
                                                                                            user: "Katalog",
                                                                                            kategoria: "Katalog",
                                                                                            event: "Katalog"
                                                                                            },
                                                                                            {
                                                                                                id: 2, 
                                                                                                zamowienie_nr : "606103",
                                                                                                klient_id: "1",
                                                                                                produkt: " Katalog",
                                                                                                data: "Katalog",
                                                                                                user: "Katalog",
                                                                                                kategoria: "Katalog",
                                                                                                event: "Katalog"
                                                                                                },
                                                                                                {
                                                                                                    id: 2, 
                                                                                                    zamowienie_nr : "606103",
                                                                                                    klient_id: "1",
                                                                                                    produkt: " Katalog",
                                                                                                    data: "Katalog",
                                                                                                    user: "Katalog",
                                                                                                    kategoria: "Katalog",
                                                                                                    event: "Katalog"
                                                                                                    },
                                                                                                    {
                                                                                                        id: 3, 
                                                                                                        zamowienie_nr : "606103",
                                                                                                        klient_id: "1",
                                                                                                        produkt: " Katalog",
                                                                                                        data: "Katalog",
                                                                                                        user: "Katalog",
                                                                                                        kategoria: "Katalog",
                                                                                                        event: "Katalog"
                                                                                                        },
                                                                                                        
                                                                                                        {
                                                                                                            id: 3, 
                                                                                                            zamowienie_nr : "606103",
                                                                                                            klient_id: "1",
                                                                                                            produkt: " Katalog",
                                                                                                            data: "Katalog",
                                                                                                            user: "Katalog",
                                                                                                            kategoria: "Katalog",
                                                                                                            event: "Katalog"
                                                                                                            },
                                                                                                            {
                                                                                                                id: 3, 
                                                                                                                zamowienie_nr : "606103",
                                                                                                                klient_id: "1",
                                                                                                                produkt: " Katalog",
                                                                                                                data: "Katalog",
                                                                                                                user: "Katalog",
                                                                                                                kategoria: "Katalog",
                                                                                                                event: "Katalog"
                                                                                                                },

    ]

        
    const [zamowienia, setZamowienia] = useState(zam);
    
    const gray = {color:'gray'
    }
    const lightgreen = {color:'lightgreen'
    }

    const [row,setRow] =useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openModalInsert, setOpenModalInsert] = useState(false);

    const [cookies, setCookie] = useCookies();
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    function dodaj_clikHandler(){
       console.log("ok");
       setOpenModalInsert(true);
    }

    async function fechHistory() {
        const res = await axios.get(ip + 'historia_short');
        const job = [...res.data];
        // const notes =[...res.data].filter(row=> row.status !== "Wydrukowane")
        //                           .filter(row=> row.status !== "Nowe")
        setData(job);

        setData(zamowienia);

    };

    async function checkToken() {
        axios.get(ip + '/islogged/'+ cookies.token)
        .then(res=> {
          if(res.data.Status === "Success"){
            fechHistory();
    
          } else{
        
            navigate('/Login')
    
          }
        })

    };


    useEffect(()=>{
        document.getElementById("header").style.display = "grid";
        checkToken();
       },[])

function kolor(k){
    if (k==="6") return style.alert
}
    return (
      <div className={style.body}>

        
       <div className={style.tableContainer}>
                            <table>
                            <thead >
                                <tr>
                                <th>#</th>
                                <th>nr zamówienia</th>
                                <th>Katalog</th>
                                <th>Element</th>
                                <th>Ilość stron</th>
                                <th>Gdzie</th>
                                <th>Co</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((row) => {
                                return (
                                    <tr
                            //   className='alert'
                        //   ${active ? "active" : ""}
                                    // className={row.id === 6 ? style.alert : style.alert2}
                                
                                    key={row.id}
                                    onDoubleClick={(node, event) => {
                                        // console.log(row.user);
                                        setOpenModal(true);
                                        setRow({ id: row.id, user: row.user });
                                    }}
                                    >
                                    <td>{row.id} </td>
                                    <td>{row.produkt} </td>
                                    <td>{row.data} </td>
                                    <td>{row.user}</td>
                                    <td>{row.kategoria}</td>
                                    <td>{row.event}</td>
                                    <td>{row.event}</td>
                                    </tr>
                                );
                                })}
                            </tbody>
                            </table>
        </div>






                    <footer className={style.footer}>
                    {/* <button className={style.myButton} onClick={()=>giveMeJobs('H1')}>H1</button> */}
                    <button className={style.myButton}>OK</button>
                    <button
                        className={style.myButton}
                        onClick={() => {
                        dodaj_clikHandler();
                        }}
                    >
                        Dodaj
                    </button>
                    </footer>

        {openModal && (
          <Modal openModal={openModal} setOpenModal={setOpenModal} row={row} />
        )}
        {openModalInsert && (
          <ModalInsert
            openModalInsert={openModalInsert}
            setOpenModalInsert={setOpenModalInsert}
          />
        )}
      </div>
    );
}

export default Zamowienia;