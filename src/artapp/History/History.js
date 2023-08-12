import React, { useEffect,useState } from "react";
import style from '../History/Hisotry.module.css';

import ResizableTable from "./ResizableTable";

import axios from "axios";

import Table from 'react-bootstrap/Table';
import { ip } from "../../Host";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';


function History(){
    const [cookies, setCookie] = useCookies();
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    async function fechHistory() {
        const res = await axios.get(ip + 'historia_short');
        const job = [...res.data];
        // const notes =[...res.data].filter(row=> row.status !== "Wydrukowane")
        //                           .filter(row=> row.status !== "Nowe")
        setData(job);

    };

    async function checkToken() {
        axios.get(ip + '/islogged/'+ cookies.token).
        then(res=> {
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


<Table  striped bordered hover>
 {/* <ResizableTable resizable={true} resizeOptions={{}}>  */}
                <thead>
                    <tr>

                        <th >Kiedy</th>
                        <th>Kto</th>
                        <th>Gdzie</th>
                        <th>Co</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((row) => {
                    return (
                        <tr key={row.id}>
                            <td>{row.data}</td>
                            <td>{row.user}</td>
                            <td>{row.kategoria}</td>
                            <td>{row.event}</td>
                            
                        
                            </tr>
                    );
                })}
       
                    {/* <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </tr> */}


                </tbody>
                {/* </ResizableTable>  */}
            </Table>

            <footer className={style.footer}>
                {/* <button className={style.myButton} onClick={()=>giveMeJobs('H1')}>H1</button> */}
                <button className={style.myButton} >OK</button>

            </footer>


        </div>
    );
}

export default History;