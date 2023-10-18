import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'

export default function AllOrders() {

// const [userId,setUserId]= useState(null)
const [userOrders,setUserOrders]= useState(null)

useEffect(()=>{
    let res = jwtDecode(localStorage.getItem('token'))
    // setUserId(res.id)
    getUserOrder(res.id)

},[])

async function getUserOrder(id){
 let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`).catch((err)=>{
    console.log('error',err)
 })
 console.log(data)
 setUserOrders(data)

}

if(userOrders === null){

   return <div className='d-flex justify-content-center align-items-center my-5 py-5'>
        <i className='fas fa-spin fa-spinner fa-2x'></i>
      </div>
}
  return (



    <>
    
    <div className='container '>
        <div className='row'>
            {userOrders?.map((orders, index)=>{
              return  <div key={index} className='col-md-4'>
              <div className='order bg-secondary-subtle rounded-4 p-3'>
                {orders.cartItems?.map((item,idx)=>{
                    return <div className=' my-3 p-2  text-center '>
                        
                      <img className='w-50  rounded-4' src={item.product.imageCover} alt={item.product.title} />
                      <h3>{item.product.title}</h3>
                        <h5>Qty : <span className='fw-bolder'>{item.count}</span> </h5>
                        <h5>Item Price : <span className='fw-bolder'>{item.price}</span> </h5>
                      
                    </div>
                })}

                
                <h5>Total Order Price : <span className='fw-bolder'>{orders.totalOrderPrice} EGP</span> </h5>
                <h5 >Payment Method : <span  className='fw-bolder'>{orders.paymentMethodType}</span> </h5>
                

              </div>
          </div>

            })}
            
        </div>
    </div>
    
    </>
  )
}
