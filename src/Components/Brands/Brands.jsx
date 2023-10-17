import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Brands () {

  const [brands,setBrands]= useState('')
  const [isLoading,setIsLoading]= useState(false)



  useEffect(()=>{

    getAllBrands()
  },[])

  async function getAllBrands(){
    setIsLoading(true)

    let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    setIsLoading(false)
    console.log(data.data)
    setBrands(data.data)
  }



  return (
    <>
    
    {isLoading ? <>
    
      <div className='d-flex justify-content-center align-items-center my-5 py-5'>
        <i className='fas fa-spin fa-spinner fa-2x'></i>
      </div>
    
    
    </>:
    <div className='container'>
    <div className='row'>
      { brands && brands?.map((brands)=>{

        return <div key={brands?._id} className='col-md-3 product mt-3 p-1 overflow-hidden cursor-pointer'>
        <img src={brands?.image} alt="" />
        <h2 className='text-center text-main'>{brands?.name}</h2>

        </div>
      })}
    </div>
   </div>
    }
   
    
    </>
  )
}
