import React from "react";

const TokenContext = React.createContext({
    token: '',
    setToken: ()=>{},
    rowSelected: [],
    setRowSelected: ()=>{},
    user: '',
    setUser: ()=>{},
    users:[]

});

export default TokenContext;