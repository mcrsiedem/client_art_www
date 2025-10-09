import { useEffect,createContext,useState, useCallback } from "react";
import io from "socket.io-client";
import { IP_SOCKET } from "../utils/Host";
import { getUsers } from "../actions/getUsers";
import { getClients } from "../actions/getClients";
// const newSocket = io.connect(IP_SOCKET, {
//   autoConnect: true,
//   auth: {
//     token: sessionStorage.getItem("token"), 
//   },
// });



export const SocketContext = createContext();
export const SocketContextProvider = ({children})=>{

const [user,setUser] = useState(null);      // zalogowany user
const [socket,setSocket] = useState(null);  
const [socketReceiveMessage,setSocketReceiveMessage] = useState(null);  

const [usersIO,setUsersIO] = useState([]);   

    const updateUser = useCallback(()=>{
     setUser(user)
    },[])

    
    // useEffect(()=>{
    //     setSocket(newSocket)
    //     // if(socket === null) return;
    //     console.log("socket id: "+ newSocket.id)
    // },[])

    useEffect(() => {
        if(socket === null) return;
        socket.on("receive_message", (data) => {
          //tu przychodzi odpowiedź i jest zapisana w contexcie
          setSocketReceiveMessage(data.message)
        });

      socket.on("onlineUsers", (data) => {
          //tu przychodzi odpowiedź i jest zapisana w contexcie
          // setSocketReceiveMessage(data.message)
          setUsersIO(data)
          console.log(data)
        });

        
      }, [socket]);
    
    
    return  <SocketContext.Provider 
                value={{
                    user,socket,updateUser,socketReceiveMessage,setSocket,usersIO
                }}
            >
                {children}
            </SocketContext.Provider>
}