import React from "react";
import './App.css';
import Notes from './components/Notes/Notes';
import XL from './components/Druk/XL';

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




