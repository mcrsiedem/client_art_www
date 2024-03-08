import React, { useState,useRef } from "react";
import style from "./TableClient.module.css";
import DeleteClient from "./DeleteClient";

import iconCopy from "../../../svg/copy.svg";

import axios from "axios";
import { ip } from "../../../Host";

import iconX from "../../../svg/x.svg";
import iconDelete from "../../../svg/trash2.svg"
export default function Table({klienciWyszukiwarka,  daneZamowienia,  setDaneZamowienia, getClients}) {
   
  const [selectedRow, setSelectedRow] = useState('');
  const [isShowDeleteClientPane, setShowDeleteClientPane] = useState(false);
  const rowID = useRef();
  // const  deleteKlient  = async (id) =>{
  
  //   await axios.put(ip + "klient", {
  //       id: id,
  
  //     })
  //     .then((res2) => {
  //        getClients()
      
  //     })
       
    
  //   }
   return <div className={style.main}>
        
          <table className={style.table2}>
            <thead>
              <tr>
                <th className={style.id}>#</th>
                <th className={style.firma}>Firma</th>
                <th className={style.adres}>Adres</th>
                <th className={style.kod}>Kod</th>
                <th className={style.nip}>NIP</th>
                <th className={style.opiekun}>Opiekun</th>
                <th className={style.opiekun}>-</th>
  
              </tr>
            </thead>
            <tbody className={style.center}>
              {klienciWyszukiwarka.map((row,index) => {
                return (
                  <tr 
                    key={row.id}
                    onDoubleClick={()=>chooseClient(daneZamowienia,setDaneZamowienia,row.id)}
                  >
                    <ID row={row} index={index+1}/>
                    <Firma row={row}/>
                    <Adres row={row}/>
                    <Kod row={row}/>
                    <NIP row={row}/>
                    <Opiekun row={row}/>
                    <DeleteIcon row={row} rowID={rowID} setSelectedRow={setSelectedRow} setShowDeleteClientPane={setShowDeleteClientPane}/>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {isShowDeleteClientPane && (
          <DeleteClient
          setShowDeleteClientPane={setShowDeleteClientPane}
            getClients= {()=>getClients()}
            rowID={rowID}
          />
        )}
        </div>
  
  }

  const chooseClient = (daneZamowienia,setDaneZamowienia,id) => {
    setDaneZamowienia({...daneZamowienia, klient_id : id})

  }
  function DeleteIcon({ row,rowID,setShowDeleteClientPane }) {
    return (
      <img
        className={style.icon}
        src={iconDelete}
        onClick={() => {
          rowID.current = row.id;
          setShowDeleteClientPane(true)
        }}
        alt="Procesy"
      />
    );
  }
  function UseIcon({ showAddClientStage }) {
    return (
      <img
        className={style.icon}
        src={iconX}
        onClick={() => {
          showAddClientStage(false);
        }}
        alt="Procesy"
      />
    );
  }
  
  function EditIcon({ showAddClientStage }) {
    return (
      <img
        className={style.icon}
        src={iconX}
        onClick={() => {
          showAddClientStage(false);
        }}
        alt="Procesy"
      />
    );
  }
  
  function Firma({ row }) {
    return (
      <td>{row.firma}</td>
    );
  }
  function Adres({ row }) {
    return (
      <td>{row.adres}</td>
    );
  }
  
  function ID({ row,index }) {
    return (
      <td>{index}</td>
    );
  }

  function Kod({ row }) {
    return (
      <td>{row.kod}</td>
    );
  }

  function NIP({ row }) {
    return (
      <td>{row.nip}</td>
    );
  }

  function Opiekun({ row }) {
    return (
      <td>{row.opiekun_nazwa}</td>
    );
  }
 

  

