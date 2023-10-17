import { createContext, useEffect, useState } from "react";

export let authContext = createContext()
export function AuthProvider({children}){

const [token,setToken]= useState('')
useEffect(()=>{
if(localStorage.getItem('token')!== null){
    setToken(localStorage.getItem('token'))
}
},[])
return <authContext.Provider value={{token,setToken}}>

    {children}
</authContext.Provider>
}