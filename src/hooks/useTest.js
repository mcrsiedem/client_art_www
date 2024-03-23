import axios from "axios";
import { IP } from "Host";

import { useState,useEffect,useRef } from "react";

export const useTest = (initialVal = false) =>{
    const[test,setTest] =useState(initialVal)

const togle = () => {
// setTest((prev)=> !prev)
lookToken()
fun()
}

const fun = ()=> {
  
    console.log("test "+test)

}
const lookToken = () => {
      
  axios.get(IP + "/islogged/" + sessionStorage.getItem("token")).then((res) => {
      console.log("axios")
      if (res.data.Status =="Success") {
          console.log("success")
          setTest(true)
 
      } else {
          console.log("not succes")
          setTest(false)
   
      }
    });
  }
    return[test,togle]

}
