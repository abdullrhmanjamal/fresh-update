import React from 'react'
import Slider from "react-slick";
import slider1 from '../../images/blog-img-1.jpeg'
import slider2 from '../../images/blog-img-2.jpeg'
import img1 from   '../../images/slider-image-1.jpeg'
import img2 from   '../../images/slider-image-2.jpeg'

export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };



  return (
    <>

<div className='main-slider'>
      <div className='row'>
        <div className='col-md-9 p-0'>
        <Slider {...settings}>
        
        
        <img className='w-100' height={500} src={slider1} alt=""/>
        <img className='w-100'height={500} src={slider2} alt=""/>
  </Slider>
        </div>
        <div className='col-md-3 p-0'>
      
        <img className='w-100' height={250} src={img1} alt=""/>
        <img className='w-100'height={250} src={img2} alt=""/>
 
        </div>
      </div>

    

</div>
    
    </>
  )
}
