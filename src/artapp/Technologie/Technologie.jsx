
import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function Technologie(){

    const effectRan = useRef(false);
    useEffect(() => {
      if (effectRan.current === true) {
        // console.log("value: "+ value)
     //   console.log("Test tokenu"+ token.token)
        //console.log("Test pojedynczego rendera Header")
      }
      return () => {
        effectRan.current = true;
      };
    }, []);



    return(
    <>
        <Header/>
        <Footer/>

      

    </>
    )
    
}