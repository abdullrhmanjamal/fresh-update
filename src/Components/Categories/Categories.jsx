import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Categories() {
  const [categories,setCategories]= useState('')
  const [isLoading,setIsLoading]= useState(false)



  useEffect(()=>{

    getAllCategories()

  },[])


  async function getAllCategories(){
    setIsLoading(true)
let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
setIsLoading(false)
setCategories(data.data)
console.log(data.data)
  }
  return (
    <>
 <h1 className='text-center'>All Categories</h1>
    {isLoading ? <>
    
      <div className='d-flex justify-content-center align-items-center my-5 py-5'>
        <i className='fas fa-spin fa-spinner fa-2x'></i>
      </div>
    
    
    </>:

    <>


<div className='row'>

   
    {categories && categories.map((catgory)=>{
 return <div key={catgory._id} className='col-md-3 product mt-3  cursor-pointer rounded-3 text-center'>
  <Link to={'/CategoriesDetalis/'+catgory._id}>
  <img className='w-100' height={300} src={catgory.image} alt="" />
      <h5 className='text-main fw-bold mt-1'>{catgory?.name}</h5>
  </Link>
      
     </div>
  })}
 
    </div>



    </>
  
    
    }
    </>
  )
}
