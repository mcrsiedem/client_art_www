import { useEffect,createContext,useState, useCallback } from "react";
import io from "socket.io-client";
import { IP_SOCKET } from "../utils/Host";
import { today } from "actions/today";
import { initialDane } from "utils/initialvalue";

const newSocket = io.connect(IP_SOCKET,{autoConnect: true});

export const PreOrderContext = createContext();
export const PreOrderContextProvider = ({children})=>{

    const [daneZamowienia, setDaneZamowienia] = useState(initialDane);   

      const [preOrder, setPreOrder] = useState({
        typ: 1,
        oprawa: null,
        naklad: null,
        strony_okl: 4,
        strony_srd: null,
        szerokosc: null,
        wysokosc: null,
        bok_oprawy: null
    
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