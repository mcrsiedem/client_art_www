import React from "react";
import style from '../artapp/ArtApp.module.css';
import Header from "./Header";
import Menu from "./Menu";
import Jobs from "./Jobs";
import Footer from "./Footer";
function ArtApp(props){

  return(
    <div className={style.body}>

      <Header/>
      <Menu/>
      <Jobs/>
      <Footer/>
    </div>
  );
  

}
export default ArtApp;