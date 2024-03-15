import React from "react";
import './App.css';


import Technologie from './artapp/Technologie/Technologie'

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
 
 import { AppContextProvider } from "./artapp/Context/AppContext";
export default function App() {

  const [token, setToken] = useState('mr'); 
  const [users, setUsers] = useState([]); 
  const [user, setUser] = useState([]); 
  const [rowSelected, setRowSelected] = useState([]); 
  const[socketReceive, setSocketReceive] = useState([])
  const[socketStan, setSocketStan] = useState([]) // tutaj przechowywany jest socekt utworzony na stronie login

  useEffect(() => {
  
      //  socket = io.connect("http://localhost:3002")
    // socket = io.connect("https://printforce.pl:3443")
    //  setSocketStan(socket)

     getUsersList(setUsers)

    

  }, []);
  //--
  // useEffect(()=>{
  //   socket.on("receive_message", (data)=>{
  //     //tu przychodzi odpowiedź i jest zapisana w contexcie
  //     setSocketReceive(data.message)
  //   })
  // },[socket])


  return (
    
    <BrowserRouter basename={''} >
      <AppContextProvider user={user}>
      <TokenContext.Provider value={{ token, setToken,rowSelected, setRowSelected,users,getUsersList,socketStan,socketReceive,setSocketStan,setSocketReceive}}>
        <Header />
        
        <Routes >
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Print' element={<Print />} />
          <Route path='/History' element={<History />} />
          <Route path='/Panel' element={<Panel />} />
          <Route path='/Technologie' element={<Technologie />} />
          <Route path='/zamowienia' element={<Zamowienia />} />
 
        </Routes>
      </TokenContext.Provider>
      </AppContextProvider>
    </BrowserRouter>
  );
}






