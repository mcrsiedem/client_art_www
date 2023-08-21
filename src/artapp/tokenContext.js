import React from "react";

const TokenContext = React.createContext({
    token: '',
    setToken: ()=>{}
});

export default TokenContext;