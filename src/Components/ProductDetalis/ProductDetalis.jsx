import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Slider from "react-slick";


export default function ProductDetalis() {
    const [prodctDetalis,setProductDetalis]= useState(null)
    const [isLoading,setIsLoading]=useState(false)
    let params = useParams()
    console.log(params.id)

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };



    
    async function getProduct(productId){
      setIsLoading(true)
    let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/products/'+ productId)
    console.log(data.data)
    setIsLoading(false)
    setProductDetalis(data.data)
    }

    useEffect(()=>{
        getProduct(params.id)
    },[])
  return (

    <>
    {isLoading ? <>
    
      <div className='d-flex justify-content-center align-items-center my-5 py-5'>
        <i className='fas fa-spin fa-spinner fa-2x'></i>
      </div>
    
    </>:<div className='row align-items-center py-5'>
    <div className='col-md-3'>
        <Slider {...settings}>
        
        {prodctDetalis?.images.map((img, index)=>{
           return  <img key={index} className='w-100' src={img} />
        })}
    </Slider>
  
       
    </div>
    <div className='col-md-9'>
    <h2>{prodctDetalis?.title}</h2>
    <h5>{prodctDetalis?.category.name}</h5>
  <p>{prodctDetalis?.description}</p>
  <div className='d-flex justify-content-between'>
<p>Price:{prodctDetalis?.price}EGP</p>
<i className='fas fa-star rating-color me-1'>{prodctDetalis?.ratingsAverage}</i>
</div>

    </div>
    

    <button className='btn bg-main text-white mt-5 '>Add to Cart</button>

</div>
    }
    
    </>
  )
}
