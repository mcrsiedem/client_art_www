import React, { useEffect,useState } from "react";


import ResizableTable from "./ResizableTable";

import axios from "axios";

import Table from 'react-bootstrap/Table';
import { ip } from "../../Host";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import Modal from '../Zamowienia/Modal/Modal';
import ModalInsert from './ModalInsert/ModalInsert';

import style from '../Zamowienia/Zamowienia.module.css';
import {zamowienia_temp} from '../Zamowienia/zam';
//import './Zamowienia.css';

function Zamowienia(){



        
    const [zamowienia, setZamowienia] = useState(zamowienia_temp);
    
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
                                    <th>#</th> <th>nr zamówienia</th> <th>Katalog</th> <th>Element</th> <th>Ilość stron</th> <th>Gdzie</th> <th>Co</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((row) => {
                                return (
                                    <tr
                                    // className={row.id === 6 ? style.bgdanger : ""}
                                    key={row.id}
                                    onDoubleClick={(node, event) => {
                               
                                        setOpenModal(true);
                                        setRow({ id: row.id, user: row.user });
                                    }}
                                    >
                                    <td>{row.id} </td>
                                    <td>{row.zamowienie_nr} </td>
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
                            <button className={style.myButton}  onClick={() => { dodaj_clikHandler(); }} > Dodaj </button>
                    </footer>

        {openModal && (<Modal openModal={openModal} setOpenModal={setOpenModal} row={row} />)}
        {openModalInsert && ( <ModalInsert openModalInsert={openModalInsert} setOpenModalInsert={setOpenModalInsert}/>)}


      </div>
    );
}

export default Zamowienia;