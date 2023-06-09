import React from "react";
import style from '../artapp/ArtApp.module.css';
import Header from "./Header";
import Menu from "./Menu";
import Jobs from "./Jobs";
import Footer from "./Footer";
import { useState } from "react";
function ArtApp(props){

  const [maszyna, setMaszyna] = useState("XL");
  function giveMeJobsXL()
  {
    setMaszyna('XL');
    console.log(maszyna);
  }

  function giveMeJobsSM()
  {
    setMaszyna('SM');
    console.log(maszyna);
  }
  
  return(
    <div className={style.gridContainer}>
       <Header/>
       <Jobs/>
      
       <Footer giveMeJobsXL={()=>giveMeJobsXL()} giveMeJobsSM={()=>giveMeJobsSM()}/>
    
    </div>
  );
  

}
export default ArtApp;