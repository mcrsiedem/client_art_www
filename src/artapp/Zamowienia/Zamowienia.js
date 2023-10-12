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

function Zamowienia(){

    const zam =[
        {
        id: 1, 
        zamowienie_nr : "",
        klient_id: "1",
        produkt: " ",
        data: "",
        user: "",
        kategoria: "",
        event: ""
        },

    
    ]
        
    const [zamowienia, setZamowienia] = useState(zam);
    
    const gray = {color:'gray'
    }
    const lightgreen = {color:'gray'
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


    return (
    <div className={style.body}>


            {/* <Table striped bordered hover> */}
                <ResizableTable resizable={true} resizeOptions={{}}> 
                <thead >
                    <tr >
                    <th class="w-15" style={lightgreen} >#</th>
                    <th style={lightgreen}>nr zamówienia</th>
                    <th style={lightgreen}>Katalog</th>
                        <th style={lightgreen}>Element</th>
                        <th style={lightgreen}>Ilość stron</th>
                        <th style={lightgreen}>Gdzie</th>
                        <th style={lightgreen}>Co</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => {
                        return (
                            <tr
                                class={row.event === 'b' ? "table-danger" : ""}
                                key={row.id}
                                onDoubleClick={(node, event) => {
                                    // console.log(row.user);  
                                setOpenModal(true); 
                                setRow({id: row.id, user: row.user});
                              }
                                }
                            >
                                <td  style={gray}>{row.id} </td>
                                <td style={gray}>{row.produkt} </td>
                                <td style={gray}>{row.data} </td>
                                <td style={gray}>{row.user}</td>
                                <td style={gray}>{row.kategoria}</td>
                                <td className={style.row} >{row.event}</td>
                                <td className={style.row} >{row.event}</td>
                           
                            </tr>
                            
                        );
                    })}
                </tbody>
                </ResizableTable> 
            {/* </Table> */}

            <footer className={style.footer}>
                {/* <button className={style.myButton} onClick={()=>giveMeJobs('H1')}>H1</button> */}
                <button className={style.myButton}>OK</button>
                <button className={style.myButton}  onClick={()=>{dodaj_clikHandler()}} >Dodaj</button>
                
            </footer>
            {openModal &&
                <Modal openModal={openModal} setOpenModal={setOpenModal} row={row} />
            }
            {openModalInsert &&
                <ModalInsert openModalInsert={openModalInsert} setOpenModalInsert={setOpenModalInsert} />
            }

        </div>
    );
}

export default Zamowienia;