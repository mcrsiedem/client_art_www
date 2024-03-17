import axios from "axios";
import { IP } from "utils/Host";

import { useState,useEffect } from "react";

export const useAuth = (initialVal = false) =>{
    const [auth,setAuth] = useState(initialVal);




    const lookToken = () => {
      
        axios.get(IP + "/islogged/" + sessionStorage.getItem("token")).then((res) => {
            if (res.data.Status === "Success") {
                setAuth(true)
            } else {
                setAuth(false)
            }
          });
        }

      useEffect(() => {
        lookToken();
    console.log("useAuth")
  }, []);


    
    return[auth,lookToken]

}
//ss