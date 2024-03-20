import { useEffect,createContext,useState, useCallback } from "react";
import io from "socket.io-client";
import { IP_SOCKET } from "../utils/Host";
import { today } from "actions/today";

const newSocket = io.connect(IP_SOCKET,{autoConnect: true});

export const PreOrderContext = createContext();
export const PreOrderContextProvider = ({children})=>{

    const [daneZamowienia, setDaneZamowienia] = useState({
        id: 1,
        nr: "20",
        rok: "2024",
        firma_id: 0,
        klient_id: 0,
        opiekun_id: 0,
        tytul: "Tytuł zamówienia",
        data_przyjecia: today(),
        data_materialow: today(),
        data_spedycji: today(),
        stan: 0,
        status: 0,
        rodzaj: 1,
        uwagi: "",
        cena:"",
        waluta_id: 1,
        termin_platnosci: 30,
        vat_id: 4,
        przedplata: " "
    
      });   

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



    // const updateUser = useCallback(()=>{
    //  setUser(user)
    // },[])

    
    useEffect(()=>{

    },[])


    
    
    return  <PreOrderContext.Provider 
                value={{
                    daneZamowienia, setDaneZamowienia,
                    preOrder, setPreOrder

                }}
            >
                {children}
            </PreOrderContext.Provider>
}