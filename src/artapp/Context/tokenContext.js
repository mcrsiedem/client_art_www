import React from "react";

const TokenContext = React.createContext({
    token: '',
    setToken: ()=>{},
    rowSelected: [],
    setRowSelected: ()=>{},
    // user: '',
    // setUser: ()=>{},
    users:[], // wszyscy użytkownicy
    getUsersList: ()=> {},
    setSocketStan:()=>{}, // dodawanie socketu do stanu
    socketStan: [],  // stan przechowujący socket
    socketReceive:[] // w stanie jest socket io
});

export default TokenContext;