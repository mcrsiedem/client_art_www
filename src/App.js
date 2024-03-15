import React from "react";
import { useState, createContext,useEffect,useRef } from "react";
import './App.css';

import Technologie from './artapp/pages/Technologie/Technologie'
import Print from "./artapp/pages/Print/Print";
import Login from "./artapp/pages/Login/Login";
import History from "./artapp/pages/History/History";
import Panel from "./artapp/pages/Panel/Panel";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import TokenContext from "./artapp/context/tokenContext";
import Header from "./artapp/components/Header/Header";
import Zamowienia from "./artapp/pages/Zamowienia/Zamowienia";
// import Stany from "./artapp/Zamowienia/ModalInsert/Stany";

// import axios from "axios";
// import { ip } from "./Host";
// import io from "socket.io-client"

 import { getUsers } from "./artapp/actions/Users/getUsers";
 
import { AppContextProvider } from "./artapp/context/AppContext";
export default function App() {


  const [users, setUsers] = useState([]); 


  const[socketReceive, setSocketReceive] = useState([])
  const[socketStan, setSocketStan] = useState([]) // tutaj przechowywany jest socekt utworzony na stronie login

  useEffect(() => {
     getUsers(setUsers)
  }, []);


  return (
    
    <BrowserRouter basename={''} >
      <AppContextProvider>
      <TokenContext.Provider value={{ socketStan,socketReceive,setSocketStan,setSocketReceive}}>
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






