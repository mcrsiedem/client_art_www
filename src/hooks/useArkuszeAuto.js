import axios from "axios";
import { IP } from "utils/Host";

import { useState,useEffect,useRef } from "react";

export const useArkuszeAuto = () =>{


    

    const autoArk = () => {

      let legi, ilosc_stron

      let rodzaje_glownych_leg_k = [2,4,8,12,16,24,32]


       ilosc_stron = 80
       legi = [16,16,16,16,16]

       ilosc_stron = 46
       legi = [16,2,4,8,16]

       ilosc_stron = 78
       legi = [16,16,16,2,4,8,16]

       ilosc_stron = 30
       legi = [2,4,8,16]

       ilosc_stron = 14
       legi = [2,4,8]

      console.log(legi)

        }




    return {autoArk}

}
//ss