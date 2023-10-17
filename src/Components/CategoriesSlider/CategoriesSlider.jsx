import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
export default function CategoriesSlider() {
const [categories,setCategories]= useState('')
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3
      };


useEffect(()=>{
    getAllCategories()


},[])



    async function getAllCategories(){
let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
console.log(data.data)
setCategories(data.data)

      }


  return (
    <>

<Slider {...settings} className='my-4'>
        
{categories && categories.map((category,index)=>{
return <>
<img key={index} className='w-100' height={200} src={category?.image} alt={category?.name} />
<h5 className='text-main font-sm'>{category.name}</h5>
</> 

})}
        
  </Slider>


    </>
  )
}
