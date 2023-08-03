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

import Logowanie from './components/Logowanie/Logowanie';
import ArtApp from "./artapp/ArtApp";
import Login from "./artapp/Login";
import { useState, createContext } from "react";
import History from "./artapp/History/History";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import TokenContext from "./artapp/tokenContext";
import Header from "./artapp/Header/Header";

export default function App() {

  const [token, setToken] = useState('mr'); 

  return (
    
    <BrowserRouter>
    
      <TokenContext.Provider value={{ token, setToken }}>
        <Header />
        <Routes>
          <Route path="/xl" element={<XL />} />
          <Route path="/H1" element={<H1 />} />
          <Route path="/H3" element={<H3 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/okladki" element={<Notes />} />
          <Route path="/info" element={<Info />} />
          <Route path="/falc" element={<Falc />} />
          <Route path="/papier" element={<Wydany_papier />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/drukplanxl" element={<DrukPlanXL />} />
          <Route path="/ArtApp" element={<ArtApp />} />
          <Route path="/History" element={<History />} />

          <Route path="/" element={<Login />} />
        </Routes>
      </TokenContext.Provider>
    </BrowserRouter>
  );
}






