import React from "react";
import './App.css';
import Notes from './components/Notes/Notes';
import XL from './components/Druk/XL';
import H1 from './components/Druk/H1';
import H3 from './components/Druk/H3';
import DrukPlanXL from './components/DrukPlan/DrukPlanXL';
import Info from './components/Info/Info';
import Falc from './components/Falc/Falc';
import Papier from './components/Papier/Papier';
import Historia from './components/Historia/Historia';
import Wydany_papier from './components/Druk/Wydany_papier';
import Technologie from './artapp/Technologie/Technologie'
import Logowanie from './components/Logowanie/Logowanie';
import Print from "./artapp/Print/Print";
import Login from "./artapp/Login/Login";
import { useState, createContext,useEffect,useRef } from "react";
import History from "./artapp/History/History";
import Panel from "./artapp/Panel/Panel";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import TokenContext from "./artapp/Context/tokenContext";
import Header from "./artapp/Header/Header";
import Zamowienia from "./artapp/Zamowienia/Zamowienia";
import Stany from "./artapp/Zamowienia/ModalInsert/Stany";

import axios from "axios";
import { ip } from "./Host";
import io from "socket.io-client"

 import { getUsersList } from "./artapp/Actions/Start/usersList";
 
export default function App() {

  const [token, setToken] = useState('mr'); 
  // const [user, setUser] = useState([]); 
  const [users, setUsers] = useState([]); 
  const [rowSelected, setRowSelected] = useState([]); 
  const[message, setMessage] = useState("")
  const[messageReceived, setMessageReceived] = useState("")
  const[socketStan, setSocketStan] = useState([])

  let socket;


  useEffect(() => {
  
     socket = io.connect("http://localhost:3002")
     setSocketStan(socket)

     getUsersList(setUsers)

    

  }, []);
  //--
  useEffect(()=>{
    socket.on("receive_message", (data)=>{
   setMessageReceived(data.message)
    })
  },[socket])

  const sendMessage = () => {
    socket.emit("send_mesage", {message})
  }

  return (
    
    <BrowserRouter basename={''} >
    
      <TokenContext.Provider value={{ token, setToken,rowSelected, setRowSelected,users,getUsersList,socketStan}}>
        <Header />
        
        <Routes >
          <Route path='/' element={<Login />} />
          <Route path='/xl' element={<XL />} />
          <Route path='/H1' element={<H1 />} />
          <Route path='/H3' element={<H3 />} />
          <Route path='/login' element={<Login />} />
          <Route path='/okladki' element={<Notes />} />
          <Route path='/info' element={<Info />} />
          <Route path='/falc' element={<Falc />} />
          <Route path='/papier' element={<Wydany_papier />} />
          <Route path='/historia' element={<Historia />} />
          <Route path='/drukplanxl' element={<DrukPlanXL />} />
          <Route path='/Print' element={<Print />} />
          <Route path='/History' element={<History />} />
          <Route path='/Panel' element={<Panel />} />
          <Route path='/Technologie' element={<Technologie />} />
          {/* <Route path='*' element={<History />} /> */}
          <Route path='/zamowienia' element={<Zamowienia />} />
 
        </Routes>
      </TokenContext.Provider>
    </BrowserRouter>
  );
}






