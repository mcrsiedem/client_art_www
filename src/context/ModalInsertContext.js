import { useEffect,createContext,useState, useCallback } from "react";
import { getUsers } from "../actions/getUsers";
import { getClients } from "../actions/getClients";
import { getProcess } from "actions/getProcess";


export const ModalInsertContext = createContext(
    //  {getClients: ()=>{}}
);
export const ModalInsertContextProvider = ({children})=>{

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

    // const updateClients = useCallback(()=>{
    //  getClients(setClients)
    // },[])

    // const updateUsers = useCallback(()=>{
    //     getUsers(setUsers)
    //    },[])
    
    useEffect(()=>{
        
        // getUsers(setUsers) // lista wszystkich użytkowników
        // getClients(setClients) // list wszystkich klientów
    },[])
    
    return  <ModalInsertContext.Provider 
                value={{
                    preOrder, setPreOrder
                }}
            >
                {children}
            </ModalInsertContext.Provider>
}