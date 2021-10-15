import React from "react";
import './App.css';
import Notes from './components/Notes/Notes';
import XL from './components/Druk/XL';
import H1 from './components/Druk/H1';

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

          <Route path="/okladki">   <Notes />          </Route>
        </Switch>
    </Router>
  );
}

function Home() {
  return (<div className ="App">     <Notes />    </div>);
}

function DrukXL() {
  return (<div className ="XL"> <XL />   </div>);
}




