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


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default function App() {
  return (
    <Router>        
        <Switch>
        
          
          <Route path="/xl"> <XL />        </Route>
          <Route path="/H1"> <H1 />        </Route>
          <Route path="/H3"> <H3 />        </Route>
          <Route path="/login">   <Login />          </Route>
          

          <Route path="/okladki">   <Notes />          </Route>
          <Route path="/info">   <Info />          </Route>
          <Route path="/falc">   <Falc />          </Route>
          <Route path="/papier">   <Wydany_papier />          </Route>
          <Route path="/historia">   <Historia />          </Route>
          <Route path="/drukplanxl">   <DrukPlanXL />          </Route>


          <Route path="/ArtApp">   <ArtApp />          </Route>
          <Route path="/">   <Login />          </Route>

        </Switch>
    </Router>
  );
}






