import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

export default function CategoriesDetalis() {

    let params = useParams()
    let [categoriesDetalis,setCategoriesDetalis]=useState('')
    const [isLoading,setIsLoading]=useState(false)
    console.log(params.id)




    useEffect(()=>{

        getCategoriesDetalis(params.id)

    },[])



    async function getCategoriesDetalis(categoriesId){
        setIsLoading(true)
    let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoriesId}/subcategories`)
    setIsLoading(false)
console.log(data.data)
setCategoriesDetalis(data.data)
    }



 
  return (
    <>
   {isLoading ? <>
    <div className='d-flex justify-content-center align-items-center my-5 py-5'>
        <i className='fas fa-spin fa-spinner fa-2x'></i>
      </div>

   </>:
   <div className='row d-flex justify-content-center align-items-center  '>

   {categoriesDetalis && categoriesDetalis.map((catgory)=>{
   return <div key={catgory._id} className='col-md-3 mt-4 text-center bg-light  p-5 shadow mx-3'>
     <h5 className='text-main fw-bold mt-1'>{catgory?.name}</h5>
     
    </div>
   })}
   
   </div>
   
   }


    </>
  )
}

