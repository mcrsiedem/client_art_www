import React from "react";
import './App.css';
import { useState, createContext,useEffect,useRef } from "react";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Panel from "./pages/Panel/Panel";
import Zamowienia from "./pages/Zamowienia/Zamowienia";
import Technologie from './pages/Technologie/Technologie'
import Print from "./pages/Print/Print";
import History from "./pages/History/History";
import {  BrowserRouter,Routes,Route} from "react-router-dom";
import TokenContext from "./context/tokenContext";
import { AppContextProvider } from "./context/AppContext";
import { SocketContextProvider } from "./context/SocketContext";

export default function App() {

  const[socketReceive, setSocketReceive] = useState([])
  const[socketStan, setSocketStan] = useState([]) // tutaj przechowywany jest socekt utworzony na stronie login

  useEffect(() => {
  }, []);

  return (
    <BrowserRouter basename={''} >
      <SocketContextProvider>
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
      </SocketContextProvider>
    </BrowserRouter>
  );
}






