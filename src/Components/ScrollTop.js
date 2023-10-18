import React, { useEffect, useState } from 'react'

export default function ScrollTop() {

    const[backToTop,setBackToTop]=useState(false)

    

    useEffect(()=>{

        window.addEventListener('scroll', ()=>{
            if(window.scrollY > 100){
                setBackToTop(true)
            }else{
                setBackToTop(false)
            }
        })
    },[])

    const ScrollUp = ()=>{
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    }



    return (
        <div className='bg-danger '>
            {backToTop && (
                <button className=' bg-main rounded text-white fs-5 text-center ' onClick={ScrollUp} style={{

                    width:'40px',
                    height:'40px',
                    position:'fixed',
                    bottom:'50px',
                    right:'50px',  
                    zIndex:'9999',
                    border:'unset', 
                }} ><p className='mt-1 fw-bolder'>UP</p></button>
            )}
        </div>
      )    

    }

    



 

    