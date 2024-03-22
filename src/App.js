import React from "react";
import './App.css';
import { useState,useEffect,useRef } from "react";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Panel from "./pages/Panel/Panel";
import Zamowienia from "./pages/Zamowienia/Zamowienia";
import Technologie from './pages/Technologie/Technologie'
import Print from "./pages/Print/Print";
import History from "./pages/History/History";
import Info from "./pages/Info/Info";

import {  BrowserRouter,Routes,Route} from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import { SocketContextProvider } from "./context/SocketContext";
import { ModalInsertContextProvider } from "./context/ModalInsertContext";
import { PreOrderContextProvider } from "context/PreOrderContext";

export default function App() {

  // const[socketReceive, setSocketReceive] = useState([])
  // const[socketStan, setSocketStan] = useState([]) // tutaj przechowywany jest socekt utworzony na stronie login

  useEffect(() => {
  }, []);

  return (
    <BrowserRouter basename={''} >
      <SocketContextProvider>
      <AppContextProvider>
      <PreOrderContextProvider>
      <ModalInsertContextProvider>
            {/* <Header /> */}
            <Routes >
              <Route path='/' element={<Login />} />
              <Route path='/login' element={<Login />} />
              <Route path='/Print' element={<Print />} />
              <Route path='/History' element={<History />} />
              <Route path='/Panel' element={<Panel />} />
              <Route path='/Technologie' element={<Technologie />} />
              <Route path='/zamowienia' element={<Zamowienia />} />
              <Route path='/info' element={<Info />} />
            </Routes>
      </ModalInsertContextProvider>
      </PreOrderContextProvider>
      </AppContextProvider>
      </SocketContextProvider>
    </BrowserRouter>
  );
}






