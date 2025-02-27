import React from "react";
import './App.css';
import Login from "./pages/Login/Login";
import Panel from "./pages/Panel/Panel"
import Zamowienia from "./pages/Zamowienia/Zamowienia";

import History from "./pages/History/History";
import Info from "./pages/Info/Info";
import Info2 from "pages/Info/Info2";
import ProcesyView from "pages/ProcesyView/ProcesyView";

import { BrowserRouter,Routes,Route} from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import { SocketContextProvider } from "./context/SocketContext";
import { ModalInsertContextProvider } from "./context/ModalInsertContext";
import { PreOrderContextProvider } from "context/PreOrderContext";
import { TechnologyContextProvider } from "context/TechnologyContext";
import Ustawienia from "pages/Ustawienia/Ustawienia";
import TechnologieView from "pages/Technologie/TechnologieView";
import ZamowienieStage from "pages/ZamowienieStage/ZamowienieStage";

export default function App() {


  return (
    <BrowserRouter basename={''} >
      <SocketContextProvider>
      <AppContextProvider>
      <TechnologyContextProvider>
      <PreOrderContextProvider>
      <ModalInsertContextProvider>
            <Routes >
              <Route path='/' element={<Login />} />
              <Route path='/login' element={<Login />} />
              <Route path='/ProcesyView' element={<ProcesyView />} />
              <Route path='/History' element={<History />} />
              <Route path='/Panel' element={<Panel />} />
              <Route path='/Technologie' element={<TechnologieView />} />
              <Route path='/zamowienia' element={<Zamowienia />} />
              <Route path='/info' element={<Info />} />
              <Route path='/info2' element={<Info2 />} />
              <Route path='/info2' element={<Info2 />} />
              <Route path='/ustawienia' element={<Ustawienia />} />
              <Route path='/zamowienie' element={<ZamowienieStage />} />
            </Routes>
      </ModalInsertContextProvider>
      </PreOrderContextProvider>
      </TechnologyContextProvider>
      </AppContextProvider>
      </SocketContextProvider>
      
    </BrowserRouter>
  );
}






