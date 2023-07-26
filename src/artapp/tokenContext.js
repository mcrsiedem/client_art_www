import React from "react";

const TokenContext = React.createContext({
    token: 'token context',
    setToken: ()=>{}
});

export default TokenContext;