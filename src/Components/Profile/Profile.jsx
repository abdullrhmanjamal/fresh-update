import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'

export default function Profile() {

const [name,setName]=useState(null)

useEffect(()=>{

   const x= jwtDecode(localStorage.getItem('token'))

console.log(x)
setName(x.name)
},[])
 

  return (
    <>
    <h1 className='text-center vh-100 mt-5 '>Hello <span className='fw-bolder text-uppercase text-danger'>{name}</span> </h1>
    </>
  )
}
