import axios from "axios";
import { IP } from "Host";

import { useState,useEffect,useRef } from "react";

export const useAuth = (initialVal = false) =>{
    //  const [auth,setAuth] = useState(initialVal);
    let auth = useRef(false)

    

    const lookToken = () => {
      
        axios.get(IP + "/islogged/" + sessionStorage.getItem("token")).then((res) => {
            console.log("axios")
            if (res.data.Status =="Success") {
                console.log("success")
                auth.current=true
       
            } else {
                console.log("not succes")
                auth.current=false
         
            }
          });
        }

      useEffect(() => {
        lookToken();
    
   
  }, []);


    return[auth,lookToken]

}
//ss