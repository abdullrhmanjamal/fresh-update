import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CartCountContext } from '../../Context/CartContext';


export default function Cart() {
  const [numOfCartItems,setNumOfCartItems]= useState(0)
  const [totalCartPrice,setTotalCartPrice]= useState(0)
  const [cartProducts,setCartProducts]= useState([])
  const [cartId,setCartId]= useState('')
  const {setCartCount} = useContext(CartCountContext)

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
  setNumOfCartItems(data.totalCartPrice)
  setTotalCartPrice(data.data.totalCartPrice)
  setCartProducts(data.data.products)
  setCartId(data.data._id)
 }

 async function removeCartItem(productId){
  let {data}= await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/'+ productId,{
    headers:{
      token:localStorage.getItem('token')
    }
  }).catch((err)=>{
console.log(err.response.data.message)
  })

  console.log(data)
  setNumOfCartItems(data.totalCartPrice)
  setTotalCartPrice(data.data.totalCartPrice)
  setCartProducts(data.data.products)
  setCartCount(data.numOfCartItems)


 }
 
 async function clearCarts(){
  setNumOfCartItems(0)
  setTotalCartPrice(0)
  setCartProducts([])

  let {data}= await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
    headers:{
      token:localStorage.getItem('token')
    }
  })

  console.log(data)
  

  if(data.status ==  'success'){
    toast.success(data.message)
  }
 }


 async function updateProductCount(productId,count, index){

  let newCountProduct= [...cartProducts]
  newCountProduct[index]['count'] = count
  setCartProducts(newCountProduct)

  let {data}= await axios.put('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
    count
  },{
    headers:{
      token:localStorage.getItem('token')
    }
  })

  console.log(data)
  setNumOfCartItems(data.totalCartPrice)
  setTotalCartPrice(data.data.totalCartPrice)
  setCartProducts(data.data.products)
  
 }

  return (
    <>
    
<button className='btn btn-outline-danger text-end d-block ms-auto mb-2' onClick={clearCarts}>Clear Cart</button>
  {cartProducts && cartProducts?.map((product, index)=>{
    return <div className='row my-3 shadow align-items-center bg-light-subtle p-5'>
    <div className='col-md-2'>

      <img className='w-100 rounded-3' src={product.product.imageCover} alt="" />
    </div>
    <div className='col-md-10'>
      <div className='d-flex align-items-center justify-content-between'>
        <div>
          <h3>{product?.product?.title}</h3>
          <h5 className='text-main font-sm'>{product?.product?.category.name}</h5>
          <p className='fw-bolder'> Price : <span className='text-main'>{product?.price} EGP</span> </p>
          <i className='fas fa-star rating-color'><span className='mx-1'>{product?.product.ratingsAverage}</span></i>
        </div>
        
        <div  className='d-flex align-items-center '>
          <button onClick={()=>{updateProductCount(product.product._id, product.count -1, index)}} className='btn text-white bg-main mx-2 '>-</button>
          <span className='px-2'>{product.count}</span>
          <button onClick={()=>{updateProductCount(product.product._id, product.count +1, index)}} className='btn text-white bg-main mx-2 '>+</button>
          <div>
          <button onClick={()=>removeCartItem(product.product._id)} className='btn btn-danger mx-4 '>Remove</button>
        </div>
        </div>
        
      </div>
    </div>
  </div>
  })}
  <div className='d-flex justify-content-end align-items-end'>
    <button className='btn bg-main text-white '>Total Cart  Price : <span className='fw-bolder'>{totalCartPrice} EGP</span></button>
  </div>
  <div className='d-flex justify-content-end align-items-end'>
    <Link to={'/checkout/'+ cartId}>
    <button className='btn bg-main text-white mt-4'>CheckOut</button>

    </Link>
  </div>
    
    
    </>
  )
}
