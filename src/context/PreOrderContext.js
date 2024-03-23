import { useEffect,createContext,useState, useCallback } from "react";
import io from "socket.io-client";
import { IP_SOCKET } from "../Host2";
import { today } from "actions/today";
import { initialDane } from "utils/initialvalue";

const newSocket = io.connect(IP_SOCKET,{autoConnect: true});

export const PreOrderContext = createContext();
export const PreOrderContextProvider = ({children})=>{

    const [daneZamowienia, setDaneZamowienia] = useState(initialDane);   

      const [preOrder, setPreOrder] = useState({
        typ: 1,
        oprawa: 1,
        naklad: "1000",
        strony_okl: "4",
        strony_srd: "80",
        format_x: "210",
        format_y: "297",
        bok_oprawy: "297"
    
      });


      const [presetTyp, setPresetTyp] = useState({
        id: 1,
        typ: 1, // katalog
      },
      {
        id:2,
        typ: 2 //ulotka
      }
      );

      const [presetOprawa, setPresetOprawa] = useState({
        id: 1,
        oprawa: 1, // katalog
      },
      {
        id:2,
        oprawa: 2 //ulotka
      }
      );


    // const updateUser = useCallback(()=>{
    //  setUser(user)
    // },[])

    
    useEffect(()=>{

    },[])


    
    
    return  <PreOrderContext.Provider 
                value={{
                    daneZamowienia, setDaneZamowienia,
                    preOrder, setPreOrder,
                    presetTyp, setPresetTyp,
                    presetOprawa, setPresetOprawa

                }}
            >
                {children}
            </PreOrderContext.Provider>
}