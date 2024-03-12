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
    socketStan: [] // pobiera użytkowników

});

export default TokenContext;