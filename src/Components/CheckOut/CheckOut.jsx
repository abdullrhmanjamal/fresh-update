import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useParams } from 'react-router'


export default function CheckOut() {
    let {id}= useParams()

    async function checkOut(shippingAddress){
// console.log(values)
fetchCheckOut(shippingAddress)

    }


   async function fetchCheckOut(shippingAddress){
        let res= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3001`,shippingAddress
       ,{
            headers:{
                token:localStorage.getItem('token')
            }
        })
       window.location.href = res.data.session.url
    }




    let formik = useFormik({
        initialValues:{
            detalis:'',
            city:'',
            phone:''
        },
      
        onSubmit:checkOut
        
        
    })
  return (
    <div>
<form onSubmit={formik.handleSubmit} className='w-75 m-auto'>
            
            <label htmlFor="text">Detalis :</label>
            <input value={formik.values.detalis} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control w-80 mt-2 mb-2' type="text" id='detalis' name='detalis' />
            

            <label htmlFor="text">City :</label>
            <input value={formik.values.city}  onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control w-80 mt-2 mb-2' type="text" id='city' name='city' />
            
            <label htmlFor="phone">Phone :</label>
            <input value={formik.values.phone}  onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control w-80 mt-2 mb-2' type="tel" id='phone' name='phone' />
            
            
            <button  type='submit' className='btn bg-main d-block ms-auto text-white mt-2'>Order</button>

        


            
        </form>


    </div>
  )
}
