
import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import axios from "axios";
import { ip } from "../../Host";
import TechnologiaTable from "./components/Table/TechnologiaTable";
import TechnologiaStage from "../TechnologiaStage/TechnologiaStage"
import style from "./Technologie.module.css";
import io from "socket.io-client"

export default function Technologie(){

  const [dataTechnologie,setDataTechnologie] =useState([]);
  const [isStageTechnologiaVisible,setStageTechnologiaVisible] =useState(false);
  const [activeRowId,setActiveRowId] =useState();
  const[message, setMessage] = useState("")
  const[messageReceived, setMessageReceived] = useState("")
  const socket = io.connect("http://localhost:3002")
    const effectRan = useRef(false);
    useEffect(() => {
      if (effectRan.current === true) {
        //  fetchTechnologie();
        // const socket = io.connect("http://localhost:3002")
      
      }
      return () => {
        effectRan.current = true;
      };
    }, []);


    useEffect(()=>{
      socket.on("receive_message", (data)=>{
     setMessageReceived(data.message)
      })
    },[socket])

   async function fetchTechnologie(){
      const res = await axios.get(ip + "technologie");
      let job =[...res.data]
      setDataTechnologie(job)
      console.log(job)
    }


const sendMessage = () => {
  socket.emit("send_mesage", {message})
}
    return(
    <>
    <input onChange={(e)=>setMessage(e.target.value)}></input> 
    <button onClick={sendMessage}>Send</button>
    <h1>Message:</h1>
    {messageReceived}
            {/* <Header/>
            <TechnologiaTable dataTechnologie={dataTechnologie} setStageTechnologiaVisible={setStageTechnologiaVisible} setActiveRowId={setActiveRowId}/>
            <Footer/>

            {isStageTechnologiaVisible && (
            <TechnologiaStage
        
            />
          )} */}
    </>
    )
    
}