
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Products'

export default function AllProducts() {

  const [products,setProducts]= useState('')
  const [isLoading,setIsLoading]= useState(false)

  



  async function getAllProducts(){
    setIsLoading(true)
let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/products')
setIsLoading(false)
// console.log(data.data)
setProducts(data.data)
  }

  useEffect(()=>{
    getAllProducts()

  },[])


  return (
    < >
      <h1 className='text-dark text-center'>All Producusts </h1>

    {isLoading ? <>
      <div className='d-flex justify-content-center align-items-center my-5 py-5'>
        <i className='fas fa-spin fa-spinner fa-2x'></i>
      </div>
    
    </>
    
  :
  
  
  <div className='container '>
   
    <div className='row'>
    {products && products.map((product)=>{
   return <div key={product._id} className='col-md-3'>
   <Product product={product}/>

    </div>
  })}
    </div>

  

</div>}
    
   
    
    
    </>
  )
}
