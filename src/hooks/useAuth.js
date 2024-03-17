import axios from "axios";
import { IP } from "../../utils/Host";

import { useState } from "react";

export const useTogle = (initialVal = false) =>{
    const [auth,setAuth] = useState(initialVal);

    const checkToken = () => {
      
        axios.get(IP + "/islogged/" + sessionStorage.getItem("token")).then((res) => {
            if (res.data.Status === "Success") {
                setAuth(true)
            } else {
                setAuth(false)
            }
          });
        }

    


    
    return[auth,checkToken]

}
//ss