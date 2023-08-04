import React from "react";
import style from '../History/Hisotry.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ResizableTable from "./ResizableTable";


function History(){
    return (
    <div className={style.body}>



<ResizableTable resizable={true} resizeOptions={{}}>
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
        </tbody>
      </ResizableTable>
    </div>
    );
}

export default History;