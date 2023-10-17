import axios from 'axios'
import {Link} from 'react-router-dom'
import toast from 'react-hot-toast';
import { useContext, useEffect } from 'react';
import { CartCountContext } from '../../Context/CartContext';



export default function Product ({product}) {

  let {setCartCount}= useContext(CartCountContext)


async function addToCart(productId){
  let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId},{
    headers: {
      token: localStorage.getItem('token')
    }
  }).catch((err)=>{
    toast.error(err.response.data.message)

  })
  console.log(data)
  setCartCount(data?.numOfCartItems)
  if(data.status ===  'success'){
    toast.success(data.message)
  }

}

  return (
    <>

  <div className='product mt-3 p-1 overflow-hidden cursor-pointer'>
  <Link to={'/productDetalis/'+ product._id} >
  <img className='w-100' src={product.imageCover} alt="" />
    <h2>{product.title.split(' ').slice(0,2).join(' ')}</h2>
    <h5 className='font-sm text-main'>{product.category.name}</h5>
    <div className='d-flex justify-content-between'>
    <p>Price:{product.price}EGP</p>
    <i className='fas fa-star rating-color me-1'>{product.ratingsAverage}</i>
    </div>
     </Link>
     <button onClick={()=>addToCart(product._id) } className='btn bg-main text-white mt-3 '>Add to Cart</button>
  </div>
    </>
    
  )
}
