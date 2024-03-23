import React, { useEffect,useState } from "react";


import ResizableTable from "./ResizableTable";

import axios from "axios";

import Table from 'react-bootstrap/Table';
import { IP } from "../../utils/Host2";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

import style from '../History/Hisotry.module.css';

function History(){
    const [row,setRow] =useState([]);


    const [cookies, setCookie] = useCookies();
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    async function fechHistory() {
        const res = await axios.get(IP + 'historia_short');
        const job = [...res.data];
        // const notes =[...res.data].filter(row=> row.status !== "Wydrukowane")
        //                           .filter(row=> row.status !== "Nowe")
        setData(job);

    };

    async function checkToken() {
        axios.get(IP + '/islogged/'+ sessionStorage.getItem("token"))
        .then(res=> {
          if(res.data.Status === "Success"){
            fechHistory();
    
          } else{
        
            navigate('/Login')
    
          }
        })

    };


    useEffect(()=>{
        checkToken();
       },[])


    return (
    <div className={style.body}>


            {/* <Table strIPed bordered hover> */}
                <ResizableTable resizable={true} resizeOptions={{}}> 
                <thead>
                    <tr>
                    <th>#</th>
                        <th>Kiedy</th>
                        <th>Kto</th>
                        <th>Gdzie</th>
                        <th>Co</th>
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
                            
                                setRow({id: row.id, user: row.user});
                              }
                                }
                            >
                                <td style={{color:'lightgreen'}}>{row.id} </td>
                                <td>{row.data} </td>
                                <td>{row.user}</td>
                                <td style={{color:'gray'}}>{row.kategoria}</td>
                                <td>{row.event}</td>
                            </tr>
                        );
                    })}
                </tbody>
                </ResizableTable> 
            {/* </Table> */}

            <footer className={style.footer}>
                {/* <button className={style.myButton} onClick={()=>giveMeJobs('H1')}>H1</button> */}
                <button className={style.myButton} >OK</button>
                
            </footer>
   

        </div>
    );
}

export default History;