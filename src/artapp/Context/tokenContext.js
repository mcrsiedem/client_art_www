import React from "react";

const TokenContext = React.createContext({
    token: '',
    setToken: ()=>{},
    rowSelected: [],
    setRowSelected: ()=>{},

});

export default TokenContext;