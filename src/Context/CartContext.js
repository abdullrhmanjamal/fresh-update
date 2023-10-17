
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartCountContext = createContext()


export function CartCountContextProvider({children}){
    let  [cartCount,setCartCount]= useState(0)
    useEffect(()=>{
        getUsersCart()
  
    },[])

    async function  getUsersCart(){
        let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
          headers:{
            token:localStorage.getItem('token')
          }
      
        }
      
        
        )
        console.log(data)
        setCartCount(data.numOfCartItems)
       }


return <CartCountContext.Provider value={{cartCount,setCartCount}}>

    {children}
</CartCountContext.Provider>
}