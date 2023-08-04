import React, { useEffect } from "react";
import style from '../History/Hisotry.module.css';

import ResizableTable from "./ResizableTable";
import Footer from "../Footer/Footer";

import Table from 'react-bootstrap/Table';


function History(){

    useEffect(()=>{
  





       },[])



    return (
    <div className={style.body}>


<Table striped bordered hover>
{/* <ResizableTable resizable={true} resizeOptions={{}}> */}
<thead>
        <tr>
      
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
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
          </tr>


        </tbody>
                {/* </ResizableTable> */}
            </Table>

            <footer className={style.footer}>
                {/* <button className={style.myButton} onClick={()=>giveMeJobs('H1')}>H1</button> */}
                <button className={style.myButton} >OK</button>

            </footer>


        </div>
    );
}

export default History;