import { createContext, useEffect, useState } from "react";

export let TokenContext = createContext();
export default function TokenContextProvider(props){
    const [token,setToken] = useState(null)
useEffect(()=>{
    if(localStorage.getItem("UserToken")){
       setToken(localStorage.getItem("UserToken")) 
    }
},[])
    return <TokenContext.Provider value={{token,setToken}}>
        {props.children}
    </TokenContext.Provider>
}
