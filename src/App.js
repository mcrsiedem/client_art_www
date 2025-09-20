import React from "react";
import './App.css';
import Login from "./pages/Login/Login";
import Panel from "./pages/Panel/Panel"
import Zamowienia from "./pages/Zamowienia/Zamowienia";

import History from "./pages/History/History";

import ProcesyView from "pages/ProcesyView/ProcesyView";

import { BrowserRouter,Routes,Route} from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import { SocketContextProvider } from "./context/SocketContext";
import { ModalInsertContextProvider } from "./context/ModalInsertContext";
import { PreOrderContextProvider } from "context/PreOrderContext";
import { TechnologyContextProvider } from "context/TechnologyContext";
import Ustawienia from "pages/Ustawienia/Ustawienia";
import TechnologieView from "pages/Technologie/TechnologieView";
import OprawaView from "pages/OprawaView/OprawaView";
import ProcesyMini from "pages/ProcesyMini/ProcesyMini";
import ProcesoryMini from "pages/Panel/PrcesoryMini";
import Statystyki from "pages/Statystyki/Statystyki";
import SandBox from "pages/SandBox/SandBox";
import Gant from "pages/Gant/Gant";
import ZamowieniaFaktury from "pages/Faktury/ZamowieniaFaktury";

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
              <Route path='/ProcesyMini' element={<ProcesyMini />} />
              <Route path='/Procesory' element={<ProcesoryMini />} />
              <Route path='/OprawaView' element={<OprawaView/>} />
              <Route path='/History' element={<History />} />
              <Route path='/Panel' element={<Panel />} />
              <Route path='/Technologie' element={<TechnologieView />} />
              <Route path='/zamowienia' element={<Zamowienia />} />
              <Route path='/ustawienia' element={<Ustawienia />} />
              {/* <Route path='/statystyki' element={<Statystyki />} /> */}
              <Route path='/kalendarz' element={<Gant />} />
              <Route path='/sandbox' element={<SandBox />} />
              <Route path='/gant' element={<Gant />} />
              <Route path='/faktury' element={<ZamowieniaFaktury/>} />
            </Routes>
      </ModalInsertContextProvider>
      </PreOrderContextProvider>
      </TechnologyContextProvider>
      </AppContextProvider>
      </SocketContextProvider>
      
    </BrowserRouter>
  );
}






