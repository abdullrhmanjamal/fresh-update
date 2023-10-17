import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import * as Yup from 'yup'
import { authContext } from '../../Context/AuthContext';



export default function Login() {
    let {setToken} = useContext(authContext)
    let [isLoading, setIsLoading]= useState(false)
    let [errorMessage, setErrorMessage] = useState('')
    let navigate= useNavigate()
     async function login(values){
        console.log(values);
        setIsLoading(true)
        setErrorMessage('') // دي عشان لما يجي يعمل ريجستر تاني تختفي وتظهر لو هو مسجل بنفس الحاجة
        let {data}=  await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((err)=>{
        // console.log()
        setErrorMessage(err.response.data.message)
        setIsLoading(false)

        })
        console.log(data)
        setIsLoading(false)
        navigate('/home')
        setToken(data.token)
        localStorage.setItem('token',data.token)

        }

        

        let validationSchema = Yup.object({
            email:Yup.string().required('Email is Requied').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter Vaild Email'),
            password:Yup.string().required('Password is Requied').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i),
        })

    let formik = useFormik({
        initialValues:{
            email:'',
            password:'',
        },
        validationSchema,
        // valdate,
        onSubmit: login,
        
    })
    // console.log(formik)
  return (
    <>
    <div className='continer w-50 m-auto'>
        <h3>Login Now :</h3>
        <form onSubmit={formik.handleSubmit} className=''>
            
            <label htmlFor="email">Email :</label>
            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control w-80 mt-2 mb-2' type="email" id='email' name='email' />
            {formik.errors.email && formik.touched.email? <div className='alert alert-danger'>
                <p className='text-dark'>{formik.errors.email}</p>
            </div>: null }

            <label htmlFor="password">Password :</label>
            <input value={formik.values.password}  onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control w-80 mt-2 mb-2' type="password" id='password' name='password' />
            {formik.errors.password && formik.touched.password? <div className='alert alert-danger'>
                <p className='text-dark '>{formik.errors.password}</p>
            </div>: null }

            {errorMessage?<div className='alert alert-danger'><p>{errorMessage}</p></div>:null }
            {isLoading?
            <button disabled  type='btn' className='btn bg-main d-block ms-auto text-white mt-2'><i class="fa-solid fa-spinner fa-spin-pulse"></i></button>
            :
            <button disabled={isLoading} type='submit' className='btn bg-main d-block ms-auto text-white mt-2'>Login</button>
        }
            
        </form>
    </div>
    </>
)
}
