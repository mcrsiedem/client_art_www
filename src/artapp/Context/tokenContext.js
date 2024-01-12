import React from "react";

const TokenContext = React.createContext({
    token: '',
    setToken: ()=>{},
    rowSelected: [],
    setRowSelected: ()=>{},
    user: '',
    setUser: ()=>{},

});

export default TokenContext;